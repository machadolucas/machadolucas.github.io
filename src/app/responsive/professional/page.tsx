import type { Metadata } from "next";
import Link from "next/link";
import {
    education,
    experiences,
    formatDuration,
    honors,
    languages,
    publicationsByYear,
} from "@/data/professional";

export const metadata: Metadata = {
    title: "Professional Journey – Lucas Machado",
    description:
        "Career milestones, publications, education, and awards from Lucas Machado's work across software engineering, AI, and research.",
};

const formatDurationLabel = (startDate?: string, duration?: string) => {
    if (duration) {
        return duration;
    }

    if (!startDate) {
        return null;
    }

    const parsed = new Date(startDate);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return formatDuration(parsed);
};

export default function ProfessionalResponsivePage() {
    return (
        <div className="space-y-16">
            <section className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Experience</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Professional journey</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    {experiences.map((experience) => {
                        const durationLabel = formatDurationLabel(experience.startDate, experience.duration);

                        return (
                            <article key={experience.company} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <header className="flex flex-col gap-1 border-b border-slate-200 pb-4">
                                    <h2 className="text-xl font-semibold text-slate-900">{experience.company}</h2>
                                    {durationLabel ? (
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            {durationLabel}
                                        </p>
                                    ) : null}
                                </header>
                                <div className="mt-4 space-y-3">
                                    {experience.roles.map((role) => (
                                        <div key={`${experience.company}-${role.title}-${role.period}`} className="rounded-2xl bg-slate-50 p-4">
                                            <p className="text-sm font-semibold text-slate-900">{role.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {role.period} • {role.location}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {experience.highlights?.length ? (
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                                        {experience.highlights.map((highlight) => (
                                            <li key={`${experience.company}-${highlight.slice(0, 40)}`}>{highlight}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Education</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Academic foundations</h2>
                </div>
                <div className="space-y-4">
                    {education.map((entry) => (
                        <article key={`${entry.institution}-${entry.years}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <header className="border-b border-slate-200 pb-4">
                                <p className="text-lg font-semibold text-slate-900">{entry.institution}</p>
                                <p className="text-sm text-slate-600">{entry.degree}</p>
                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{entry.years}</span>
                            </header>
                            {entry.details?.map((detail, index) => (
                                <p
                                    key={`${entry.institution}-${entry.years}-${index}`}
                                    className="mt-3 text-sm leading-relaxed text-slate-700"
                                    dangerouslySetInnerHTML={{ __html: detail }}
                                />
                            ))}
                        </article>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Publications</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Selected research</h2>
                </div>
                <div className="space-y-6">
                    {publicationsByYear.map((publication, index) => (
                        <article key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <header className="border-b border-slate-200 pb-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{publication.year}</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">{publication.title}</h3>
                                {publication.subtitle ? (
                                    <p className="text-sm text-slate-600">{publication.subtitle}</p>
                                ) : null}
                            </header>
                            <p className="mt-3 text-xs text-slate-500">{publication.citation}</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">{publication.abstract}</p>
                            {publication.keywords?.length ? (
                                <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {publication.keywords.map((keyword) => (
                                        <li
                                            key={`${publication.title}-${publication.year}-${keyword}`}
                                            className="rounded-full bg-slate-100 px-3 py-1"
                                        >
                                            {keyword}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                {publication.href ? (
                                    <Link
                                        href={publication.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline-offset-4 hover:underline"
                                    >
                                        Publisher page
                                    </Link>
                                ) : null}
                                {publication.pdf ? (
                                    <Link
                                        href={publication.pdf}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline-offset-4 hover:underline"
                                    >
                                        Download PDF
                                    </Link>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid gap-10 lg:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Honors</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Awards & recognition</h2>
                    </div>
                    <ul className="space-y-3">
                        {honors.map((honor) => (
                            <li key={honor.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-semibold text-slate-900">{honor.title}</p>
                                <p className="text-sm text-slate-600">{honor.subtitle}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Languages</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Communication</h2>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {languages.map((language) => (
                            <li key={language.name} className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
                                <p className="font-semibold text-slate-900">{language.name}</p>
                                <p className="text-sm text-slate-600">{language.level}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
