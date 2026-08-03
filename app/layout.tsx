import type { Metadata, Viewport } from "next";
import { Fredoka, Varela_Round } from "next/font/google";

import KonamiEgg from "@/components/wii/KonamiEgg";
import MiiParade from "@/components/wii/MiiParade";
import SoundProvider from "@/components/wii/SoundProvider";

import "./globals.css";

const fredoka = Fredoka({
    subsets: ["latin"],
    variable: "--font-fredoka",
    display: "swap"
});

const varelaRound = Varela_Round({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-varela",
    display: "swap"
});

export const metadata: Metadata = {
    metadataBase: new URL("https://coltonalmaraz.com"),
    title: "Colton Almaraz — Senior Full-Stack Software Engineer",
    description:
        "The Colton Channel: portfolio of Colton Almaraz, a senior full-stack software engineer working in Go, Python, TypeScript, React, and Next.js.",
    openGraph: {
        type: "website",
        siteName: "The Colton Channel",
        url: "https://coltonalmaraz.com",
        title: "Colton Almaraz — Senior Full-Stack Software Engineer",
        description:
            "The Colton Channel: portfolio of Colton Almaraz, a senior full-stack software engineer working in Go, Python, TypeScript, React, and Next.js."
    },
    twitter: {
        card: "summary_large_image",
        title: "Colton Almaraz — Senior Full-Stack Software Engineer",
        description:
            "The Colton Channel: portfolio of Colton Almaraz, a senior full-stack software engineer working in Go, Python, TypeScript, React, and Next.js."
    }
};

export const viewport: Viewport = {
    themeColor: "#e8ebef"
};

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${fredoka.variable} ${varelaRound.variable}`}
        >
            <body>
                <SoundProvider>
                    {children}
                    <KonamiEgg />
                    <MiiParade />
                </SoundProvider>
            </body>
        </html>
    );
}
