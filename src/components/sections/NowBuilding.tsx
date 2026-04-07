"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const currentBuilds = [
  {
    title: "AI Resume Optimizer",
    status: "In progress",
    progress: 65,
    desc: "Takes a job description + your raw resume and surgically rewrites bullet points to match — without sounding AI-generated.",
    started: "Mar 2026",
  },
  {
    title: "Dev Learning Tracker",
    status: "Early stage",
    progress: 25,
    desc: "A personal tool to log what I'm learning, broken down by topic, resource, and time spent. Scratching my own itch.",
    started: "Apr 2026",
  },
  {
    title: "Open Source: Form Validator Library",
    status: "Shipped v0.1",
    progress: 90,
    desc: "A lightweight, zero-dependency TypeScript form validation library. Finally fed up with the heaviness of react-hook-form.",
    started: "Feb 2026",
  },
];

export default function NowBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
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
              Live status
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
              What I&apos;m building now
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              border: "1px solid var(--border)",
              borderRadius: 3,
              fontSize: "0.78rem",
              fontFamily: "DM Mono, monospace",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                animation: "pulse 1.8s infinite",
              }}
            />
            Updated April 2026
          </div>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {currentBuilds.map((build, i) => (
            <motion.div
              key={build.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "28px 28px 24px",
                transform: `rotate(${i % 2 === 0 ? "-0.3deg" : "0.4deg"})`,
                transition: "transform 0.3s ease",
              }}
              whileHover={{ rotate: 0, y: -3 }}
            >
              {/* Status badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontFamily: "DM Mono, monospace",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {build.status}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontFamily: "DM Mono, monospace",
                    color: "var(--muted)",
                  }}
                >
                  {build.started}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  color: "var(--fg)",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {build.title}
              </h3>

              <p
                style={{
                  fontSize: "0.855rem",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  marginBottom: 20,
                }}
              >
                {build.desc}
              </p>

              {/* Progress bar */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "DM Mono, monospace",
                      color: "var(--muted)",
                    }}
                  >
                    progress
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "DM Mono, monospace",
                      color: "var(--muted)",
                    }}
                  >
                    {build.progress}%
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    background: "var(--border)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${build.progress}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
                    style={{
                      height: "100%",
                      background: "var(--accent)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.8; transform: scale(0.9); box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }
      `}</style>
    </section>
  );
}
