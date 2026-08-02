import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStore } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rate-limit";
import { getClientIp, hashIp } from "@/lib/server/request";
import { StoreUnavailableError } from "@/lib/server/store";
import type { GuestbookEntry } from "@/lib/server/store";
import { validateGuestbookInput } from "@/lib/server/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ENTRIES = 50;
const POSTS_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

function errorResponse(error: unknown): NextResponse {
    if (error instanceof StoreUnavailableError) {
        return NextResponse.json(
            { error: "guestbook backend not configured" },
            { status: 503 }
        );
    }
    console.error("[api/guestbook]", error);
    return NextResponse.json(
        { error: "Something went wrong on our end." },
        { status: 500 }
    );
}

export async function GET(): Promise<NextResponse> {
    try {
        const entries = await getStore().listGuestbook(MAX_ENTRIES);
        return NextResponse.json({ entries });
    } catch (error) {
        return errorResponse(error);
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body: unknown = await request.json().catch(() => null);
        if (typeof body !== "object" || body === null) {
            return NextResponse.json(
                { error: "Send a JSON object with a name and a message." },
                { status: 400 }
            );
        }
        const record = body as Record<string, unknown>;

        // Honeypot: humans never see the "website" field, so a filled value
        // means a bot. Answer with a convincing fake success and store nothing.
        const website = record.website;
        if (
            website !== undefined &&
            website !== null &&
            String(website).trim() !== ""
        ) {
            const decoy: GuestbookEntry = {
                id: Math.floor(Math.random() * 1_000_000) + 1,
                name:
                    typeof record.name === "string"
                        ? record.name.slice(0, 40)
                        : "Guest",
                message:
                    typeof record.message === "string"
                        ? record.message.slice(0, 500)
                        : "",
                createdAt: new Date().toISOString()
            };
            return NextResponse.json({ entry: decoy }, { status: 201 });
        }

        const validated = validateGuestbookInput(record);
        if (!validated.ok) {
            return NextResponse.json(
                { error: validated.error },
                { status: 400 }
            );
        }

        const ipHash = hashIp(getClientIp(request));
        const verdict = rateLimit(
            "guestbook:post",
            ipHash,
            POSTS_PER_HOUR,
            HOUR_MS
        );
        if (!verdict.ok) {
            return NextResponse.json(
                {
                    error: "Easy there — five signatures an hour is plenty. Try again soon."
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(verdict.retryAfterSeconds)
                    }
                }
            );
        }

        const entry = await getStore().addGuestbookEntry({
            name: validated.name,
            message: validated.message,
            ipHash
        });
        return NextResponse.json({ entry }, { status: 201 });
    } catch (error) {
        return errorResponse(error);
    }
}
