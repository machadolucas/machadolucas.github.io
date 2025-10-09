import { Frame } from "@react95/core";

const ProjectsWindow = () => (
    <div className="space-y-3 text-slate-800">
        <p className="text-sm">
            Selected builds I&apos;m proud of. Ask for more and I&apos;ll happily demo them live.
        </p>
        <Frame className="space-y-3 bg-white p-4" boxShadow="$out">
            <article>
                <h4 className="text-base font-semibold text-[#000080]">
                    RetroStash · Personal Archive Platform
                </h4>
                <p className="text-sm">
                    React 19 + Zustand + Cloudflare R2. Helps indie storytellers publish
                    multimedia collections with offline-first sync.
                </p>
            </article>
            <article>
                <h4 className="text-base font-semibold text-[#000080]">
                    HoloBoard · Collaborative Whiteboard
                </h4>
                <p className="text-sm">
                    Turbo-charged Next.js app with CRDT-powered live editing, custom canvas
                    renderer, and WebRTC voice rooms.
                </p>
            </article>
            <article>
                <h4 className="text-base font-semibold text-[#000080]">
                    Checkout Pulse · Analytics Widget Kit
                </h4>
                <p className="text-sm">
                    Embeddable component suite with design tokens and automated QA via
                    Playwright + visual diffing.
                </p>
            </article>
        </Frame>
    </div>
);

export default ProjectsWindow;
