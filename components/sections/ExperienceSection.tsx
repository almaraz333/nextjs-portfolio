/**
 * Experience Channel — a Wii-flavored vertical timeline. Roles, dates,
 * locations, and bullets are cv.md verbatim-or-tightened (Experience,
 * addendum “Early experience”, and Education).
 */

interface TimelineEntry {
    role: string;
    org: string;
    dates: string;
    location?: string;
    current?: boolean;
    education?: boolean;
    bullets: string[];
}

const ENTRIES: TimelineEntry[] = [
    {
        role: "Senior Full Stack Software Engineer",
        org: "EY",
        dates: "01/2022 – Present",
        location: "Portland, OR",
        current: true,
        bullets: [
            "Led technical design and architecture of mission-critical applications, coordinating cross-functional teams to deliver scalable solutions for clients",
            "Debug and build scalable Go and Python backend systems to support custom React TypeScript user-first front-ends",
            "Performed code reviews and mentored team members to uphold code quality standards and promote professional development",
            "Optimized Docker and Azure DevOps pipelines to enhance engineer efficiency and product quality"
        ]
    },
    {
        role: "Lead Full Stack Software Engineer",
        org: "RangerCode (Founder)",
        dates: "06/2022 – Present",
        location: "Portland, OR",
        current: true,
        bullets: [
            "Develop custom solutions for clients using Svelte, React, Redux, TypeScript, TailwindCSS, GraphQL, and AWS",
            "Design and develop robust backend systems in Python and Go to efficiently handle data and create a smooth user experience",
            "Oversee CI/CD processes, design teams, and vital business operations to guarantee optimal customer experience"
        ]
    },
    {
        role: "Full Stack Software Engineer",
        org: "BIGGBY Coffee",
        dates: "06/2020 – 12/2021",
        location: "East Lansing, MI",
        bullets: [
            "Built a scalable online ordering platform using React, Redux, TypeScript, GraphQL, and AWS, generating $12.0M in revenue",
            "Led a team of 3 junior engineers and mentored them in best practices and professional development",
            "Managed the full development lifecycle of building, deploying, and maintaining web applications",
            "Maintained the codebase with GitHub actions and husky hooks to ensure high quality code standards"
        ]
    },
    {
        role: "Software Developer and UX Designer",
        org: "Professional Athletes Healthcare Advocates",
        dates: "2019",
        bullets: ["Early software role working in HTML, CSS, and JavaScript"]
    },
    {
        role: "BS — Experience Architecture (Computer Science with UX Design)",
        org: "Michigan State University",
        dates: "08/2015 – 05/2020",
        location: "East Lansing, MI",
        education: true,
        bullets: [
            "Bachelor of Science with a major in Experience Architecture — computer science paired with UX design"
        ]
    }
];

function TimelineCard({ entry }: { entry: TimelineEntry }) {
    return (
        <li className="relative">
            {/* Timeline dot */}
            <span
                aria-hidden="true"
                className={`absolute top-6 -left-7 h-4 w-4 rounded-full border-2 border-wii-white shadow-wii-sm ${
                    entry.education ? "bg-wii-blue-soft" : "bg-wii-blue"
                }`}
            />
            <article
                className={`rounded-channel border border-wii-line p-5 shadow-wii-sm sm:p-6 ${
                    entry.education ? "bg-wii-bg-light" : "bg-wii-white"
                }`}
            >
                <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div className="min-w-0">
                        <h3 className="font-display text-base font-medium tracking-wide text-wii-text sm:text-lg">
                            {entry.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-wii-blue-deep">
                            {entry.org}
                            {entry.location && (
                                <span className="font-normal text-wii-text/60">
                                    {" "}
                                    · {entry.location}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-display text-xs tracking-wide text-wii-text/60">
                            {entry.dates}
                        </span>
                        {entry.current && (
                            <span className="rounded-full border border-wii-blue-soft bg-wii-blue-soft/30 px-2.5 py-0.5 font-display text-[11px] font-medium tracking-wide text-wii-blue-deep uppercase">
                                Current
                            </span>
                        )}
                        {entry.education && (
                            <span className="rounded-full border border-wii-line bg-wii-white px-2.5 py-0.5 font-display text-[11px] font-medium tracking-wide text-wii-blue-deep uppercase">
                                Education
                            </span>
                        )}
                    </div>
                </header>
                <ul className="mt-3 list-none space-y-2">
                    {entry.bullets.map(bullet => (
                        <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-relaxed text-wii-text/85"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wii-blue-soft"
                            />
                            {bullet}
                        </li>
                    ))}
                </ul>
            </article>
        </li>
    );
}

export default function ExperienceSection() {
    return (
        <div className="relative mx-auto w-full max-w-3xl pl-8">
            {/* Blue spine (outside the <ol> — only <li> may be a list child) */}
            <div
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-2.5 w-1 rounded-full bg-linear-to-b from-wii-blue via-wii-blue-soft to-wii-blue-soft"
            />
            <ol className="flex list-none flex-col gap-5 sm:gap-6">
                {ENTRIES.map(entry => (
                    <TimelineCard
                        key={`${entry.org}-${entry.dates}`}
                        entry={entry}
                    />
                ))}
            </ol>
        </div>
    );
}
