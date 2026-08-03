/**
 * Skills Channel — badge grid grouped exactly by the cv.md skill
 * categories; every badge is on the résumé, none added. The featured
 * (blue-tinted) picks are the skills the résumé headline work leans on.
 */

interface SkillGroup {
    title: string;
    skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
    {
        title: "Languages & Frameworks",
        skills: [
            "Go",
            "Python",
            "Node",
            "JavaScript",
            "TypeScript",
            "React",
            "Svelte",
            "Angular",
            "Redux",
            "Recoil",
            "Tailwind",
            "Sass"
        ]
    },
    {
        title: "Backend Technologies",
        skills: [
            "gRPC",
            "REST",
            "GraphQL",
            "Apollo",
            "Node",
            "Express",
            "SQL",
            "AWS",
            "Azure",
            "Docker",
            "MongoDB",
            "PostgreSQL"
        ]
    },
    {
        title: "Development & Testing",
        skills: [
            "Git",
            "CI/CD",
            "Jest",
            "Cypress",
            "Unit Testing",
            "OOP",
            "Functional Programming",
            "Agile"
        ]
    },
    {
        title: "Design & UX",
        skills: [
            "Figma",
            "Information Architecture",
            "Usability Testing",
            "Wireframing",
            "Digital Prototyping",
            "Iterative Design"
        ]
    },
    {
        title: "Soft Skills",
        skills: [
            "Leadership",
            "Mentorship",
            "Communication",
            "Curiosity",
            "Problem Solving",
            "Project Management",
            "Time Management"
        ]
    }
];

/** The daily drivers the résumé leans on — slightly bigger, blue-tinted. */
const FEATURED = new Set(["Go", "Python", "TypeScript", "React"]);

export default function SkillsSection() {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
            <p className="text-sm text-wii-text/60">
                Straight from the résumé, grouped the same way — nothing padded.
            </p>
            {SKILL_GROUPS.map(group => (
                <section
                    key={group.title}
                    className="rounded-channel border border-wii-line bg-wii-white p-5 shadow-wii-sm sm:p-6"
                >
                    <h3 className="font-display text-base font-medium tracking-wide text-wii-text sm:text-lg">
                        {group.title}
                    </h3>
                    <ul className="mt-3 flex list-none flex-wrap gap-2">
                        {group.skills.map(skill => (
                            <li
                                key={skill}
                                className={
                                    FEATURED.has(skill)
                                        ? "rounded-full border border-wii-blue-soft bg-wii-blue-soft/30 px-4 py-1.5 font-display text-sm font-medium tracking-wide text-wii-blue-deep transition hover:shadow-wii-glow motion-safe:hover:-translate-y-0.5"
                                        : "rounded-full border border-wii-line bg-wii-white px-3.5 py-1 font-display text-[13px] font-medium tracking-wide text-wii-text/85 shadow-wii-sm transition hover:shadow-wii-glow motion-safe:hover:-translate-y-0.5"
                                }
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
