"use client";

import { useRef } from "react";
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
      }}
    >
      {/* Section label + heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 72 }}
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
          <h2
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
          </h2>
          <div>
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
          </div>
        </div>
      </motion.div>

      {/* Quick facts grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 20,
          marginBottom: 72,
        }}
      >
        {quickFacts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -3, boxShadow: "0 12px 36px -8px var(--accent-glow)" }}
            style={{
              padding: "24px 22px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              transform: `rotate(${i % 2 === 0 ? "-0.3deg" : "0.4deg"})`,
              cursor: "default",
              transition: "box-shadow 0.25s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: "1.3rem" }}>{fact.icon}</span>
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
        ))}
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
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
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <p
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "DM Mono, monospace",
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
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
