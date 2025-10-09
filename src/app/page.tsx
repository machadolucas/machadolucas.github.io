"use client";

import type { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Frame, List, Modal, TaskBar, TitleBar, useModal } from "@react95/core";
import { Computer, Folder, Globe, Mail } from "@react95/icons";
import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { variant?: "32x32_4" | "16x16_4" }>;
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
      <Icon variant="32x32_4" className="h-12 w-12" />
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

  const apps = useMemo<DesktopApp[]>(
    () => [
      {
        id: "about",
        title: "ABOUT_ME.TXT",
        label: "About Lucas",
        icon: Computer,
        windowPosition: { left: 160, top: 140, width: 420 },
        content: <AboutWindow />,
      },
      {
        id: "experience",
        title: "WORKLOG.EXE",
        label: "Professional",
        icon: Folder,
        windowPosition: { left: 240, top: 200, width: 480 },
        content: <ExperienceWindow />,
      },
      {
        id: "projects",
        title: "PORTFOLIO.W95",
        label: "Projects",
        icon: Globe,
        windowPosition: { left: 320, top: 120, width: 520 },
        content: <ProjectsWindow />,
      },
      {
        id: "contact",
        title: "CONTACT.ME",
        label: "Contact",
        icon: Mail,
        windowPosition: { left: 200, top: 260, width: 360 },
        content: <ContactWindow />,
      },
    ],
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

  useEffect(() => {
    if (!pendingWindowAction) {
      return;
    }

    const { id, type } = pendingWindowAction;

    if (type === "restore") {
      restore(id);
    }

    const runFocus = () => focus(id);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(runFocus);
    } else {
      runFocus();
    }

    setPendingWindowAction(null);
  }, [pendingWindowAction, focus, restore]);

  const startMenu = useMemo(
    () => (
      <Frame boxShadow="$out" className="min-w-[220px] bg-[#c6c6c6] p-2 text-[#1f1f1f]">
        <List className="bg-transparent text-sm">
          {apps.map((app) => (
            <List.Item
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 hover:bg-[#000080] hover:text-white"
            >
              <app.icon variant="16x16_4" />
              {app.label}
            </List.Item>
          ))}
          <List.Divider className="border-[#9a9a9a]" />
          <List.Item className="px-2 py-2 text-xs text-[#505050]">
            Crafted with Next.js · Export static and deploy anywhere ✨
          </List.Item>
        </List>
      </Frame>
    ),
    [apps, openApp]
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

      {apps.map((app, index) =>
        openApps[app.id] ? (
          <ModalComponent
            key={app.id}
            id={app.id}
            title={app.title}
            icon={<app.icon variant="16x16_4" />}
            hasWindowButton
            style={{
              left: app.windowPosition.left + (windowOffsets[index] || 0),
              top: app.windowPosition.top + (windowOffsets[index] || 0),
              width: app.windowPosition.width,
            }}
            buttons={[{ value: "Close", onClick: () => closeApp(app.id) }]}
            buttonsAlignment="flex-end"
            titleBarOptions={
              <>
                <Modal.Minimize />
                <TitleBar.Close onClick={() => closeApp(app.id)} />
              </>
            }
          >
            <Modal.Content className="bg-white text-sm text-slate-800">
              {app.content}
            </Modal.Content>
          </ModalComponent>
        ) : null
      )}
    </main>
  );
}
