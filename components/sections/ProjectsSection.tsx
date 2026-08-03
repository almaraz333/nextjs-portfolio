import Image from "next/image";
import type { StaticImageData } from "next/image";

import ranger from "@/public/images/projects/Ranger.jpg";
import biggby from "@/public/images/projects/biggby.png";
import krypt from "@/public/images/projects/cyrptoapp.png";
import eyBlog from "@/public/images/projects/eyBlog.png";
import gameOfLife from "@/public/images/projects/gameOfLife.png";
import quantumVault from "@/public/images/projects/quantum-vault.png";
import symplee from "@/public/images/projects/symplee.png";
import webScraper from "@/public/images/projects/webScraper.png";

import { ExternalLink, StackList } from "./ui";

/**
 * Projects Channel — every project from cv.md (Spotlight from Colton's
 * GitHub, plus the Projects list + addendum project details). Descriptions
 * are tightened cv.md wording; years, links, stacks, and screenshots come
 * straight from cv.md.
 */

interface Project {
    name: string;
    year?: string;
    description: string;
    stack: string[];
    image?: {
        src: StaticImageData;
        alt: string;
        /** Tailwind object-position class for the card crop. */
        position?: string;
        /** Crisp upscaling for tiny pixel-y screenshots. */
        pixelated?: boolean;
    };
    /** Initials tile shown when no screenshot exists. */
    monogram?: string;
    live?: string;
    repo?: string;
    /** Extra labeled links (e.g. a second repo). */
    moreLinks?: { href: string; label: string }[];
    /** Highlighted card treatment for the Spotlight row. */
    spotlight?: boolean;
}

const SPOTLIGHT_PROJECTS: Project[] = [
    {
        name: "Quantum Vault",
        year: "2026",
        description:
            "In-browser file encryption built on the NIST post-quantum standard ML-KEM (Kyber), paired with AES-GCM and ChaCha20-Poly1305 authenticated encryption — the crypto core is written in Go and compiled to WebAssembly, so files are encrypted right in the browser.",
        stack: [
            "Go",
            "WebAssembly",
            "ML-KEM (Kyber)",
            "AES-GCM",
            "ChaCha20-Poly1305",
            "TypeScript",
            "Docker"
        ],
        image: {
            src: quantumVault,
            alt: "The Quantum Vault app — an Encrypt panel with ChaCha20-Poly1305 and ML-KEM-768 selected",
            position: "object-top"
        },
        spotlight: true,
        live: "https://post-quantum-encryption-frontend.vercel.app/",
        moreLinks: [
            {
                href: "https://github.com/almaraz333/post-quantum-encryption-backend",
                label: "Backend repo"
            },
            {
                href: "https://github.com/almaraz333/post-quantum-encryption-frontend",
                label: "Frontend repo"
            }
        ]
    },
    {
        name: "Goal Tracker",
        year: "2025–2026",
        description:
            "Cross-platform goal tracker built with Expo React Native — a month/day calendar flow with Zustand state and AsyncStorage persistence, shipping to iOS and Android through an EAS Build/Submit pipeline.",
        stack: [
            "Expo",
            "React Native",
            "TypeScript",
            "Zustand",
            "AsyncStorage",
            "EAS"
        ],
        monogram: "GT",
        spotlight: true,
        live: "https://goal-tracker-ten-alpha.vercel.app",
        repo: "https://github.com/almaraz333/goal-tracker"
    },
    {
        name: "Drive Sync",
        year: "2024",
        description:
            "A Google Drive sync tool written in Go — goroutines download files concurrently while the tool recursively traverses the Drive file tree and replicates its directory structure on local disk.",
        stack: ["Go", "Google Drive API", "Goroutines"],
        monogram: "DS",
        spotlight: true,
        repo: "https://github.com/almaraz333/driveSync"
    }
];

const CLIENT_PROJECTS: Project[] = [
    {
        name: "Biggby Online Ordering",
        year: "2020",
        description:
            "A seamless app and web ordering experience for BIGGBY Coffee — customers place an order and send it to the store of their choosing, with a strong focus on UX across devices.",
        stack: ["NodeJS", "React", "TypeScript", "Apollo", "GraphQL"],
        image: {
            src: biggby,
            alt: "BIGGBY online ordering drink builder for a Caramel Marvel latte"
        },
        live: "https://app.biggby.com"
    },
    {
        name: "EY Blog",
        year: "2022",
        description:
            "Revitalized the EY Studios blog for tens of thousands of readers across devices — a contemporary, responsive platform for EY studios worldwide.",
        stack: ["HTML", "JS", "Greensock", "11ty"],
        image: {
            src: eyBlog,
            alt: "EY Studios blog page with the headline “Well-rounded by design”"
        },
        live: "https://studio.ey.com/blog/study-halls/"
    },
    {
        name: "Symplee",
        year: "2020",
        description:
            "A fast, intuitive text and video chat app focused on good UX and security.",
        stack: ["NodeJS", "React", "TypeScript", "Apollo", "GraphQL"],
        image: {
            src: symplee,
            alt: "Symplee landing page — “Talk. Chat. Collaborate.”"
        },
        live: "https://symplee.app/"
    },
    {
        name: "Sports Web Scraper",
        year: "2019",
        description:
            "Built for a small sports-related insurance company: scrapes, formats, and presents player data from across the major national sports.",
        stack: ["Python", "BeautifulSoup", "Pandas"],
        image: {
            src: webScraper,
            alt: "Python BeautifulSoup code that scrapes player rosters from sports reference sites"
        },
        repo: "https://github.com/almaraz333/Sports-Web-Scraper"
    },
    {
        name: "Carter Treehouse",
        description:
            "An Airbnb site powered by a fully custom, from-scratch CMS built on Google APIs.",
        stack: ["Google APIs", "Custom CMS"],
        monogram: "CT"
    }
];

