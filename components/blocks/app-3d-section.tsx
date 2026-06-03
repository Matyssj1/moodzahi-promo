"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, HeartPulse, Zap, Timer } from "lucide-react";
import { useWindowSize } from "@/lib/use-window-size";

const heartbarHeights = [40, 65, 55, 80, 70, 90, 75];

export function App3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0.05, 0.55], isMobile ? [-30, 0] : [-52, 0]);
  const rotateX = useTransform(scrollYProgress, [0.05, 0.55], isMobile ? [8, -3] : [12, -3]);
  const scale = useTransform(scrollYProgress, [0.05, 0.45, 0.9], isMobile ? [0.65, 0.85, 0.75] : [0.55, 0.75, 0.65]);
  const opacity = useTransform(scrollYProgress, [0.04, 0.18, 0.82, 0.96], [0, 1, 1, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.75, 0.9], [0, 1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const card1Y = useTransform(scrollYProgress, [0, 1], isMobile ? [-30, 30] : [-60, 60]);
  const card2Y = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -30] : [40, -50]);

  // En mobile, las tarjetas se acercan más al centro o se posicionan distinto
  const card1X = useTransform(scrollYProgress, [0.1, 0.6], isMobile ? [20, 0] : [40, 0]);
  const card2X = useTransform(scrollYProgress, [0.1, 0.6], isMobile ? [-20, 0] : [-40, 0]);

  const card1TranslateX = isMobile ? "-50%" : "-115%";
  const card2TranslateX = isMobile ? "50%" : "115%";

  const card1Left = isMobile ? "20%" : "0";
  const card2Right = isMobile ? "20%" : "0";

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        minHeight: "180vh",
        backgroundColor: "var(--bg-base)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center px-6 pt-8 pb-24 md:pt-12 md:pb-32 touch-pan-y overflow-hidden">

        {/* Label y Título */}
        <motion.div style={{ opacity }} className="text-center z-10 w-full mb-6 md:mb-8 lg:mb-10">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
            style={{
              border: "1px solid var(--accent-border)",
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            La experiencia
          </span>
          <p className="mt-3 text-xl font-extrabold md:text-3xl lg:text-4xl" style={{ color: "var(--text-primary)" }}>
            Diseñada para que{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--accent), #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sientas cada km
            </span>
          </p>
        </motion.div>

        {/* Escena 3D */}
        <motion.div style={{ opacity, scale }} className="relative flex items-center justify-center">
          <div style={{ perspective: isMobile ? "1000px" : "1400px" }}>
            <motion.div style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className="relative">

              {/* Marco Exterior (Titanio Desierto / Desert Titanium) con profundidad 3D */}
              <div
                className="relative mx-auto flex shadow-2xl dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                style={{
                  width: isMobile ? "200px" : "360px",
                  height: isMobile ? "430px" : "750px",
                  borderRadius: isMobile ? "1.8rem" : "2.8rem",
                  padding: "1.5px", // Thinner outer frame
                  background: "linear-gradient(135deg, #e5e5ea 0%, #8e8e93 50%, #e5e5ea 100%)", // Natural Titanium
                  transformStyle: "preserve-3d", // CRITICAL: This allows the child layers to render in 3D depth
                }}
              >
                {/* Capas de profundidad (Chasis lateral) */}
                {[...Array(26)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      transform: `translateZ(${-i * (isMobile ? 0.8 : 1.2)}px)`,
                      borderRadius: "inherit",
                      background: i === 0
                        ? "linear-gradient(135deg, #d1d1d6 0%, #8e8e93 50%, #d1d1d6 100%)"
                        : "#71717a", // Color del borde lateral más oscuro para simular sombra
                      border: i === 0 ? "1px solid rgba(255,255,255,0.5)" : "none",
                      boxShadow: i === 25 ? "0 40px 80px -20px rgba(0,0,0,0.5)" : "none",
                    }}
                  />
                ))}

                {/* Borde metálico interno para dar profundidad */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    borderRadius: "inherit",
                    border: "1px solid rgba(209, 209, 214, 0.4)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
                  }}
                />

                {/* Cuerpo interno con bisel */}
                <div
                  className="relative size-full overflow-hidden z-20 ring-1 ring-black/10 border-[3px] md:border-[4px] border-black"
                  style={{
                    borderRadius: isMobile ? "1.8rem" : "2.7rem",
                    backgroundColor: "#000", // Pitch black para el borde
                  }}
                >
                  <div
                    className="relative size-full overflow-hidden"
                    style={{
                      borderRadius: isMobile ? "1.6rem" : "2.4rem",
                      backgroundColor: "#FAF9F6"
                    }}
                  >
                    {/* Dynamic island más realista y pequeña (iPhone 16/17 Pro style) */}
                    <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center h-[12px] md:h-[18px] w-[38px] md:w-[58px] rounded-full bg-black shadow-sm">
                      <div className="size-1 md:size-1.5 rounded-full bg-[#1a1a1a] ml-auto mr-1.5 md:mr-2 opacity-80" />
                    </div>

                    {/* Reflejo de pantalla estilo Apple mejorado */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        background: "linear-gradient(115deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 100%)"
                      }}
                    />

                    {/* Contenido de la App */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/Html → Body.png"
                      alt="mood zahi App"
                      className="w-full h-full object-cover object-top opacity-[0.98]"
                    />
                  </div>
                </div>

                {/* --- Botones Físicos en Natural Titanium --- */}
                {!isMobile && (
                  <div style={{ transform: "translateZ(-16px)", transformStyle: "preserve-3d" }} className="absolute inset-0 pointer-events-none z-30">
                    {/* Botón Acción (Izquierda) */}
                    <div className="absolute -left-[3px] top-[15%] w-[3px] h-[20px] bg-[#8e8e93] rounded-l-sm border-l border-white/40 shadow-[inset_1px_0_2px_rgba(0,0,0,0.2)]" />
                    {/* Vol + (Izquierda) */}
                    <div className="absolute -left-[3px] top-[22%] w-[3px] h-[40px] bg-[#8e8e93] rounded-l-sm border-l border-white/40 shadow-[inset_1px_0_2px_rgba(0,0,0,0.2)]" />
                    {/* Vol - (Izquierda) */}
                    <div className="absolute -left-[3px] top-[30%] w-[3px] h-[40px] bg-[#8e8e93] rounded-l-sm border-l border-white/40 shadow-[inset_1px_0_2px_rgba(0,0,0,0.2)]" />

                    {/* Botón Encendido (Derecha) */}
                    <div className="absolute -right-[3px] top-[24%] w-[3px] h-[65px] bg-[#8e8e93] rounded-r-sm border-r border-white/40 shadow-[inset_-1px_0_2px_rgba(0,0,0,0.2)]" />

                    {/* Capture Button (Derecha, hundido / flush, iPhone 16/17 Pro) */}
                    <div className="absolute -right-[1px] top-[50%] w-[1.5px] h-[45px] bg-[#6c6c70] rounded-r-sm shadow-[inset_-1px_0_2px_rgba(0,0,0,0.3)]" />
                  </div>
                )}

                {/* Glow de borde metálico (especular highlight) */}
                <div className="absolute top-4 right-0 w-[40%] h-[1px] bg-white/50 blur-[1px] rotate-[-5deg] z-40" />
              </div>
            </motion.div>


          </div>

          {/* Tarjeta izquierda — distancia */}
          <motion.div
            style={{
              y: card1Y,
              x: card1X,
              opacity: cardOpacity,
              position: "absolute",
              left: card1Left,
              top: isMobile ? "15%" : "25%",
              translateX: card1TranslateX,
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
              minWidth: isMobile ? "130px" : "160px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              borderRadius: "1rem",
              padding: isMobile ? "0.5rem 0.75rem" : "0.75rem 1rem",
              backdropFilter: "blur(12px)",
              zIndex: isMobile ? 40 : 10,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
              <MapPin className="size-3 md:size-4" style={{ color: "var(--accent)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Hoy</span>
            </div>
            <p className="text-xl md:text-2xl font-black" style={{ color: "var(--text-primary)" }}>12.4 km</p>
            {!isMobile && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Ruta completada ✓</p>}
          </motion.div>

          {/* Tarjeta derecha — cardíaco */}
          <motion.div
            style={{
              y: card2Y,
              x: card2X,
              opacity: cardOpacity,
              position: "absolute",
              right: card2Right,
              top: isMobile ? "60%" : "40%",
              translateX: card2TranslateX,
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
              minWidth: isMobile ? "130px" : "160px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              borderRadius: "1rem",
              padding: isMobile ? "0.5rem 0.75rem" : "0.75rem 1rem",
              backdropFilter: "blur(12px)",
              zIndex: isMobile ? 40 : 10,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
              <HeartPulse className="size-3 md:size-4" style={{ color: "var(--accent)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Cardíaco</span>
            </div>
            <p className="text-xl md:text-2xl font-black" style={{ color: "var(--text-primary)" }}>156 bpm</p>
            <div className="flex items-end gap-[2px] md:gap-[3px] mt-2" style={{ height: isMobile ? "20px" : "28px" }}>
              {heartbarHeights.map((h, i) => (
                <div
                  key={i}
                  className="w-[4px] md:w-[5px] rounded-full"
                  style={{ height: `${h * (isMobile ? 0.22 : 0.32)}px`, backgroundColor: "var(--accent)", opacity: 0.6 + i * 0.05 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Badge inferior */}
          <motion.div
            style={{
              opacity: cardOpacity,
              position: "absolute",
              bottom: isMobile ? "-1.25rem" : "-1.5rem",
              left: "50%",
              translateX: "-50%",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "0.5rem" : "0.75rem",
              borderRadius: "9999px",
              padding: isMobile ? "0.5rem 1rem" : "0.625rem 1.25rem",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--accent-border)",
              backgroundColor: "var(--accent-subtle)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
              zIndex: 30,
            }}
          >
            <span className="flex items-center gap-1 md:gap-1.5">
              <Zap className="size-3 md:size-3.5" style={{ color: "var(--accent)" }} />
              <span className="text-[10px] md:text-xs font-bold" style={{ color: "var(--accent)" }}>GPS Activo</span>
            </span>
            <span className="h-3 w-px" style={{ backgroundColor: "var(--accent-border)" }} />
            <span className="flex items-center gap-1 md:gap-1.5">
              <Timer className="size-3 md:size-3.5" style={{ color: "var(--accent)" }} />
              <span className="text-[10px] md:text-xs font-bold" style={{ color: "var(--accent)" }}>5:42 /km</span>
            </span>
          </motion.div>
        </motion.div>


        {/* Scroll hint */}
        {!isMobile && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-5 rounded-full flex items-start justify-center pt-1"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="h-1.5 w-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}