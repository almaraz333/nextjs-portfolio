/**
 * Request helpers for route handlers.
 *
 * Privacy by design: the raw client IP is used only transiently to build a
 * salted SHA-256 hash for rate limiting / abuse tracing. Only the hash is
 * ever stored — never the IP address itself.
 */

import { createHash } from "node:crypto";

/** Fallback salt for local dev; set IP_HASH_SALT in production. */
const DEV_FALLBACK_SALT = "wii-portfolio-dev-salt-not-a-secret";

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        // x-forwarded-for is "client, proxy1, proxy2" — the client is first.
        const first = forwarded.split(",")[0].trim();
        if (first !== "") {
            return first;
        }
    }
    const real = request.headers.get("x-real-ip");
    if (real && real.trim() !== "") {
        return real.trim();
    }
    return "local";
}

export function hashIp(ip: string): string {
    const salt = process.env.IP_HASH_SALT ?? DEV_FALLBACK_SALT;
    return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
