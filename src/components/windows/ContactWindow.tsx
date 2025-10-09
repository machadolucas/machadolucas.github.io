import { Button, Frame } from "@react95/core";

const ContactWindow = () => (
    <div className="space-y-4 text-slate-800">
        <p>Ready to collaborate? Send a message and let&apos;s plan something exciting.</p>
        <Frame className="bg-white p-4" boxShadow="$out">
            <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                    <dt className="min-w-[80px] font-semibold text-[#000080]">Email</dt>
                    <dd>
                        <a href="mailto:hello@lucasmachado.dev" className="text-[#000080] underline">
                            hello@lucasmachado.dev
                        </a>
                    </dd>
                </div>
                <div className="flex gap-2">
                    <dt className="min-w-[80px] font-semibold text-[#000080]">GitHub</dt>
                    <dd>
                        <a
                            href="https://github.com/machadolucas"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#000080] underline"
                        >
                            @machadolucas
                        </a>
                    </dd>
                </div>
                <div className="flex gap-2">
                    <dt className="min-w-[80px] font-semibold text-[#000080]">LinkedIn</dt>
                    <dd>
                        <a
                            href="https://www.linkedin.com/in/machadolucas/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#000080] underline"
                        >
                            linkedin.com/in/machadolucas
                        </a>
                    </dd>
                </div>
            </dl>
        </Frame>
        <div className="flex flex-wrap gap-2">
            <Button as="a" href="mailto:hello@lucasmachado.dev">
                Send Email
            </Button>
            <Button as="a" href="/LucasMachado_CV.pdf">
                Download CV
            </Button>
        </div>
    </div>
);

export default ContactWindow;
