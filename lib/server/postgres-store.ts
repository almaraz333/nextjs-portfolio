/**
 * Postgres-backed SiteStore (pg Pool).
 *
 * Production backend: point DATABASE_URL (or POSTGRES_URL) at any Postgres
 * (Neon, Supabase, RDS, ...). The schema is created lazily exactly once per
 * process, guarded by a shared promise so concurrent requests don't race.
 * Parameterized queries only — user input never touches SQL text.
 */

import { Pool } from "pg";
import type { GuestbookEntry, SiteStore } from "./store";

type GuestbookRow = {
    id: number;
    name: string;
    message: string;
    created_at: Date | string;
};

type CounterRow = {
    /** BIGINT arrives as a string from pg; visit counts fit safely in a JS number. */
    value: string | number;
};

function toEntry(row: GuestbookRow): GuestbookEntry {
    const createdAt =
        row.created_at instanceof Date
            ? row.created_at.toISOString()
            : new Date(row.created_at).toISOString();
    return {
        id: row.id,
        name: row.name,
        message: row.message,
        createdAt
    };
}

export class PostgresStore implements SiteStore {
    private readonly pool: Pool;
    private initPromise: Promise<void> | null = null;

    constructor(connectionString: string) {
        // Small pool: this runs in serverless/edge-adjacent environments where
        // many instances may exist; keep per-instance connections modest.
        this.pool = new Pool({ connectionString, max: 5 });
    }

    /** One-time schema init; the shared promise prevents concurrent CREATE races. */
    private ensureInit(): Promise<void> {
        if (this.initPromise === null) {
            this.initPromise = this.initialize().catch((error: unknown) => {
                // Reset so the next request can retry instead of caching the failure.
                this.initPromise = null;
                throw error;
            });
        }
        return this.initPromise;
    }

    private async initialize(): Promise<void> {
        await this.pool.query(
            `CREATE TABLE IF NOT EXISTS guestbook (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                message TEXT NOT NULL,
                ip_hash TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )`
        );
        await this.pool.query(
            `CREATE TABLE IF NOT EXISTS counters (
                key TEXT PRIMARY KEY,
                value BIGINT NOT NULL
            )`
        );
        await this.pool.query(
            "INSERT INTO counters (key, value) VALUES ('visits', 0) ON CONFLICT (key) DO NOTHING"
        );
    }

    async listGuestbook(limit: number): Promise<GuestbookEntry[]> {
        await this.ensureInit();
        const result = await this.pool.query<GuestbookRow>(
            `SELECT id, name, message, created_at
             FROM guestbook
             ORDER BY created_at DESC, id DESC
             LIMIT $1`,
            [limit]
        );
        return result.rows.map(toEntry);
    }

    async addGuestbookEntry(input: {
        name: string;
        message: string;
        ipHash: string;
    }): Promise<GuestbookEntry> {
        await this.ensureInit();
        const result = await this.pool.query<GuestbookRow>(
            `INSERT INTO guestbook (name, message, ip_hash)
             VALUES ($1, $2, $3)
             RETURNING id, name, message, created_at`,
            [input.name, input.message, input.ipHash]
        );
        const row = result.rows[0];
        if (!row) {
            throw new Error("Postgres insert returned no row");
        }
        return toEntry(row);
    }

    async recordVisit(): Promise<number> {
        await this.ensureInit();
        // Single-statement atomic increment — no read-modify-write race.
        const result = await this.pool.query<CounterRow>(
            "UPDATE counters SET value = value + 1 WHERE key = 'visits' RETURNING value"
        );
        const row = result.rows[0];
        if (!row) {
            throw new Error("Postgres counters row for 'visits' is missing");
        }
        return Number(row.value);
    }

    async getVisitCount(): Promise<number> {
        await this.ensureInit();
        const result = await this.pool.query<CounterRow>(
            "SELECT value FROM counters WHERE key = 'visits'"
        );
        const row = result.rows[0];
        return row ? Number(row.value) : 0;
    }
}
