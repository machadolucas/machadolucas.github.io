import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Frame, Modal, TitleBar } from "@react95/core";
import { FileText, Globe } from "@react95/icons";
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

const ExplorerDetailModal = ({
    item,
    collectionLabel,
    onClose,
    IconComponent = defaultIconComponent,
    responsiveBasePath,
}: ExplorerDetailModalProps) => {
    const locationDisplay = `C:\\Portfolio\\${collectionLabel}\\${item.fileName}`;
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
                        <button
                            type="button"
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
                            className="ml-1 flex h-6 w-6 items-center justify-center rounded-sm border border-[#7f7f7f] bg-[#e5e5e5] text-[#000080] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7f7f7f] transition hover:bg-[#f8f8f8] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#000080]"
                        >
                            <Globe variant="16x16_4" />
                            <span className="sr-only">Open responsive view</span>
                        </button>
                    ) : null}
                    <Modal.Minimize />
                    <TitleBar.Close onClick={onClose} />
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
