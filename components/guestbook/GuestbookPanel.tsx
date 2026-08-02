"use client";

/**
 * Guestbook widget — a chunky Wii-era guestbook page backed by /api/guestbook.
 * Optimistic submits with rollback, honeypot anti-spam, aria-live feedback.
 */

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { GuestbookEntry } from "@/lib/server/store";

// Fixed locale + UTC so the string is deterministic across server/client
// and browsers — no hydration surprises. Renders like "Aug 2, 2026".
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
});

function formatDate(iso: string): string {
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? "" : dateFormatter.format(parsed);
}

async function fetchEntries(): Promise<GuestbookEntry[]> {
    const res = await fetch("/api/guestbook");
    if (!res.ok) {
        throw new Error(`GET /api/guestbook responded ${res.status}`);
    }
    const data = (await res.json()) as { entries?: GuestbookEntry[] };
    if (!Array.isArray(data.entries)) {
        throw new Error("Malformed guestbook response");
    }
    return data.entries;
}

type LoadState = "loading" | "error" | "ready";

interface Flash {
    kind: "success" | "error";
    text: string;
}

const SPIRAL_DOTS = [0, 1, 2, 3, 4, 5, 6, 7];
const SKELETON_ROWS = [0, 1, 2];

const fieldClasses =
    "w-full rounded-xl border border-wii-line bg-wii-white px-3 py-2 font-body text-wii-text placeholder:text-wii-text/40 outline-none transition focus-visible:ring-2 focus-visible:ring-wii-blue";

