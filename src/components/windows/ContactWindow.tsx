import { Fieldset } from "@react95/core";
import { contactIntro, contactMethods } from "@/data/contact";

const ContactWindow = () => (
    <div className="space-y-4 p-3 text-slate-800">
        <p className="leading-tight">{contactIntro}</p>
        <Fieldset legend="Contact options">
            <div className="p-3">
                <dl className="space-y-2 text-sm">
                    {contactMethods.map((method) => (
                        <div key={method.label} className="flex gap-2 items-baseline">
                            <dt className="min-w-[80px] font-semibold">{method.label}</dt>
                            <dd>
                                <a
                                    href={method.href}
                                    target={method.href.startsWith("http") ? "_blank" : undefined}
                                    rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                                    className="text-[#000080] underline"
                                >
                                    {method.value}
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </Fieldset>
    </div>
);

export default ContactWindow;
