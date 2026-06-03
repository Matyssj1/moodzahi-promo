import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PhoneFrame({ src, alt, className, style }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-[200px] h-[433px] md:w-[220px] md:h-[476px] rounded-[2.4rem] md:rounded-[2.8rem] shadow-2xl shadow-black/60 dark:shadow-[0_20px_50px_rgba(255,255,255,0.04)] ring-1 ring-black/5 dark:ring-white/10",
        className
      )}
      style={{ 
        padding: "1.5px",
        background: "linear-gradient(135deg, #e5e5ea 0%, #8e8e93 50%, #e5e5ea 100%)", // Natural Titanium
        ...style
      }}
    >
      <div 
        className="relative size-full overflow-hidden border-[3px] md:border-[4px] border-black" 
        style={{ borderRadius: "inherit", backgroundColor: "#000" }}
      >
        <div className="relative size-full overflow-hidden bg-[#FAF9F6]" style={{ borderRadius: "calc(inherit - 3px)" }}>
          {/* Dynamic island más pequeña (iPhone 16/17 Pro) */}
          <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center h-[12px] md:h-[16px] w-[38px] md:w-[50px] rounded-full bg-black shadow-sm">
             <div className="size-1 md:size-1.5 rounded-full bg-[#1a1a1a] ml-auto mr-1.5 md:mr-2 opacity-80" />
          </div>
          {/* Reflection */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 100%)" }} />
          {/* Screen content */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-top opacity-95 pt-0" // removed pt-6 to let image flow naturally under island
          />
        </div>
      </div>
    </div>
  );
}
