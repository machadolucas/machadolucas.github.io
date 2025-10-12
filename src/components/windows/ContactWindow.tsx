import { Fieldset } from "@react95/core";

const ContactWindow = () => (
    <div className="space-y-4 p-3 text-slate-800">
        <p className="leading-tight">
            If you&apos;d like to get in touch, whether for collaboration, questions, or just to say hi, feel free to reach out through any of the following channels.
        </p>
        <Fieldset legend="Contact options">
            <div className="p-3">
                <dl className="space-y-2 text-sm">
                    <div className="flex gap-2 items-baseline">
                        <dt className="min-w-[80px] font-semibold">Email</dt>
                        <dd>
                            <a href="mailto:machadolucas@me.com" className="text-[#000080] underline">
                                machadolucas@me.com
                            </a>
                        </dd>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <dt className="min-w-[80px] font-semibold">GitHub</dt>
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
                    <div className="flex gap-2 items-baseline">
                        <dt className="min-w-[80px] font-semibold">LinkedIn</dt>
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
                    <div className="flex gap-2 items-baseline">
                        <dt className="min-w-[80px] font-semibold">Instagram</dt>
                        <dd>
                            <a
                                href="https://www.instagram.com/kumitimantti/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#000080] underline"
                            >
                                @kumitimantti
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </Fieldset>
    </div>
);

export default ContactWindow;