export default function GuestbookPanel() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [loadState, setLoadState] = useState<LoadState>("loading");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState(""); // honeypot — humans never see it
    const [pending, setPending] = useState(false);
    const [flash, setFlash] = useState<Flash | null>(null);

    // reloadToken is a pure refetch trigger: the retry button bumps it (and
    // resets loadState) from an event handler, so the effect below only ever
    // sets state from async promise callbacks.
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        let cancelled = false;
        fetchEntries()
            .then(list => {
                if (!cancelled) {
                    setEntries(list);
                    setLoadState("ready");
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setLoadState("error");
                }
            });
        return () => {
            cancelled = true;
        };
    }, [reloadToken]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (pending) {
            return;
        }

        const trimmedName = name.trim();
        const trimmedMessage = message.trim();
        if (trimmedName === "" || trimmedMessage === "") {
            setFlash({
                kind: "error",
                text: "A name and a message are both needed."
            });
            return;
        }

        // Optimistic entry with a temporary (negative) id, reconciled below.
        const optimistic: GuestbookEntry = {
            id: -Date.now(),
            name: trimmedName,
            message: trimmedMessage,
            createdAt: new Date().toISOString()
        };

        setPending(true);
        setFlash(null);
        setEntries(previous => [optimistic, ...previous]);

        try {
            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    message: trimmedMessage,
                    website
                })
            });
            const data = (await res.json().catch(() => null)) as {
                entry?: GuestbookEntry;
                error?: string;
            } | null;
            const saved = res.ok ? data?.entry : undefined;

            if (!saved) {
                setEntries(previous =>
                    previous.filter(item => item.id !== optimistic.id)
                );
                setFlash({
                    kind: "error",
                    text:
                        res.status === 429
                            ? "Whoa — take a breather and try again in a bit."
                            : (data?.error ??
                              "Could not save your entry. Please try again.")
                });
                return;
            }

            setEntries(previous =>
                previous.map(item => (item.id === optimistic.id ? saved : item))
            );
            setFlash({ kind: "success", text: "Thanks for signing!" });
            setName("");
            setMessage("");
            setWebsite("");
        } catch {
            setEntries(previous =>
                previous.filter(item => item.id !== optimistic.id)
            );
            setFlash({
                kind: "error",
                text: "Network hiccup — your entry was not saved. Please try again."
            });
        } finally {
            setPending(false);
        }
    }

    return (
        <section className="rounded-channel border border-wii-line bg-wii-bg p-5 shadow-wii sm:p-6">
            {/* Spiral binding — a nod to a chunky paper guestbook. */}
            <div
                aria-hidden="true"
                className="mb-4 flex justify-center gap-2 border-b border-dashed border-wii-line pb-3"
            >
                {SPIRAL_DOTS.map(dot => (
                    <span
                        key={dot}
                        className="h-2 w-2 rounded-full bg-wii-blue-soft shadow-inner"
                    />
                ))}
            </div>

            <header className="mb-4 text-center">
                <h2 className="font-display text-2xl text-wii-blue-deep">
                    Guestbook
                </h2>
                <p className="mt-1 font-body text-sm text-wii-text/70">
                    Leave a note — every entry is stored for real.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mb-5 space-y-3">
                <div>
                    <label
                        htmlFor="guestbook-name"
                        className="mb-1 block font-display text-sm text-wii-text"
                    >
                        Name
                    </label>
                    <input
                        id="guestbook-name"
                        name="name"
                        type="text"
                        required
                        maxLength={40}
                        placeholder="Your name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className={fieldClasses}
                    />
                </div>

                <div>
                    <div className="mb-1 flex items-baseline justify-between">
                        <label
                            htmlFor="guestbook-message"
                            className="font-display text-sm text-wii-text"
                        >
                            Message
                        </label>
                        <span
                            className="font-body text-xs text-wii-text/60"
                            aria-hidden="true"
                        >
                            {message.length}/500
                        </span>
                    </div>
                    <textarea
                        id="guestbook-message"
                        name="message"
                        required
                        maxLength={500}
                        rows={3}
                        placeholder="Say hi — channel your inner 2006"
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        className={`${fieldClasses} resize-y`}
                    />
                </div>

                {/*
                 * Honeypot: bots autofill the "website" field; humans never see
                 * it (offscreen, aria-hidden, untabbable). The server swallows
                 * any submission that fills it.
                 */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[9999px] -left-[9999px] h-px w-px overflow-hidden"
                >
                    <label htmlFor="guestbook-website">Website</label>
                    <input
                        id="guestbook-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={event => setWebsite(event.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="rounded-full bg-wii-blue px-6 py-2 font-display text-wii-white shadow-wii-sm transition hover:bg-wii-blue-deep hover:shadow-wii-glow focus-visible:ring-2 focus-visible:ring-wii-blue-deep focus-visible:ring-offset-2 focus-visible:ring-offset-wii-bg focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {pending ? "Signing…" : "Sign the guestbook"}
                </button>

                {/* Live region: success + error feedback for screen readers too. */}
                <p
                    role="status"
                    aria-live="polite"
                    className={`min-h-[1.25rem] font-body text-sm ${
                        flash?.kind === "error"
                            ? "text-rose-600"
                            : "text-wii-blue-deep"
                    }`}
                >
                    {flash ? flash.text : ""}
                </p>
            </form>

            {loadState === "loading" && (
                <ul className="space-y-3" aria-hidden="true">
                    {SKELETON_ROWS.map(row => (
                        <li
                            key={row}
                            className="h-16 animate-pulse rounded-channel bg-wii-blue-soft/40"
                        />
                    ))}
                </ul>
            )}

            {loadState === "error" && (
                <div className="rounded-channel border border-wii-line bg-wii-white p-4 text-center shadow-wii-sm">
                    <p className="font-body text-sm text-wii-text">
                        The guestbook did not load.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setLoadState("loading");
                            setReloadToken(token => token + 1);
                        }}
                        className="mt-2 rounded-full border border-wii-line bg-wii-white px-4 py-1.5 font-display text-sm text-wii-blue-deep transition hover:shadow-wii-sm focus-visible:ring-2 focus-visible:ring-wii-blue focus-visible:outline-none"
                    >
                        Try again
                    </button>
                </div>
            )}

            {loadState === "ready" && entries.length === 0 && (
                <p className="rounded-channel border border-dashed border-wii-line bg-wii-white p-6 text-center font-body text-sm text-wii-text/70">
                    Nobody has signed yet — be the first!
                </p>
            )}

            {loadState === "ready" && entries.length > 0 && (
                <ul className="space-y-3">
                    {entries.map(entry => (
                        <li
                            key={entry.id}
                            className="rounded-channel border border-wii-line bg-wii-white p-4 shadow-wii-sm"
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <span className="font-display text-wii-blue-deep">
                                    {entry.name}
                                </span>
                                <time
                                    dateTime={entry.createdAt}
                                    className="font-body text-xs text-wii-text/60"
                                >
                                    {formatDate(entry.createdAt)}
                                </time>
                            </div>
                            <p className="mt-1 font-body text-sm break-words text-wii-text">
                                {entry.message}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
