"use client";

import { Frame, Tab, Tabs } from "@react95/core";
import type { PropsWithChildren } from "react";
import useReact95TabPanelLayout from "@/hooks/useReact95TabPanelLayout";
import {
    education,
    experiences,
    formatDuration,
    honors,
    languages,
    publicationsByYear,
} from "@/data/professional";

const ScrollableTabPanel = ({ children }: PropsWithChildren) => {
    const panelRef = useReact95TabPanelLayout();

    return (
        <div ref={panelRef} className="flex flex-1 flex-col overflow-hidden" style={{ minHeight: 0 }}>
            {children}
        </div>
    );
};

const ExperienceWindow = () => (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden p-1">
        <Tabs defaultActiveTab="Experience" style={{ flex: "1 1 auto", flexWrap: "wrap" }}>
            <Tab title="Experience">
                <ScrollableTabPanel>
                    <div className="grid flex-1 gap-4 overflow-y-auto p-4">
                        {experiences.map((experience) => {
                            const durationLabel = experience.startDate
                                ? formatDuration(new Date(experience.startDate))
                                : experience.duration;

                            return (
                                <Frame
                                    key={experience.company}
                                    boxShadow="$out"
                                    className="space-y-4 bg-white p-4"
                                >
                                    <header className="flex items-baseline gap-4 border-b border-[#c0c0c0] pb-2">
                                        <h3 className="text-lg font-bold leading-snug text-[#000080]">
                                            {experience.company}
                                        </h3>
                                        {durationLabel ? (
                                            <span className="text-xs uppercase tracking-wide text-[#555]">
                                                {durationLabel}
                                            </span>
                                        ) : null}
                                    </header>
                                    <div className="space-y-2">
                                        {experience.roles.map((role) => (
                                            <div
                                                key={`${experience.company}-${role.title}-${role.period}`}
                                                className="rounded border border-dashed border-[#d3d3d3] bg-[#f8f8f8] p-3"
                                            >
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {role.title}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    {role.period} • {role.location}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {experience.highlights?.length ? (
                                        <div className="border-t border-dashed border-[#c0c0c0] pt-3">
                                            <ul className="mt-2 list-disc list-inside space-y-2 text-sm text-slate-700">
                                                {experience.highlights.map((highlight) => (
                                                    <li key={`${experience.company}-${highlight.slice(0, 40)}`}>
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </Frame>
                            );
                        })}
                    </div>
                </ScrollableTabPanel>
            </Tab>
            <Tab title="Educational background">
                <ScrollableTabPanel>
                    <div className="grid flex-1 gap-4 overflow-y-auto p-4">
                        {education.map((entry) => (
                            <Frame
                                key={`${entry.institution}-${entry.years}`}
                                boxShadow="$out"
                                className="space-y-3 bg-white p-4"
                            >
                                <header className="border-b border-[#c0c0c0] pb-2">
                                    <p className="pb-1 text-base font-semibold text-[#000080]">
                                        {entry.institution}
                                    </p>
                                    <p className="text-sm text-slate-800">{entry.degree}</p>
                                    <span className="text-xs uppercase tracking-wide text-[#777]">
                                        {entry.years}
                                    </span>
                                </header>
                                {entry.details?.map((paragraph, index) => (
                                    <p
                                        key={`${entry.institution}-${entry.years}-detail-${index}`}
                                        className="text-sm leading-snug text-slate-800"
                                        dangerouslySetInnerHTML={{ __html: paragraph }}
                                    />
                                ))}
                            </Frame>
                        ))}
                    </div>
                </ScrollableTabPanel>
            </Tab>
            <Tab title="Publications">
                <ScrollableTabPanel>
                    <div className="grid flex-1 gap-4 overflow-y-auto p-4">
                        {publicationsByYear.map((publication, index) => (
                            <Frame
                                key={index}
                                boxShadow="$out"
                                className="space-y-3 bg-white p-4"
                            >
                                <header className="border-b border-[#c0c0c0] pb-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#777]">
                                        {publication.year}
                                    </p>
                                    <h3 className="my-1 text-base font-semibold text-[#000080]">
                                        {publication.title}
                                    </h3>
                                    {publication.subtitle ? (
                                        <p className="text-xs italic text-slate-600">
                                            {publication.subtitle}
                                        </p>
                                    ) : null}
                                </header>
                                <p className="text-xs text-slate-600">{publication.citation}</p>
                                <p className="text-sm leading-relaxed text-slate-800">
                                    {publication.abstract}
                                </p>
                                {publication.keywords?.length ? (
                                    <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-[#555]">
                                        {publication.keywords.map((keyword) => (
                                            <li
                                                key={`${publication.title}-${publication.year}-${keyword}`}
                                                className="rounded border border-[#c0c0c0] bg-[#f5f5f5] px-2 py-1"
                                            >
                                                {keyword}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                                <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide">
                                    {publication.href ? (
                                        <a
                                            href={publication.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#000080] hover:underline"
                                        >
                                            Publisher Page
                                        </a>
                                    ) : (
                                        <span className="italic text-[#777]">Add publisher link</span>
                                    )}
                                    {publication.pdf ? (
                                        <a
                                            href={publication.pdf}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#000080] hover:underline"
                                        >
                                            Download PDF
                                        </a>
                                    ) : (
                                        <span className="italic text-[#777]">Place PDF in public/publications</span>
                                    )}
                                </div>
                            </Frame>
                        ))}
                    </div>
                </ScrollableTabPanel>
            </Tab>
            <Tab title="Honors & Awards">
                <ScrollableTabPanel>
                    <div className="grid flex-1 gap-4 overflow-y-auto p-4">
                        {honors.map((entry) => (
                            <Frame
                                key={`${entry.title}-${entry.subtitle}`}
                                boxShadow="$out"
                                className="space-y-2 bg-white p-4"
                            >
                                <p className="text-sm font-semibold text-[#000080]">{entry.title}</p>
                                <p className="text-xs text-slate-600">{entry.subtitle}</p>
                            </Frame>
                        ))}
                    </div>
                </ScrollableTabPanel>
            </Tab>
            <Tab title="Languages">
                <ScrollableTabPanel>
                    <div className="grid flex-1 gap-4 overflow-y-auto p-4">
                        {languages.map((entry) => (
                            <Frame
                                key={entry.name}
                                boxShadow="$out"
                                className="space-y-1 bg-white p-4"
                            >
                                <p className="text-sm font-semibold text-[#000080]">{entry.name}</p>
                                <p className="text-xs text-slate-600">{entry.level}</p>
                            </Frame>
                        ))}
                    </div>
                </ScrollableTabPanel>
            </Tab>
        </Tabs>
    </div>
);

export default ExperienceWindow;
