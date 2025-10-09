import { Frame } from "@react95/core";

const AboutWindow = () => (
    <div className="space-y-4 text-slate-800">
        <p>
            Hey there! I&apos;m Lucas Machado, a front-end engineer obsessed with craft,
            retro aesthetics, and building resilient web experiences. I blend solid
            engineering practices with playful storytelling to turn complex product
            ideas into interfaces that feel effortless.
        </p>
        <Frame className="bg-[#f0f0f0] p-4" boxShadow="$in">
            <h3 className="mb-2 text-base font-bold text-[#000080]">Highlights</h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
                <li>7+ years crafting accessible, performant UI.</li>
                <li>Deep in Next.js, TypeScript, design systems, and testing.</li>
                <li>Former agency lead; now shipping playful SaaS experiences.</li>
            </ul>
        </Frame>
    </div>
);

export default AboutWindow;
