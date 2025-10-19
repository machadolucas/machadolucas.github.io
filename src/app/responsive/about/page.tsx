import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutActions, aboutJourney, aboutProfile } from "@/data/about";

export const metadata: Metadata = {
    title: "About – Lucas Machado",
    description:
        "Meet Lucas Machado: a product-minded software engineer and AI lead building thoughtful digital experiences across Finland and Brazil.",
};

export default function AboutResponsivePage() {
    return (
        <div className="space-y-16">
            <section className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center">
                <div className="flex justify-center lg:justify-start">
                    <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
                        <Image
                            src={aboutProfile.portrait.src}
                            alt={aboutProfile.portrait.alt}
                            width={aboutProfile.portrait.width}
                            height={aboutProfile.portrait.height}
                            className="h-[280px] w-[280px] object-cover lg:h-[320px] lg:w-[320px]"
                            priority
                        />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profile</p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            {aboutProfile.headline}
                        </h1>
                    </div>
                    {aboutProfile.summary.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)} className="text-lg leading-[1.7] text-slate-700">
                            {paragraph}
                        </p>
                    ))}
                    <div className="flex flex-wrap gap-3">
                        {aboutProfile.primaryLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full bg-slate-300 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-400"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-6">
                    {aboutJourney.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)} className="text-lg leading-[1.8] text-slate-700">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <div className="flex justify-center lg:justify-end">
                    <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
                        <Image
                            src={aboutJourney.secondaryImage.src}
                            alt={aboutJourney.secondaryImage.alt}
                            width={aboutJourney.secondaryImage.width}
                            height={aboutJourney.secondaryImage.height}
                            className="h-[260px] w-full max-w-[480px] object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <p className="text-lg leading-[1.8] text-slate-700">{aboutJourney.closingParagraph}</p>
                <div className="flex flex-wrap gap-3">
                    {aboutActions.map((cta) => (
                        <Link
                            key={cta.actionId}
                            href={cta.href}
                            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                        >
                            {cta.label}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
