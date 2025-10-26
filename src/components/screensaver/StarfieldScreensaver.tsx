"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        Starfield?: {
            setup: (config: Record<string, unknown>) => void;
            cleanup: () => void;
            resize: (width: number, height: number) => void;
            setOrigin: (x: number, y: number) => void;
        };
    }
}

const INACTIVITY_TIMEOUT = 30000;
const MOVEMENT_THRESHOLD = 12;
const STARFIELD_CDN_SRC = "https://cdn.jsdelivr.net/gh/AnnikaV9/starfield.js@1.5.0/starfield.js";

const StarfieldScreensaver = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isActive, setIsActive] = useState(false);
    const activeRef = useRef(false);
    const startInProgressRef = useRef(false);
    const startAttemptRef = useRef(0);
    const inactivityTimerRef = useRef<number | null>(null);
    const starfieldScriptPromiseRef = useRef<Promise<typeof window.Starfield> | null>(null);
    const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

    const setActiveState = useCallback((value: boolean) => {
        activeRef.current = value;
        setIsActive(value);
    }, []);

    const ensureStarfieldScript = useCallback(() => {
        if (typeof window === "undefined") {
            return Promise.resolve(undefined);
        }

        if (window.Starfield) {
            return Promise.resolve(window.Starfield);
        }

        if (!starfieldScriptPromiseRef.current) {
            starfieldScriptPromiseRef.current = new Promise((resolve, reject) => {
                const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${STARFIELD_CDN_SRC}"]`);

                const script = existingScript ?? document.createElement("script");
                script.src = STARFIELD_CDN_SRC;
                script.async = true;

                const handleLoad = () => {
                    if (window.Starfield) {
                        resolve(window.Starfield);
                    } else {
                        starfieldScriptPromiseRef.current = null;
                        reject(new Error("Starfield global not available after script load."));
                    }
                };

                const handleError = () => {
                    starfieldScriptPromiseRef.current = null;
                    reject(new Error("Failed to load Starfield screensaver script."));
                };

                if (window.Starfield) {
                    resolve(window.Starfield);
                    return;
                }

                script.addEventListener("load", handleLoad, { once: true });
                script.addEventListener("error", handleError, { once: true });

                if (!existingScript) {
                    document.head.appendChild(script);
                }
            });
        }

        return starfieldScriptPromiseRef.current;
    }, []);

    const stopScreensaver = useCallback(() => {
        if (!activeRef.current && !startInProgressRef.current) {
            return;
        }

        startAttemptRef.current += 1;
        startInProgressRef.current = false;

        const starfield = window.Starfield;
        starfield?.cleanup?.();

        const container = containerRef.current;
        if (container) {
            container.replaceChildren();
            container.style.width = "";
            container.style.height = "";
        }

        lastPointerRef.current = null;
        setActiveState(false);
    }, [setActiveState]);

    const startScreensaver = useCallback(async () => {
        if (typeof window === "undefined" || activeRef.current || startInProgressRef.current) {
            return;
        }

        const container = containerRef.current;

        if (!container) {
            return;
        }

        startInProgressRef.current = true;
        const attemptId = startAttemptRef.current + 1;
        startAttemptRef.current = attemptId;

        try {
            const starfield = await ensureStarfieldScript();

            if (!starfield || activeRef.current || startAttemptRef.current !== attemptId) {
                return;
            }

            container.replaceChildren();
            container.style.width = "100%";
            container.style.height = "100%";

            await new Promise<void>((resolve) => {
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => resolve());
                });
            });

            if (startAttemptRef.current !== attemptId || activeRef.current) {
                return;
            }

            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;

            starfield.cleanup?.();
            starfield.setup({
                container,
                auto: false,
                numStars: 420,
                baseSpeed: 5,
                trailLength: 0,
                starColor: "rgb(255, 255, 255)",
                canvasColor: "rgb(0, 0, 0)",
                originX: width / 2,
                originY: height / 2,
                hueJitter: 0,
                maxAcceleration: 8,
                accelerationRate: 0.05,
                decelerationRate: 0.05,
            });

            starfield.resize?.(width, height);
            starfield.setOrigin?.(width / 2, height / 2);
            setActiveState(true);
        } catch (error) {
            console.error("[screensaver] Failed to start starfield", error);
            setActiveState(false);
        } finally {
            if (startAttemptRef.current === attemptId) {
                startInProgressRef.current = false;
            }
        }
    }, [ensureStarfieldScript, setActiveState]);

    const scheduleActivation = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (inactivityTimerRef.current) {
            window.clearTimeout(inactivityTimerRef.current);
        }

        inactivityTimerRef.current = window.setTimeout(() => {
            void startScreensaver();
        }, INACTIVITY_TIMEOUT);
    }, [startScreensaver]);

    const handlePointerActivity = useCallback(
        (x: number | null, y: number | null, forceExit = false) => {
            if (activeRef.current) {
                if (forceExit || x === null || y === null) {
                    stopScreensaver();
                    scheduleActivation();
                    return;
                }

                const lastPointer = lastPointerRef.current;
                lastPointerRef.current = { x, y };

                if (!lastPointer) {
                    return;
                }

                const dx = x - lastPointer.x;
                const dy = y - lastPointer.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance >= MOVEMENT_THRESHOLD) {
                    stopScreensaver();
                    scheduleActivation();
                }

                return;
            }

            if (startInProgressRef.current) {
                stopScreensaver();
                scheduleActivation();
                return;
            }

            if (x !== null && y !== null) {
                lastPointerRef.current = { x, y };
            }

            scheduleActivation();
        },
        [scheduleActivation, stopScreensaver]
    );

    useEffect(() => {
        if (typeof window === "undefined") {
            return () => undefined;
        }

        const handleMouseMove = (event: MouseEvent) => {
            handlePointerActivity(event.clientX, event.clientY);
        };

        const handleMouseDown = (event: MouseEvent) => {
            handlePointerActivity(event.clientX, event.clientY, true);
        };

        const handleWheel = (event: WheelEvent) => {
            handlePointerActivity(event.clientX ?? null, event.clientY ?? null, true);
        };

        const handleTouch = (event: TouchEvent) => {
            const touch = event.touches[0] ?? event.changedTouches[0];
            const x = touch ? touch.clientX : null;
            const y = touch ? touch.clientY : null;
            handlePointerActivity(x, y, true);
        };

        const handleKeyDown = () => {
            if (activeRef.current) {
                stopScreensaver();
            }

            scheduleActivation();
        };

        const handleScroll = () => {
            handlePointerActivity(null, null, true);
        };

        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                scheduleActivation();
            } else if (document.visibilityState === "hidden") {
                if (activeRef.current) {
                    stopScreensaver();
                }
                if (inactivityTimerRef.current) {
                    window.clearTimeout(inactivityTimerRef.current);
                    inactivityTimerRef.current = null;
                }
            }
        };

        const handleResize = () => {
            if (!activeRef.current) {
                return;
            }

            const container = containerRef.current;
            if (!container) {
                return;
            }

            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;

            const starfield = window.Starfield;
            starfield?.resize?.(width, height);
            starfield?.setOrigin?.(width / 2, height / 2);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mousedown", handleMouseDown, { passive: true });
        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouch, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("resize", handleResize);

        scheduleActivation();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouch);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("resize", handleResize);

            if (inactivityTimerRef.current) {
                window.clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }

            stopScreensaver();
        };
    }, [handlePointerActivity, scheduleActivation, stopScreensaver]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return () => undefined;
        }

        const handleManualStart = () => {
            if (inactivityTimerRef.current) {
                window.clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }

            void startScreensaver();
        };

        const handleManualStop = () => {
            stopScreensaver();
            scheduleActivation();
        };

        window.addEventListener("desktop:screensaver:start", handleManualStart);
        window.addEventListener("desktop:screensaver:stop", handleManualStop);

        return () => {
            window.removeEventListener("desktop:screensaver:start", handleManualStart);
            window.removeEventListener("desktop:screensaver:stop", handleManualStop);
        };
    }, [scheduleActivation, startScreensaver, stopScreensaver]);

    return (
        <div
            className={`fixed inset-0 z-[999] bg-black transition-opacity duration-500 ${isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden="true"
        >
            <div ref={containerRef} className="h-full w-full" />
        </div>
    );
};

export default StarfieldScreensaver;
