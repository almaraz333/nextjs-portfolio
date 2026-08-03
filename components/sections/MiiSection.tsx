import Image from "next/image";

import headShot from "@/public/images/headShot.jpg";

/**
 * Mii Channel — About Colton. Every fact here traces to cv.md: Basics,
 * Experience (EY + RangerCode), Education, and the old-site About Me quote.
 */
export default function MiiSection() {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
            {/* Mii plaza — portrait, name, headline, status */}
            <section className="rounded-channel border border-wii-line bg-linear-to-b from-white to-wii-bg-light p-6 shadow-wii-sm sm:p-8">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
                    <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[28px] border-4 border-wii-white ring-1 ring-wii-line shadow-wii sm:h-44 sm:w-44">
                        <Image
                            src={headShot}
                            alt="Colton Almaraz smiling in a red flannel shirt"
                            fill
                            sizes="(min-width: 640px) 11rem, 9rem"
                            className="object-cover object-[50%_30%]"
                        />
                    </div>
                    <div className="flex min-w-0 flex-col items-center gap-2 sm:items-start">
                        <h3 className="font-display text-2xl font-medium tracking-wide text-wii-text sm:text-3xl">
                            Colton Almaraz
                        </h3>
                        <p className="font-display text-sm font-medium text-wii-blue-deep sm:text-base">
                            Senior Full-Stack Software Engineer · 6 years of
                            experience
                        </p>
                        <p className="text-sm text-wii-text/70">
                            Vancouver, WA — Pacific Time
                        </p>
                        <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-wii-blue-soft bg-wii-white px-4 py-1.5 font-display text-sm font-medium text-wii-blue-deep shadow-wii-sm">
                            <span
                                aria-hidden="true"
                                className="h-2 w-2 rounded-full bg-wii-blue motion-safe:animate-pulse"
                            />
                            Open to senior full-stack roles
                        </p>
                    </div>
                </div>
            </section>

            {/* Bio */}
            <section className="rounded-channel border border-wii-line bg-wii-white p-6 shadow-wii-sm sm:p-8">
                <h4 className="font-display text-base font-medium tracking-wide text-wii-text sm:text-lg">
                    The short version
                </h4>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-wii-text/90 sm:text-base">
                    <p>
                        I&rsquo;m a senior full-stack software engineer with 6
                        years of experience building for the web. My degree is
                        in Experience Architecture — Michigan State&rsquo;s
                        blend of computer science and UX design — so I come at
                        engineering with user-centric design and accessibility
                        in mind, and I specialize in minimal, effective products
                        with a focus on ethical and profitable outcomes.
                    </p>
                    <p>
                        Today I&rsquo;m a Senior Full Stack Software Engineer at
                        EY, leading technical design and architecture for
                        mission-critical applications and building scalable Go
                        and Python backends behind custom React TypeScript
                        front-ends. I also founded RangerCode, where I develop
                        custom solutions for clients and oversee CI/CD, design
                        teams, and the business side of shipping software. Code
                        review and mentoring are a big part of how I like to
                        work.
                    </p>
                </div>
            </section>

            {/* Quick facts */}
            <section aria-label="Quick facts">
                <dl className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="rounded-2xl border border-wii-line bg-wii-white p-4 shadow-wii-sm">
                        <dt className="font-display text-[11px] font-medium tracking-[0.16em] text-wii-blue-deep uppercase">
                            Education
                        </dt>
                        <dd className="mt-1.5 text-sm text-wii-text">
                            BS in Experience Architecture, Michigan State
                            University
                        </dd>
                    </div>
                    <div className="rounded-2xl border border-wii-line bg-wii-white p-4 shadow-wii-sm">
                        <dt className="font-display text-[11px] font-medium tracking-[0.16em] text-wii-blue-deep uppercase">
                            Current role
                        </dt>
                        <dd className="mt-1.5 text-sm text-wii-text">
                            Senior Full Stack Software Engineer at EY
                        </dd>
                    </div>
                    <div className="rounded-2xl border border-wii-line bg-wii-white p-4 shadow-wii-sm">
                        <dt className="font-display text-[11px] font-medium tracking-[0.16em] text-wii-blue-deep uppercase">
                            Founder
                        </dt>
                        <dd className="mt-1.5 text-sm text-wii-text">
                            RangerCode — custom solutions for clients
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    );
}
