"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendGAEvent } from "@next/third-parties/google";
import ReCAPTCHA from "react-google-recaptcha";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || email.length > 255 || !emailRegex.test(email)) {
      setError("Ingresá un email válido (ej: nombre@dominio.com).");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const token = await recaptchaRef.current?.executeAsync();
      
      if (!token) {
        setError("No pudimos verificar que seas humano.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken: token }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al registrar el correo.");
      }

      sendGAEvent("event", "generate_lead", { value: "waitlist_footer" });
      setSubmitted(true);
    } catch {
      setError("Algo salió mal. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
      style={{ backgroundColor: "var(--bg-surface)", transition: "background-color 0.3s ease" }}
    >
      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "var(--glow)" }}
      />

      {/* Grid decorativo */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--accent) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--accent) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--accent-border)",
              backgroundColor: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            Acceso anticipado
          </span>

          <h2
            className="mt-4 text-3xl font-extrabold tracking-tight md:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Sé de los{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--accent), #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              primeros.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
            Los primeros 500 runners obtienen suscripción{" "}
            <strong style={{ color: "var(--text-primary)" }}>premium gratis por 3 meses.</strong>
          </p>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Premium gratis 3 meses", "Acceso anticipado", "Badge fundador"].map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-secondary)",
                }}
              >
                <CheckCircle className="size-3" style={{ color: "var(--accent)" }} />
                {b}
              </span>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 w-full"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle className="size-12" style={{ color: "var(--accent)" }} />
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  ¡Sos parte de mood zahi!
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Revisá tu mail — te contactamos antes del lanzamiento.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { 
                      const sanitizedValue = e.target.value.replace(/[\s"()*,:;<>[\\\]]/g, '');
                      setEmail(sanitizedValue); 
                      setError(""); 
                    }}
                    placeholder="tu@email.com"
                    className="w-full h-14 rounded-xl px-5 text-sm transition focus:outline-none"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                  {error && <p className="mt-1 text-left text-xs text-red-500">{error}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="group flex h-14 items-center justify-center gap-2 rounded-xl px-8 text-sm font-bold transition hover:opacity-90"
                  style={{ backgroundColor: "var(--accent)", color: "#000" }}
                >
                  {loading ? "Enviando..." : "Quiero acceso"}
                  {!loading && (
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
                
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  badge="bottomleft"
                />
              </form>
            )}
            <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
              Sin spam. Podés darte de baja cuando quieras.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-24 pt-8 pb-8 text-center flex flex-col items-center gap-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © 2025 mood zahi · Hecho con 💛 para runners
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Realizado por{" "}
          <a
            href="https://chironte.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:brightness-125"
            style={{ color: "var(--accent)" }}
          >
            CHIRONTE
          </a>
        </p>
      </div>
    </section>
  );
}
