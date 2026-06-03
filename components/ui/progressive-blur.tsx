"use client";

import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
  blurLayers?: number;
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className,
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.25,
}: ProgressiveBlurProps) {
  const layers = Array.from({ length: blurLayers });

  const directionMap = {
    top: "to bottom",
    bottom: "to top",
    left: "to right",
    right: "to left",
  };

  const gradientDirection = directionMap[direction];

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {layers.map((_, i) => {
        const blur = (i + 1) * blurIntensity;
        const start = (i / blurLayers) * 100;
        const end = ((i + 1) / blurLayers) * 100;

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(${gradientDirection}, transparent ${start}%, black ${end}%)`,
              WebkitMaskImage: `linear-gradient(${gradientDirection}, transparent ${start}%, black ${end}%)`,
            }}
          />
        );
      })}
    </div>
  );
}
