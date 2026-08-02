/**
 * Fixed-window in-memory rate limiter.
 *
 * In-memory means per-instance: each server process keeps its own counters
 * and they reset on restart/redeploy. That is a deliberate trade-off that is
 * perfectly acceptable for a single-region portfolio site; at real scale this
 * would move to a durable shared store (e.g. Postgres or Redis).
 *
 * The map is cached on globalThis so dev-mode HMR doesn't wipe the windows,
 * and expired windows are pruned opportunistically so it cannot grow forever.
 */

interface WindowState {
    count: number;
    resetAt: number;
}

export interface RateLimitResult {
    ok: boolean;
    retryAfterSeconds: number;
}

const g = globalThis as unknown as {
    __rateLimitWindows?: Map<string, WindowState>;
    __rateLimitLastPruneAt?: number;
};

const PRUNE_INTERVAL_MS = 60_000;

function getWindows(): Map<string, WindowState> {
    g.__rateLimitWindows ??= new Map<string, WindowState>();
    return g.__rateLimitWindows;
}

/** Drop expired windows at most once per PRUNE_INTERVAL_MS. */
function pruneExpired(windows: Map<string, WindowState>, now: number): void {
    const lastPruneAt = g.__rateLimitLastPruneAt ?? 0;
    if (now - lastPruneAt < PRUNE_INTERVAL_MS) {
        return;
    }
    g.__rateLimitLastPruneAt = now;
    for (const [key, state] of windows) {
        if (state.resetAt <= now) {
            windows.delete(key);
        }
    }
}

export function rateLimit(
    bucket: string,
    key: string,
    limit: number,
    windowMs: number
): RateLimitResult {
    const windows = getWindows();
    const now = Date.now();
    pruneExpired(windows, now);

    const mapKey = `${bucket}:${key}`;
    const state = windows.get(mapKey);

    if (!state || state.resetAt <= now) {
        windows.set(mapKey, { count: 1, resetAt: now + windowMs });
        return { ok: true, retryAfterSeconds: 0 };
    }

    if (state.count < limit) {
        state.count += 1;
        return { ok: true, retryAfterSeconds: 0 };
    }

    return {
        ok: false,
        retryAfterSeconds: Math.max(1, Math.ceil((state.resetAt - now) / 1000))
    };
}
