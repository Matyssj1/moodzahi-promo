"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);

  useEffect(() => {
    setCurrentDuration(duration);
  }, [duration]);

  const isHorizontal = direction === "horizontal";
  const animationName = `infinite-scroll-${isHorizontal ? "x" : "y"}${reverse ? "-reverse" : ""}`;

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ "--gap": `${gap}px` } as React.CSSProperties}
    >
      <div
        onMouseEnter={() => {
          if (durationOnHover) setCurrentDuration(durationOnHover);
        }}
        onMouseLeave={() => setCurrentDuration(duration)}
        className={cn("flex w-max", isHorizontal ? "flex-row" : "flex-col")}
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${currentDuration}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
