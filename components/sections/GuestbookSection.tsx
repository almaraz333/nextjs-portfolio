import GuestbookPanel from "@/components/guestbook/GuestbookPanel";

/**
 * Guestbook Channel — a one-line nostalgic intro, then the self-contained
 * GuestbookPanel (form + entries + states). Wrapper stays minimal so the
 * panel breathes.
 */
export default function GuestbookSection() {
    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
            <p className="text-center text-sm text-wii-text/70 sm:text-base">
                A real guestbook, like it&rsquo;s 2006 — entries live in a real
                database.
            </p>
            <GuestbookPanel />
        </div>
    );
}
