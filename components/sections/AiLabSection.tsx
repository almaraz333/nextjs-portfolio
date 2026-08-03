/**
 * AI Lab Channel — an honest, static explainer of the AI tooling from
 * cv.md (“AI Tooling”: Cursor, Claude Code, self-hosted LLM via llama.cpp).
 * These are tools Colton uses — never worded as tools he built. No live
 * demo and no API calls, deliberately.
 */

function CursorGlyph({ className }: { className?: string }) {
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
            <path d="M5.5 3.5 12.2 19.5l1.9-5.9 5.9-1.9Z" />
        </svg>
    );
}

function TerminalGlyph({ className }: { className?: string }) {
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
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <path d="m7 9.5 3 3-3 3" />
            <path d="M12.5 15.5H17" />
        </svg>
    );
}

function ChipGlyph({ className }: { className?: string }) {
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
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M9.5 2.5v3M14.5 2.5v3M9.5 18.5v3M14.5 18.5v3" />
            <path d="M2.5 9.5h3M2.5 14.5h3M18.5 9.5h3M18.5 14.5h3" />
        </svg>
    );
}

interface Tool {
    name: string;
    what: string;
    how: string;
    Glyph: (props: { className?: string }) => React.JSX.Element;
}

const TOOLS: Tool[] = [
    {
        name: "Cursor",
        what: "AI-powered code editor",
        how: "Agent and sub-agent workflows — delegating scoped tasks and reviewing what comes back.",
        Glyph: CursorGlyph
    },
    {
        name: "Claude Code",
        what: "Agentic coding in the terminal",
        how: "Part of the daily loop for working through real codebases from the command line.",
        Glyph: TerminalGlyph
    },
    {
        name: "Local LLM via llama.cpp",
        what: "Self-hosted model, own hardware",
        how: "Inference that runs entirely on my own machine — no cloud required.",
        Glyph: ChipGlyph
    }
];

export default function AiLabSection() {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
            <section className="rounded-channel border border-wii-line bg-linear-to-b from-white to-wii-bg-light p-6 shadow-wii-sm sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-wii-blue-soft bg-wii-blue-soft/30 px-3 py-1 font-display text-[11px] font-medium tracking-[0.18em] text-wii-blue-deep uppercase">
                    <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-wii-blue"
                    />
                    Beta Channel
                </span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-wide text-wii-text sm:text-2xl">
                    Tools I use daily
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-wii-text/80 sm:text-base">
                    AI tooling is part of my everyday workflow. Here is the
                    actual kit.{" "}
                    <em className="text-wii-text/60">
                        These are tools I use, not tools I built.
                    </em>
                </p>
            </section>

            <section aria-label="AI tools">
                <ul className="grid list-none gap-4 sm:grid-cols-3">
                    {TOOLS.map(tool => (
                        <li
                            key={tool.name}
                            className="flex flex-col gap-3 rounded-channel border border-wii-line bg-wii-white p-5 shadow-wii-sm transition hover:shadow-wii"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-full border border-wii-line bg-wii-bg-light text-wii-blue-deep">
                                <tool.Glyph className="h-5 w-5" />
                            </span>
                            <div>
                                <h4 className="font-display text-base font-medium tracking-wide text-wii-text">
                                    {tool.name}
                                </h4>
                                <p className="mt-0.5 font-display text-xs font-medium text-wii-blue-deep">
                                    {tool.what}
                                </p>
                            </div>
                            <p className="text-sm leading-relaxed text-wii-text/80">
                                {tool.how}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="rounded-channel border border-wii-line bg-wii-white p-6 shadow-wii-sm sm:p-8">
                <h4 className="font-display text-base font-medium tracking-wide text-wii-text">
                    How this fits my engineering loop
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-wii-text/80 sm:text-base">
                    Agents draft; I review. AI output goes through the same
                    discipline as any other code I ship — code review, CI/CD,
                    and a human who owns the result.
                </p>
                <p className="mt-4 border-t border-dashed border-wii-line pt-3 text-xs text-wii-text/55">
                    This channel is deliberately a static page — no live demo,
                    no API calls, no surprise bills.
                </p>
            </section>
        </div>
    );
}
