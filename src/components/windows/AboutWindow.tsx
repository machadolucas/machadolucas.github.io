import Image from "next/image";
import { Button, Frame } from "@react95/core";
import Link from "next/link";

type AboutWindowProps = {
    onOpenProfessional: () => void;
    onOpenProjects: () => void;
    onOpenContact: () => void;
};

const AboutWindow = ({ onOpenProfessional, onOpenProjects, onOpenContact }: AboutWindowProps) => (
    <div className="space-y-2 text-slate-800">
        <Frame className="bg-[#f0f0f0] p-4" boxShadow="$in">
            <div className="grid grid-cols-1 @[600px]:grid-cols-[300px_1fr] gap-6 items-center">
                <div className="flex justify-center">
                    <Frame boxShadow="$out" className='p-1 bg-[#c3c7cb]'>
                        <Image
                            src="/lucas.png"
                            alt="Portrait of Lucas Machado"
                            width={300}
                            height={300}
                            className="h-[200px] w-[200px] @[600px]:h-[300px] @[600px]:w-[300px] object-cover"
                            priority
                        />
                    </Frame>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 text-base font-bold text-[#000080]">Lucas Machado</h3>
                    <p className="text-sm leading-relaxed">
                        I lead Software & AI at Demola Global, and my day-to-day is building the software that gives Demola its scale: a digital ecosystem that connects people
                        by interests, forms teams, and turns future-facing briefs into concepts and demos. I&apos;ve designed and built most of this platform myself, end-to-end.
                        It&apos;s become the backbone for how Demola runs co-creation at global scale—linking companies, universities and students to create real impact.
                    </p>
                    <div className="pt-4 flex flex-wrap gap-2">
                        <Link href="https://www.linkedin.com/in/machadolucas/" target="_blank" rel="noreferrer"
                        >
                            <Button className="cursor-pointer">
                                Find me on LinkedIn...
                            </Button>
                        </Link>
                        <Link href="https://www.demola.net" target="_blank" rel="noreferrer">
                            <Button className="cursor-pointer">
                                Learn more about Demola...
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Frame>
        <Frame className="bg-[#f0f0f0] p-4" boxShadow="$in">
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 @[700px]:grid-cols-[1fr_400px] gap-6 items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm leading-relaxed">
                            I&apos;m a builder first. I move from idea to shipped product, shaping architecture, data flows and delivery so teams can move fast without drama.
                            With 15+ years across product and back-end, I&apos;ve worked in a lot of different environments and can adapt quickly to whatever the problem demands.
                        </p>
                        <p className="text-sm leading-relaxed">
                            Before Demola, I built secure, high-availability systems in Brazilian fintech at PagSeguro (UOL), where reliability and auditability weren&apos;t optional,
                            and earlier worked on PKI/identity and authentication at E-VAL. Those experiences shaped my standard for dependable software and clear processes.
                            I&apos;ve also contributed university research on team formation, recommender systems and fairness — useful when you&apos;re matching people and shaping
                            projects in a platform like ours.
                        </p>


                    </div>
                    <div className="flex justify-center">
                        <Frame boxShadow="$out" className='p-1 bg-[#c3c7cb]'>
                            <Image
                                src="/maisa.png"
                                alt="Lucas giving a talk about artificial intelligence"
                                width={400}
                                height={300}
                                className="h-[240px] w-[320px] @[700px]:h-[300px] @[700px]:w-[400px] object-cover"
                                priority
                            />
                        </Frame>
                    </div>
                </div>
                <p className="text-sm leading-relaxed">
                    I studied at top public institutions in Brazil and Finland (USP and Tampere University) and was consistently at the top of my class — earning an academic
                    excellence scholarship — published peer-reviewed papers, and even picked up medals in Brazil&apos;s national mathematics olympiad as a kid. That academic
                    rigor shows up in how I reason about product and systems today.
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                    <Button className="cursor-pointer" onClick={onOpenProfessional}>
                        Read more about my career
                    </Button>
                    <Button className="cursor-pointer" onClick={onOpenProjects}>
                        Check out some of my projects
                    </Button>
                    <Button className="cursor-pointer" onClick={onOpenContact}>
                        Get in touch
                    </Button>
                </div>
            </div>
        </Frame>
    </div>
);

export default AboutWindow;
