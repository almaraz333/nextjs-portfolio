import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Channel Not Found — Colton Almaraz"
};

/*
 * Wii-styled 404 — an empty channel slot. Renders without the shell or
 * bottom bar, so it lays itself out as a self-contained centered page.
 */
export default function NotFound() {
    return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 py-16 text-center">
            <div
                aria-hidden="true"
                className="relative h-36 w-52 overflow-hidden rounded-channel border border-dashed border-wii-line bg-linear-to-b from-wii-bg-light to-wii-bg shadow-wii-sm sm:h-40 sm:w-60"
            >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/70 to-transparent" />
                <span className="absolute inset-0 grid place-items-center font-display text-3xl font-medium tracking-[0.2em] text-wii-text/30">
                    404
                </span>
            </div>

            <div className="max-w-md">
                <h1 className="font-display text-2xl font-medium tracking-wide text-wii-text sm:text-3xl">
                    This channel isn&apos;t installed.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-wii-text/70 sm:text-base">
                    The page you&apos;re looking for doesn&apos;t exist. Head
                    back to the Wii Menu to browse the channels that do.
                </p>
            </div>

            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-wii-line bg-wii-white px-7 py-3 font-display text-sm font-medium text-wii-blue-deep shadow-wii-sm transition hover:shadow-wii-glow active:scale-95"
            >
                <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-wii-blue"
                />
                Back to Wii Menu
            </Link>
        </main>
    );
}
