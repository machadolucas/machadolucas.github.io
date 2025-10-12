"use client";

import type { ComponentType, CSSProperties, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List, Modal, TaskBar, TitleBar, useModal } from "@react95/core";
import { Computer, Computer3, Desk100, Globe, Progman24, Wmsui323926 } from "@react95/icons";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";

type IconComponent = ComponentType<Record<string, unknown>>;
type DesktopModalProps = {
  id?: string;
  title?: string;
  icon?: ReactNode;
  hasWindowButton?: boolean;
  style?: CSSProperties;
  buttons?: Array<{ value: string; onClick: () => void }>;
  buttonsAlignment?: CSSProperties["justifyContent"];
  titleBarOptions?: ReactNode;
  children?: ReactNode;
};

type DesktopApp = {
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
};

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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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

const windowOffsets = [0, 40, 80, 120];

export default function Home() {
  const { focus, restore } = useModal();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({});
  const [pendingWindowAction, setPendingWindowAction] = useState<
    { id: string; type: "restore" | "focus" } | null
  >(null);
  const openAppsRef = useRef(openApps);
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);

  useEffect(() => {
    openAppsRef.current = openApps;
  }, [openApps]);

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
        windowPosition: { left: 160, top: 140, width: 620 },
        content: <AboutWindow />,
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
        windowPosition: { left: 220, top: 200, width: 720 },
        content: <ExperienceWindow />,
      },
      {
        id: "projects",
        title: "PORTFOLIO.W95",
        label: "Projects",
        icon: Globe,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 260, top: 120, width: 760 },
        content: <ProjectsWindow />,
      },
      {
        id: "contact",
        title: "CONTACT.ME",
        label: "Contact",
        icon: Wmsui323926,
        iconVariants: {
          large: "32x32_4",
          small: "16x16_4",
        },
        windowPosition: { left: 200, top: 260, width: 520 },
        content: <ContactWindow />,
      },
    ],
    []
  );

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
        display: "flex",
        flexDirection: "column",
        resize: "both",
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

  const ModalComponent = Modal as unknown as ComponentType<DesktopModalProps>;

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" />
      <div className="relative flex min-h-screen flex-col">
        <section className="flex-1 p-6">
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
          title="Shut Down Windows"
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
            display: "flex",
            flexDirection: "column",
          }}
          buttons={[
            { value: "Cancel", onClick: handleShutdownCancel },
            { value: "Shut Down", onClick: handleShutdownConfirm },
          ]}
          buttonsAlignment="flex-end"
          titleBarOptions={<TitleBar.Close onClick={handleShutdownCancel} />}
        >
          <Modal.Content
            className="bg-[#c3c7cb] text-sm text-slate-800 flex-1 overflow-y-auto"
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
            titleBarOptions={
              <>
                <Modal.Minimize />
                <TitleBar.Close onClick={() => closeApp(app.id)} />
              </>
            }
          >
            <Modal.Content
              className="bg-[#c3c7cb] text-sm text-slate-800 flex-1 overflow-y-auto"
            >
              {app.content}
            </Modal.Content>
          </ModalComponent>
        ) : null
      )}
    </main>
  );
}
