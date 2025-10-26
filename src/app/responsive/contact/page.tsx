import type { Metadata } from "next";
import Link from "next/link";
import { contactIntro, contactMethods } from "@/data/contact";
import ResponsiveIndexLink from "../ResponsiveIndexLink";

export const metadata: Metadata = {
    title: "Contact – Lucas Machado",
    description:
        "Ways to collaborate with Lucas Machado, from product partnerships to engineering leadership and advisory work.",
};

export default function ContactResponsivePage() {
    return (
        <>
            <ResponsiveIndexLink />
            <div className="space-y-10">
                <section className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Let&apos;s build together</h1>
                    <p className="text-base leading-relaxed text-slate-600">{contactIntro}</p>
                </section>
                <section>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {contactMethods.map((method) => (
                            <article key={method.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{method.label}</p>
                                <Link
                                    href={method.href}
                                    target={method.href.startsWith("http") ? "_blank" : undefined}
                                    rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                                    className="mt-2 inline-flex text-lg font-semibold text-slate-900 underline-offset-4 hover:underline"
                                >
                                    {method.value}
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
