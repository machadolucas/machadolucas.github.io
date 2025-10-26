import type { ReactNode } from "react";
import Link from "next/link";
import { Back, Explorer100, Shdocvw257 } from "@react95/icons";

export default function ResponsiveLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
                    <div>
                        <p className="text-base font-semibold tracking-tight">Lucas Machado</p>
                        <p className="text-sm text-slate-500">Webpage view</p>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        <Explorer100 variant="16x16_4" />
                        Back to desktop
                    </Link>
                </div>
            </header>
            <main className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
                {children}
            </main>
        </div>
    );
}
