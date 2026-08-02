/**
 * SQLite-backed SiteStore (better-sqlite3).
 *
 * Zero-setup backend for local development and self-hosting: the database
 * lives in ./.data/site.db (gitignored) and is created on first use.
 * better-sqlite3 is synchronous by design; methods are async only to satisfy
 * the shared SiteStore interface.
 */

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import type { GuestbookEntry, SiteStore } from "./store";

type GuestbookRow = {
    id: number;
    name: string;
    message: string;
    created_at: string;
};

type CounterRow = {
    value: number;
};

function toEntry(row: GuestbookRow): GuestbookEntry {
    return {
        id: row.id,
        name: row.name,
        message: row.message,
        createdAt: row.created_at
    };
}

export class SqliteStore implements SiteStore {
    private readonly db: Database.Database;

    constructor() {
        const dataDir = path.join(process.cwd(), ".data");
        fs.mkdirSync(dataDir, { recursive: true });

        this.db = new Database(path.join(dataDir, "site.db"));
        this.db.pragma("journal_mode = WAL");
        this.db.exec(
            `CREATE TABLE IF NOT EXISTS guestbook (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                message TEXT NOT NULL,
                ip_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS counters (
                key TEXT PRIMARY KEY,
                value INTEGER NOT NULL
            );`
        );
        this.db
            .prepare(
                "INSERT OR IGNORE INTO counters (key, value) VALUES ('visits', 0)"
            )
            .run();
    }

    async listGuestbook(limit: number): Promise<GuestbookEntry[]> {
        const rows = this.db
            .prepare<[number], GuestbookRow>(
                "SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT ?"
            )
            .all(limit);
        return rows.map(toEntry);
    }

    async addGuestbookEntry(input: {
        name: string;
        message: string;
        ipHash: string;
    }): Promise<GuestbookEntry> {
        const createdAt = new Date().toISOString();
        const row = this.db
            .prepare<[string, string, string, string], GuestbookRow>(
                `INSERT INTO guestbook (name, message, ip_hash, created_at)
                 VALUES (?, ?, ?, ?)
                 RETURNING id, name, message, created_at`
            )
            .get(input.name, input.message, input.ipHash, createdAt);
        if (!row) {
            throw new Error("SQLite insert returned no row");
        }
        return toEntry(row);
    }

    async recordVisit(): Promise<number> {
        const row = this.db
            .prepare<[], CounterRow>(
                "UPDATE counters SET value = value + 1 WHERE key = 'visits' RETURNING value"
            )
            .get();
        if (!row) {
            throw new Error("SQLite counters row for 'visits' is missing");
        }
        return row.value;
    }

    async getVisitCount(): Promise<number> {
        const row = this.db
            .prepare<[], CounterRow>(
                "SELECT value FROM counters WHERE key = 'visits'"
            )
            .get();
        return row ? row.value : 0;
    }
}
