export const aboutProfile = {
    name: "Lucas Machado",
    portrait: {
        src: "/lucas.png",
        alt: "Portrait of Lucas Machado",
        width: 300,
        height: 300,
    },
    headline: "Lucas Machado",
    summary: [
        "I lead Software & AI at Demola Global, and my day-to-day is building the software that gives Demola its scale: a digital ecosystem that connects people by interests, forms teams, and turns future-facing briefs into concepts and demos. I've designed and built most of this platform myself, end-to-end. It's become the backbone for how Demola runs co-creation at global scale—linking companies, universities and students to create real impact.",
    ],
    primaryLinks: [
        {
            label: "Find me on LinkedIn...",
            href: "https://www.linkedin.com/in/machadolucas/",
        },
        {
            label: "Learn more about Demola...",
            href: "https://www.demola.net",
        },
    ],
};

export const aboutJourney = {
    paragraphs: [
        "I'm a builder first. I move from idea to shipped product, shaping architecture, data flows and delivery so teams can move fast without drama. With 15+ years across product and back-end, I've worked in a lot of different environments and can adapt quickly to whatever the problem demands.",
        "Before Demola, I built secure, high-availability systems in Brazilian fintech at PagSeguro (UOL), where reliability and auditability weren't optional, and earlier worked on PKI/identity and authentication at E-VAL. Those experiences shaped my standard for dependable software and clear processes. I've also contributed university research on team formation, recommender systems and fairness — useful when you're matching people and shaping projects in a platform like ours.",
    ],
    secondaryImage: {
        src: "/maisa.png",
        alt: "Lucas giving a talk about artificial intelligence",
        width: 400,
        height: 300,
    },
    closingParagraph: "I studied at top public institutions in Brazil and Finland (USP and Tampere University) and was consistently at the top of my class — earning an academic excellence scholarship — published peer-reviewed papers, and even picked up medals in Brazil's national mathematics olympiad as a kid. That academic rigor shows up in how I reason about product and systems today.",
};

export const aboutActions = [
    {
        label: "Read more about my career",
        actionId: "experience",
        href: "/responsive/professional",
    },
    {
        label: "Check out some of my projects",
        actionId: "projects",
        href: "/responsive/projects",
    },
    {
        label: "Get in touch",
        actionId: "contact",
        href: "/responsive/contact",
    },
] as const;
