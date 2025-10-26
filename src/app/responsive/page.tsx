import Link from "next/link";
import { Desk100, Folder, Progman24, Shdocvw257, Wab321016, Wmsui323926 } from "@react95/icons";

const sections = [
    {
        href: "/responsive/about",
        title: "About Lucas",
        description: "Get the story behind the desktop persona and find a quick summary of who I am.",
        icon: Progman24,
        variant: "32x32_4" as const,
    },
    {
        href: "/responsive/professional",
        title: "Professional",
        description: "Review my experience, skills, and career timeline without opening a desktop window.",
        icon: Desk100,
        variant: "32x32_4" as const,
    },
    {
        href: "/responsive/projects",
        title: "Projects",
        description: "Browse the project catalog with the same details available in the desktop explorer.",
        icon: Folder,
        variant: "32x32_4" as const,
    },
    {
        href: "/responsive/home-automation",
        title: "Home Automation",
        description: "Dive into the custom smart home setup, including hardware, software, and lessons learned.",
        icon: Wab321016,
        variant: "32x32_4" as const,
    },
    {
        href: "/responsive/contact",
        title: "Contact",
        description: "Reach out directly from the responsive site with email, social media, and messaging links.",
        icon: Wmsui323926,
        variant: "32x32_4" as const,
    },
];

export default function ResponsiveIndexPage() {
    return (
        <div className="space-y-12">
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-800">
                            <Shdocvw257 variant="32x32_8" className="h-10 w-10" />
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Responsive mode
                            </span>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                Browse the site without the desktop shell
                            </h1>
                            <p className="text-base text-slate-600">
                                Jump straight into the mobile-friendly views of every section. Each link below mirrors the
                                content you can open from the Windows 95-inspired desktop, just tuned for phones and tablets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
                {sections.map((section) => {
                    const Icon = section.icon;

                    return (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-inner">
                                    <Icon variant={section.variant} className="h-8 w-8" />
                                </span>
                                <div>
                                    <p className="text-base font-semibold text-slate-900 group-hover:text-slate-700">
                                        {section.title}
                                    </p>
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                                        {section.href.replace("/responsive/", "")}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-600">
                                {section.description}
                            </p>
                        </Link>
                    );
                })}
            </section>
        </div>
    );
}
