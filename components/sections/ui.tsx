/**
 * Shared micro-primitives for the channel section bodies — external link
 * pills and stack badge lists in the Wii Menu visual language. Content-free
 * by design: every fact lives in the section files themselves.
 */

import type { ReactNode } from "react";

export function ExternalIcon({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6.5 3.5H3.75A1.25 1.25 0 0 0 2.5 4.75v7.5a1.25 1.25 0 0 0 1.25 1.25h7.5a1.25 1.25 0 0 0 1.25-1.25V9.5" />
            <path d="M9.5 2.5h4v4" />
            <path d="M13.5 2.5 7.5 8.5" />
        </svg>
    );
}

/** Pill-shaped anchor for off-site links: new tab, safe rel, visible affordance. */
export function ExternalLink({
    href,
    children
}: {
    href: string;
    children: ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-wii-line bg-wii-white px-3.5 py-1.5 font-display text-xs font-medium tracking-wide text-wii-blue-deep shadow-wii-sm transition hover:shadow-wii-glow"
        >
            {children}
            <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    );
}

/** Small rounded badges for a technology stack. */
export function StackList({
    items,
    label
}: {
    items: string[];
    label: string;
}) {
    return (
        <ul aria-label={label} className="flex flex-wrap gap-1.5">
            {items.map(item => (
                <li
                    key={item}
                    className="rounded-full border border-wii-line bg-wii-bg-light px-2.5 py-0.5 font-display text-[11px] leading-5 font-medium tracking-wide text-wii-text/80"
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
