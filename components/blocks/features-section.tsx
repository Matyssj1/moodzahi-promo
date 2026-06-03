"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Map, HeartPulse, Users, BarChart3, Dumbbell, Medal } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "GPS Inteligente",
    desc: "Tracking de rutas con mapa en tiempo real, elevación y análisis de terreno para cada carrera.",
  },
  {
    icon: HeartPulse,
    title: "Zonas cardíacas",
    desc: "Monitoreo de frecuencia cardíaca con alertas de zona para optimizar tu rendimiento.",
  },
  {
    icon: Dumbbell,
    title: "Planes adaptativos",
    desc: "Rutinas generadas según tu nivel, objetivos y progreso semanal. Sin fórmulas genéricas.",
  },
  {
    icon: BarChart3,
    title: "Analítica avanzada",
    desc: "Gráficos de evolución, comparativas de sesiones y tendencias de rendimiento a largo plazo.",
  },
  {
    icon: Users,
    title: "Comunidad activa",
    desc: "Desafíos grupales, seguí a otros runners y compartí tus mejores recorridos.",
  },
  {
    icon: Medal,
    title: "Logros y desafíos",
    desc: "Sistema de badges, metas semanales y rankings para mantenerte motivado cada día.",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--bg-base)", transition: "background-color 0.3s ease" }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--accent-border)",
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            Features
          </span>
          <h2
            className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            Todo lo que un runner{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--accent), #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              necesita
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
            Pensado para cada etapa: desde tu primera salida hasta batir tu récord personal.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div className="relative z-10">
                <div
                  className="mb-4 inline-flex size-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--accent-subtle)" }}
                >
                  <feature.icon className="size-5" style={{ color: "var(--accent)" }} />
                </div>
                <h3
                  className="mb-2 text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
