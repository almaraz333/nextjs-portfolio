import { ExternalLink, StackList } from "./ui";

/**
 * Disc Channel — the featured project: Quantum Vault, the post-quantum
 * encryption app. Facts come from cv.md (Spotlight entry, itself verified
 * against the repo source: ML-KEM key encapsulation, AES-GCM and
 * ChaCha20-Poly1305, Go crypto core compiled to WebAssembly) and the live
 * app at post-quantum-encryption-frontend.vercel.app.
 */

/** Pure-CSS Wii disc: silver sheen, center hole, gentle motion-safe spin. */
function SpinningDisc() {
    return (
        <div
            aria-hidden="true"
            className="flex shrink-0 flex-col items-center gap-3"
        >
            <div className="relative h-36 w-36 sm:h-44 sm:w-44">
                <div
                    className="absolute inset-0 rounded-full border border-wii-line bg-[conic-gradient(from_220deg,var(--color-wii-white),var(--color-wii-bg)_22%,var(--color-wii-white)_46%,var(--color-wii-bg-light)_60%,var(--color-wii-bg)_78%,var(--color-wii-white))] shadow-wii motion-safe:animate-spin"
                    style={{ animationDuration: "9s" }}
                >
                    <div className="absolute inset-[13%] rounded-full border border-wii-line/50" />
                    <div className="absolute inset-[24%] rounded-full border border-wii-line/35" />
                </div>
                <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-wii-line bg-wii-bg-light shadow-[inset_0_1px_3px_rgba(60,90,120,0.25)]" />
            </div>
            {/* The disc slot itself */}
            <div className="h-2 w-28 rounded-full border border-wii-line bg-wii-white shadow-[inset_0_1px_2px_rgba(34,169,224,0.45)]" />
        </div>
    );
}

const FLOW = [
    {
        step: "01",
        title: "Pick a file",
        detail: "Anything on your machine — it never leaves the browser."
    },
    {
        step: "02",
        title: "Encapsulate a key",
        detail: "ML-KEM-768 generates the shared secret; you keep the private key."
    },
    {
        step: "03",
        title: "Seal it",
        detail: "AES-256-GCM or ChaCha20-Poly1305 writes an .encrypted file."
    }
];

const FEATURES = [
    {
        title: "Quantum-resistant by design",
        detail: "ML-KEM (Kyber) is the NIST-standardized post-quantum key encapsulation mechanism — built to hold up against attacks a quantum computer could run against RSA or elliptic-curve keys."
    },
    {
        title: "The crypto core is Go, compiled to WebAssembly",
        detail: "Encrypt and decrypt are exposed to the page as WASM functions, so files are sealed and opened client-side. A Go HTTP server delivers the app; a React Router + TypeScript frontend drives it."
    },
    {
        title: "You hold the key",
        detail: "Encrypting hands back a private key to store yourself — no key escrow, no accounts, nothing to trust on the server side."
    }
];

export default function DiscSection() {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {/* Disc + headline */}
            <section className="rounded-channel border border-wii-line bg-linear-to-b from-white to-wii-bg-light p-6 shadow-wii-sm sm:p-8">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
                    <SpinningDisc />
                    <div className="flex min-w-0 flex-col items-center gap-3 sm:items-start">
                        <p className="font-display text-[11px] font-medium tracking-[0.2em] text-wii-blue-deep uppercase">
                            Now in the disc slot
                        </p>
                        <h3 className="font-display text-xl font-medium tracking-wide text-wii-text sm:text-2xl">
                            Quantum Vault
                        </h3>
                        <p className="font-display text-sm text-wii-text/60">
                            A post-quantum cryptographic file system
                        </p>
                        <p className="text-sm leading-relaxed text-wii-text/90 sm:text-base">
                            Encrypt any file in your browser against the day
                            quantum computers can break today&rsquo;s public-key
                            crypto. Pick a file, pick a cipher, and Quantum
                            Vault seals it with a post-quantum key exchange —
                            handing you back the only key that opens it.
                        </p>
                        <StackList
                            label="Quantum Vault tech stack"
                            items={[
                                "Go",
                                "WebAssembly",
                                "ML-KEM (Kyber)",
                                "AES-256-GCM",
                                "ChaCha20-Poly1305",
                                "TypeScript",
                                "Docker"
                            ]}
                        />
                        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                            <ExternalLink href="https://post-quantum-encryption-frontend.vercel.app/">
                                Try it live
                            </ExternalLink>
                            <ExternalLink href="https://github.com/almaraz333/post-quantum-encryption-backend">
                                Backend repo
                            </ExternalLink>
                            <ExternalLink href="https://github.com/almaraz333/post-quantum-encryption-frontend">
                                Frontend repo
                            </ExternalLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works — a dark "vault terminal" strip, a nod to the app's own UI */}
            <section aria-label="How Quantum Vault works">
                <ol className="grid list-none gap-3 rounded-channel border border-wii-line bg-[#101820] p-4 shadow-wii-sm sm:grid-cols-3 sm:gap-4 sm:p-5">
                    {FLOW.map(item => (
                        <li
                            key={item.step}
                            className="rounded-2xl border border-[#1f3b45] bg-[#0b1117] p-4"
                        >
                            <p className="font-mono text-[11px] tracking-[0.2em] text-[#5eead4]">
                                {item.step}
                            </p>
                            <h4 className="mt-1.5 font-display text-base font-medium tracking-wide text-[#8ef79f]">
                                {item.title}
                            </h4>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#c6d4dd]">
                                {item.detail}
                            </p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Why it's interesting */}
            <section aria-label="Quantum Vault highlights">
                <ul className="grid list-none gap-4 sm:grid-cols-3">
                    {FEATURES.map(feature => (
                        <li
                            key={feature.title}
                            className="rounded-channel border border-wii-line bg-wii-white p-5 shadow-wii-sm"
                        >
                            <h4 className="font-display text-base font-medium tracking-wide text-wii-text">
                                {feature.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-wii-text/80">
                                {feature.detail}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
