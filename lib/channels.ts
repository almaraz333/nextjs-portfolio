/**
 * Channel registry — the single source of truth for the Wii Menu channels.
 * Other agents build against these exports; extend additively only.
 */

export type ChannelSlug =
    | "mii"
    | "disc"
    | "projects"
    | "experience"
    | "skills"
    | "ai-lab"
    | "contact";

export interface Channel {
    slug: ChannelSlug;
    label: string;
    title: string;
    blurb: string;
}

export const CHANNELS: Channel[] = [
    {
        slug: "mii",
        label: "Mii Channel",
        title: "About Colton",
        blurb: "The face behind the channel — a quick introduction."
    },
    {
        slug: "disc",
        label: "Disc Channel",
        title: "Featured Project",
        blurb: "Quantum Vault — post-quantum file encryption, in the disc slot."
    },
    {
        slug: "projects",
        label: "Projects Channel",
        title: "Projects",
        blurb: "A grid of real, shipped side projects and client work."
    },
    {
        slug: "experience",
        label: "Experience Channel",
        title: "Work Experience",
        blurb: "Roles, teams, and the work history behind the portfolio."
    },
    {
        slug: "skills",
        label: "Skills Channel",
        title: "Tech Stack",
        blurb: "Languages, frameworks, and tools in regular rotation."
    },
    {
        slug: "ai-lab",
        label: "AI Lab Channel",
        title: "AI Workflow",
        blurb: "Experiments and workflows from the AI toolbox."
    },
    {
        slug: "contact",
        label: "Contact Channel",
        title: "Contact & Résumé",
        blurb: "Ways to get in touch, plus a downloadable résumé."
    }
];

/** Matches the base <title> configured in app/layout.tsx. */
export const SITE_TITLE =
    "Colton Almaraz — Senior Full-Stack Software Engineer";

export function isChannelSlug(v: string): v is ChannelSlug {
    return CHANNELS.some(channel => channel.slug === v);
}

export function getChannel(slug: ChannelSlug): Channel {
    const channel = CHANNELS.find(entry => entry.slug === slug);
    if (!channel) {
        throw new Error(`Unknown channel slug: ${slug}`);
    }
    return channel;
}
