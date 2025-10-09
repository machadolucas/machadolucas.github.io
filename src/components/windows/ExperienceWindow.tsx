import { Frame } from "@react95/core";

const ExperienceWindow = () => (
    <div className="space-y-4 text-slate-800">
        <p className="text-sm">
            A quick look at where I&apos;ve been building things and the impact I brought to
            each team.
        </p>
        <Frame className="divide-y divide-[#c0c0c0] bg-white" boxShadow="$out">
            <section className="p-4">
                <h3 className="text-base font-semibold text-[#000080]">
                    Lead Front-end Engineer · AuroraPay
                </h3>
                <p className="text-xs uppercase tracking-wide text-[#555]">2022 — Present</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    <li>
                        Rebuilt onboarding flows with Next.js App Router, boosting conversion by
                        18%.
                    </li>
                    <li>
                        Launched a component library with Storybook &amp; Chromatic for cross-squad
                        velocity.
                    </li>
                </ul>
            </section>
            <section className="p-4">
                <h3 className="text-base font-semibold text-[#000080]">
                    Senior UI Engineer · PixelForge Studio
                </h3>
                <p className="text-xs uppercase tracking-wide text-[#555]">2019 — 2022</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    <li>
                        Led migration from legacy React classes to typed hooks with automated
                        testing.
                    </li>
                    <li>Mentored five engineers and ran weekly design pairing sessions.</li>
                </ul>
            </section>
        </Frame>
    </div>
);

export default ExperienceWindow;
