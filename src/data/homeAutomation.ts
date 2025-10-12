import homeAutomationManifest from "@/generated/homeAutomation.json";
import type { ExplorerFile } from "@/types/explorer";

export type HomeAutomationFile = ExplorerFile;

export const homeAutomation: HomeAutomationFile[] = homeAutomationManifest.homeAutomation;

export function getHomeAutomationBySlug(slug: string): HomeAutomationFile | undefined {
    return homeAutomation.find((entry) => entry.slug === slug);
}
