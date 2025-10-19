import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeAutomationBySlug, homeAutomation } from "@/data/homeAutomation";

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
    return homeAutomation.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const entry = getHomeAutomationBySlug(params.slug);

    if (!entry) {
        return {
            title: "Automation not found – Lucas Machado",
        };
    }

    return {
        title: `${entry.title} – Home Automation – Lucas Machado`,
        description: entry.summary,
    };
}

export default function HomeAutomationResponsiveDetail({ params }: { params: { slug: string } }) {
    const entry = getHomeAutomationBySlug(params.slug);

    if (!entry) {
        notFound();
    }

    const formattedDate = formatDate(entry.date ?? null);

    return (
        <article className="space-y-10">
            <div className="space-y-3">
                <Link href="/responsive/home-automation" className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline">
                    ← Back to home automation
                </Link>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Home automation</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{entry.title}</h1>
                {formattedDate ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{formattedDate}</p>
                ) : null}
                <p className="text-base leading-relaxed text-slate-600">{entry.summary}</p>
                {entry.tags.length ? (
                    <ul className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {entry.tags.map((tag) => (
                            <li key={`${entry.slug}-${tag}`} className="rounded-full bg-slate-100 px-3 py-1">
                                {tag}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <div className="modern-markdown" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
        </article>
    );
}
