"use client";

/**
 * Visitor counter — a 2000s-style odometer backed by /api/visits.
 * The count is real and server-side; the dark digit slots are a deliberate
 * retro-odometer exception to the site's no-black palette.
 */

import { useEffect, useState } from "react";

const SESSION_KEY = "wii-counted";
const DIGIT_STRIP = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const CELL_HEIGHT_REM = 2.25; // keep in sync with the h-9 cells below

function readSessionFlag(): boolean {
    try {
        return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        // Storage can be blocked (private mode) — treat as not yet counted;
        // the server-side cookie is the real dedupe anyway.
        return false;
    }
}

function writeSessionFlag(): void {
    try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        // Best effort only.
    }
}

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [rolled, setRolled] = useState(false);
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            try {
                // POST once per tab session; afterwards just read. The httpOnly
                // cookie set by the server is the real once-per-day dedupe.
                const alreadyCounted = readSessionFlag();
                const res = await fetch(
                    "/api/visits",
                    alreadyCounted ? undefined : { method: "POST" }
                );
                if (!res.ok) {
                    return; // graceful: no counter beats a broken one
                }
                if (!alreadyCounted) {
                    writeSessionFlag();
                }
                const data = (await res.json()) as { count?: unknown };
                if (!cancelled && typeof data.count === "number") {
                    setCount(data.count);
                }
            } catch {
                // Render nothing on failure.
            }
        };

        void run();
        return () => {
            cancelled = true;
        };
    }, []);

    // Roll the digits in once the count arrives — unless the visitor prefers
    // reduced motion, in which case they snap straight to their values.
    useEffect(() => {
        if (count === null || rolled) {
            return;
        }
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        let second = 0;
        const first = requestAnimationFrame(() => {
            if (prefersReduced) {
                setAnimate(false);
                setRolled(true);
                return;
            }
            second = requestAnimationFrame(() => setRolled(true));
        });
        return () => {
            cancelAnimationFrame(first);
            cancelAnimationFrame(second);
        };
    }, [count, rolled]);

    if (count === null) {
        return null;
    }

    const digits = String(count).padStart(6, "0").split("");

    return (
        <div
            className="flex flex-col items-center gap-1.5"
            title="Server-side visitor count — no fakery."
        >
            <span
                aria-hidden="true"
                className="font-display text-[11px] tracking-[0.3em] text-wii-text/60 uppercase"
            >
                visitors
            </span>
            <div
                role="img"
                aria-label={`${count} visitors so far`}
                className="flex gap-1 rounded-lg bg-[#242a31] p-1.5 shadow-wii-sm"
            >
                {digits.map((digit, index) => (
                    <span
                        key={index}
                        aria-hidden="true"
                        className="block h-9 w-6 overflow-hidden rounded-[4px] bg-[#0d1115] shadow-[inset_0_2px_5px_rgba(0,0,0,0.85),inset_0_-1px_1px_rgba(255,255,255,0.06)]"
                    >
                        <span
                            className="block will-change-transform"
                            style={{
                                transform: rolled
                                    ? `translateY(-${Number(digit) * CELL_HEIGHT_REM}rem)`
                                    : "translateY(0rem)",
                                transition: animate
                                    ? `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms`
                                    : "none"
                            }}
                        >
                            {DIGIT_STRIP.map(strip => (
                                <span
                                    key={strip}
                                    className="flex h-9 w-6 items-center justify-center font-mono text-lg font-semibold text-[#8ef79f] [text-shadow:0_0_6px_rgba(110,255,140,0.4)]"
                                >
                                    {strip}
                                </span>
                            ))}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}
