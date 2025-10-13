"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import type { DesktopApp } from "./types";

type DesktopIconProps = {
    app: DesktopApp;
    isSelected: boolean;
    onActivate: () => void;
    onFocus: () => void;
};

const DesktopIcon = ({ app, isSelected, onActivate, onFocus }: DesktopIconProps) => {
    const Icon = app.icon;
    const imageRef = useRef<HTMLDivElement | null>(null);
    const maskValueRef = useRef<string | null>(null);

    useEffect(() => {
        const container = imageRef.current;

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
                console.error("Failed to encode icon mask", error);
                return null;
            }
        };

        if (isSelected) {
            const maskValue = ensureMaskValue();

            if (maskValue) {
                container.style.setProperty("--desktop-icon-mask", maskValue);
            }
        } else {
            container.style.removeProperty("--desktop-icon-mask");
        }
    }, [isSelected]);

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (event.detail >= 2) {
            onActivate();
        } else {
            onFocus();
        }
    };

    return (
        <button
            type="button"
            className="flex w-[84px] flex-col items-center gap-2 text-sm text-white focus:outline-none"
            onClick={handleClick}
            onDoubleClick={onActivate}
            onMouseDown={(event) => {
                event.stopPropagation();
            }}
            onTouchEnd={(event) => {
                event.preventDefault();
                onActivate();
            }}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onActivate();
                }
            }}
        >
            <div
                ref={imageRef}
                className={`desktop-icon-image ${isSelected ? "desktop-icon-image-selected" : ""}`}
            >
                <Icon variant={app.iconVariants.large} className="h-12 w-12" />
            </div>
            <span
                className={`block px-[1px] text-center leading-tight ${isSelected
                    ? "border border-dotted border-white bg-[#000080] text-white"
                    : "border border-[#018281] bg-[#018281] text-white"
                    }`}
            >
                {app.label}
            </span>
        </button>
    );
};

export type { DesktopIconProps };
export default DesktopIcon;
