"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
    ComponentType,
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from "react";
import { Frame } from "@react95/core";
import { FileText } from "@react95/icons";
import type { ExplorerFile } from "@/types/explorer";
import useModalContentFlex from "@/hooks/useModalContentFlex";

type IconComponentType = ComponentType<{ variant?: string }>;

const defaultIconComponent = FileText as IconComponentType;

type ExplorerWindowProps = {
    items: ExplorerFile[];
    onItemOpen: (item: ExplorerFile) => void;
    emptyMessage?: string;
    IconComponent?: IconComponentType;
};

const ExplorerWindow = ({
    items,
    onItemOpen,
    emptyMessage = "No files were found.",
    IconComponent = defaultIconComponent,
}: ExplorerWindowProps) => {
    const sortedItems = useMemo<ExplorerFile[]>(() => {
        const parseDate = (value: string | null) => {
            if (!value) {
                return null;
            }

            const timestamp = new Date(value).getTime();
            return Number.isNaN(timestamp) ? null : timestamp;
        };

        const sorted = [...items];
        sorted.sort((a, b) => {
            const dateA = parseDate(a.date ?? null);
            const dateB = parseDate(b.date ?? null);

            if (dateA !== null && dateB !== null) {
                if (dateA === dateB) {
                    return a.title.localeCompare(b.title);
                }

                return dateB - dateA;
            }

            if (dateA !== null) {
                return -1;
            }

            if (dateB !== null) {
                return 1;
            }

            return a.title.localeCompare(b.title);
        });

        return sorted;
    }, [items]);

    const [selectedSlug, setSelectedSlug] = useState<string | null>(
        sortedItems[0]?.slug ?? null
    );

    useEffect(() => {
        if (!sortedItems.length) {
            setSelectedSlug(null);
            return;
        }

        setSelectedSlug((current) => {
            if (current && sortedItems.some((item) => item.slug === current)) {
                return current;
            }

            return sortedItems[0]?.slug ?? null;
        });
    }, [sortedItems]);

    const containerRef = useModalContentFlex();

    return (
        <div
            ref={containerRef}
            className="flex flex-1 flex-col overflow-hidden text-slate-800"
            onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
                const target = event.target as HTMLElement | null;
                if (target?.closest("button")) {
                    return;
                }

                setSelectedSlug(null);
            }}
        >
            <Frame
                boxShadow="$in"
                className="flex-1 overflow-auto bg-white p-3"
                style={{ minHeight: 0 }}
            >
                {sortedItems.length ? (
                    <div className="flex flex-wrap gap-2">
                        {sortedItems.map((item) => (
                            <ExplorerIcon
                                key={item.slug}
                                item={item}
                                isSelected={selectedSlug === item.slug}
                                onSelect={() => setSelectedSlug(item.slug)}
                                onOpen={() => onItemOpen(item)}
                                IconComponent={IconComponent}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#000080]">
                        <span>{emptyMessage}</span>
                    </div>
                )}
            </Frame>
        </div>
    );
};

type ExplorerIconProps = {
    item: ExplorerFile;
    isSelected: boolean;
    onSelect: () => void;
    onOpen: () => void;
    IconComponent: IconComponentType;
};

const ExplorerIcon = ({ item, isSelected, onSelect, onOpen, IconComponent }: ExplorerIconProps) => (
    <button
        type="button"
        onMouseDown={(event: ReactMouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
        }}
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
        <ExplorerIconImage isSelected={isSelected}>
            <IconComponent variant="32x32_4" />
        </ExplorerIconImage>
        <span className="projects-explorer-icon__label" title={item.title}>
            {item.title}
        </span>
    </button>
);

type ExplorerIconImageProps = {
    isSelected: boolean;
    children: ReactNode;
};

const ExplorerIconImage = ({ isSelected, children }: ExplorerIconImageProps) => {
    const containerRef = useRef<HTMLSpanElement | null>(null);
    const maskValueRef = useRef<string | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const ensureMaskValue = () => {
            if (maskValueRef.current) {
                return maskValueRef.current;
            }

            const svgElement = container.querySelector("svg");

            if (!svgElement || typeof window === "undefined") {
                return null;
            }

            try {
                const serializer = new XMLSerializer();
                const svgString = serializer.serializeToString(svgElement);
                const encodedSvg = window.btoa(unescape(encodeURIComponent(svgString)));
                const maskValue = `url("data:image/svg+xml;base64,${encodedSvg}")`;
                maskValueRef.current = maskValue;
                return maskValue;
            } catch (error) {
                console.error("Failed to encode explorer icon mask", error);
                return null;
            }
        };

        if (isSelected) {
            const maskValue = ensureMaskValue();

            if (maskValue) {
                container.classList.add("projects-explorer-icon__image--selected");
                container.style.setProperty("--projects-icon-mask", maskValue);
            }
        } else {
            container.classList.remove("projects-explorer-icon__image--selected");
            container.style.removeProperty("--projects-icon-mask");
        }
    }, [isSelected]);

    return (
        <span ref={containerRef} className="projects-explorer-icon__image">
            {children}
        </span>
    );
};

export default ExplorerWindow;
