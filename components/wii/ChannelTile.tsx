"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CHANNEL_ICONS } from "@/components/wii/icons";
import { useSound } from "@/components/wii/SoundProvider";
import type { Channel, ChannelSlug } from "@/lib/channels";

interface ChannelTileProps {
    channel: Channel;
    index: number;
    /** Roving tabindex — exactly one tile in the grid is the tab stop. */
    isTabStop: boolean;
    onOpen: () => void;
    onTileFocus: () => void;
    tileRef: (el: HTMLButtonElement | null) => void;
}

/** Tiles with a soft blue-tinted face, for Wii-menu variety. */
const TINTED: ReadonlySet<ChannelSlug> = new Set(["disc", "ai-lab", "contact"]);

const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

export default function ChannelTile({
    channel,
    index,
    isTabStop,
    onOpen,
    onTileFocus,
    tileRef
}: ChannelTileProps) {
    const reduced = Boolean(useReducedMotion());
    const { play } = useSound();
    const Icon = CHANNEL_ICONS[channel.slug];

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        onTileFocus();
        if (event.currentTarget.matches(":focus-visible")) {
            play("hover");
        }
    };

    return (
        <motion.button
            ref={tileRef}
            type="button"
            layoutId={reduced ? undefined : `channel-${channel.slug}`}
            style={{ borderRadius: 18 }}
            transition={SPRING}
            whileHover={reduced ? undefined : { scale: 1.05 }}
            whileTap={reduced ? undefined : { scale: 0.94 }}
            onHoverStart={() => play("hover")}
            onClick={onOpen}
            onFocus={handleFocus}
            tabIndex={isTabStop ? 0 : -1}
            aria-label={`${channel.label}: ${channel.title}`}
            title={channel.blurb}
            className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-channel border border-wii-line bg-wii-white shadow-wii-sm transition-shadow duration-200 select-none hover:shadow-wii-glow focus-visible:shadow-wii-glow"
        >
            <motion.span
                className="absolute inset-0 flex flex-col"
                animate={reduced ? undefined : { scale: [1, 1.01, 1] }}
                transition={
                    reduced
                        ? undefined
                        : {
                              duration: 6,
                              ease: "easeInOut",
                              repeat: Infinity,
                              delay: index * 0.45
                          }
                }
            >
                {TINTED.has(channel.slug) && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-wii-blue-soft/15 to-wii-blue-soft/45"
                    />
                )}
                <span className="relative flex flex-1 items-center justify-center">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                </span>
                <span className="relative truncate border-t border-wii-line/70 bg-white/75 px-2 pt-1 pb-1.5 text-center font-display text-[10px] font-medium tracking-[0.08em] text-wii-text sm:text-xs">
                    {channel.label}
                </span>
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/80 via-white/30 to-transparent"
                />
            </motion.span>
        </motion.button>
    );
}
