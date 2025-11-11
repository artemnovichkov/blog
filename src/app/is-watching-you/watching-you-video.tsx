"use client";

import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 25;
const FPS = 60;
const FRAME_INTERVAL = 1000 / FPS;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const normalize = (value: number, center: number, maxDistance: number) =>
  clamp((value - center) / maxDistance, -1, 1);

const toGridIndex = (normalized: number, steps: number) =>
  Math.round(((normalized + 1) / 2) * (steps - 1));

const calculateFrameIndex = (
  cursorX: number,
  cursorY: number,
  containerRect: DOMRect
) => {
  const normalizedX = normalize(
    cursorX,
    window.innerWidth / 2,
    window.innerWidth / 2
  );
  const normalizedY = normalize(
    cursorY,
    containerRect.top + containerRect.height / 2,
    containerRect.height / 2
  );

  const gridX = toGridIndex(normalizedX, GRID_SIZE);
  const gridY = toGridIndex(normalizedY, GRID_SIZE);

  return gridY * GRID_SIZE + gridX;
};

export function WatchingYouVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFrameTime = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.load();

    const handleLoadedData = () => {
      setIsLoaded(true);
      const centerFrame = Math.floor((GRID_SIZE / 2) * GRID_SIZE + GRID_SIZE / 2);
      video.currentTime = centerFrame / FPS;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastFrameTime.current < FRAME_INTERVAL) return;
      lastFrameTime.current = now;

      const frame = calculateFrameIndex(
        e.clientX,
        e.clientY,
        container.getBoundingClientRect()
      );
      video.currentTime = frame / FPS;
    };

    video.addEventListener("loadeddata", handleLoadedData);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/videos/me.mp4"
        className="max-w-[400px] w-full h-auto rounded-lg"
        muted
        playsInline
        preload="auto"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
          Loading...
        </div>
      )}
    </div>
  );
}
