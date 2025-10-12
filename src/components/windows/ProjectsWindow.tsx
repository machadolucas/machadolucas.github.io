"use client";

import { useEffect, useMemo, useState } from "react";
import type {
    ComponentType,
    CSSProperties,
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from "react";
import { Frame, Modal, TitleBar } from "@react95/core";
import { FileText, Globe } from "@react95/icons";
import { createPortal } from "react-dom";
type ExplorerModalProps = {
    id?: string;
    title?: string;
    icon?: ReactNode;
    hasWindowButton?: boolean;
    style?: CSSProperties;
    buttons?: Array<{ value: string; onClick: () => void }>;
    buttonsAlignment?: CSSProperties["justifyContent"];
    titleBarOptions?: ReactNode;
    children?: ReactNode;
};

const ModalComponent = Modal as unknown as ComponentType<ExplorerModalProps>;
import { projects, type ProjectFile } from "@/data/projects";

const ProjectsWindow = () => {
    const sortedProjects = useMemo<ProjectFile[]>(
        () => [...projects].sort((a, b) => a.title.localeCompare(b.title)),
        []
    );

    const [selectedSlug, setSelectedSlug] = useState<string | null>(
        sortedProjects[0]?.slug ?? null
    );
    const [activeProject, setActiveProject] = useState<ProjectFile | null>(null);

    const handleOpenProject = (project: ProjectFile) => {
        setActiveProject(project);
    };

    return (
        <div className="flex h-full flex-col text-slate-800">
            <Frame
                boxShadow="$in"
                className="flex-1 overflow-auto bg-white p-3"
                onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
                    if (event.target === event.currentTarget) {
                        setSelectedSlug(null);
                    }
                }}
            >
                {sortedProjects.length ? (
                    <div className="flex flex-wrap gap-y-6">
                        {sortedProjects.map((project) => (
                            <ProjectExplorerIcon
                                key={project.slug}
                                project={project}
                                isSelected={selectedSlug === project.slug}
                                onSelect={() => setSelectedSlug(project.slug)}
                                onOpen={() => handleOpenProject(project)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#000080]">
                        <span>No project files were found. Add markdown files to populate this folder.</span>
                    </div>
                )}
            </Frame>

            <Frame boxShadow="$in" className="mt-1 bg-[#c3c7cb] p-1 text-xs">
                <span className="text-[#333333]">{sortedProjects.length} object(s)</span>
            </Frame>

            {activeProject ? (
                <ProjectBrowserModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            ) : null}
        </div>
    );
};

type ProjectExplorerIconProps = {
    project: ProjectFile;
    isSelected: boolean;
    onSelect: () => void;
    onOpen: () => void;
};

const ProjectExplorerIcon = ({ project, isSelected, onSelect, onOpen }: ProjectExplorerIconProps) => (
    <button
        type="button"
        onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onSelect();
        }}
        onDoubleClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onOpen();
        }}
        onKeyDown={(event: ReactKeyboardEvent<HTMLButtonElement>) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onOpen();
            }
        }}
        className={`projects-explorer-icon ${isSelected ? "is-selected" : ""}`}
    >
        <span className="projects-explorer-icon__image">
            <FileText variant="32x32_4" />
        </span>
        <span className="projects-explorer-icon__label" title={project.title}>
            {project.title}
        </span>
    </button>
);

type ProjectBrowserModalProps = {
    project: ProjectFile;
    onClose: () => void;
};

const ProjectBrowserModal = ({ project, onClose }: ProjectBrowserModalProps) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof document !== "undefined") {
            setContainer(document.body);
        }
    }, []);

    if (!container) {
        return null;
    }

    return createPortal(
        <ModalComponent
            id={`project-${project.slug}`}
            title={project.title}
            icon={<FileText variant="16x16_4" />}
            hasWindowButton
            style={{
                left: 220,
                top: 160,
                width: "min(92vw, 720px)",
                minWidth: 360,
                maxHeight: "calc(100vh - 120px)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
            titleBarOptions={
                <>
                    <Modal.Minimize />
                    <TitleBar.Close onClick={onClose} />
                </>
            }
        >
            <Modal.Content className="bg-[#c3c7cb] text-sm text-slate-800 flex-1 overflow-y-auto">
                <Frame boxShadow="$out" className="browser-toolbar flex items-center gap-2 bg-[#e4e4e4] px-3 py-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[#000080]">Location</span>
                    <Frame boxShadow="$in" className="flex-1 bg-white px-2 py-[2px] text-[11px]">
                        C:\\Portfolio\\Projects\\{project.fileName}
                    </Frame>
                </Frame>

                <div className="browser-content space-y-4 bg-white p-4 leading-relaxed">
                    <h2 className="text-lg font-semibold text-[#000080]">{project.title}</h2>
                    {project.date ? (
                        <p className="text-xs uppercase tracking-[0.08em] text-[#555555]">
                            {new Date(project.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            })}
                        </p>
                    ) : null}
                    <div
                        className="browser-markdown"
                        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
                    />

                    {project.tags.length ? (
                        <div className="flex flex-wrap gap-2 text-xs text-[#000080]">
                            {project.tags.map((tag) => (
                                <Frame key={tag} boxShadow="$out" className="bg-[#f3f3f3] px-2 py-1">
                                    #{tag}
                                </Frame>
                            ))}
                        </div>
                    ) : null}
                </div>
            </Modal.Content>
        </ModalComponent>,
        container
    );
};

export default ProjectsWindow;
