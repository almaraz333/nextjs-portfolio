"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import VisitorCounter from "@/components/visitor-counter/VisitorCounter";
import BottomBar from "@/components/wii/BottomBar";
import ChannelGrid from "@/components/wii/ChannelGrid";
import ChannelView from "@/components/wii/ChannelView";
import { useSound } from "@/components/wii/SoundProvider";
import {
    CHANNELS,
    getChannel,
    isChannelSlug,
    SITE_TITLE,
    type ChannelSlug
} from "@/lib/channels";

interface WiiShellProps {
    /** Set by /c/[slug] deep links — renders that channel open on first paint. */
    initialSlug?: ChannelSlug;
}

export default function WiiShell({ initialSlug }: WiiShellProps) {
    const [active, setActive] = useState<ChannelSlug | null>(
        initialSlug ?? null
    );
    const activeRef = useRef<ChannelSlug | null>(initialSlug ?? null);
    const returnFocusRef = useRef<ChannelSlug | null>(null);
    const tileRefs = useRef<Map<ChannelSlug, HTMLButtonElement>>(new Map());
    const { play } = useSound();

    // Keep the tab title in sync with pushState/replaceState navigation.
    useEffect(() => {
        document.title = active
            ? `${getChannel(active).title} — Colton Almaraz`
            : SITE_TITLE;
    }, [active]);

    // Lock background scroll while a channel is open.
    useEffect(() => {
        if (!active) {
            return undefined;
        }
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [active]);

    // Browser Back/Forward drive the UI (no server round-trips).
    useEffect(() => {
        const handlePop = () => {
            const match = window.location.pathname.match(/^\/c\/([^/]+)\/?$/);
            const slug = match?.[1];
            if (slug !== undefined && isChannelSlug(slug)) {
                activeRef.current = slug;
                setActive(slug);
            } else {
                if (activeRef.current !== null) {
                    returnFocusRef.current = activeRef.current;
                }
                activeRef.current = null;
                setActive(null);
            }
        };
        window.addEventListener("popstate", handlePop);
        return () => window.removeEventListener("popstate", handlePop);
    }, []);

    const openChannel = useCallback(
        (slug: ChannelSlug) => {
            play("select");
            activeRef.current = slug;
            setActive(slug);
            window.history.pushState(null, "", `/c/${slug}`);
        },
        [play]
    );

    const closeChannel = useCallback(() => {
        const current = activeRef.current;
        if (current === null) {
            return;
        }
        play("back");
        returnFocusRef.current = current;
        activeRef.current = null;
        setActive(null);
        window.history.pushState(null, "", "/");
    }, [play]);

    const stepChannel = useCallback(
        (direction: 1 | -1) => {
            const current = activeRef.current;
            if (current === null) {
                return;
            }
            const index = CHANNELS.findIndex(
                channel => channel.slug === current
            );
            const next =
                CHANNELS[
                    (index + direction + CHANNELS.length) % CHANNELS.length
                ].slug;
            play("select");
            activeRef.current = next;
            setActive(next);
            window.history.replaceState(null, "", `/c/${next}`);
        },
        [play]
    );

    const registerTile = useCallback(
        (slug: ChannelSlug, el: HTMLButtonElement | null) => {
            if (el) {
                tileRefs.current.set(slug, el);
            } else {
                tileRefs.current.delete(slug);
            }
        },
        []
    );

    // After the reverse zoom finishes, hand focus back to the origin tile.
    const handleExitComplete = useCallback(() => {
        if (activeRef.current !== null) {
            return;
        }
        const slug = returnFocusRef.current;
        if (slug) {
            tileRefs.current.get(slug)?.focus({ preventScroll: true });
        }
    }, []);

    const activeChannel = active ? getChannel(active) : null;

    return (
        <>
            <main className="relative">
                <motion.div
                    inert={active !== null}
                    initial={false}
                    animate={{ opacity: active ? 0.3 : 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mx-auto w-full max-w-5xl px-4 pt-8 pb-[calc(var(--wii-bar-height)+3rem)] sm:px-6 sm:pt-12"
                >
                    <header className="mb-6 flex justify-center sm:mb-10">
                        <h1 className="flex items-center gap-2.5 font-display text-sm font-medium tracking-[0.28em] text-wii-text/70 uppercase sm:text-base">
                            <span
                                className="h-2.5 w-2.5 rounded-full bg-wii-blue"
                                aria-hidden="true"
                            />
                            The Colton Channel
                        </h1>
                    </header>

                    <ChannelGrid
                        onOpen={openChannel}
                        registerTile={registerTile}
                    />

                    <div className="mt-8 flex justify-center sm:mt-10">
                        <VisitorCounter />
                    </div>
                </motion.div>

                <AnimatePresence
                    initial={false}
                    onExitComplete={handleExitComplete}
                >
                    {activeChannel && (
                        <ChannelView
                            key={activeChannel.slug}
                            channel={activeChannel}
                            onClose={closeChannel}
                        />
                    )}
                </AnimatePresence>
            </main>

            <BottomBar
                active={active}
                onHome={closeChannel}
                onStep={stepChannel}
            />
        </>
    );
}
