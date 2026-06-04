"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

export function ZahiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-surface)", transition: "background-color 0.3s ease" }}
    >
      <div className="flex flex-col md:flex-row items-center">

        {/* Foto de Zahi - h-auto para que crezca naturalmente sin recortarse ni forzar zoom */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative w-full md:w-1/2 flex"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/zahi-portrait.jpeg"
            alt="mood zahi — Zahi corriendo"
            className="w-full h-auto object-cover"
          />
          {/* Gradiente para fundir con el texto (Desktop) */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(to right, transparent 60%, var(--bg-surface) 100%)" }}
          />
          {/* Gradiente para fundir con el texto (Mobile) */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: "linear-gradient(to top, var(--bg-surface) 0%, transparent 60%)" }}
          />
          <div className="absolute top-6 left-6">
            <Image 
              src="/assets/logo-moodzahi.svg" 
              alt="Mood Zahi Logo" 
              width={120} 
              height={40} 
              className="w-24 md:w-32 h-auto"
            />
          </div>
        </motion.div>

        {/* Texto */}
        <div
          className="relative z-10 flex w-full flex-col justify-center px-8 py-16 md:py-12 md:w-1/2 md:px-16 lg:px-24"
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <Quote className="mb-6 size-10 opacity-50" style={{ color: "var(--accent)" }} />

            <blockquote
              className="mb-8 text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Correr me cambió la vida. Quiero que{" "}
              <span
                style={{
                  background: "linear-gradient(to right, var(--accent), #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                te cambie la tuya.
              </span>
            </blockquote>

            <p
              className="mb-10 max-w-md text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              mood zahi nació de mi propia experiencia como runner y el deseo de
              crear una comunidad donde cada kilómetro cuente. Una app para los
              que empiezan y para los que van por el podio.
            </p>

            <div className="flex items-center gap-4">
              <div
                className="relative size-14 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "2px solid var(--accent-border)" }}
              >
                <Image
                  src="/assets/zahi-portrait.jpeg"
                  alt="Zahi"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>Zahi</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Fundadora · mood zahi
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative z-10 mt-14 grid grid-cols-3 gap-6 pt-10"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              { value: "12K+", label: "Seguidores" },
              { value: "42", label: "Maratones" },
              { value: "5★", label: "Comunidad" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black" style={{ color: "var(--accent)" }}>
                  {stat.value}
                </p>
                <p
                  className="text-xs uppercase tracking-widest mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
