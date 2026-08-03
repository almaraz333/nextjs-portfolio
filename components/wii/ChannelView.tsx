"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ComponentType } from "react";

import { getSection } from "@/components/sections/registry";
import { CHANNEL_ICONS, MenuGlyphIcon } from "@/components/wii/icons";
import { CHANNELS, type Channel, type ChannelSlug } from "@/lib/channels";

interface ChannelViewProps {
    channel: Channel;
    onClose: () => void;
}

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

// Resolved once at module scope so the component identity is static across
// renders (the registry's getSection(slug) stays the single public API).
const SECTION_COMPONENTS = Object.fromEntries(
    CHANNELS.map(channel => [channel.slug, getSection(channel.slug)])
) as Record<ChannelSlug, ComponentType>;

export default function ChannelView({ channel, onClose }: ChannelViewProps) {
    const reduced = Boolean(useReducedMotion());
    const panelRef = useRef<HTMLDivElement>(null);
    const Icon = CHANNEL_ICONS[channel.slug];
    const Section = SECTION_COMPONENTS[channel.slug];

    // Move focus into the dialog on open.
    useEffect(() => {
        panelRef.current?.focus({ preventScroll: true });
    }, []);

    // Escape closes (reverse zoom + "back" blip via onClose).
    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <div className="fixed inset-x-0 top-0 bottom-(--wii-bar-height) z-30 flex p-3 sm:p-5">
            <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={channel.title}
                tabIndex={-1}
                layoutId={reduced ? undefined : `channel-${channel.slug}`}
                style={{ borderRadius: 18 }}
                transition={reduced ? { duration: 0.15 } : SPRING}
                initial={reduced ? { opacity: 0 } : undefined}
                animate={reduced ? { opacity: 1 } : undefined}
                exit={reduced ? { opacity: 0 } : undefined}
                className="relative flex min-h-0 w-full flex-col overflow-hidden border border-wii-line bg-wii-white shadow-wii outline-none"
            >
                <div className="relative flex items-center gap-3 border-b border-wii-line bg-linear-to-b from-white to-wii-bg-light px-4 py-3 sm:px-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-wii-line bg-wii-white shadow-wii-sm sm:h-12 sm:w-12">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <h2 className="min-w-0 truncate font-display text-lg font-medium tracking-wide text-wii-text sm:text-2xl">
                        {channel.title}
                    </h2>
                    <span className="ml-auto hidden font-display text-xs tracking-[0.18em] text-wii-text/50 uppercase sm:block">
                        {channel.label}
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={
                        reduced
                            ? { duration: 0.15 }
                            : { delay: 0.16, duration: 0.3, ease: "easeOut" }
                    }
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7"
                >
                    <Section />
                </motion.div>

                <div className="flex items-center justify-between gap-3 border-t border-wii-line/80 bg-white/80 px-4 py-3 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-wii-line bg-wii-white px-5 font-display text-sm font-medium tracking-wide text-wii-blue-deep shadow-wii-sm transition hover:shadow-wii-glow"
                    >
                        <MenuGlyphIcon className="h-4 w-4" />
                        Wii Menu
                    </button>
                    <p className="hidden truncate text-xs text-wii-text/60 sm:block">
                        {channel.blurb}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
