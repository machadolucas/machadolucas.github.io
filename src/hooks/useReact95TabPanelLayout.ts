'use client';

import { useEffect, useRef } from "react";

const useReact95TabPanelLayout = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = ref.current;

        if (!container) {
            return;
        }

        const panel = container.parentElement;

        if (!panel) {
            return;
        }

        const previousPanelStyles = {
            display: panel.style.display,
            flex: panel.style.flex,
            minHeight: panel.style.minHeight,
            overflow: panel.style.overflow,
            padding: panel.style.padding,
        };

        const previousContainerStyles = {
            display: container.style.display,
            flex: container.style.flex,
            flexDirection: container.style.flexDirection,
            minHeight: container.style.minHeight,
        };

        panel.style.display = "flex";
        panel.style.flex = "1 1 auto";
        panel.style.minHeight = "0";
        panel.style.overflow = "hidden";
        panel.style.padding = "0";

        container.style.display = "flex";
        container.style.flex = "1 1 auto";
        container.style.flexDirection = "column";
        container.style.minHeight = "0";

        return () => {
            panel.style.display = previousPanelStyles.display;
            panel.style.flex = previousPanelStyles.flex;
            panel.style.minHeight = previousPanelStyles.minHeight;
            panel.style.overflow = previousPanelStyles.overflow;
            panel.style.padding = previousPanelStyles.padding;

            container.style.display = previousContainerStyles.display;
            container.style.flex = previousContainerStyles.flex;
            container.style.flexDirection = previousContainerStyles.flexDirection;
            container.style.minHeight = previousContainerStyles.minHeight;
        };
    }, []);

    return ref;
};

export default useReact95TabPanelLayout;
