"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const roles = [
  "Full Stack Developer & AI Enthusiast.",
  "Building scalable web applications.",
  "Crafting intelligent systems.",
  "Turning ideas into real products.",
];

const stats = [
  { value: "4+", label: "Projects shipped" },
  { value: "∞", label: "Bugs fixed (and created)" },
  { value: "100%", label: "Commitment to craft" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [canHover] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

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
      {/* Parallax dot grid */}
      <motion.div
        style={{
          position: "absolute",
          inset: -40,
          backgroundImage:
            "radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.4,
          pointerEvents: "none",
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* Blue glowing orb — top right */}
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          opacity: 0.8,
          pointerEvents: "none",
          x: smoothX,
          y: smoothY,
          filter: "blur(48px)",
        }}
      />

      {/* Purple glowing orb — bottom left */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          opacity: 0.7,
          pointerEvents: "none",
          filter: "blur(48px)",
        }}
      />

      <div
        style={{ position: "relative", zIndex: 1, maxWidth: 860, width: "100%" }}
        className="hero-copy"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
            padding: "6px 14px",
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 100,
            fontSize: "0.75rem",
            color: "var(--blue)",
            letterSpacing: "0.06em",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            marginInline: "auto",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
              boxShadow: "0 0 6px #4ade80",
              animation: "softPulse 2s infinite",
            }}
          />
          Open to Work · April 2026
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginBottom: 16 }}
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
            Hi, I&apos;m{" "}
            <span
              style={{
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sujal Kumar
            </span>
          </h1>
        </motion.div>

        {/* Animated role line */}
        <div
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            color: "var(--muted)",
            marginBottom: 28,
            minHeight: "2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span
            style={{
              opacity: showCursor ? 1 : 0,
              color: "var(--blue)",
              transition: "opacity 0.1s",
              marginLeft: 2,
              fontWeight: 300,
            }}
          >
            |
          </span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontSize: "1rem",
            color: "var(--muted)",
            maxWidth: 500,
            lineHeight: 1.85,
            marginBottom: 48,
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          Building scalable{" "}
          <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
            web applications
          </strong>{" "}
          and{" "}
          <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
            intelligent systems
          </strong>{" "}
          that solve real problems — not just pass interviews.
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
            View Projects →
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

        {/* Scroll Down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: -52,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            color: "var(--muted)",
            fontSize: "0.7rem",
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
              width: 1,
              height: 28,
              background:
                "linear-gradient(to bottom, var(--border), transparent)",
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

function MagneticButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary: boolean;
}) {
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
  const handleMouseLeave = () => { x.set(0); y.set(0); };

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
        padding: "13px 28px",
        background: primary
          ? "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
          : "transparent",
        color: primary ? "#fff" : "var(--fg)",
        border: primary ? "none" : "1px solid var(--border)",
        borderRadius: 8,
        fontSize: "0.9rem",
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.01em",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: primary ? "0 4px 20px rgba(59,130,246,0.3)" : "none",
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: primary
          ? "0 8px 32px rgba(59,130,246,0.4)"
          : "0 4px 16px rgba(0,0,0,0.1)",
      }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
