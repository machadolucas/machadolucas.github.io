import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

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

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project not found – Lucas Machado",
        };
    }

    return {
        title: `${project.title} – Projects – Lucas Machado`,
        description: project.summary,
    };
}

export default function ProjectResponsiveDetail({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    const formattedDate = formatDate(project.date ?? null);

    return (
        <article className="space-y-10">
            <div className="space-y-3">
                <Link href="/responsive/projects" className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline">
                    ← Back to projects
                </Link>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Project</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{project.title}</h1>
                {formattedDate ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{formattedDate}</p>
                ) : null}
                <p className="text-base leading-relaxed text-slate-600">{project.summary}</p>
                {project.tags.length ? (
                    <ul className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {project.tags.map((tag) => (
                            <li key={`${project.slug}-${tag}`} className="rounded-full bg-slate-100 px-3 py-1">
                                {tag}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <div className="modern-markdown" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        </article>
    );
}
