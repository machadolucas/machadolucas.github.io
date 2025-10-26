"use client";

import ExplorerWindow from "./ExplorerWindow";
import { homeAutomation, type HomeAutomationFile } from "@/data/homeAutomation";

type HomeAutomationWindowProps = {
    onEntryOpen: (entry: HomeAutomationFile) => void;
};

const HomeAutomationWindow = ({ onEntryOpen }: HomeAutomationWindowProps) => (
    <ExplorerWindow
        items={homeAutomation}
        onItemOpen={onEntryOpen}
        emptyMessage="No home automation files were found. Add markdown files to populate this folder."
    />
);

export default HomeAutomationWindow;
