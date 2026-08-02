/**
 * Wave-1 placeholder bodies for every channel. A later agent replaces the
 * registry targets with real sections — keep these dumb and generic.
 */

function Placeholder({ title }: { title: string }) {
    return (
        <div className="rounded-channel border border-wii-line bg-wii-white p-6 shadow-wii-sm sm:p-8">
            <p className="font-display text-base font-medium tracking-wide text-wii-text sm:text-lg">
                {title} — content coming in wave 2
            </p>
        </div>
    );
}

export function MiiSection() {
    return <Placeholder title="About Colton" />;
}

export function DiscSection() {
    return <Placeholder title="Featured Project" />;
}

export function ProjectsSection() {
    return <Placeholder title="Projects" />;
}

export function ExperienceSection() {
    return <Placeholder title="Work Experience" />;
}

export function SkillsSection() {
    return <Placeholder title="Tech Stack" />;
}

export function AiLabSection() {
    return <Placeholder title="AI Workflow" />;
}

export function GuestbookSection() {
    return <Placeholder title="Guestbook" />;
}

export function ContactSection() {
    return <Placeholder title="Contact & Résumé" />;
}
