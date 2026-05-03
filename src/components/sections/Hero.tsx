"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// static subheading — kept simple and human

const stats = [
  { value: "4+", label: "Projects shipped" },
  { value: "∞", label: "Bugs fixed (and created)" },
  { value: "100%", label: "Commitment to craft" },
];

export default function Hero() {
  
  const [canHover] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // no rotating roles — we use a clear subheading for the user brief

  useEffect(() => {
    if (!canHover) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) * 0.012);
      mouseY.set((e.clientY - cy) * 0.012);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [canHover, mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-shell min-h-svh items-center px-4 sm:px-6 pt-28 pb-20 md:pt-40 md:pb-32 mx-auto relative overflow-hidden w-full"
    >
      {/* Decorative glows removed for a calmer, warmer canvas */}

      <div
        style={{ position: "relative", zIndex: 1, maxWidth: 860, width: "100%" }}
        className="hero-copy"
      >
        {/* Small status badge — subtle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            padding: "6px 12px",
            background: "color-mix(in srgb, var(--surface) 98%, transparent)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            fontSize: "0.78rem",
            color: "var(--muted)",
            letterSpacing: "0.04em",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            marginInline: "auto",
          }}
        >
          Open to Work · April 2026
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 12 }}
        >
          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              textAlign: "center",
            }}
          >
            Hi, I&apos;m <span className="handwritten-underline">Sujal Kumar</span> <span style={{fontSize:'1.05em', marginLeft:8}}>👋</span>
          </h1>
        </motion.div>

        {/* Subtitle / subheading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontSize: "clamp(1rem, 2.4vw, 1.3rem)",
            color: "var(--muted)",
            maxWidth: 640,
            lineHeight: 1.6,
            marginBottom: 22,
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          Full Stack Developer & AI Enthusiast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: "1rem",
            color: "var(--muted)",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 40,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          I build practical web apps and AI tools that help people get things done —
          straightforward, dependable, and focused on real users. Let me show you
          what I&apos;ve made.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 64 }}
          className="hero-actions"
        >
          <MagneticButton href="#projects" primary>
            View Projects
          </MagneticButton>
          <MagneticButton href="#contact" primary={false}>
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="hero-stats flex flex-col md:flex-row gap-8 md:gap-0 border-t border-border pt-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 ${
                i < stats.length - 1 ? "md:pr-7 md:border-r border-border" : ""
              } ${i > 0 ? "md:pl-7" : ""}`}
            >
              <p
                style={{
                  fontSize: "1.6rem",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  color: "var(--fg)",
                  letterSpacing: "-0.03em",
                  marginBottom: 3,
                  background: i === 0 ? "var(--gradient-text)" : undefined,
                  WebkitBackgroundClip: i === 0 ? "text" : undefined,
                  WebkitTextFillColor: i === 0 ? "transparent" : undefined,
                  backgroundClip: i === 0 ? "text" : undefined,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  fontFamily: "DM Mono, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Down indicator (kept subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: -36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            color: "var(--muted)",
            fontSize: "0.72rem",
            fontFamily: "DM Mono, monospace",
            letterSpacing: "0.08em",
            cursor: "default",
          }}
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            style={{
              width: 2,
              height: 28,
              background: "linear-gradient(to bottom, var(--border), transparent)",
              borderRadius: 2,
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        @media (max-width: 640px) {
          .hero-shell { align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}

function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary: boolean; }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{
        x: sx,
        y: sy,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: primary ? "12px 22px" : "10px 18px",
        background: primary ? "var(--accent)" : "transparent",
        color: primary ? "#fff" : "var(--fg)",
        border: primary ? "none" : "1px solid var(--border)",
        borderRadius: 8,
        fontSize: "0.95rem",
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        letterSpacing: "0.01em",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: primary ? "0 10px 30px rgba(16,24,32,0.06)" : "none",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
