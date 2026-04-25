"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const quickFacts = [
  { icon: "🏏", label: "Built Crick-Buddy", desc: "A real AI cricket companion app — because I love cricket and hated juggling 5 apps." },
  { icon: "🤖", label: "AI-first mindset", desc: "Most of my recent work sits at the intersection of AI and practical product design." },
  { icon: "🛠", label: "Full-stack focus", desc: "Comfortable from database schema to UI animation — I like owning the whole thing." },
  { icon: "📍", label: "Based in India", desc: "Building, learning, and shipping from here." },
];

const values = [
  { title: "Real problems over vanity metrics", body: "I'd rather build something 10 people genuinely need than something impressive that nobody uses." },
  { title: "Clarity over complexity", body: "Good code should be boring to read. Good UX should feel obvious. Complexity is almost always a choice." },
  { title: "Ship, then improve", body: "Done beats perfect. I'd rather have something live and learning from real users than polished in a drawer." },
];

/* 3D wireframe graphic that floats beside the About section */
function About3DGraphics() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* Rotating 3D cube wireframe - top right */}
      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "8%",
          right: "5%",
          width: 70,
          height: 70,
          transformStyle: "preserve-3d",
          perspective: "300px",
        }}
      >
        {/* Cube faces */}
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(59,130,246,0.12)", borderRadius: 4, transform: "translateZ(35px)" }} />
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(139,92,246,0.1)", borderRadius: 4, transform: "rotateY(90deg) translateZ(35px)" }} />
      </motion.div>

      {/* Orbiting dots - left side */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "20%", left: "2%", width: 80, height: 80 }}
      >
        <motion.div
          style={{ position: "absolute", top: 0, left: "50%", width: 6, height: 6, borderRadius: "50%", background: "rgba(59,130,246,0.3)", transform: "translateX(-50%)" }}
        />
        <motion.div
          style={{ position: "absolute", bottom: 0, left: "50%", width: 4, height: 4, borderRadius: "50%", background: "rgba(139,92,246,0.25)", transform: "translateX(-50%)" }}
        />
        <motion.div
          style={{ position: "absolute", top: "50%", left: 0, width: 5, height: 5, borderRadius: "50%", background: "rgba(20,184,166,0.25)", transform: "translateY(-50%)" }}
        />
      </motion.div>

      {/* Floating hexagon */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 60, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "55%",
          right: "8%",
          width: 44,
          height: 44,
          opacity: 0.15,
        }}
      >
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
          <polygon points="22,2 40,13 40,31 22,42 4,31 4,13" stroke="currentColor" strokeWidth="1" fill="none" style={{ color: "var(--blue)" }} />
        </svg>
      </motion.div>

      {/* Pulsing accent glow */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(224,108,74,0.2), transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* Connected dots line */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "30%", right: "3%", display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(59,130,246,0.3)" }} />
        <div style={{ width: 1, height: 20, background: "rgba(59,130,246,0.15)", margin: "0 auto" }} />
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(139,92,246,0.25)" }} />
        <div style={{ width: 1, height: 20, background: "rgba(139,92,246,0.12)", margin: "0 auto" }} />
        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(20,184,166,0.2)" }} />
      </motion.div>
    </div>
  );
}

/* 3D tilt fact card */
function FactCard({ fact, index, inView }: { fact: typeof quickFacts[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 6;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 5;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      key={fact.label}
      initial={{ opacity: 0, y: 24, rotateX: -5 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: tilt.rotateX, rotateY: tilt.rotateY } : {}}
      transition={{
        opacity: { duration: 0.5, delay: 0.1 + index * 0.08 },
        y: { duration: 0.5, delay: 0.1 + index * 0.08 },
        rotateX: { type: "spring", stiffness: 200, damping: 20 },
        rotateY: { type: "spring", stiffness: 200, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -3, boxShadow: "0 12px 36px -8px var(--accent-glow)" }}
      style={{
        padding: "24px 22px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        transform: `rotate(${index % 2 === 0 ? "-0.3deg" : "0.4deg"})`,
        cursor: "default",
        transition: "box-shadow 0.25s ease",
        perspective: "800px",
        transformStyle: "preserve-3d" as const,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <motion.span
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: index * 1.5 }}
          style={{ fontSize: "1.3rem", display: "inline-block" }}
        >
          {fact.icon}
        </motion.span>
        <p
          style={{
            fontSize: "0.83rem",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            color: "var(--fg)",
            letterSpacing: "-0.01em",
          }}
        >
          {fact.label}
        </p>
      </div>
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--muted)",
          lineHeight: 1.7,
          fontFamily: "Inter, sans-serif",
          fontWeight: 300,
        }}
      >
        {fact.desc}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "120px 24px",
        position: "relative",
      }}
    >
      {/* 3D decorative graphics */}
      <About3DGraphics />

      {/* Section label + heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 72, position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            fontFamily: "DM Mono, monospace",
            color: "var(--accent)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Who I am
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px 80px",
            alignItems: "start",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
            }}
          >
            Developer.<br />Builder.<br />Problem-solver.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.85,
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                marginBottom: 18,
              }}
            >
              I&apos;m Sujal Kumar — a full-stack developer who gravitates toward AI-powered products and systems that solve real, tangible problems.
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.85,
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
              }}
            >
              I care less about which framework is trending and more about whether the thing I&apos;m building actually works for the people using it.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick facts grid with 3D tilt cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 20,
          marginBottom: 72,
          position: "relative",
          zIndex: 1,
        }}
      >
        {quickFacts.map((fact, i) => (
          <FactCard key={fact.label} fact={fact} index={i} inView={inView} />
        ))}
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            fontFamily: "DM Mono, monospace",
            color: "var(--muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          What I believe
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px 48px",
            borderTop: "1px solid var(--border)",
            paddingTop: 32,
          }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{ cursor: "default" }}
            >
              <motion.p
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "DM Mono, monospace",
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
                animate={inView ? { opacity: [0, 1] } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.p>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  color: "var(--fg)",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about > div:first-child > div:last-child { grid-template-columns: 1fr !important; }
          #about > div:last-child > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
