"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const badAt = [
  "Estimating how long anything will take",
  "Letting 'good enough' actually be good enough",
  "Writing tests before features (I know, I know)",
  "Deleting code I'll 'probably need later'",
  "Naming variables on the first try",
  "Stopping when I should sleep",
];

const exploring = [
  {
    topic: "Rust",
    note: "Started a CLI tool to understand ownership. It yells at me in a weirdly polite way.",
  },
  {
    topic: "Building in public",
    note: "Sharing progress openly. Still feels a bit exposing. Probably a good sign.",
  },
  {
    topic: "WebSockets from scratch",
    note: "Reading the RFC. Much harder than I expected. Much more interesting, too.",
  },
  {
    topic: "System design fundamentals",
    note: "Reading about distributed systems because it makes everything else click better.",
  },
];

export default function Experimental() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experimental"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "100px 24px 120px",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56 }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            fontFamily: "DM Mono, monospace",
            color: "var(--accent)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          The human stuff
        </p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}
        >
          Honest about the gaps
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px 80px",
          alignItems: "start",
        }}
      >
        {/* Bad at */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3
            style={{
              fontSize: "1.05rem",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontFamily: "DM Mono, monospace",
                padding: "3px 8px",
                border: "1px dashed var(--border)",
                borderRadius: 2,
                color: "var(--muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              honest
            </span>
            Things I&apos;m bad at
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {badAt.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontSize: "0.75rem",
                    fontFamily: "DM Mono, monospace",
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                >
                  ×
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Exploring */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3
            style={{
              fontSize: "1.05rem",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              color: "var(--fg)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontFamily: "DM Mono, monospace",
                padding: "3px 8px",
                border: "1px dashed var(--border)",
                borderRadius: 2,
                color: "var(--muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              lately
            </span>
            What I&apos;m exploring
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {exploring.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                whileHover={{ x: 4 }}
                style={{
                  padding: "16px 18px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  transform: `rotate(${i % 2 === 0 ? "-0.25deg" : "0.3deg"})`,
                }}
              >
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: 5,
                  }}
                >
                  {item.topic}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experimental > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
