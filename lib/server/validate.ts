/**
 * Guestbook input validation.
 *
 * Every client-supplied value is distrusted: strings only, cleaned and
 * length-checked here; SQL safety comes from parameterized queries and
 * XSS safety from React's output encoding (we never render raw HTML).
 */

export interface ValidGuestbookInput {
    ok: true;
    name: string;
    message: string;
}

export interface InvalidGuestbookInput {
    ok: false;
    error: string;
}

export type GuestbookValidation = ValidGuestbookInput | InvalidGuestbookInput;

/**
 * Trim, collapse internal whitespace runs and strip control characters.
 * \p{Cc} covers C0/C1 controls (including \n, \r, \t, which become spaces).
 */
export function cleanText(raw: string): string {
    return raw
        .replace(/\p{Cc}/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function validateGuestbookInput(
    input: Record<string, unknown>
): GuestbookValidation {
    const rawName = input.name;
    const rawMessage = input.message;

    if (typeof rawName !== "string" || typeof rawMessage !== "string") {
        return { ok: false, error: "Name and message must both be text." };
    }

    const name = cleanText(rawName);
    const message = cleanText(rawMessage);

    if (name.length < 1 || name.length > 40) {
        return { ok: false, error: "Please add a name (1-40 characters)." };
    }
    if (message.length < 1 || message.length > 500) {
        return {
            ok: false,
            error: "Please write a message (1-500 characters)."
        };
    }

    const urlMatches = message.match(/https?:\/\//gi);
    if (urlMatches !== null && urlMatches.length > 2) {
        return { ok: false, error: "Too many links — two at most, please." };
    }

    return { ok: true, name, message };
}
