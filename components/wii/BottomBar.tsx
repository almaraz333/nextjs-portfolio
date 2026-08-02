"use client";

import { useSyncExternalStore } from "react";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    SpeakerOffIcon,
    SpeakerOnIcon
} from "@/components/wii/icons";
import { useSound } from "@/components/wii/SoundProvider";
import type { ChannelSlug } from "@/lib/channels";

interface BottomBarProps {
    active: ChannelSlug | null;
    onHome: () => void;
    onStep: (direction: 1 | -1) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/*
 * Ticking clock as a tiny external store: the server snapshot is null (the
 * clock renders only after hydration, so there is no mismatch) and an
 * interval drives one update per second while subscribed.
 */
let clockNow: Date | null = null;

function subscribeClock(onTick: () => void): () => void {
    const id = window.setInterval(() => {
        clockNow = new Date();
        onTick();
    }, 1000);
    return () => window.clearInterval(id);
}

function getClockSnapshot(): Date | null {
    if (clockNow === null) {
        clockNow = new Date();
    }
    return clockNow;
}

function getClockServerSnapshot(): Date | null {
    return null;
}

const ROUND_BUTTON =
    "grid cursor-pointer place-items-center rounded-full border border-wii-line bg-wii-white text-wii-blue-deep shadow-wii-sm transition hover:shadow-wii-glow active:scale-95 disabled:pointer-events-none disabled:opacity-35";

export default function BottomBar({ active, onHome, onStep }: BottomBarProps) {
    const { enabled, toggle } = useSound();
    const now = useSyncExternalStore(
        subscribeClock,
        getClockSnapshot,
        getClockServerSnapshot
    );

    return (
        <footer className="fixed inset-x-0 bottom-0 z-40 h-(--wii-bar-height)">
            <div className="relative flex h-full items-center rounded-t-[22px] border-t border-wii-line bg-linear-to-b from-white to-wii-bg px-3 shadow-[0_-8px_28px_rgba(60,90,120,0.14)] sm:px-6">
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[22px] bg-linear-to-b from-white to-transparent"
                />
                <div className="relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <div className="justify-self-start">
                        <button
                            type="button"
                            aria-label="Home — Wii Menu"
                            onClick={onHome}
                            className={`${ROUND_BUTTON} h-12 w-12 sm:h-14 sm:w-14`}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-8 w-8 text-wii-blue sm:h-9 sm:w-9"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    opacity="0.35"
                                />
                                <text
                                    x="12"
                                    y="15.8"
                                    textAnchor="middle"
                                    fontSize="9.5"
                                    fontWeight="600"
                                    fill="currentColor"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        letterSpacing: "0.04em"
                                    }}
                                >
                                    CA
                                </text>
                            </svg>
                        </button>
                    </div>

                    <div className="text-center font-display text-wii-text/60 select-none">
                        {now ? (
                            <>
                                <div className="text-xl leading-none font-medium tabular-nums sm:text-2xl">
                                    {now.getHours() % 12 || 12}
                                    <span
                                        className={
                                            now.getSeconds() % 2 === 0
                                                ? "opacity-100"
                                                : "opacity-20"
                                        }
                                    >
                                        :
                                    </span>
                                    {String(now.getMinutes()).padStart(2, "0")}
                                </div>
                                <div className="mt-0.5 text-[10px] tracking-[0.12em] sm:text-xs">
                                    {WEEKDAYS[now.getDay()]}{" "}
                                    {now.getMonth() + 1}/{now.getDate()}
                                </div>
                            </>
                        ) : (
                            <div
                                className="h-9 w-16 sm:h-10"
                                aria-hidden="true"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 justify-self-end sm:gap-3">
                        <button
                            type="button"
                            aria-label="Previous channel"
                            disabled={active === null}
                            onClick={() => onStep(-1)}
                            className={`${ROUND_BUTTON} h-11 w-11`}
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next channel"
                            disabled={active === null}
                            onClick={() => onStep(1)}
                            className={`${ROUND_BUTTON} h-11 w-11`}
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Toggle sounds"
                            aria-pressed={enabled}
                            onClick={toggle}
                            className={`${ROUND_BUTTON} h-11 w-11`}
                        >
                            {enabled ? (
                                <SpeakerOnIcon className="h-5 w-5" />
                            ) : (
                                <SpeakerOffIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
