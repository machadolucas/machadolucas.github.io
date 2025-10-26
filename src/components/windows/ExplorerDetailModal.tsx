import type { ComponentType, CSSProperties, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { Frame, Modal, TitleBar } from "@react95/core";
import { FileText, Globe, Shdocvw257 } from "@react95/icons";
import type { ExplorerFile } from "@/types/explorer";

type IconComponentType = ComponentType<{ variant?: string }>;

const defaultIconComponent = FileText as IconComponentType;

type ExplorerModalProps = {
    id?: string;
    title?: string;
    icon?: ReactNode;
    hasWindowButton?: boolean;
    style?: CSSProperties;
    className?: string;
    buttons?: Array<{ value: string; onClick: () => void }>;
    buttonsAlignment?: CSSProperties["justifyContent"];
    titleBarOptions?: ReactNode;
    children?: ReactNode;
};

type ExplorerDetailModalProps = {
    item: ExplorerFile;
    collectionLabel: string;
    onClose: () => void;
    IconComponent?: IconComponentType;
    responsiveBasePath?: string;
};

const ModalComponent = Modal as unknown as ComponentType<ExplorerModalProps>;

type TitleBarButtonHandlers = {
    onMouseDown?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    onMouseUp?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

const createReleaseHandlers = (action: () => void): TitleBarButtonHandlers => {
    let shouldClose = false;

    return {
        onMouseDown: (event) => {
            if (event.button !== 0) {
                shouldClose = false;
                return;
            }

            shouldClose = true;
        },
        onMouseLeave: () => {
            shouldClose = false;
        },
        onMouseUp: (event) => {
            if (!shouldClose || event.button !== 0) {
                return;
            }

            shouldClose = false;
            event.preventDefault();
            action();
        },
        onClick: (event) => {
            if (event.detail === 0) {
                event.preventDefault();
                action();
                return;
            }

            if (shouldClose) {
                event.preventDefault();
            }
        },
    };
};

const ExplorerDetailModal = ({
    item,
    collectionLabel,
    onClose,
    IconComponent = defaultIconComponent,
    responsiveBasePath,
}: ExplorerDetailModalProps) => {
    const locationDisplay = `C:\\Desktop\\${collectionLabel}\\${item.fileName}`;
    const responsiveHref = responsiveBasePath ? `${responsiveBasePath}/${item.slug}` : null;

    return (
        <ModalComponent
            id={`explorer-${item.slug}`}
            title={item.title}
            icon={<IconComponent variant="16x16_4" />}
            hasWindowButton
            style={{
                left: 180,
                top: 90,
                width: "min(92vw, 720px)",
                minWidth: 400,
                maxHeight: "calc(100vh - 120px)",
                overflow: "hidden",
                resize: "both",
            }}
            className="flex flex-col"
            titleBarOptions={
                <>
                    {responsiveHref ? (
                        <TitleBar.Option
                            onClick={() => {
                                if (typeof window === "undefined") {
                                    return;
                                }

                                try {
                                    window.open(responsiveHref, "_blank", "noopener,noreferrer");
                                } catch (error) {
                                    console.error(`Failed to open responsive view for ${responsiveHref}`, error);
                                }
                            }}
                            title="Open responsive view in a new tab"
                            aria-label="Open responsive view in a new tab"
                            className="ml-1"
                        >
                            <Shdocvw257 variant="16x16_4" />
                            <span className="sr-only">Open responsive view</span>
                        </TitleBar.Option>
                    ) : null}
                    <Modal.Minimize />
                    <TitleBar.Close {...createReleaseHandlers(onClose)} />
                </>
            }
        >
            <Modal.Content className="bg-[#c3c7cb] text-sm text-slate-800 overflow-hidden flex-1 window-shell p-0! m-[2px]!">
                <Frame boxShadow="$out" className="browser-toolbar flex items-center gap-2 bg-[#e4e4e4] px-3 py-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.08em] text-[#000080]">Location</span>
                    <Frame boxShadow="$in" className="flex-1 bg-white px-2 py-[2px] text-[11px]">
                        {locationDisplay}
                    </Frame>
                </Frame>
                <div className="window-shell__scroller overflow-hidden">
                    <div className="space-y-4 bg-white p-4 leading-normal overflow-auto">
                        <h2 className="text-lg font-semibold text-[#000080]">{item.title}</h2>
                        {item.date ? (
                            <p className="text-xs uppercase tracking-[0.08em] text-[#555555]">
                                {new Date(item.date).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })}
                            </p>
                        ) : null}
                        <div
                            className="browser-markdown"
                            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                        />

                        {item.tags.length ? (
                            <div className="flex flex-wrap gap-2 text-xs text-[#000080]">
                                {item.tags.map((tag) => (
                                    <Frame key={tag} boxShadow="$out" className="bg-[#f3f3f3] px-2 py-1">
                                        #{tag}
                                    </Frame>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="window-status-bar">{item.fileName}</div>
            </Modal.Content>
        </ModalComponent>
    );
};

export type { ExplorerDetailModalProps };

export default ExplorerDetailModal;