const PERSONAL_PROJECTS: Project[] = [
    {
        name: "Krypt — Ethereum Trading App",
        year: "2022",
        description:
            "An online Ethereum platform for sending and receiving crypto, integrating with users’ ETH wallets for real-time transactions.",
        stack: [
            "NodeJS",
            "React",
            "Ethers",
            "Recoil",
            "TypeScript",
            "Tailwind",
            "Hardhat"
        ],
        image: {
            src: krypt,
            alt: "Krypt app — “Send Crypto across the world” with an Ethereum wallet card and transfer form"
        },
        live: "https://blockchain-app-olive.vercel.app/"
    },
    {
        name: "Finance Tracking Microservices",
        description:
            "A collection of microservices that create and manage financial records, bringing automation and efficiency to financial processes.",
        stack: ["Go", "gRPC", "SQLite"],
        monogram: "FT"
    },
    {
        name: "Conway’s Game of Life",
        year: "2021",
        description: "A classic cellular automaton implementation.",
        stack: ["Python", "pyGame", "NumPy"],
        image: {
            src: gameOfLife,
            alt: "Conway’s Game of Life — live cells scattered across a grid",
            pixelated: true
        },
        repo: "https://github.com/almaraz333/conways-game-of-life"
    },
    {
        name: "Pi Dog Surveillance Camera",
        year: "2021",
        description:
            "A Raspberry Pi camera streaming to a second Pi set up as a server, so I could check on my dog Ranger from my phone while away.",
        stack: ["Raspberry Pi", "Pi Cam", "Python"],
        image: {
            src: ranger,
            alt: "Ranger, the German Shepherd the camera was built to watch",
            position: "object-[50%_32%]"
        }
    }
];

function ProjectCard({ project }: { project: Project }) {
    return (
        <li
            className={`flex flex-col overflow-hidden rounded-channel border bg-wii-white shadow-wii-sm transition ${
                project.spotlight
                    ? "border-wii-blue-soft hover:shadow-wii-glow"
                    : "border-wii-line hover:shadow-wii"
            }`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-wii-line bg-wii-bg-light">
                {project.spotlight && (
                    <span className="absolute top-3 left-3 z-10 rounded-full border border-wii-blue-soft bg-wii-white/90 px-2.5 py-0.5 font-display text-[10px] font-medium tracking-[0.14em] text-wii-blue-deep uppercase">
                        Spotlight
                    </span>
                )}
                {project.image ? (
                    <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        fill
                        sizes="(min-width: 640px) 28rem, 100vw"
                        className={[
                            "object-cover",
                            project.image.position ?? "object-center",
                            project.image.pixelated
                                ? "[image-rendering:pixelated]"
                                : ""
                        ]
                            .join(" ")
                            .trim()}
                    />
                ) : (
                    <div
                        aria-hidden="true"
                        className={`grid h-full w-full place-items-center bg-linear-to-b ${
                            project.spotlight
                                ? "from-wii-blue-soft/25 to-wii-blue-soft/50"
                                : "from-wii-bg-light to-wii-bg"
                        }`}
                    >
                        <span className="grid h-16 w-16 place-items-center rounded-full border border-wii-line bg-wii-white font-display text-xl font-medium text-wii-blue-deep shadow-wii-sm">
                            {project.monogram}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display text-base font-medium tracking-wide text-wii-text">
                        {project.name}
                    </h4>
                    {project.year && (
                        <span className="shrink-0 font-display text-xs text-wii-text/50">
                            {project.year}
                        </span>
                    )}
                </div>
                <p className="text-sm leading-relaxed text-wii-text/80">
                    {project.description}
                </p>
                <StackList
                    label={`${project.name} tech stack`}
                    items={project.stack}
                />
                {(project.live || project.repo || project.moreLinks) && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        {project.live && (
                            <ExternalLink href={project.live}>
                                Live site
                            </ExternalLink>
                        )}
                        {project.repo && (
                            <ExternalLink href={project.repo}>
                                Source code
                            </ExternalLink>
                        )}
                        {project.moreLinks?.map(link => (
                            <ExternalLink key={link.href} href={link.href}>
                                {link.label}
                            </ExternalLink>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}

export default function ProjectsSection() {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
            <section>
                <h3 className="font-display text-lg font-medium tracking-wide text-wii-text sm:text-xl">
                    Spotlight
                </h3>
                <p className="mt-1 text-sm text-wii-text/60">
                    The current headliners — fresh from GitHub.
                </p>
                <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SPOTLIGHT_PROJECTS.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="font-display text-lg font-medium tracking-wide text-wii-text sm:text-xl">
                    Client &amp; Professional
                </h3>
                <p className="mt-1 text-sm text-wii-text/60">
                    Built for real clients and employers.
                </p>
                <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2">
                    {CLIENT_PROJECTS.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="font-display text-lg font-medium tracking-wide text-wii-text sm:text-xl">
                    Personal Projects
                </h3>
                <p className="mt-1 text-sm text-wii-text/60">
                    Personal builds and experiments.
                </p>
                <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2">
                    {PERSONAL_PROJECTS.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </ul>
            </section>
        </div>
    );
}
