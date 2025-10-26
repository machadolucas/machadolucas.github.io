import projectsManifest from "@/generated/projects.json";
import type { ExplorerFile } from "@/types/explorer";

export type ProjectFile = ExplorerFile;

export const projects: ProjectFile[] = projectsManifest.projects;

export function getProjectBySlug(slug: string): ProjectFile | undefined {
    return projects.find((project) => project.slug === slug);
}
