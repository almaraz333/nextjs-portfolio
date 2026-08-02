/**
 * Store factory: picks the right SiteStore for the environment.
 *
 * - DATABASE_URL or POSTGRES_URL set  -> Postgres (production)
 * - otherwise                         -> SQLite in ./.data (local/self-host)
 *
 * The instance is cached on globalThis so Next.js dev-mode HMR doesn't leak
 * connections by re-instantiating the store on every reload.
 */

import { PostgresStore } from "./postgres-store";
import { SqliteStore } from "./sqlite-store";
import { StoreUnavailableError } from "./store";
import type { SiteStore } from "./store";

const g = globalThis as unknown as { __siteStore?: SiteStore };

export function getStore(): SiteStore {
    if (g.__siteStore) {
        return g.__siteStore;
    }

    const connectionString =
        process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
    if (connectionString) {
        g.__siteStore = new PostgresStore(connectionString);
        return g.__siteStore;
    }

    try {
        g.__siteStore = new SqliteStore();
        return g.__siteStore;
    } catch (error) {
        // Typical cause: a serverless/read-only filesystem where SQLite cannot
        // create ./.data. Surface a clear, actionable configuration error.
        console.error("[db] SQLite store unavailable:", error);
        throw new StoreUnavailableError(
            "No database configured: set DATABASE_URL (or POSTGRES_URL) to a Postgres connection string, or run where ./.data is writable so SQLite can be used."
        );
    }
}
