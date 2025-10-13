import type { ComponentType, ReactNode } from "react";

export type IconComponent = ComponentType<Record<string, unknown>>;

export type DesktopApp = {
    id: string;
    title: string;
    label: string;
    icon: IconComponent;
    iconVariants: {
        large: string;
        small?: string;
    };
    windowPosition: {
        left: number;
        top: number;
        width?: number;
    };
    content: ReactNode;
    resizable?: boolean;
    statusBar?: ReactNode;
};
