"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { useWindowSize } from "@/lib/use-window-size";

const screens = [
  {
    src: "/assets/Html → Body.png",
    alt: "Vista principal de la app",
    label: "Home Principal",
    desc: "El corazón de tu experiencia mood zahi.",
    rotate: "-4deg",
    translateY: "10px",
    delay: 0.1,
  },
  {
    src: "/assets/Html → Body-1.png",
    alt: "Estadísticas",
    label: "Tus métricas",
    desc: "Análisis profundo de cada entrenamiento.",
    rotate: "0deg",
    translateY: "0px",
    delay: 0.2,
  },
  {
    src: "/assets/Html → Body-2.png",
    alt: "Comunidad",
    label: "Conecta y compite",
    desc: "Súmate a la comunidad global de runners.",
    rotate: "4deg",
    translateY: "10px",
    delay: 0.3,
  },
  {
    src: "/assets/Html → Body-3.png",
    alt: "Rutas",
    label: "Descubre rutas",
    desc: "Nuevos caminos seleccionados para ti.",
    rotate: "-4deg",
    translateY: "10px",
    delay: 0.4,
  },
  {
    src: "/assets/Html → Body-4.png",
    alt: "Entrenamiento activo",
    label: "Tracker en vivo",
    desc: "GPS de alta precisión paso a paso.",
    rotate: "0deg",
    translateY: "0px",
    delay: 0.5,
  },
  {
    src: "/assets/Html → Body-5.png",
    alt: "Perfil de corredor",
    label: "Tu progreso",
    desc: "Sube de nivel con cada kilómetro.",
    rotate: "4deg",
    translateY: "10px",
    delay: 0.6,
  },
];

export function AppPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 768;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-24 pb-4 md:pt-32 md:pb-8"
      style={{ backgroundColor: "var(--bg-base)", transition: "background-color 0.3s ease" }}
    >
      {/* Decorative gradient removed for cleaner SaaS look */}

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--accent-border)",
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            La app
          </span>
          <h2
            className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Diseñada para quienes quieren desafiar sus{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--accent), #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              límites
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "var(--text-secondary)" }}>
            Una experiencia pensada desde la primera salida hasta el podio. Conoce todas nuestras vistas y funciones clave.
          </p>
        </motion.div>

        {/* Phones Grid: 2x3 para que se vean las 6 pantallas perfectas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 md:gap-y-28 justify-items-center">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.alt}
              initial={{ opacity: 0, y: 150 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 15,
                mass: 1,
                delay: screen.delay 
              }}
              className={`flex flex-col items-center gap-6 ${i >= 2 ? "hidden md:flex" : ""}`}
            >
              <PhoneFrame
                src={screen.src}
                alt={screen.alt}
                className="transition-transform duration-500 hover:scale-105 shadow-2xl"
                style={{
                  transform: isMobile ? "none" : `rotate(${screen.rotate}) translateY(${screen.translateY})`,
                } as React.CSSProperties}
              />
              <div className="max-w-[240px] text-center mt-4">
                <p className="mb-2 text-base font-bold" style={{ color: "var(--accent)" }}>
                  {screen.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {screen.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
