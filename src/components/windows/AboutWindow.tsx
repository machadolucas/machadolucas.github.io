import Image from "next/image";
import { Button, Frame } from "@react95/core";
import Link from "next/link";
import { aboutActions, aboutJourney, aboutProfile } from "@/data/about";

type AboutWindowProps = {
    onOpenProfessional: () => void;
    onOpenProjects: () => void;
    onOpenContact: () => void;
};

const AboutWindow = ({ onOpenProfessional, onOpenProjects, onOpenContact }: AboutWindowProps) => {
    const actionHandlers = {
        experience: onOpenProfessional,
        projects: onOpenProjects,
        contact: onOpenContact,
    } as const;

    return (
        <div className="space-y-2 text-slate-800 overflow-auto">
            <Frame className="bg-[#f0f0f0] p-4 m-2" boxShadow="$in">
                <div className="grid grid-cols-1 @[600px]:grid-cols-[300px_1fr] gap-6 items-center">
                    <div className="flex justify-center">
                        <Frame boxShadow="$out" className='p-1 bg-[#c3c7cb]'>
                            <Image
                                src={aboutProfile.portrait.src}
                                alt={aboutProfile.portrait.alt}
                                width={aboutProfile.portrait.width}
                                height={aboutProfile.portrait.height}
                                className="h-[200px] w-[200px] @[600px]:h-[300px] @[600px]:w-[300px] object-cover"
                                priority
                            />
                        </Frame>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="mb-2 text-base font-bold text-[#000080]">{aboutProfile.headline}</h3>
                        {aboutProfile.summary.map((paragraph) => (
                            <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                        <div className="pt-4 flex flex-wrap gap-2">
                            {aboutProfile.primaryLinks.map((link) => (
                                <Link key={link.href} href={link.href} target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer">{link.label}</Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Frame>
            <Frame className="bg-[#f0f0f0] p-4 m-2" boxShadow="$in">
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-1 @[700px]:grid-cols-[1fr_400px] gap-6 items-center">
                        <div className="flex flex-col gap-2">
                            {aboutJourney.paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}


                        </div>
                        <div className="flex justify-center">
                            <Frame boxShadow="$out" className='p-1 bg-[#c3c7cb]'>
                                <Image
                                    src={aboutJourney.secondaryImage.src}
                                    alt={aboutJourney.secondaryImage.alt}
                                    width={aboutJourney.secondaryImage.width}
                                    height={aboutJourney.secondaryImage.height}
                                    className="h-[240px] w-[320px] @[700px]:h-[300px] @[700px]:w-[400px] object-cover"
                                    priority
                                />
                            </Frame>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed">{aboutJourney.closingParagraph}</p>
                    <div className="pt-4 flex flex-wrap gap-2">
                        {aboutActions.map((cta) => (
                            <Button key={cta.actionId} className="cursor-pointer" onClick={actionHandlers[cta.actionId]}>
                                {cta.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </Frame>
        </div>
    );
};

export default AboutWindow;
