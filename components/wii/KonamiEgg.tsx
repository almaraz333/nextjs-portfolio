"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSound } from "@/components/wii/SoundProvider";

/*
 * Konami code easter egg: ↑ ↑ ↓ ↓ ← → ← → B A (keyboard only) opens a
 * small "Secret Channel" dialog. Renders nothing until triggered.
 */

const SEQUENCE = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a"
] as const;

export default function KonamiEgg() {
    const [open, setOpen] = useState(false);
    const progressRef = useRef(0);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const { play } = useSound();

    const close = useCallback(() => {
        play("back");
        setOpen(false);
    }, [play]);

    // Watch for the code — only while the panel is closed.
    useEffect(() => {
        if (open) {
            return undefined;
        }
        const handleKey = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (key === SEQUENCE[progressRef.current]) {
                progressRef.current += 1;
                if (progressRef.current === SEQUENCE.length) {
                    progressRef.current = 0;
                    returnFocusRef.current =
                        document.activeElement instanceof HTMLElement
                            ? document.activeElement
                            : null;
                    play("select");
                    setOpen(true);
                }
            } else {
                // A wrong key restarts the hunt (an ↑ still counts as step 1).
                progressRef.current = key === SEQUENCE[0] ? 1 : 0;
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, play]);

    // While open: focus the panel, lock scroll, close on Escape, keep Tab
    // on the only focusable control; on close, restore focus to the opener.
    useEffect(() => {
        if (!open) {
            return undefined;
        }
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            } else if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        panelRef.current?.focus({ preventScroll: true });
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = previousOverflow;
            const target = returnFocusRef.current;
            returnFocusRef.current = null;
            if (target && target.isConnected) {
                target.focus({ preventScroll: true });
            }
        };
    }, [open, close]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="konami-egg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-wii-text/25 p-4"
                    onMouseDown={event => {
                        if (event.target === event.currentTarget) {
                            close();
                        }
                    }}
                >
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="konami-egg-title"
                        tabIndex={-1}
                        initial={
                            prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, scale: 0.92 }
                        }
                        animate={
                            prefersReducedMotion
                                ? { opacity: 1 }
                                : { opacity: 1, scale: 1 }
                        }
                        exit={
                            prefersReducedMotion
                                ? { opacity: 0 }
                                : { opacity: 0, scale: 0.95 }
                        }
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full max-w-md rounded-channel border border-wii-line bg-wii-white p-6 text-center shadow-wii-glow outline-none sm:p-8"
                    >
                        <p className="font-display text-xs font-medium tracking-[0.28em] text-wii-blue-deep uppercase">
                            Secret Channel
                        </p>
                        <h2
                            id="konami-egg-title"
                            className="mt-2 font-display text-2xl font-medium tracking-wide text-wii-text"
                        >
                            🎉 Secret Channel unlocked!
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-wii-text/80">
                            Thanks for looking this closely — this site is a
                            hand-built love letter to 2006: real guestbook, real
                            visitor counter, synthesized Wii blips, zero UI
                            libraries.
                        </p>
                        <p className="mt-2 font-display text-sm text-wii-text/60">
                            — Colton
                        </p>
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={close}
                            className="mt-6 inline-flex cursor-pointer items-center rounded-full border border-wii-line bg-wii-white px-8 py-2.5 font-display text-sm font-medium text-wii-blue-deep shadow-wii-sm transition hover:shadow-wii-glow active:scale-95"
                        >
                            OK
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
