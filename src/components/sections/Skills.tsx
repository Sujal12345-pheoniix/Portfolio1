"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    emoji: "💻",
    color: "#3b82f6",
    skills: [
      { name: "TypeScript / JavaScript", level: 92 },
      { name: "HTML / CSS", level: 98 },
      { name: "Python", level: 72 },
      { name: "SQL", level: 78 },
    ],
    delay: 0,
  },
  {
    category: "Core",
    emoji: "⚙️",
    color: "#8b5cf6",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js / Express", level: 88 },
      { name: "MongoDB / PostgreSQL", level: 82 },
      { name: "REST · GraphQL", level: 85 },
      { name: "Tailwind CSS", level: 92 },
    ],
    delay: 0.1,
  },
  {
    category: "AI / ML",
    emoji: "🤖",
    color: "#14b8a6",
    skills: [
      { name: "OpenAI API", level: 90 },
      { name: "LangChain", level: 72 },
      { name: "Prompt Engineering", level: 88 },
      { name: "Embeddings & RAG", level: 68 },
      { name: "Fine-tuning basics", level: 55 },
    ],
    delay: 0.18,
  },
  {
    category: "DevOps & Tools",
    emoji: "🛠",
    color: "#f59e0b",
    skills: [
      { name: "Git / GitHub", level: 94 },
      { name: "Vercel / Netlify", level: 90 },
      { name: "Docker", level: 72 },
      { name: "Linux CLI", level: 80 },
      { name: "Figma", level: 65 },
    ],
    delay: 0.26,
  },
];

function SkillBar({
  name,
  level,
  inView,
  baseDelay,
  index,
  color,
}: {
  name: string;
  level: number;
  inView: boolean;
  baseDelay: number;
  index: number;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ marginBottom: 16, cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
          transition: "transform 0.2s ease",
          transform: hovered ? "translateX(4px)" : "none",
        }}
      >
        <span
          style={{
            fontSize: "0.85rem",
            fontFamily: "Inter, sans-serif",
            color: hovered ? "var(--fg)" : "var(--muted)",
            transition: "color 0.2s ease",
            fontWeight: hovered ? 500 : 400,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "DM Mono, monospace",
            color: hovered ? color : "var(--border)",
            transition: "color 0.2s ease",
            fontWeight: 500,
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 5,
          background: "var(--surface2)",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1.1,
            delay: baseDelay + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            height: "100%",
            borderRadius: 3,
            background: hovered
              ? color
              : `linear-gradient(90deg, ${color}88, ${color})`,
            transition: "background 0.25s ease",
            boxShadow: hovered ? `0 0 8px ${color}55` : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "120px 24px",
      }}
    >
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
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
          Tools of the trade
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
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
            }}
          >
            Skills &amp; Stack
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
            Hover over a skill to see proficiency level in detail.
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "32px 48px",
        }}
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: group.delay }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "24px 22px",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
            whileHover={{
              borderColor: `${group.color}44`,
              boxShadow: `0 8px 32px -8px ${group.color}20`,
            }}
          >
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 22,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${group.color}18`,
                  border: `1px solid ${group.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                }}
              >
                {group.emoji}
              </div>
              <h3
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "DM Mono, monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: group.color,
                  fontWeight: 500,
                }}
              >
                {group.category}
              </h3>
            </div>

            {group.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                inView={inView}
                baseDelay={group.delay + 0.2}
                index={i}
                color={group.color}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
