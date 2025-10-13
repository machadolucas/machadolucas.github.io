"use client";

import type { ComponentType, CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List, Modal, TaskBar, TitleBar, useModal } from "@react95/core";
import { Computer, Computer3, Desk100, Folder, Progman24, Wab321016, Wmsui323926 } from "@react95/icons";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import type { DesktopApp } from "@/components/desktop/types";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import HomeAutomationWindow from "@/components/windows/HomeAutomationWindow";
import ExplorerDetailModal from "@/components/windows/ExplorerDetailModal";
import { projects } from "@/data/projects";
import { homeAutomation } from "@/data/homeAutomation";
import type { ExplorerFile } from "@/types/explorer";

const explorerCollections = {
  projects: {
    label: "Projects",
    items: projects,
  },
  homeAutomation: {
    label: "Home Automation",
    items: homeAutomation,
  },
} as const;

type ExplorerCollectionKey = keyof typeof explorerCollections;

type DesktopModalProps = {
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

const windowOffsets = [0, 40, 80, 120];

export default function Home() {
  const { focus, restore, minimize } = useModal();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({});
  const [pendingWindowAction, setPendingWindowAction] = useState<
    { id: string; type: "restore" | "focus" } | null
  >(null);
  const openAppsRef = useRef(openApps);
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  const [activeExplorerDetail, setActiveExplorerDetail] = useState<{
    collection: ExplorerCollectionKey;
    slug: string;
  } | null>(null);

  const playSound = useCallback((src: string) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const audio = new Audio(src);
      void audio.play();
    } catch (error) {
      console.error(`Failed to play sound: ${src}`, error);
    }
  }, []);

  useEffect(() => {
    if (!isShutdownModalOpen) {
      return;
    }

    const runFocus = () => focus("shutdown-confirm");

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(runFocus);
    } else {
      runFocus();
    }
  }, [isShutdownModalOpen, focus]);

  useEffect(() => {
    if (!activeExplorerDetail) {
      return;
    }

    const modalId = `explorer-${activeExplorerDetail.slug}`;

    const runFocus = () => focus(modalId);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(runFocus);
    } else {
      runFocus();
    }
  }, [activeExplorerDetail, focus]);

  const isAboutOpen = Boolean(openApps.about);

  useEffect(() => {
    if (!isAboutOpen) {
      return;
    }

    playSound("/TADA.wav");
  }, [isAboutOpen, playSound]);

  useEffect(() => {
    if (!isShutdownModalOpen) {
      return;
    }

    playSound("/CHORD.wav");
  }, [isShutdownModalOpen, playSound]);

  const getModalStyle = useCallback(
    (app: DesktopApp, index: number): CSSProperties => {
      const baseWidth = app.windowPosition.width ?? 640;

      return {
        left: app.windowPosition.left + (windowOffsets[index] || 0),
        top: app.windowPosition.top + (windowOffsets[index] || 0),
        width: `min(92vw, ${baseWidth}px)`,
        minWidth: 320,
        maxWidth: "min(96vw, 880px)",
        minHeight: 260,
        maxHeight: "calc(100vh - 96px)",
        overflow: "hidden",
        resize: app.resizable === false ? "none" : "both",
      };
    },
    []
  );

  const openApp = useCallback(
    (id: string) => {
      const alreadyOpen = Boolean(openApps[id]);
      setSelectedIcon(id);
      setPendingWindowAction({
        id,
        type: alreadyOpen ? "restore" : "focus",
      });

      if (!alreadyOpen) {
        setOpenApps((prev) => ({ ...prev, [id]: true }));
      }
    },
    [openApps]
  );

  const handleProjectsOpen = useCallback((item: ExplorerFile) => {
    setActiveExplorerDetail({ collection: "projects", slug: item.slug });
  }, []);

  const handleHomeAutomationOpen = useCallback((item: ExplorerFile) => {
    setActiveExplorerDetail({ collection: "homeAutomation", slug: item.slug });
  }, []);

  const handleExplorerDetailClose = useCallback(() => {
    setActiveExplorerDetail(null);
  }, []);

  const apps = useMemo<DesktopApp[]>(
    () => [
      {
        id: "about",
        title: "About Lucas Machado",
        label: "About Lucas",
        icon: Progman24,
        iconVariants: {
          large: "32x32_4",
        },
        windowPosition: { left: 100, top: 140, width: 720 },
        content: (
          <AboutWindow
            onOpenProfessional={() => openApp("experience")}
            onOpenProjects={() => openApp("projects")}
            onOpenContact={() => openApp("contact")}
          />
        ),
        resizable: true,
        statusBar: "Ready",
      },
      {
        id: "experience",
        title: "WORKLOG.EXE",
        label: "Professional",
        icon: Desk100,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 100, top: 200, width: 720 },
        content: <ExperienceWindow />,
        resizable: true,
        statusBar: "Ready",
      },
      {
        id: "projects",
        title: "Projects",
        label: "Projects",
        icon: Folder,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 100, top: 120, width: 760 },
        content: <ProjectsWindow onProjectOpen={handleProjectsOpen} />,
        resizable: true,
        statusBar: `${projects.length} object(s)`,
      },
      {
        id: "home-automation",
        title: "Home Automation",
        label: "Home Automation",
        icon: Wab321016,
        iconVariants: {
          large: "32x32_4",
        },
        windowPosition: { left: 140, top: 160, width: 760 },
        content: (
          <HomeAutomationWindow onEntryOpen={handleHomeAutomationOpen} />
        ),
        resizable: true,
        statusBar: `${homeAutomation.length} object(s)`,
      },
      {
        id: "contact",
        title: "Contact me",
        label: "Contact",
        icon: Wmsui323926,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 200, top: 260, width: 400 },
        content: <ContactWindow />,
        resizable: false,
      },
    ],
    [openApp, handleProjectsOpen, handleHomeAutomationOpen]
  );

  const closeApp = useCallback((id: string) => {
    setOpenApps((prev) => {
      if (!prev[id]) {
        return prev;
      }

      const nextState = { ...prev };
      delete nextState[id];
      return nextState;
    });
  }, []);

  const openShutdownModal = useCallback(() => {
    setIsShutdownModalOpen(true);
  }, []);

  const handleShutdownCancel = useCallback(() => {
    setIsShutdownModalOpen(false);
  }, []);

  const handleShutdownConfirm = useCallback(() => {
    setIsShutdownModalOpen(false);

    if (typeof window === "undefined") {
      return;
    }

    const attemptClose = () => {
      window.open("", "_self");
      window.close();
    };

    attemptClose();

    window.setTimeout(() => {
      if (!window.closed) {
        window.location.href = "about:blank";
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (!pendingWindowAction) {
      return;
    }

    const { id, type } = pendingWindowAction;

    if (type === "restore") {
      restore(id);
    }

    let frameId: number | null = null;

    const runFocus = () => {
      if (openAppsRef.current[id]) {
        focus(id);
      }
    };

    if (typeof window !== "undefined") {
      frameId = window.requestAnimationFrame(runFocus);
    } else {
      runFocus();
    }

    setPendingWindowAction(null);

    return () => {
      if (frameId !== null && typeof window !== "undefined") {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pendingWindowAction, focus, restore]);

  const startMenu = useMemo(
    () => (
      <List width={'200px'}>
        {apps.map((app) => (
          <List.Item
            key={app.id}
            onClick={() => openApp(app.id)}
            icon={
              <app.icon variant={app.iconVariants.large} />
            }
            className="flex cursor-pointer"
          >
            {app.label}
          </List.Item>
        ))}
        <List.Divider className="border-[#9a9a9a]" />
        <List.Item
          onClick={openShutdownModal}
          icon={<Computer3 variant="32x32_4" />}
          className="flex cursor-pointer"
        >
          Shut Down...
        </List.Item>
      </List>
    ),
    [apps, openApp, openShutdownModal]
  );

  const activeExplorerItem = activeExplorerDetail
    ? explorerCollections[activeExplorerDetail.collection].items.find(
      (entry) => entry.slug === activeExplorerDetail.slug
    ) ?? null
    : null;

  const activeExplorerCollectionLabel = activeExplorerDetail
    ? explorerCollections[activeExplorerDetail.collection].label
    : null;

  const ModalComponent = Modal as unknown as ComponentType<DesktopModalProps>;

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" />
      <div className="relative flex min-h-screen flex-col">
        <section
          className="flex-1 p-6"
          onMouseDown={() => setSelectedIcon(null)}
        >
          <div className="flex w-max flex-col items-center gap-6">
            {apps.map((app) => (
              <DesktopIcon
                key={app.id}
                app={app}
                isSelected={selectedIcon === app.id}
                onFocus={() => setSelectedIcon(app.id)}
                onActivate={() => openApp(app.id)}
              />
            ))}
          </div>
        </section>

        <TaskBar list={startMenu} className="desktop-taskbar" />
      </div>

      {isShutdownModalOpen ? (
        <ModalComponent
          id="shutdown-confirm"
          title="Shut Down..."
          icon={<Computer variant="16x16_4" />}
          hasWindowButton
          style={{
            left: 360,
            top: 220,
            width: "min(82vw, 420px)",
            minWidth: 280,
            maxWidth: "min(90vw, 520px)",
            maxHeight: "calc(100vh - 120px)",
            overflow: "hidden",
            resize: "none",
          }}
          buttons={[
            { value: "Cancel", onClick: handleShutdownCancel },
            { value: "Shut Down", onClick: handleShutdownConfirm },
          ]}
          buttonsAlignment="flex-end"
          titleBarOptions={<TitleBar.Close onClick={handleShutdownCancel} />}
        >
          <Modal.Content
            className="@container bg-[#c3c7cb] text-sm text-slate-800 flex-1 overflow-y-auto"
          >
            <div className="flex items-center gap-4 p-4">
              <Computer variant="32x32_4" />
              <div className="space-y-2">
                <p className="leading-snug">Are you sure you want to shut down the computer?</p>
                <p className="text-xs text-[#000080]">
                  Make sure you have saved all your work before shutting down.
                </p>
              </div>
            </div>
          </Modal.Content>
        </ModalComponent>
      ) : null}

      {apps.map((app, index) =>
        openApps[app.id] ? (
          <ModalComponent
            key={app.id}
            id={app.id}
            title={app.title}
            icon={
              <app.icon variant={app.iconVariants.small ?? app.iconVariants.large} />
            }
            hasWindowButton
            style={getModalStyle(app, index)}
            className="flex flex-col"
            titleBarOptions={
              <>
                <Modal.Minimize onClick={() => minimize(app.id)} />
                <TitleBar.Close onClick={() => closeApp(app.id)} />
              </>
            }
          >
            {app.resizable === false ? (
              <Modal.Content className="@container bg-[#c3c7cb] text-sm text-slate-800 flex-1 overflow-y-auto p-0! m-[3px]!">
                {app.content}
              </Modal.Content>
            ) : (
              <Modal.Content className="@container bg-[#c3c7cb] text-sm text-slate-800 flex-1 window-shell p-0! m-[3px]!">
                <div className="window-shell__scroller">{app.content}</div>
                <div className="window-status-bar">{app.statusBar ?? "Ready"}</div>
              </Modal.Content>
            )}
          </ModalComponent>
        ) : null
      )}

      {activeExplorerItem && activeExplorerCollectionLabel ? (
        <ExplorerDetailModal
          item={activeExplorerItem}
          collectionLabel={activeExplorerCollectionLabel}
          onClose={handleExplorerDetailClose}
        />
      ) : null}
    </main>
  );
}
