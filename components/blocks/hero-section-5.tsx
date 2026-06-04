"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Activity, MapPin, HeartPulse, Mountain,
  Timer, Trophy, Wind, Zap, ArrowRight, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import ReCAPTCHA from "react-google-recaptcha";

const featureIcons = [
  { icon: Activity, label: "Actividad en tiempo real" },
  { icon: MapPin, label: "Rutas inteligentes" },
  { icon: HeartPulse, label: "Monitor cardíaco" },
  { icon: Mountain, label: "Perfil de elevación" },
  { icon: Timer, label: "Cronómetro de carrera" },
  { icon: Trophy, label: "Ranking y logros" },
  { icon: Wind, label: "Condiciones climáticas" },
  { icon: Zap, label: "Entrenamiento adaptativo" },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef<any>(null);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación estricta HTML5 de email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || email.length > 255 || !emailRegex.test(email)) {
      setError("Ingresá un email válido (ej: nombre@dominio.com).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Ejecutar CAPTCHA invisible en segundo plano
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        setError("No pudimos verificar que seas humano. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      // Llamada a nuestra API interna (Next.js -> MySQL)
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken: token }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al registrar el correo.");
      }

      sendGAEvent("event", "generate_lead", { value: "waitlist" });
      setSubmitted(true);
    } catch {
      setError("Algo salió mal. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Se redujo la altura de min-h-screen a h-[85vh] para que la sección sea más chica
    <section className="relative h-[85vh] min-h-[650px] w-full flex overflow-hidden bg-black text-white">

      {/* Fondo Grid de 4 Imágenes (Móvil: 2x2 | Desktop: 4 columnas) para llenar los espacios sin estirar */}
      <div className="absolute inset-0 flex flex-wrap md:flex-nowrap">

        {/* Columna 1 */}
        <div className="relative w-1/2 md:w-1/4 h-1/2 md:h-full overflow-hidden border-r border-black/10">
          <Image
            src="/assets/zahi-portada.jpeg"
            alt="Zahi Portada 1"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Columna 2 */}
        <div className="relative w-1/2 md:w-1/4 h-1/2 md:h-full overflow-hidden border-r border-black/10">
          <Image
            src="/assets/zahi-portada-3.jpeg"
            alt="Zahi Portada 2"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Columna 3 */}
        <div className="relative w-1/2 md:w-1/4 h-1/2 md:h-full overflow-hidden border-r border-black/10">
          <Image
            src="/assets/zahi-portada-2.jpeg"
            alt="Zahi Portada 3"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Columna 4 */}
        <div className="relative w-1/2 md:w-1/4 h-1/2 md:h-full overflow-hidden">
          <Image
            src="/assets/zahi-portada-4.jpeg"
            alt="Zahi Portada 4"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Un ligerísimo filtro general solo para que el texto siga leyendo bien sobre tantas fotos */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Navbar Superior (Vuelve arriba del todo ya que no hay padding) */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16 xl:px-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-black tracking-tight pointer-events-auto text-white"
        >
          MOOD{" "}
          <span style={{
            background: "linear-gradient(to right, #facc15, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            ZAHI
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <ThemeToggle />
        </motion.div>
      </nav>

      {/* Contenedor del Texto en el Medio */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center pb-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs md:text-sm font-semibold border border-white/20 bg-black/40 backdrop-blur-md text-yellow-400 shadow-xl uppercase tracking-widest">
            <span className="size-2 animate-pulse rounded-full bg-yellow-400" />
            Acceso anticipado abierto
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-black uppercase leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl">
            Conquista tu <br className="hidden sm:block" />
            <span className="text-yellow-400">próxima meta.</span>
          </h1>

          {/* Subtítulo */}
          <p className="mb-10 max-w-2xl text-base md:text-xl text-zinc-200 font-medium drop-shadow-md">
            La app que corre contigo. Entrenamiento adaptativo, rutas inteligentes y comunidad para runners.
          </p>

          {/* Formulario */}
          <div className="w-full max-w-lg">
            {submitted ? (
              <div className="flex items-center justify-center gap-4 rounded-2xl p-4 border border-white/20 bg-black/50 backdrop-blur-md">
                <CheckCircle className="size-8 text-yellow-400 shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-white">¡Ya estás en la lista!</p>
                  <p className="text-sm text-zinc-300">Te avisaremos muy pronto.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full shadow-2xl">
                <div className="flex flex-col gap-3 sm:flex-row w-full">
                  <div className="flex-1">
                    <input
                      type="email" value={email}
                      onChange={(e) => { 
                        // Bloquear espacios y caracteres que jamás van en un email
                        const sanitizedValue = e.target.value.replace(/[\s"()*,:;<>[\\\]]/g, '');
                        setEmail(sanitizedValue); 
                        setError(""); 
                      }}
                      placeholder="Tu mejor email"
                      className="w-full h-14 rounded-xl px-5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-yellow-400/50 bg-white/10 border border-white/20 text-white placeholder:text-zinc-400 backdrop-blur-md text-center sm:text-left"
                    />
                    {error && <p className="mt-1 text-xs text-red-400 sm:text-left text-center">{error}</p>}
                  </div>
                  <Button
                    type="submit" disabled={loading}
                    className="group flex h-14 items-center justify-center gap-2 rounded-xl px-8 text-sm font-black uppercase tracking-widest transition hover:scale-[1.02] bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "..." : "Unirme"}
                    {!loading && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                  </Button>
                </div>
                {/* CAPTCHA Invisible (No ocupa espacio) */}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  badge="bottomleft"
                  theme="dark"
                />
              </form>
            )}
            <p className="mt-5 text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Sin spam. Solo puro running.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Ticker Absoluto Abajo */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block bg-black/80 backdrop-blur-xl border-t border-white/10 py-4">
        <InfiniteSlider gap={48} duration={50}>
          {featureIcons.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 px-6">
              <Icon className="size-5 text-yellow-400" />
              <span className="whitespace-nowrap text-xs font-bold text-white tracking-widest uppercase">
                {label}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>

    </section>
  );
}
