"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Freelance / Self-employed",
    duration: "Jan 2025 – Present",
    type: "Full-time",
    bullets: [
      "Built and shipped 4+ production applications including AI-powered tools and sports platforms",
      "Designed scalable REST APIs with Node.js & Express, integrated with MongoDB and PostgreSQL",
      "Worked closely with end users to iterate on UX and reduce friction — shipped, measured, improved",
      "Integrated OpenAI APIs (GPT-4, embeddings, RAG) to power AI-featured applications",
    ],
    color: "#3b82f6",
    highlight: false,
  },
  {
    title: "Web Development Intern",
    company: "CodSoft",
    duration: "Jun 2025 – Aug 2025",
    type: "Internship · 2 months",
    highlight: true,
    bullets: [
      "Completed a 2-month intensive internship working on real-world web development projects with production-level expectations",
      "Built responsive, pixel-perfect front-end interfaces using HTML, CSS, JavaScript, and React — delivered 3 production-grade projects",
      "Developed a fully functional landing page and a calculator app with clean architecture and mobile-first design principles",
      "Learned professional development workflows — Git branching strategies, code reviews, task management, and deadline-driven delivery",
      "Gained hands-on experience with REST API integration, form validation, and state management in a team-oriented environment",
      "Received a certificate of completion and letter of recommendation for exceptional performance and consistent delivery",
    ],
    color: "#f59e0b",
  },
  {
    title: "AI Integration Developer",
    company: "Personal Projects",
    duration: "Aug 2025 – Dec 2025",
    type: "Project-based",
    bullets: [
      "Built Crick-Buddy — an AI-powered cricket companion with live scores, fantasy advice, and match predictions",
      "Developed an AI Hiring Assistant platform handling structured interviews with GPT-4 evaluation",
      "Implemented LangChain pipelines for document Q&A and retrieval-augmented generation (RAG)",
      "Deployed applications on Vercel with CI/CD, monitoring, and performance optimizations",
    ],
    color: "#8b5cf6",
    highlight: false,
  },
  {
    title: "Frontend Developer",
    company: "Learning & Open Source",
    duration: "Jan 2024 – Jul 2024",
    type: "Self-directed",
    bullets: [
      "Mastered React, Next.js, TypeScript, and Tailwind CSS through project-focused learning",
      "Contributed to open-source projects and published a lightweight form-validation library",
      "Built 10+ smaller UI experiments exploring Framer Motion animations and micro-interactions",
      "Completed system design courses to understand scalability, caching, and distributed systems",
    ],
    color: "#14b8a6",
    highlight: false,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      className="section-stack section-alt"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
            style={{ marginBottom: 72 }}
            className="section-title-wrap"
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontFamily: "DM Mono, monospace",
              color: "var(--blue)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Career
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--fg)",
              }}
            >
              Experience &amp; Journey
            </h2>
            <p
              style={{
                fontSize: "0.83rem",
                color: "var(--muted)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                maxWidth: 280,
                textAlign: "right",
              }}
            >
              Every role taught me something different about shipping real software.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: "relative",
            paddingLeft: 40,
          }}
          className="experience-shell"
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 8,
              bottom: 8,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, var(--border) 8%, var(--border) 92%, transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.title} exp={exp} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .experience-shell { padding-left: 24px !important; }
          #experience .experience-shell > div[style*="left: -44px"] { left: -32px !important; }
          #experience .experience-shell > div > div { padding: 24px 20px !important; }
        }

        @media (max-width: 640px) {
          #experience .exp-bullets { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function TimelineEntry({
  exp,
  index,
  inView,
}: {
  exp: (typeof experiences)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Node */}
      <div
        style={{
          position: "absolute",
          left: -44,
          top: 6,
          width: exp.highlight ? 13 : 9,
          height: exp.highlight ? 13 : 9,
          borderRadius: "50%",
          background: exp.color,
          boxShadow: exp.highlight
            ? `0 0 0 3px var(--bg), 0 0 0 4px ${exp.color}, 0 0 12px ${exp.color}55`
            : `0 0 0 3px var(--bg), 0 0 0 4px ${exp.color}55`,
          marginLeft: exp.highlight ? -2 : 0,
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "var(--bg)",
          border: exp.highlight ? `1px solid ${exp.color}33` : "1px solid var(--border)",
          borderRadius: 8,
          padding: "28px 32px",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${exp.color}44`;
          el.style.boxShadow = `0 8px 32px -8px ${exp.color}22`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = exp.highlight ? `${exp.color}33` : "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Highlight accent bar for internships */}
        {exp.highlight && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${exp.color}, ${exp.color}55)` }} />
        )}
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.15rem",
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              {exp.title}
              {exp.highlight && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginLeft: 10, fontSize: "0.6rem", fontFamily: "DM Mono, monospace", padding: "2px 8px", background: `${exp.color}18`, border: `1px solid ${exp.color}33`, borderRadius: 100, color: exp.color, letterSpacing: "0.06em", textTransform: "uppercase", verticalAlign: "middle", fontWeight: 500 }}>
                  ✦ Verified Internship
                </span>
              )}
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                fontFamily: "Inter, sans-serif",
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              {exp.company}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5 mt-2 sm:mt-0">
            <span
              style={{
                fontSize: "0.72rem",
                fontFamily: "DM Mono, monospace",
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {exp.duration}
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                fontFamily: "DM Mono, monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 100,
                background: `${exp.color}15`,
                color: exp.color,
                border: `1px solid ${exp.color}33`,
              }}
            >
              {exp.type}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {exp.bullets.map((bullet, bi) => (
            <motion.li
              key={bi}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.12 + 0.2 + bi * 0.06 }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  color: exp.color,
                  fontSize: "0.6rem",
                  marginTop: 6,
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
