"use client";

import { useEffect, useRef, useState } from "react";

// Configuration - adjust these based on your video
const X_STEPS = 25; // Grid width (left to right)
const Y_STEPS = 25; // Grid height (top to bottom)
const FPS = 60; // Frames per second of video
const TOTAL_FRAMES = X_STEPS * Y_STEPS;

export function WatchingYouVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFrameTime = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Preload video
    video.load();

    const handleLoadedData = () => {
      setIsLoaded(true);
      // Start at center frame
      const centerFrame = Math.floor((Y_STEPS / 2) * X_STEPS + X_STEPS / 2);
      video.currentTime = centerFrame / FPS;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Throttle to FPS
      const now = performance.now();
      if (now - lastFrameTime.current < 1000 / FPS) return;
      lastFrameTime.current = now;

      const containerRect = container.getBoundingClientRect();

      // X: use full page width
      const pageCenterX = window.innerWidth / 2;
      const pageDeltaX = e.clientX - pageCenterX;
      const maxPageDistanceX = window.innerWidth / 2;

      // Y: use container height
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const containerDeltaY = e.clientY - containerCenterY;
      const maxDistanceY = containerRect.height / 2;

      // Normalize to -1 to 1 range
      const containerNormalizedX = Math.max(
        -1,
        Math.min(1, pageDeltaX / maxPageDistanceX)
      );
      const containerNormalizedY = Math.max(
        -1,
        Math.min(1, containerDeltaY / maxDistanceY)
      );

      // Map to grid indices (0 to STEPS-1)
      const videoXIndex = Math.round(
        ((containerNormalizedX + 1) / 2) * (X_STEPS - 1)
      );
      const videoYIndex = Math.round(
        ((containerNormalizedY + 1) / 2) * (Y_STEPS - 1)
      );

      // Calculate frame index (row-major: y * width + x)
      const frameIndex = videoYIndex * X_STEPS + videoXIndex;

      // Update video time
      video.currentTime = frameIndex / FPS;
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
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Loading...
        </div>
      )}
    </div>
  );
}
