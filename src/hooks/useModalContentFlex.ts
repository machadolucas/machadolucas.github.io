'use client';

import { useEffect, useRef } from "react";

const useModalContentFlex = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = ref.current;

        if (!container) {
            return;
        }

        const parent = container.parentElement;

        if (!parent) {
            return;
        }

        const previousParentStyles = {
            display: parent.style.display,
            flex: parent.style.flex,
            minHeight: parent.style.minHeight,
        };

        const previousContainerStyles = {
            display: container.style.display,
            flex: container.style.flex,
            flexDirection: container.style.flexDirection,
            minHeight: container.style.minHeight,
        };

        parent.style.display = "flex";
        parent.style.flex = "1 1 auto";
        parent.style.minHeight = "0";

        container.style.display = "flex";
        container.style.flex = "1 1 auto";
        container.style.flexDirection = "column";
        container.style.minHeight = "0";

        return () => {
            parent.style.display = previousParentStyles.display;
            parent.style.flex = previousParentStyles.flex;
            parent.style.minHeight = previousParentStyles.minHeight;

            container.style.display = previousContainerStyles.display;
            container.style.flex = previousContainerStyles.flex;
            container.style.flexDirection = previousContainerStyles.flexDirection;
            container.style.minHeight = previousContainerStyles.minHeight;
        };
    }, []);

    return ref;
};

export default useModalContentFlex;
