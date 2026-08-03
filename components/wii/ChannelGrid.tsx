"use client";

import { useEffect, useRef, useState } from "react";

import ChannelTile from "@/components/wii/ChannelTile";
import { CHANNELS, type ChannelSlug } from "@/lib/channels";

interface ChannelGridProps {
    onOpen: (slug: ChannelSlug) => void;
    registerTile: (slug: ChannelSlug, el: HTMLButtonElement | null) => void;
}

export default function ChannelGrid({
    onOpen,
    registerTile
}: ChannelGridProps) {
    // Roving tabindex: the grid is a single tab stop; arrows move within it.
    const [focusIndex, setFocusIndex] = useState(0);
    const [isWide, setIsWide] = useState(false);
    const tileEls = useRef<Array<HTMLButtonElement | null>>([]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsWide(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }
        const cols = isWide ? 4 : 2;
        const last = CHANNELS.length - 1;
        let next: number | null = null;
        switch (event.key) {
            case "ArrowRight":
                next = Math.min(focusIndex + 1, last);
                break;
            case "ArrowLeft":
                next = Math.max(focusIndex - 1, 0);
                break;
            case "ArrowDown":
                next = focusIndex + cols <= last ? focusIndex + cols : null;
                break;
            case "ArrowUp":
                next = focusIndex - cols >= 0 ? focusIndex - cols : null;
                break;
            case "Home":
                next = 0;
                break;
            case "End":
                next = last;
                break;
            default:
                return;
        }
        event.preventDefault();
        if (next !== null && next !== focusIndex) {
            setFocusIndex(next);
            tileEls.current[next]?.focus();
        }
    };

    return (
        <div
            role="group"
            aria-label="Channels"
            onKeyDown={handleKeyDown}
            className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
            {CHANNELS.map((channel, index) => (
                <ChannelTile
                    key={channel.slug}
                    channel={channel}
                    index={index}
                    isTabStop={index === focusIndex}
                    onOpen={() => onOpen(channel.slug)}
                    onTileFocus={() => setFocusIndex(index)}
                    tileRef={el => {
                        tileEls.current[index] = el;
                        registerTile(channel.slug, el);
                    }}
                />
            ))}
        </div>
    );
}
