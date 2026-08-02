import type { ComponentType } from "react";

import type { ChannelSlug } from "@/lib/channels";

/**
 * Wii-flavored channel icons — simple shapes on the wii palette.
 * All icons are decorative (aria-hidden) and accept a className for sizing.
 */

export interface IconProps {
    className?: string;
}

const BLUE = "var(--color-wii-blue)";
const BLUE_SOFT = "var(--color-wii-blue-soft)";
const BLUE_DEEP = "var(--color-wii-blue-deep)";
const LINE = "var(--color-wii-line)";
const WHITE = "var(--color-wii-white)";
const BG = "var(--color-wii-bg)";

function svgProps(className?: string) {
    return {
        viewBox: "0 0 48 48",
        fill: "none",
        className,
        "aria-hidden": true,
        focusable: false
    } as const;
}

export function MiiIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <path
                d="M10 40c0-8.3 6.3-14 14-14s14 5.7 14 14z"
                fill={BLUE_SOFT}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
            <circle
                cx="24"
                cy="16.5"
                r="8.5"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <circle cx="21" cy="16" r="1.4" fill={BLUE_DEEP} />
            <circle cx="27" cy="16" r="1.4" fill={BLUE_DEEP} />
        </svg>
    );
}

export function DiscIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <circle
                cx="24"
                cy="24"
                r="16.5"
                fill={WHITE}
                stroke={LINE}
                strokeWidth="2.5"
            />
            <path
                d="M10.5 16a16 16 0 0 1 9-7.2"
                stroke={BLUE_SOFT}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <circle
                cx="24"
                cy="24"
                r="5.5"
                fill={BG}
                stroke={LINE}
                strokeWidth="2"
            />
            <circle cx="24" cy="24" r="1.8" fill={LINE} />
        </svg>
    );
}

export function ProjectsIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <rect
                x="8"
                y="8"
                width="14"
                height="14"
                rx="4"
                fill={BLUE_SOFT}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <rect
                x="26"
                y="8"
                width="14"
                height="14"
                rx="4"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <rect
                x="8"
                y="26"
                width="14"
                height="14"
                rx="4"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <rect
                x="26"
                y="26"
                width="14"
                height="14"
                rx="4"
                fill={BLUE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
        </svg>
    );
}

export function ExperienceIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <path
                d="M19 14v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3"
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <rect
                x="7"
                y="14"
                width="34"
                height="24"
                rx="5"
                fill={BLUE_SOFT}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <path d="M7 25h34" stroke={BLUE_DEEP} strokeWidth="2.5" />
            <rect
                x="20.5"
                y="22"
                width="7"
                height="6.5"
                rx="1.8"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
        </svg>
    );
}

export function SkillsIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <rect x="21" y="6" width="6" height="36" rx="3" fill={BLUE} />
            <rect
                x="21"
                y="6"
                width="6"
                height="36"
                rx="3"
                fill={BLUE}
                transform="rotate(45 24 24)"
            />
            <rect
                x="21"
                y="6"
                width="6"
                height="36"
                rx="3"
                fill={BLUE}
                transform="rotate(90 24 24)"
            />
            <rect
                x="21"
                y="6"
                width="6"
                height="36"
                rx="3"
                fill={BLUE}
                transform="rotate(135 24 24)"
            />
            <circle cx="24" cy="24" r="11" fill={BLUE} />
            <circle
                cx="24"
                cy="24"
                r="4.5"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2"
            />
        </svg>
    );
}

export function AiLabIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <path
                d="M21 8 24.4 20.6 37 24l-12.6 3.4L21 40l-3.4-12.6L5 24l12.6-3.4z"
                fill={BLUE}
                stroke={BLUE}
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="m37 7 1.5 4.5L43 13l-4.5 1.5L37 19l-1.5-4.5L31 13l4.5-1.5z"
                fill={BLUE_SOFT}
                stroke={BLUE_SOFT}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function GuestbookIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <rect
                x="7"
                y="9"
                width="24"
                height="30"
                rx="4"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <path d="M13 9v30" stroke={LINE} strokeWidth="2" />
            <path
                d="M18 18h8M18 24h8"
                stroke={BLUE_SOFT}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                d="M29 31 39 21"
                stroke={BLUE}
                strokeWidth="6"
                strokeLinecap="round"
            />
            <path d="M25.5 38.5l1.7-6.4 4.7 4.7z" fill={BLUE_DEEP} />
        </svg>
    );
}

export function ContactIcon({ className }: IconProps) {
    return (
        <svg {...svgProps(className)}>
            <rect
                x="6"
                y="11"
                width="36"
                height="26"
                rx="5"
                fill={WHITE}
                stroke={BLUE_DEEP}
                strokeWidth="2.5"
            />
            <path
                d="m9 15 15 11.5L39 15"
                stroke={BLUE}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export const CHANNEL_ICONS: Record<ChannelSlug, ComponentType<IconProps>> = {
    mii: MiiIcon,
    disc: DiscIcon,
    projects: ProjectsIcon,
    experience: ExperienceIcon,
    skills: SkillsIcon,
    "ai-lab": AiLabIcon,
    guestbook: GuestbookIcon,
    contact: ContactIcon
};

/* --- Small UI glyphs (24×24, currentColor) ------------------------------- */

function glyphProps(className?: string) {
    return {
        viewBox: "0 0 24 24",
        fill: "none",
        className,
        "aria-hidden": true,
        focusable: false
    } as const;
}

export function MenuGlyphIcon({ className }: IconProps) {
    return (
        <svg {...glyphProps(className)}>
            <rect
                x="4"
                y="4"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="13"
                y="4"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="13"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="13"
                y="13"
                width="7"
                height="7"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

export function ChevronLeftIcon({ className }: IconProps) {
    return (
        <svg {...glyphProps(className)}>
            <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ChevronRightIcon({ className }: IconProps) {
    return (
        <svg {...glyphProps(className)}>
            <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SpeakerOnIcon({ className }: IconProps) {
    return (
        <svg {...glyphProps(className)}>
            <path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor" />
            <path
                d="M16.5 8.5a5 5 0 0 1 0 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M19.5 6a9.5 9.5 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function SpeakerOffIcon({ className }: IconProps) {
    return (
        <svg {...glyphProps(className)}>
            <path d="M4 9v6h4l6 5V4L8 9H4z" fill="currentColor" />
            <path
                d="m16.5 9.5 5 5m0-5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
