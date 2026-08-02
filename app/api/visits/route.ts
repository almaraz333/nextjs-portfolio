import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStore } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rate-limit";
import { getClientIp, hashIp } from "@/lib/server/request";
import { StoreUnavailableError } from "@/lib/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VISIT_COOKIE = "wii_visited";
const POSTS_PER_HOUR = 60;
const HOUR_MS = 60 * 60 * 1000;

function errorResponse(error: unknown): NextResponse {
    if (error instanceof StoreUnavailableError) {
        return NextResponse.json(
            { error: "guestbook backend not configured" },
            { status: 503 }
        );
    }
    console.error("[api/visits]", error);
    return NextResponse.json(
        { error: "Something went wrong on our end." },
        { status: 500 }
    );
}

export async function GET(): Promise<NextResponse> {
    try {
        const count = await getStore().getVisitCount();
        return NextResponse.json({ count });
    } catch (error) {
        return errorResponse(error);
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const ipHash = hashIp(getClientIp(request));
        const verdict = rateLimit(
            "visits:post",
            ipHash,
            POSTS_PER_HOUR,
            HOUR_MS
        );
        if (!verdict.ok) {
            return NextResponse.json(
                { error: "Too many requests — give it a moment." },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(verdict.retryAfterSeconds)
                    }
                }
            );
        }

        const store = getStore();

        // Cookie dedupe: one counted visit per browser per day. An honest
        // counter, not a page-load odometer.
        if (request.cookies.get(VISIT_COOKIE)?.value === "1") {
            const count = await store.getVisitCount();
            return NextResponse.json({ count, counted: false });
        }

        const count = await store.recordVisit();
        const response = NextResponse.json({ count, counted: true });
        response.cookies.set(VISIT_COOKIE, "1", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 86400,
            secure: process.env.NODE_ENV === "production"
        });
        return response;
    } catch (error) {
        return errorResponse(error);
    }
}
