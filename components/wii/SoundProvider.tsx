"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useSyncExternalStore
} from "react";

import { playSound, primeAudio, type SoundName } from "@/lib/sound";

export interface SoundContextValue {
    enabled: boolean;
    toggle: () => void;
    play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue>({
    enabled: false,
    toggle: () => undefined,
    play: () => undefined
});

/*
 * The preference lives in a tiny external store (memory cache + best-effort
 * localStorage persistence) consumed via useSyncExternalStore: the server
 * snapshot is always "off", and the stored value is picked up after hydration
 * — so there is never a hydration mismatch and sounds stay default-OFF.
 */

const STORAGE_KEY = "wii-sound";

let cachedEnabled: boolean | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getSnapshot(): boolean {
    if (cachedEnabled === null) {
        try {
            cachedEnabled = window.localStorage.getItem(STORAGE_KEY) === "on";
        } catch {
            // localStorage unavailable (private mode etc.) — default off.
            cachedEnabled = false;
        }
    }
    return cachedEnabled;
}

function getServerSnapshot(): boolean {
    return false;
}

function setEnabled(next: boolean): void {
    cachedEnabled = next;
    try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
        // Preference simply won't persist.
    }
    for (const listener of listeners) {
        listener();
    }
}

export default function SoundProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const enabled = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    /*
     * A preference restored from localStorage cannot unlock WebAudio on its
     * own — browsers only resume an AudioContext from a user gesture. Without
     * this, a returning visitor sees the speaker "on" but hears nothing until
     * they toggle it off and back on. Prime the context on their first real
     * interaction instead. (Hover is not an activation gesture, so the very
     * first hover blip may still be silent; the next one is not.)
     */
    useEffect(() => {
        if (!enabled) {
            return undefined;
        }
        const events = ["pointerdown", "keydown", "touchstart"] as const;
        const unlock = () => {
            primeAudio();
            for (const event of events) {
                window.removeEventListener(event, unlock);
            }
        };
        for (const event of events) {
            window.addEventListener(event, unlock, { passive: true });
        }
        return () => {
            for (const event of events) {
                window.removeEventListener(event, unlock);
            }
        };
    }, [enabled]);

    const toggle = useCallback(() => {
        const next = !getSnapshot();
        setEnabled(next);
        if (next) {
            // Called from a click, so this user gesture may unlock the
            // context; the blip doubles as audible confirmation.
            primeAudio();
            playSound("select");
        }
    }, []);

    const play = useCallback(
        (name: SoundName) => {
            if (!enabled) {
                return;
            }
            playSound(name);
        },
        [enabled]
    );

    const value = useMemo(
        () => ({ enabled, toggle, play }),
        [enabled, toggle, play]
    );

    return (
        <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
    );
}

export function useSound(): SoundContextValue {
    return useContext(SoundContext);
}
