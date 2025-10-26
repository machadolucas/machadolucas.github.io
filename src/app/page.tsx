"use client";

import type {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List, Modal, ModalEvents, RadioButton, TaskBar, TitleBar, useModal } from "@react95/core";
import { Computer, Computer3, Computer4, Desk100, Folder, MediaCd, Progman24, Shdocvw257, Wab321016, Wmsui323926 } from "@react95/icons";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import type { DesktopApp } from "@/components/desktop/types";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import HomeAutomationWindow from "@/components/windows/HomeAutomationWindow";
import FavoriteSongsWindow from "@/components/windows/FavoriteSongsWindow";
import ExplorerDetailModal from "@/components/windows/ExplorerDetailModal";
import StarfieldScreensaver from "@/components/screensaver/StarfieldScreensaver";
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

type TitleBarButtonHandlers = {
  onMouseDown?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

const createTitleBarReleaseHandlers = (action: () => void): TitleBarButtonHandlers => {
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

type ShutdownOption = "shutdown" | "standby";

const shutdownOptions: Array<{ value: ShutdownOption; label: string }> = [
  { value: "shutdown", label: "Shut down" },
  { value: "standby", label: "Stand by" },
];

const shutdownDescriptions: Record<ShutdownOption, string> = {
  shutdown: "Ends your session and shuts down the computer so that you can safely turn off power.",
  standby: "Switches the computer to a low-power state. Press any key or move the mouse to resume.",
};

export default function Home() {
  const { focus, restore, minimize, subscribe } = useModal();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({});
  const [pendingWindowAction, setPendingWindowAction] = useState<string | null>(null);
  const openAppsRef = useRef(openApps);
  const activeWindowIdRef = useRef<string | null>(null);
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  const [shutdownSelection, setShutdownSelection] = useState<ShutdownOption>("shutdown");
  const [activeExplorerDetail, setActiveExplorerDetail] = useState<{
    collection: ExplorerCollectionKey;
    slug: string;
  } | null>(null);

  useEffect(() => {
    openAppsRef.current = openApps;
  }, [openApps]);

  useEffect(() => {
    const unsubscribe = subscribe(ModalEvents.ModalVisibilityChanged, ({ id }) => {
      if (id === "no-id") {
        activeWindowIdRef.current = null;
        return;
      }

      activeWindowIdRef.current = typeof id === "string" ? id : null;
    });

    return unsubscribe;
  }, [subscribe]);

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
      const alreadyOpen = Boolean(openAppsRef.current[id]);
      setSelectedIcon(id);

      if (alreadyOpen) {
        restore(id);
        focus(id);
        return;
      }

      setOpenApps((prev) => {
        if (prev[id]) {
          return prev;
        }

        const nextState = { ...prev, [id]: true };
        openAppsRef.current = nextState;
        return nextState;
      });

      setPendingWindowAction(id);
    },
    [focus, restore]
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

  const handleOpenResponsive = useCallback((path: string) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.open(path, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(`Failed to open responsive view for ${path}`, error);
    }
  }, []);

  const responsiveShortcut = useMemo<DesktopApp>(
    () => ({
      id: "responsive-index",
      title: "Responsive web version",
      label: "Web version",
      icon: Shdocvw257,
      iconVariants: {
        large: "32x32_8",
        small: "16x16_4",
      },
      windowPosition: { left: 260, top: 220, width: 480 },
      content: null,
      resizable: false,
      responsivePath: "/responsive",
    }),
    []
  );

  const handleDesktopIconFocus = useCallback(
    (id: string) => {
      setSelectedIcon(id);

      const activeId = activeWindowIdRef.current;

      if (activeId && openAppsRef.current[activeId]) {
        focus(activeId);
      }
    },
    [focus]
  );

  const handleIconActivate = useCallback(
    (app: DesktopApp) => {
      if (app.id === "responsive-index") {
        handleOpenResponsive("/responsive");
        return;
      }

      openApp(app.id);
    },
    [handleOpenResponsive, openApp]
  );

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
        responsivePath: "/responsive/about",
      },
      {
        id: "experience",
        title: "Professional information",
        label: "Professional",
        icon: Desk100,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 100, top: 100, width: 720 },
        content: <ExperienceWindow />,
        resizable: true,
        statusBar: "Ready",
        responsivePath: "/responsive/professional",
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
        responsivePath: "/responsive/projects",
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
        responsivePath: "/responsive/home-automation",
      },
      {
        id: "favorite-songs",
        title: "Favorite songs",
        label: "Favorite songs",
        icon: MediaCd,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 180, top: 180, width: 335 },
        content: <FavoriteSongsWindow />,
        resizable: true,
        statusBar: "Ready",
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
        responsivePath: "/responsive/contact",
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
      openAppsRef.current = nextState;
      return nextState;
    });
  }, []);

  const openShutdownModal = useCallback(() => {
    setShutdownSelection("shutdown");
    setIsShutdownModalOpen(true);
  }, []);

  const handleShutdownCancel = useCallback(() => {
    setIsShutdownModalOpen(false);
  }, []);

  const handleStandBy = useCallback(() => {
    setIsShutdownModalOpen(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("desktop:screensaver:start"));
    }
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

  const handleShutdownOk = useCallback(() => {
    if (shutdownSelection === "standby") {
      handleStandBy();
      return;
    }

    handleShutdownConfirm();
  }, [handleShutdownConfirm, handleStandBy, shutdownSelection]);

  const handleShutdownSelectionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ShutdownOption;
      setShutdownSelection(value);
    },
    []
  );

  useEffect(() => {
    if (!pendingWindowAction) {
      return;
    }

    const id = pendingWindowAction;

    const focusWindow = () => {
      if (openAppsRef.current[id]) {
        focus(id);
      }

      setPendingWindowAction(null);
    };

    if (typeof window !== "undefined") {
      const frame = window.requestAnimationFrame(focusWindow);
      return () => window.cancelAnimationFrame(frame);
    }

    focusWindow();
  }, [pendingWindowAction, focus]);

  const desktopIcons = useMemo<DesktopApp[]>(
    () => [responsiveShortcut, ...apps],
    [apps, responsiveShortcut]
  );

  const startMenu = useMemo(
    () => (
      <List width={"200px"}>
        {apps.map((app) => (
          <List.Item
            key={app.id}
            onClick={() => openApp(app.id)}
            icon={<app.icon variant={app.iconVariants.large} />}
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

  const activeExplorerResponsiveBasePath = activeExplorerDetail
    ? activeExplorerDetail.collection === "projects"
      ? "/responsive/projects"
      : "/responsive/home-automation"
    : null;

  const ModalComponent = Modal as unknown as ComponentType<DesktopModalProps>;

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" />
      <div className="relative flex min-h-screen flex-col">
        <section className="flex-1 p-6" onMouseDown={() => setSelectedIcon(null)}>
          <div className="flex w-max flex-col items-center gap-6">
            {desktopIcons.map((app) => (
              <DesktopIcon
                key={app.id}
                app={app}
                isSelected={selectedIcon === app.id}
                onFocus={() => handleDesktopIconFocus(app.id)}
                onActivate={() => handleIconActivate(app)}
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
          icon={<Computer4 variant="16x16_4" />}
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
            { value: "OK", onClick: handleShutdownOk },
            { value: "Cancel", onClick: handleShutdownCancel },
          ]}
          buttonsAlignment="flex-end"
          titleBarOptions={<TitleBar.Close {...createTitleBarReleaseHandlers(handleShutdownCancel)} />}
        >
          <Modal.Content className="@container flex-1 overflow-y-auto bg-[#c3c7cb] text-sm text-slate-800">
            <div className="flex items-start gap-4 p-2">
              <Computer4 variant="32x32_4" className="mt-1" />
              <div className="flex flex-1 flex-col gap-3">
                <p className="leading-snug">What do you want the computer to do?</p>
                <div
                  role="radiogroup"
                  aria-describedby="shutdown-selection-description"
                  className="flex flex-col gap-1"
                >
                  {shutdownOptions.map((option) => (
                    <div key={option.value} className="flex gap-1 text-sm text-slate-800">
                      <div className="pt-[2px]">
                        <RadioButton
                          name="shutdown-selection"
                          value={option.value}
                          checked={shutdownSelection === option.value}
                          onChange={handleShutdownSelectionChange}
                        >
                        </RadioButton>
                      </div>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
                <p id="shutdown-selection-description" className="pb-4" >
                  {shutdownDescriptions[shutdownSelection]}
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
            icon={<app.icon variant={app.iconVariants.small ?? app.iconVariants.large} />}
            hasWindowButton
            style={getModalStyle(app, index)}
            className="flex flex-col"
            titleBarOptions={
              <>
                {app.responsivePath ? (
                  <TitleBar.Option
                    onClick={() => handleOpenResponsive(app.responsivePath!)}
                    title="Open responsive view in a new tab"
                    aria-label="Open responsive view in a new tab"
                    className="ml-1"
                  >
                    <Shdocvw257 variant="16x16_4" />
                    <span className="sr-only">Open responsive view</span>
                  </TitleBar.Option>
                ) : null}
                <Modal.Minimize onClick={() => minimize(app.id)} />
                <TitleBar.Close {...createTitleBarReleaseHandlers(() => closeApp(app.id))} />
              </>
            }
          >
            {app.resizable === false ? (
              <Modal.Content className="@container m-[2px]! flex-1 overflow-y-auto bg-[#c3c7cb] p-0! text-sm text-slate-800">
                {app.content}
              </Modal.Content>
            ) : (
              <Modal.Content className="@container m-[0px]! grid grid-rows-[1fr_auto] overflow-hidden bg-[#c3c7cb] p-0! text-sm text-slate-800">
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
          responsiveBasePath={activeExplorerResponsiveBasePath ?? undefined}
        />
      ) : null}

      <StarfieldScreensaver />
    </main>
  );
}
