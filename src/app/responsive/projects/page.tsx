import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import ResponsiveIndexLink from "../ResponsiveIndexLink";

export const metadata: Metadata = {
    title: "Projects – Lucas Machado",
    description:
        "A snapshot of some projects I developed — ranging from business, research, and personal initiatives.",
};

const formatDate = (value: string | null | undefined) => {
    if (!value) {
        return null;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

export default function ProjectsResponsivePage() {
    return (
        <>
            <ResponsiveIndexLink />
            <div className="space-y-6">
                <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Projects</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Selected work</h1>
                    <p className="text-base leading-relaxed text-slate-600">
                        A snapshot of some projects I developed — ranging from business, research, and personal initiatives.
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    {projects.map((project) => {
                        const formattedDate = formatDate(project.date ?? null);

                        return (
                            <article key={project.slug} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
                                        {formattedDate ? (
                                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{formattedDate}</span>
                                        ) : null}
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-600">{project.summary}</p>
                                </div>
                                {project.tags.length ? (
                                    <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        {project.tags.map((tag) => (
                                            <li key={`${project.slug}-${tag}`} className="rounded-full bg-slate-100 px-3 py-1">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                                <div className="mt-6 flex flex-1 items-end">
                                    <Link
                                        href={`/responsive/projects/${project.slug}`}
                                        className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 transition hover:underline"
                                    >
                                        Read case study
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
