import type { Metadata } from "next";
import Link from "next/link";
import { homeAutomation } from "@/data/homeAutomation";

export const metadata: Metadata = {
    title: "Home Automation – Lucas Machado",
    description:
        "Connected home experiments and automations Lucas Machado built to prototype reliable, human-centered smart living experiences.",
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

export default function HomeAutomationResponsivePage() {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Home automation</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Connected home experiments</h1>
                <p className="text-base leading-relaxed text-slate-600">
                    Practical automations, integrations, and reliability tricks that keep our home running smoothly.
                </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                {homeAutomation.map((entry) => {
                    const formattedDate = formatDate(entry.date ?? null);

                    return (
                        <article key={entry.slug} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <h2 className="text-xl font-semibold text-slate-900">{entry.title}</h2>
                                    {formattedDate ? (
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{formattedDate}</span>
                                    ) : null}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600">{entry.summary}</p>
                            </div>
                            {entry.tags.length ? (
                                <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    {entry.tags.map((tag) => (
                                        <li key={`${entry.slug}-${tag}`} className="rounded-full bg-slate-100 px-3 py-1">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <div className="mt-6 flex flex-1 items-end">
                                <Link
                                    href={`/responsive/home-automation/${entry.slug}`}
                                    className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 transition hover:underline"
                                >
                                    Read walkthrough
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
