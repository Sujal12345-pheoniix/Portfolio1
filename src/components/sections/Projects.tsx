"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GitBranch, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "crick-buddy",
    tag: "Sports · AI",
    emoji: "🏏",
    title: "Crick-Buddy",
    tagline: "Your AI-powered cricket companion.",
    color: "#14b8a6",
    colorLight: "rgba(20,184,166,0.08)",
   problem:

"Cricket players, especially at the grassroots level in India, lack access to personalized coaching, performance analysis, and structured guidance. Most rely on generic advice from YouTube or local coaches, with no data-driven feedback on their technique or progress.",

approach:

"Built an AI-powered platform that analyzes player performance using computer vision. Users can upload their batting, bowling, or posture images/videos, and the system evaluates their technique using pose estimation and angle calculations. Integrated an AI coach to provide personalized training advice and structured improvement plans.",

solution:

"A unified cricket training platform that combines AI-based technique analysis, progress tracking, and coaching support. Players receive instant feedback on their form, track improvement over time with visual dashboards, and get smart recommendations for drills and fitness — all in one place.",

learned:

"Building AI for real-world sports taught me that user-generated data is highly inconsistent — different camera angles, lighting, and poses affect accuracy. I improved my problem-solving by handling noisy data, optimizing API performance, and designing systems that deliver meaningful feedback despite imperfect inputs.",
    stack: ["Next.js", "Node.js", "CricAPI", "OpenAI", "MongoDB", "Tailwind"],
    github: "https://github.com/Sujal12345-pheoniix/Crick-Buddy",
    live: "#",
  },
  {
    id: "AI-Interview-Stimulator",

    tag: "AI · Fullstack",
    emoji: "🤖",
    title: "AI-Interview-Stimulator",
    tagline: "Preparing for interviews is stressful. What if AI could do the practice rounds?",
    color: "#3b82f6",
    colorLight: "rgba(59,130,246,0.08)",
    problem:
      "Interview prep is broken. Mock interviews with friends are awkward and inconsistent. Professional services are expensive and hard to schedule. Candidates often go in underprepared, leading to anxiety and missed opportunities.",
    approach:
      "Built an AI-powered interview simulator that generates realistic coding and behavioral questions based on the user's target role and company. The system provides instant feedback on answers, tracks progress over time, and adapts question difficulty based on performance.",
    solution:
      "Candidates can practice anytime with a responsive AI interviewer that mimics real interview scenarios. The platform offers personalized feedback, identifies weak areas, and helps users build confidence through consistent practice.",
    learned:
      "The biggest challenge was creating an AI that felt human enough to provide meaningful practice. I had to fine-tune prompts, handle a wide variety of user responses, and ensure the feedback was constructive. This project taught me a lot about prompt engineering and designing AI interactions that feel natural.",
    stack: ["Next.js", "Node.js", "OpenAI", "MongoDB", "Framer Motion"],
    github: "https://github.com/Sujal12345-pheoniix/Interview-simulator",
    live: "#",
  },
  {
    id: "Saarthi",
    tag: "Personalcare · AI",
    emoji: "📋",
    title: "Saarthi ",
    tagline: "skincare , mental health, fitness, and career guidance. Your AI-powered personal assistant for holistic well-being.",
    color: "#8b5cf6",
    colorLight: "rgba(139,92,246,0.08)",
    problem:
      "People struggle to manage different aspects of their lives — from skincare routines to mental health, fitness goals, and career planning. Existing solutions are fragmented, overwhelming, and often lack personalization, leading to inconsistent self-care and growth.",
    approach:
      "Built an AI-powered personal assistant that integrates skincare advice, mental health support, fitness coaching, and career guidance into one platform. Users can input their goals and challenges, and the AI provides tailored recommendations, tracks progress, and offers motivation across all areas of well-being.",
    solution:
      "A unified platform that helps users take control of their well-being with personalized AI guidance. Whether it's optimizing a skincare routine, managing stress, creating a workout plan, or navigating career decisions, Saarthi provides actionable insights and support in one place.",
    learned:
      "The biggest lesson was learning how to design an AI that can handle multiple domains effectively. I had to ensure that the AI could provide relevant and accurate advice across very different topics, which required careful prompt engineering and a lot of user testing to get right.",
    stack: ["React", "Supabase", "OpenAI", "Tailwind", "Vercel"],
    github: "https://github.com/Sujal12345-pheoniix/Saarthi",
    live: "https://v0-well-look-ai-app.vercel.app/",
  },
  {
    id: "ai-project-builder",
    tag: "Developer Tools · AI",
    emoji: "⚡",
    title: "AI Project Builder",
    tagline: "From idea to scaffolded codebase in under 60 seconds.",
    color: "#f59e0b",
    colorLight: "rgba(245,158,11,0.08)",
    problem:
      "Starting a new project means 2 hours of boilerplate, config hell, and decision fatigue before writing a single line of real code.",
    approach:
      "Built a tool that takes a plain English idea, generates a project plan, picks the stack, scaffolds the folder structure, and writes starter code.",
    solution:
      "Developers went from 'idea to first commit' 10x faster. The tool became a thinking partner, not just a code generator.",
    learned:
      "The surprising thing? People used it most for ideation, not generation. Sometimes the best feature of a product is the one you didn't design for.",
    stack: ["Next.js", "LangChain", "OpenAI", "TypeScript", "Docker"],
    github: "https://github.com",
    live: "#",
  },
];

