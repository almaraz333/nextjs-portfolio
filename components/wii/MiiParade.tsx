"use client";

import { useEffect, useState } from "react";

/*
 * Mii parade: every ~45–90 s a small row of 2–3 generic Mii-like figures
 * strolls once across the screen just above the bottom bar, then leaves.
 *
 * Deliberately cheap and unobtrusive: pure CSS transform animation
 * (keyframes live in app/globals.css), aria-hidden, pointer-events-none,
 * and completely disabled for reduced motion, coarse pointers, and small
 * screens — gated in JS before mounting and again in CSS as a backstop.
 */

const WALK_DURATION_MS = 16000;
const MIN_DELAY_MS = 45000;
const MAX_DELAY_MS = 90000;

interface Walker {
    shirt: string;
    bobMs: number;
    bobDelayMs: number;
}

interface Parade {
    id: number;
    walkers: Walker[];
}

const SHIRTS = ["#22a9e0", "#0a7cb5", "#9bd9f2"] as const;

function paradeAllowed(): boolean {
    return (
        window.matchMedia("(min-width: 768px)").matches &&
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

function makeParade(): Parade {
    const count = Math.random() < 0.5 ? 2 : 3;
    const shirts = [...SHIRTS].sort(() => Math.random() - 0.5);
    return {
        id: Date.now(),
        walkers: Array.from({ length: count }, (_, index) => ({
            shirt: shirts[index % shirts.length],
            bobMs: 340 + index * 45,
            bobDelayMs: index * 90
        }))
    };
}

function MiiFigure({ walker }: { walker: Walker }) {
    return (
        <span
            className="block"
            style={{
                animation: `wii-parade-bob ${walker.bobMs}ms ease-in-out ${walker.bobDelayMs}ms infinite alternate`
            }}
        >
            <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                aria-hidden="true"
                focusable="false"
            >
                <circle
                    cx="12"
                    cy="9"
                    r="6.5"
                    fill="#f7f9fb"
                    stroke="#c9d2da"
                    strokeWidth="1"
                />
                <path d="M5.5 8.2a6.5 6.5 0 0 1 13 0Z" fill="#33404a" />
                <circle cx="9.7" cy="10.4" r="0.9" fill="#33404a" />
                <circle cx="14.3" cy="10.4" r="0.9" fill="#33404a" />
                <rect
                    x="4.5"
                    y="16.5"
                    width="15"
                    height="13"
                    rx="6"
                    fill={walker.shirt}
                />
            </svg>
        </span>
    );
}

export default function MiiParade() {
    const [parade, setParade] = useState<Parade | null>(null);

    useEffect(() => {
        let showTimer: number | undefined;
        let hideTimer: number | undefined;
        let cancelled = false;

        const schedule = () => {
            const delay =
                MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
            showTimer = window.setTimeout(() => {
                if (cancelled) {
                    return;
                }
                if (!paradeAllowed()) {
                    schedule();
                    return;
                }
                setParade(makeParade());
                hideTimer = window.setTimeout(() => {
                    if (cancelled) {
                        return;
                    }
                    setParade(null);
                    schedule();
                }, WALK_DURATION_MS + 500);
            }, delay);
        };

        schedule();
        return () => {
            cancelled = true;
            if (showTimer !== undefined) {
                window.clearTimeout(showTimer);
            }
            if (hideTimer !== undefined) {
                window.clearTimeout(hideTimer);
            }
        };
    }, []);

    if (parade === null) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 bottom-(--wii-bar-height) z-20 hidden h-10 overflow-hidden md:motion-safe:pointer-fine:block"
        >
            <div
                key={parade.id}
                className="flex h-full w-max items-end gap-3 pb-0.5"
                style={{
                    animation: `wii-parade-walk ${WALK_DURATION_MS}ms linear forwards`
                }}
            >
                {parade.walkers.map((walker, index) => (
                    <MiiFigure key={index} walker={walker} />
                ))}
            </div>
        </div>
    );
}
