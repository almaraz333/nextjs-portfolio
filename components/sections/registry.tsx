"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { ChannelSlug } from "@/lib/channels";

/**
 * Section registry — maps a channel slug to its lazily-loaded body.
 *
 * PUBLIC API (stable, other agents build against it): getSection(slug).
 * Each entry points at a real section module (default export); the
 * signature must stay exactly `getSection(slug: ChannelSlug): ComponentType`.
 */

function NowLoading() {
    return (
        <div
            role="status"
            className="flex items-center justify-center py-16 font-display text-base font-medium tracking-[0.2em] text-wii-blue-deep motion-safe:animate-pulse"
        >
            Now loading…
        </div>
    );
}

// NOTE: next/dynamic requires its options argument to be an inline object
// literal (it is statically analyzed), hence the repetition below.
const SECTIONS: Record<ChannelSlug, ComponentType> = {
    mii: dynamic(() => import("./MiiSection"), {
        loading: NowLoading
    }),
    disc: dynamic(() => import("./DiscSection"), {
        loading: NowLoading
    }),
    projects: dynamic(() => import("./ProjectsSection"), {
        loading: NowLoading
    }),
    experience: dynamic(() => import("./ExperienceSection"), {
        loading: NowLoading
    }),
    skills: dynamic(() => import("./SkillsSection"), {
        loading: NowLoading
    }),
    "ai-lab": dynamic(() => import("./AiLabSection"), {
        loading: NowLoading
    }),
    contact: dynamic(() => import("./ContactSection"), {
        loading: NowLoading
    })
};

export function getSection(slug: ChannelSlug): ComponentType {
    return SECTIONS[slug];
}
