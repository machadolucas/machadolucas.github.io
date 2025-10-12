import projectsManifest from "@/generated/projects.json";

type ProjectsManifest = typeof projectsManifest;
export type ProjectFile = ProjectsManifest["projects"][number];

export const projects: ProjectFile[] = projectsManifest.projects;

export function getProjectBySlug(slug: string): ProjectFile | undefined {
    return projects.find((project) => project.slug === slug);
}
