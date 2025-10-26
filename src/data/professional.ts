export type Role = {
    title: string;
    period: string;
    location: string;
};

export type ExperienceEntry = {
    company: string;
    duration?: string;
    startDate?: string;
    roles: Role[];
    highlights?: string[];
    logo?: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
};

export type Publication = {
    title: string;
    subtitle?: string;
    year: number;
    citation: string;
    abstract: string;
    keywords?: string[];
    href?: string;
    pdf?: string;
};

export type EducationEntry = {
    institution: string;
    degree: string;
    years: string;
    details?: string[];
};

export type Honor = {
    title: string;
    subtitle: string;
};

export type Language = {
    name: string;
    level: string;
};

export const formatDuration = (startDate: Date, endDate = new Date()) => {
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

export const experiences: ExperienceEntry[] = [
    {
        company: "Demola Global",
        logo: {
            src: "/logos/demola-logo.png",
            alt: "Demola Global logo",
            width: 300,
            height: 200,
        },
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
            "Development and management of all company web services, data, and infrastructure. Designed and implemented custom systems that digitized and automated critical processes.",
            "Leading the architecture, development, and deployment of Artificial Intelligence in Demola's global platform.",
        ],
    },
    {
        company: "Tampere University",
        logo: {
            src: "/logos/tuni-logo.png",
            alt: "Tampere University logo",
            width: 200,
            height: 200,
        },
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
        logo: {
            src: "/logos/pagseguro-logo.png",
            alt: "PagSeguro logo",
            width: 200,
            height: 200,
        },
        roles: [
            {
                title: "System Analyst",
                period: "December 2014 – July 2017",
                location: "São Paulo, Brasil",
            },
        ],
        highlights: [
            "Served as developer, lead developer, and architect across local and remote R&D teams while improving testing, build, and deployment workflows.",
            "Created foundational backend services for high-availability payment systems handling millions of transactions daily. Was part of the core code reviewing team.",
            "Worked on systems where scalability, availability, fault tolerance, traceability, security, performance, and maintainability were non-negotiable.",
            "PagBank PagSeguro is a disruptive fin-tech within UOL, Brazil's largest internet portal. It serves over 15 million active customers and processes hundreds of billions in annual transactions.",
        ],
    },
    {
        company: "Feswa Oy",
        logo: {
            src: "/logos/feswa-logo.svg",
            alt: "Feswa logo",
            width: 200,
            height: 200,
        },
        roles: [
            {
                title: "Freelance iOS Developer",
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
        logo: {
            src: "/logos/demola-logo.png",
            alt: "Demola Global logo",
            width: 200,
            height: 200,
        },
        roles: [
            {
                title: "Software Engineer",
                period: "February 2014 – August 2014",
                location: "Tampere, Finland",
            },
        ],
        highlights: [
            "Built an open-source educational platform for the Finnish Ministry of Education using Python and Django, focusing on front-end, APIs, and architecture. The platform was not continued, but its authentication module turned out to be the foundation for the Ministry's later official system, which is currently used in all Finnish schools.",
            "Developed a turn-based risk data visualization tool for the insurance domain with Java and JSF/PrimeFaces.",
        ],
    },
    {
        company: "E-VAL Tecnologia",
        logo: {
            src: "/logos/eval-logo.svg",
            alt: "E-VAL Tecnologia logo",
            width: 200,
            height: 200,
        },
        roles: [
            {
                title: "Software Developer",
                period: "June 2010 – August 2013",
                location: "São Paulo, Brasil",
            },
        ],
        highlights: [
            "Handled requirements, implementation, and testing for internet banking systems, cryptographic servers, biometric services, and authentication protocols.",
            "E-VAL Tecnologia is a company specialized in PKI, information security, software development and business intelligence that followed the spread and the evolution of cryptography and PKI use in Brazil.",
        ],
    },
];

export const education: EducationEntry[] = [
    {
        institution: "Tampere University",
        degree: "Master’s Degree in Software Development",
        years: "2017 - 2019",
        details: [
            "<b>Master's Degree Programme in Software Development.</b>",
            "Thesis graded laudatur (5): Fair Team Recommendations for Multidisciplinary Projects.",
            "Peer-reviewed publication at the IEEE/WIC/ACM International Conference on Web Intelligence (Thessaloniki).",
        ],
    },
    {
        institution: "Universidade de São Paulo",
        degree: "Bachelor’s Degree in Information Science",
        years: "2010 - 2016",
        details: [
            "<b>Bachelor's degree in Information Systems. Top university in Latin America and between the best in the world.</b>",
            "Peer-reviewed publication: A Practical Analysis Of Relationships Between Input Devices And Playability Evaluation.",
            "Awarded scholarship from Brazilian federal government covering all costs for one year of exchange studies at University of Tampere, Finland, between 2013-2014.",
            "I leaded and implemented a research project orienting about the correct disposal of electronic waste and promoting collection for suitable processing.",
        ],
    },
    {
        institution: "Tampereen yliopisto / University of Tampere",
        degree: "Exchange Student in Computer Science",
        years: "2013 - 2014",
        details: [
            "<b>Exchange student in the Computer Science Master's and Bachelor's degree</b>",
        ],
    },
    {
        institution: "Colégio Embraer Juarez Wanderley",
        degree: "High School Diploma, Engineering Track",
        years: "2007 - 2009",
        details: [
            "<b>The institution is a social project maintained by Embraer Institute of education and research, ranked between the very best schools in the country. Admission is highly selective, with only 200 students accepted each year from over 5000 applicants. I got in the 4th place in the entrance exam.</b>",
            "Extra activities: Studies of basic principles of technology, physics, chemistry, electricity, electronics and computers as part of an engineering program in university level.",
            "I have also participated in the Sustainable Alternatives Program, which is focused on managing social and environmental issues, with consequences for the local community. I acted as member and leader of a project, creating solutions for native reforestation in the school surroundings.",
        ],
    },
    {
        institution: "Institute of Pure and Applied Mathematics (IMPA - OBMEP)",
        degree: "Scientific Initiation Program",
        years: "2006 - 2007",
        details: [
            "<b>University level studies on pure and applied mathematics, problem-solving, and mathematical research methodologies.</b>",
        ],
    },
];

export const publications: Publication[] = [
    {
        title: "A Practical Evaluation of the Influence of Input Devices on Playability",
        subtitle: "Presented at the 18th International Conference on Human-Computer Interaction (HCI International 2016) - Toronto, Canada.",
        year: 2016,
        citation:
            "Machado L., Bernardes J.L. (2016). A Practical Evaluation of the Influence of Input Devices on Playability. In: Kurosu M. (eds) Human-Computer Interaction. Novel User Experiences. HCI 2016. Lecture Notes in Computer Science, vol 9733. Springer, Cham. DOI: https://doi.org/10.1007/978-3-319-39513-5_36",
        abstract:
            "Innovations being achieved with interactive devices (screens, sensors etc.) allow the development of new forms of interaction for many applications. Videogames played with these devices are completely changing how we use them and taking advantage of intuitive interfaces. Based on that, we ask “What aspects of playability are affected using different input devices for a certain gaming task and how is gaming performance affected?”. Our contribution is to present a practical evaluation of four different input devices (Mouse, Gamepad, Kinect and Touchscreen) used to interact with the same game, Fruit Ninja, with our data analysis indicating that changing input device brings significant differences in certain aspects of player experience for this game, such as sensation, challenge and control, while for others there was very little difference since this particular game rarely provides intense experiences for those aspects.",
        keywords: ["Emotions in HCI", "Entertainment Systems", "Evaluation methods and techniques", "User experience", "Input devices"],
        href: "https://doi.org/10.1007/978-3-319-39513-5_36",
        pdf: "/publications/practical-evaluation-influence.pdf",
    },
    {
        title: "Fair Team Recommendations for Multidisciplinary Projects",
        subtitle: "Presented at the IEEE/WIC/ACM International Conference on Web Intelligence (Web Intelligence 2019) - Thessaloniki, Greece.",
        year: 2019,
        citation:
            "Lucas Machado and Kostas Stefanidis. 2019. Fair Team Recommendations for Multidisciplinary Projects. In IEEE/WIC/ACM International Conference on Web Intelligence (WI '19), Payam Barnaghi, Georg Gottlob, Yannis Manolopoulos, Theodoros Tzouramanis, and Athena Vakali (Eds.). ACM, New York, NY, USA, 293-297. DOI: https://doi.org/10.1145/3350546.3352533",
        abstract:
            "The focus of this work is on the problem of team recommendations, in which teams have multidisciplinary requirements and team members’ selection is based on the match of their skills and the requirements. When assembling multiple teams there is also a challenge of allocating the best members in a fair way between the teams. We formally define the problem and propose a brute force and a faster heuristic method as solutions to create team recommendations to multidisciplinary projects. Furthermore, to increase the fairness between the recommended teams, the K-rounds and Pairs-rounds methods are proposed as variations of the heuristic approach. Several different test scenarios are executed to analyze and compare the effectiveness of these methods.",
        href: "https://doi.org/10.1145/3350546.3352533",
        pdf: "/publications/Web_Intelligence_conference_19.pdf",
    },
    {
        title: "The Potentials of Tangible Technologies for Learning Linear Equations",
        subtitle: "Co-authored article published in the Multimodal Technologies and Interaction journal.",
        year: 2020,
        citation:
            'Lehtonen, Daranee; Machado, Lucas; Joutsenlahti, Jorma; Perkkilä, Päivi. 2020. "The Potentials of Tangible Technologies for Learning Linear Equations." Multimodal Technol. Interact. 4, no. 4: 77. DOI: https://doi.org/10.3390/mti4040077',
        abstract:
            "Tangible technologies provide interactive links between the physical and digital worlds. Tangible interaction merges the benefits of physical and virtual manipulatives. To explore the potentials of tangible technologies for learning linear equations, a tangible manipulative was designed and developed. The proposed manipulative was implemented and evaluated using mixed methods (i.e., classroom interventions, paper-based tests, thinking aloud sessions, questionnaires, and interviews) in real classroom settings. Six teachers, 24 primary school students, and 65 lower secondary school students participated in the research. The quantitative and qualitative analysis revealed that the tangible manipulative supported student learning at various levels and had a positive impact on their learning achievement. Moreover, its overall usability was also accepted. Some minor improvements for pedagogy and usability could be implemented. These findings indicate that the proposed manipulative is likely to be beneficial to linear equation learning in pre-primary to lower secondary schools and usable in mathematics classrooms. Theoretical and practical implications are discussed.",
        keywords: ["manipulatives", "multimodality", "tangible user interface", "educational technology", "mathematics learning", "linear equations", "basic education"],
        href: "https://doi.org/10.3390/mti4040077",
        pdf: "https://www.mdpi.com/2414-4088/4/4/77/pdf",
    },
    {
        title: "Fair Team Recommendations for Multidisciplinary Projects",
        subtitle: "Master's Thesis. Degree Programme in Computer Sciences - Faculty of Information Technology and Communication Sciences, Tampere University.",
        year: 2019,
        citation:
            "Machado, Lucas (2019). Fair Team Recommendations for Multidisciplinary Projects. Master's Thesis, Tampere University.",
        abstract:
            "With the ever increasing amount of data in the world, it becomes harder to find useful and desired information. Recommender systems, which offer a way to analyze that data and suggest relevant information, are already common nowadays and a important part of several systems and services. While recommender systems are often used for suggesting items for users, there are not many studies about using them for problems such as team formation. This thesis focus on exploring a variation of that problem, in which teams have multidisciplinary requirements and members' selection is based on the match of their skills and the requirements. In addition, when assembling multiple teams there is a challenge of allocating the best members in a fair way between the teams. With the studied concepts from the literature, this thesis suggests a brute force and a faster heuristic method as solutions to create team recommendations to multidisciplinary projects. Furthermore, to increase the fairness between the recommended teams, the K-rounds and Pairs-rounds methods are proposed as variations of the heuristic approach. Several different test scenarios are executed to analyze and compare the efficiency and efficacy of these methods, and it is found that the heuristic-based methods are able to provide the same levels of quality with immensely greater performance than the brute force approach. The K-rounds method is able to generate substantially more fair team recommendations, while keeping the same levels of quality and performance as other methods. The Pairs-rounds method presents slightly better recommendations quality-wise than the K-rounds method, but its recommendations are less fair to a small degree. The proposed methods perform well enough for use in real scenarios.",
        keywords: ["Recommender systems", "fairness", "group formation", "team recommendation"],
        href: "http://urn.fi/URN:NBN:fi:tuni-201905161729",
        pdf: "http://urn.fi/URN:NBN:fi:tuni-201905161729",
    },
];

export const publicationsByYear = [...publications].sort((a, b) => b.year - a.year);

export const honors: Honor[] = [
    {
        title: "1st Brazilian Mathematics Olympiad for Public Schools",
        subtitle: "Honorable mention and participation in a junior scientific research initiation program.",
    },
    {
        title: "2nd Brazilian Mathematics Olympiad for Public Schools",
        subtitle: "Bronze medal, honorable mention and participation in a junior scientific research initiation program.",
    },
    {
        title: "CNPq Scholarship",
        subtitle: "Awarded scholarship from Brazilian National Counsel of Technological and Scientific Development (CNPq) covering all costs for one year of exchange studies at University of Tampere, Finland.",
    },
    {
        title: "University of Tampere global student award for academic excellence scholarship",
        subtitle: "Awarded to 10 students globally every year, covers 100% of tuition fees and includes a scholarship to cover living expenses during the Master’s degree programme.",
    },
];

export const languages: Language[] = [
    {
        name: "Brazilian Portuguese",
        level: "Native",
    },
    {
        name: "English",
        level: "Full professional and academic proficiency",
    },
    {
        name: "Finnish",
        level: "Limited working proficiency (B1)",
    },
];
