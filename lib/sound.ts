/**
 * Wii-style UI blips, synthesized with the WebAudio API — no audio files.
 *
 * The AudioContext is created lazily on the first play/prime attempt and is
 * only ever resumed from a user gesture; if the context is not running yet a
 * play request is silently dropped (never queued), so nothing can autoplay.
 */

export type SoundName = "hover" | "select" | "back";

interface Tone {
    /** Oscillator frequency in Hz. */
    frequency: number;
    /** Offset from "now" at which the tone starts, in seconds. */
    start: number;
    /** Tone length in seconds. */
    duration: number;
    /** Peak gain — keep gentle (≤ ~0.1). */
    peak: number;
    type: OscillatorType;
}

const SOUNDS: Record<SoundName, readonly Tone[]> = {
    // Short, soft, high blip — quiet.
    hover: [
        {
            frequency: 1046.5,
            start: 0,
            duration: 0.06,
            peak: 0.045,
            type: "sine"
        }
    ],
    // Pleasant two-tone rising blip.
    select: [
        {
            frequency: 659.25,
            start: 0,
            duration: 0.07,
            peak: 0.09,
            type: "triangle"
        },
        {
            frequency: 987.77,
            start: 0.06,
            duration: 0.09,
            peak: 0.1,
            type: "triangle"
        }
    ],
    // Lower single blip.
    back: [
        {
            frequency: 329.63,
            start: 0,
            duration: 0.12,
            peak: 0.09,
            type: "triangle"
        }
    ]
};

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (
        typeof window === "undefined" ||
        typeof window.AudioContext !== "function"
    ) {
        return null;
    }
    if (audioContext === null) {
        audioContext = new window.AudioContext();
    }
    return audioContext;
}

/**
 * Try to unlock the AudioContext. Call from a user gesture (e.g. the sound
 * toggle click) so subsequent plays are audible immediately.
 */
export function primeAudio(): void {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
        void ctx.resume().catch(() => undefined);
    }
}

function scheduleTones(ctx: AudioContext, tones: readonly Tone[]): void {
    const now = ctx.currentTime;
    for (const tone of tones) {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + tone.start;
        const end = start + tone.duration;

        oscillator.type = tone.type;
        oscillator.frequency.setValueAtTime(tone.frequency, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(tone.peak, start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, end);

        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(start);
        oscillator.stop(end + 0.03);
    }
}

/**
 * Play a named blip. No-ops on the server, before the context is unlocked by
 * a user gesture, or when WebAudio is unavailable. Never throws.
 */
export function playSound(name: SoundName): void {
    const ctx = getAudioContext();
    if (!ctx) {
        return;
    }
    if (ctx.state !== "running") {
        // Ask politely for next time, but never queue a delayed ghost blip.
        void ctx.resume().catch(() => undefined);
        return;
    }
    scheduleTones(ctx, SOUNDS[name]);
}
