/**
 * Shared storage contract for the site's real backend features
 * (guestbook + visitor counter).
 *
 * Two interchangeable implementations exist behind this interface:
 * - SqliteStore: zero-setup local/self-host backend (./.data/site.db)
 * - PostgresStore: production backend (Vercel + Neon/Supabase/any Postgres)
 *
 * lib/server/db.ts picks one based on the environment.
 */

export interface GuestbookEntry {
    id: number;
    name: string;
    message: string;
    /** ISO 8601 timestamp. */
    createdAt: string;
}

export interface SiteStore {
    /** Latest entries, newest first. */
    listGuestbook(limit: number): Promise<GuestbookEntry[]>;
    addGuestbookEntry(input: {
        name: string;
        message: string;
        ipHash: string;
    }): Promise<GuestbookEntry>;
    /** Atomically increment the visit counter and return the new total. */
    recordVisit(): Promise<number>;
    getVisitCount(): Promise<number>;
}

/** Thrown when no usable database backend is available in this environment. */
export class StoreUnavailableError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StoreUnavailableError";
    }
}
