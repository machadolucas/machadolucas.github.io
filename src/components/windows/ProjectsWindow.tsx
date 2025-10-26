"use client";

import ExplorerWindow from "./ExplorerWindow";
import { projects, type ProjectFile } from "@/data/projects";

type ProjectsWindowProps = {
    onProjectOpen: (project: ProjectFile) => void;
};

const ProjectsWindow = ({ onProjectOpen }: ProjectsWindowProps) => (
    <ExplorerWindow
        items={projects}
        onItemOpen={onProjectOpen}
        emptyMessage="No files were found."
    />
);

export default ProjectsWindow;
