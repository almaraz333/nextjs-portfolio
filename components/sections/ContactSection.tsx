import { ExternalIcon } from "./ui";

/**
 * Contact Channel — email, LinkedIn, GitHub, and the résumé download.
 * Addresses, links, location, and status all come from cv.md Basics.
 * Glyphs are hand-drawn inline SVGs (aria-hidden), no icon libraries.
 */

function MailGlyph({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
            <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
        </svg>
    );
}

function LinkedInGlyph({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle
                cx="6.4"
                cy="6.2"
                r="1.7"
                fill="currentColor"
                stroke="none"
            />
            <path d="M6.4 10.2V18" />
            <path d="M11.3 18v-7.8" />
            <path d="M11.3 13.6c0-1.9 1.5-3.4 3.3-3.4 1.8 0 3 1.3 3 3.2V18" />
        </svg>
    );
}

function GitHubGlyph({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="6.5" cy="5.5" r="2.1" />
            <circle cx="6.5" cy="18.5" r="2.1" />
            <circle cx="17.5" cy="7.5" r="2.1" />
            <path d="M6.5 7.6v8.8" />
            <path d="M17.5 9.6c0 2.5-2 4.5-4.5 4.5h-6.5" />
        </svg>
    );
}

function DownloadGlyph({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 4v10" />
            <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
            <path d="M5 19h14" />
        </svg>
    );
}

const rowClasses =
    "flex items-center gap-3.5 rounded-2xl border border-wii-line bg-wii-white p-3.5 shadow-wii-sm transition hover:shadow-wii-glow sm:p-4";

const glyphWrapClasses =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-wii-line bg-wii-bg-light text-wii-blue-deep";

export default function ContactSection() {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 sm:gap-6">
            <section className="rounded-channel border border-wii-line bg-linear-to-b from-white to-wii-bg-light p-6 shadow-wii-sm sm:p-8">
                <h3 className="font-display text-xl font-medium tracking-wide text-wii-text sm:text-2xl">
                    Let&rsquo;s talk
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wii-text/80 sm:text-base">
                    Want to build something together, or talk shop about a
                    senior full-stack role? Any of these works.
                </p>

                <ul className="mt-5 flex list-none flex-col gap-3">
                    <li>
                        <a
                            href="mailto:almarazcolton333@gmail.com"
                            className={rowClasses}
                        >
                            <span className={glyphWrapClasses}>
                                <MailGlyph className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block font-display text-sm font-medium tracking-wide text-wii-text">
                                    Email
                                </span>
                                <span className="block truncate text-sm text-wii-blue-deep">
                                    almarazcolton333@gmail.com
                                </span>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://linkedin.com/in/coltonalmaraz"
                            target="_blank"
                            rel="noreferrer noopener"
                            className={rowClasses}
                        >
                            <span className={glyphWrapClasses}>
                                <LinkedInGlyph className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block font-display text-sm font-medium tracking-wide text-wii-text">
                                    LinkedIn
                                </span>
                                <span className="block truncate text-sm text-wii-blue-deep">
                                    linkedin.com/in/coltonalmaraz
                                </span>
                            </span>
                            <ExternalIcon className="ml-auto h-4 w-4 shrink-0 text-wii-text/50" />
                            <span className="sr-only">
                                (opens in a new tab)
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/almaraz333"
                            target="_blank"
                            rel="noreferrer noopener"
                            className={rowClasses}
                        >
                            <span className={glyphWrapClasses}>
                                <GitHubGlyph className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block font-display text-sm font-medium tracking-wide text-wii-text">
                                    GitHub
                                </span>
                                <span className="block truncate text-sm text-wii-blue-deep">
                                    github.com/almaraz333
                                </span>
                            </span>
                            <ExternalIcon className="ml-auto h-4 w-4 shrink-0 text-wii-text/50" />
                            <span className="sr-only">
                                (opens in a new tab)
                            </span>
                        </a>
                    </li>
                </ul>
            </section>

            <section className="flex flex-col items-center gap-3 rounded-channel border border-wii-line bg-wii-white p-6 text-center shadow-wii-sm sm:p-8">
                <a
                    href="/docs/AlmarazColton_Resume.pdf"
                    download
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-wii-blue-deep px-7 font-display text-base font-medium tracking-wide text-white shadow-wii transition hover:shadow-wii-glow"
                >
                    <DownloadGlyph className="h-5 w-5" />
                    Download Résumé (PDF)
                </a>
                <p className="text-sm text-wii-text/70">
                    Vancouver, WA (Pacific Time) · Open to senior full-stack
                    roles
                </p>
            </section>
        </div>
    );
}