const caseStudyLabels = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "solution", label: "Solution" },
  { key: "learned", label: "Learned" },
] as const;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState<"problem" | "approach" | "solution" | "learned">("problem");
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${project.color}44`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px -16px ${project.color}25`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Spotlight overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(400px circle at ${mousePos.x} ${mousePos.y}, ${project.color}0d, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "inherit",
          }}
        />

        {/* Colored top edge */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${project.color}, ${project.color}55)`,
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Content wrapper */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div
            style={{
              padding: "28px 32px 0",
              display: "flex",
              alignItems: "flex-start",
              gap: 18,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: project.colorLight,
                  border: `1px solid ${project.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                {project.emoji}
              </motion.div>
              <div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "DM Mono, monospace",
                    color: project.color,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  {project.tag}
                </p>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Index + Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = project.color;
                  (e.currentTarget as HTMLAnchorElement).style.color = project.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                }}
              >
                <GitBranch size={13} />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = project.color;
                  (e.currentTarget as HTMLAnchorElement).style.color = project.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                }}
              >
                <ExternalLink size={13} />
              </a>
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.65rem",
                  color: "var(--border)",
                  letterSpacing: "0.06em",
                }}
              >
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p
            style={{
              margin: "10px 32px 22px",
              fontSize: "0.92rem",
              color: "var(--muted)",
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
            }}
          >
            {project.tagline}
          </p>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              overflowX: "auto",
            }}
          >
            {caseStudyLabels.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 18px",
                  background: activeTab === tab.key ? "var(--bg)" : "transparent",
                  border: "none",
                  borderRight: "1px solid var(--border)",
                  borderBottom:
                    activeTab === tab.key
                      ? `2px solid ${project.color}`
                      : "2px solid transparent",
                  color: activeTab === tab.key ? "var(--fg)" : "var(--muted)",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  fontWeight: activeTab === tab.key ? 500 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: "22px 32px" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                style={{
                  fontSize: "0.9rem",
                  color: "var(--fg)",
                  opacity: 0.8,
                  lineHeight: 1.85,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  minHeight: 68,
                }}
              >
                {project[activeTab]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Footer: stack */}
          <div
            style={{
              padding: "14px 32px 26px",
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              borderTop: "1px solid var(--border)",
            }}
          >
            {project.stack.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{
                  scale: 1.07,
                  borderColor: project.color,
                  color: project.color,
                }}
                style={{
                  padding: "4px 11px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  fontSize: "0.7rem",
                  fontFamily: "DM Mono, monospace",
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section
      id="projects"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "120px 24px",
      }}
    >
      {/* Header */}
      <motion.div
        ref={titleRef}
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
          Selected work
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
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--fg)",
              maxWidth: 500,
            }}
          >
            Projects built with purpose.
          </h2>
          <p
            style={{
              fontSize: "0.83rem",
              color: "var(--muted)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              maxWidth: 260,
              textAlign: "right",
            }}
          >
            Click the tabs to explore problem, approach, solution & lessons.
          </p>
        </div>
      </motion.div>

      {/* 2-column grid with varied sizing */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
        className="projects-grid"
      >
        {/* First card spans full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[0]} index={0} />
        </div>
        {/* Next two side by side */}
        <ProjectCard project={projects[1]} index={1} />
        <ProjectCard project={projects[2]} index={2} />
        {/* Last spans full */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[3]} index={3} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div { grid-column: 1 !important; }
        }
      `}</style>
    </section>
  );
}
