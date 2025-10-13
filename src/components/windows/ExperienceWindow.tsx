import { Tab, Tabs } from "@react95/core";

type Role = {
    title: string;
    period: string;
    location: string;
};

type ExperienceEntry = {
    company: string;
    duration?: string;
    startDate?: string;
    roles: Role[];
    highlights?: string[];
};

const formatDuration = (startDate: Date, endDate = new Date()) => {
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    if (end <= start) {
        return "Less than a month";
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += previousMonth.getDate();
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    const parts: string[] = [];

    if (years > 0) {
        parts.push(`${years} year${years === 1 ? "" : "s"}`);
    }

    if (months > 0) {
        parts.push(`${months} month${months === 1 ? "" : "s"}`);
    }

    if (parts.length === 0) {
        return "Less than a month";
    }

    return parts.join(" ");
};

const experiences: ExperienceEntry[] = [
    {
        company: "Demola Global",
        startDate: "2017-09-01",
        roles: [
            {
                title: "Head of Software and AI",
                period: "June 2025 – Present",
                location: "Tampere, Finland",
            },
            {
                title: "Manager, Digital Business Development",
                period: "April 2020 – June 2025",
                location: "Tampere, Finland",
            },
            {
                title: "System Specialist",
                period: "September 2017 – April 2020",
                location: "Tampere, Finland",
            },
        ],
        highlights: [
            "Full stack development and management of company web services, data, and infrastructure. Designed and implemented custom systems that digitized and automated critical processes.",
        ],
    },
    {
        company: "Tampere University",
        roles: [
            {
                title: "Project Researcher",
                period: "October 2019 – February 2020",
                location: "Tampere, Finland",
            },
        ],
        highlights: [
            "Conducted research on team formation, recommender systems, and fairness algorithms.",
        ],
    },
    {
        company: "PagSeguro UOL",
        roles: [
            {
                title: "System Analyst",
                period: "December 2014 – July 2017",
                location: "São Paulo, Brasil",
            },
        ],
        highlights: [
            "Served as developer, lead developer, and architect across local and remote R&D teams while improving testing, build, and deployment workflows.",
            "Worked on systems where scalability, availability, fault tolerance, traceability, security, performance, and maintainability were non-negotiable.",
            "PagSeguro is a disruptive fin-tech within UOL, Brazil's largest internet portal with 108M+ unique visitors and 7.4B monthly page views.",
        ],
    },
    {
        company: "Feswa Oy",
        roles: [
            {
                title: "iOS Developer",
                period: "October 2014 – December 2014",
                location: "Helsinki, Finland",
            },
        ],
        highlights: [
            "Delivered the CultureDude iOS app end-to-end, covering Objective-C development, graphics, and UI design.",
            "CultureDude helps people learn about cultural situations through playful, game-based experiences.",
        ],
    },
    {
        company: "Demola",
        roles: [
            {
                title: "Software Engineer",
                period: "February 2014 – August 2014",
                location: "Tampere, Finland",
            },
        ],
        highlights: [
            "Built an open-source educational platform for the Finnish Ministry of Education using Python and Django, focusing on front-end, APIs, and architecture.",
            "Developed a turn-based risk data visualization tool for the insurance domain with Java and JSF/PrimeFaces.",
        ],
    },
    {
        company: "E-VAL Tecnologia",
        roles: [
            {
                title: "Software Developer",
                period: "June 2010 – August 2013",
                location: "São Paulo, Brasil",
            },
        ],
        highlights: [
            "Handled requirements, implementation, and testing for internet banking systems, cryptographic servers, biometric services, and authentication protocols.",
            "E-VAL specializes in PKI, information security, software development, and business intelligence, driving cryptography adoption across Brazil.",
        ],
    },
];

const education = [
    "Tampere University — Master’s degree, Software Development (2017 – 2019)",
    "Universidade de São Paulo — Bachelor’s degree, Information Science (2010 – 2016)",
    "Tampereen yliopisto / University of Tampere — Exchange student, Computer Science (2013 – 2014)",
    "Colégios Embraer — High School Diploma, Engineering (2007 – 2009)",
];

const publications = [
    "A Practical Evaluation of the Influence of Input Devices on Playability",
    "Fair team recommendations for multidisciplinary projects",
    "The Potentials of Tangible Technologies for Learning Linear Equations",
    "Fair Team Recommendations for Multidisciplinary Projects",
];

const honors = [
    "1st Brazilian Mathematics Olympiad for Public Schools",
    "2nd Brazilian Mathematics Olympiad for Public Schools",
    "CNPq Scholarship – Sandwich graduation programme",
    "University of Tampere global student award for academic excellence scholarship",
];

const languages = [
    "Finnish — Limited Working",
    "Portuguese — Native or Bilingual",
    "English — Full Professional",
];

const List = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-inside space-y-2 text-sm text-slate-800">
        {items.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
);

const ExperienceWindow = () => (
    <div className="flex h-full flex-col py-1 text-slate-800">
        <Tabs defaultActiveTab="Experience" className="my-2" width="100%">
            <Tab title="Experience">
                <div className="space-y-6 p-4 pr-6">
                    {experiences.map((experience) => {
                        const durationLabel = experience.startDate
                            ? formatDuration(new Date(experience.startDate))
                            : experience.duration;

                        return (
                            <section key={experience.company} className="space-y-3">
                                <div>
                                    <h3 className="text-base font-semibold text-[#000080]">
                                        {experience.company}
                                        {durationLabel ? ` — ${durationLabel}` : ""}
                                    </h3>
                                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                                        {experience.roles.map((role) => (
                                            <li key={`${experience.company}-${role.title}-${role.period}`}>
                                                <span className="font-medium text-slate-900">{role.title}</span> ({role.period}) — {role.location}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {experience.highlights?.length ? (
                                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                                        {experience.highlights.map((highlight) => (
                                            <li key={`${experience.company}-${highlight.slice(0, 40)}`}>{highlight}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </section>
                        );
                    })}
                </div>
            </Tab>
            <Tab title="Education">
                <div className="space-y-4 p-4 pr-6">
                    <List items={education} />
                </div>
            </Tab>
            <Tab title="Publications">
                <div className="space-y-4 p-4 pr-6">
                    <List items={publications} />
                </div>
            </Tab>
            <Tab title="Honors & Awards">
                <div className="space-y-4 p-4 pr-6">
                    <List items={honors} />
                </div>
            </Tab>
            <Tab title="Languages">
                <div className="space-y-4 p-4 pr-6">
                    <List items={languages} />
                </div>
            </Tab>
        </Tabs>
    </div>
);

export default ExperienceWindow;
