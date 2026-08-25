"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GitBranch, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "kenzo-hrms",
    tag: "Enterprise · HRMS",
    emoji: "🏢",
    title: "Kenzo Kore HRMS",
    tagline: "A modular HR system managing the full employee lifecycle with role-based access and centralized data.",
    color: "#67a1ff",
    colorLight: "rgba(103,161,255,0.08)",
    problem:
      "Managing employee records, attendance, leaves, and departmental structures across an organization is complex when data is scattered, manually tracked, or stored client-side — creating inconsistencies and access control gaps that affect HR operations.",
    approach:
      "Developed a modular HR management system with Next.js and NestJS, backed by PostgreSQL and Prisma. Implemented server-side state management for attendance and leave workflows, replacing client-side tracking with centralized database records. Secured sensitive data access through role and department-based API authorization.",
    solution:
      "A production-ready HRMS supporting employee lifecycle tracking, departmental mappings, attendance workflows, and leave requests. Admins and employees operate through role-specific dashboards with access boundaries enforced at the API layer — not just the UI.",
    learned:
      "The core engineering challenge was moving from client-side data patterns to reliable, server-persisted state. Designing the RBAC logic to be granular enough for department-level permissions without becoming unmanageable required careful schema and middleware design.",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "RBAC"],
    github: "#",
    live: "#",
  },
  {
    id: "kenzo-expense",
    tag: "Enterprise · Finance",
    emoji: "💳",
    title: "Kenzo Kore Expense Tracker",
    tagline: "End-to-end expense management — from employee submission to admin approval, fully digitized.",
    color: "#14b8a6",
    colorLight: "rgba(20,184,166,0.08)",
    problem:
      "Organizations relying on manual expense reporting face data inconsistencies, missing documentation, and slow approval cycles. There's no centralized view of where money is being spent, and employees have no visibility into the status of their claims.",
    approach:
      "Built a full-stack expense management system with Next.js and NestJS. Engineered RBAC logic to separate employee submission workflows from admin approval flows. Implemented bill/invoice attachment handling and designed a dynamic dashboard for itemized tracking at both individual and organization levels.",
    solution:
      "A complete expense lifecycle platform — employees submit categorized expenses with attachments, admins review and approve or reject claims, and both roles get real-time dashboards showing itemized records and organization-level financial summaries.",
    learned:
      "Designing the approval state machine was the most interesting challenge — ensuring state transitions were atomic, auditable, and reflected immediately in both dashboards. Keeping authorization boundaries clean between roles required consistent middleware enforcement across all API routes.",
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "RBAC"],
    github: "#",
    live: "https://kenzo-kore-expense.vercel.app/",
  },
  {
    id: "kenzo-dap",
    tag: "Enterprise · Platform",
    emoji: "🧭",
    title: "Kenzo Digital Adoption Platform",
    tagline: "Contextual walkthroughs and user guidance injected directly into enterprise web applications.",
    color: "#8b5cf6",
    colorLight: "rgba(139,92,246,0.08)",
    problem:
      "Organizations deploying new software face slow adoption rates. Users abandon workflows because they lack in-context guidance — static documentation is rarely consulted, and onboarding is either expensive or absent.",
    approach:
      "Built a system for injecting contextual user guidance (walkthroughs) into web applications without modifying the target application's source. Engineered PostgreSQL schemas to manage project-specific configurations, user progress tracking, and contextual step triggers. Built analytics tracking for user events to observe onboarding behavior.",
    solution:
      "A platform where admins create and manage step-by-step walkthroughs per application, and end users receive contextual guidance overlaid on their actual workflows. Progress is persisted per user, and analytics surface where users drop off during onboarding flows.",
    learned:
      "The architectural challenge was building a system that works as an overlay on top of any existing web app without coupling to its internals. Designing the trigger engine — matching DOM state to contextual steps — required careful schema modeling for flexible, application-agnostic configuration.",
    stack: ["React", "Node.js", "PostgreSQL", "Analytics", "RBAC"],
    github: "#",
    live: "https://kenzo-dap.onrender.com/",
  },
  {
    id: "kenzo-erp",
    tag: "Enterprise · ERP",
    emoji: "⚙️",
    title: "Kenzo OneERP",
    tagline: "A unified business management platform with modules for finance, inventory, and natural language data querying.",
    color: "#f59e0b",
    colorLight: "rgba(245,158,11,0.08)",
    problem:
      "Businesses managing finance and inventory data across disconnected tools struggle with slow data retrieval, manual lookups, and no unified view. Querying structured business records requires technical knowledge, creating bottlenecks for business users.",
    approach:
      "Designed a unified ERP platform using FastAPI and Python, backed by PostgreSQL. Implemented Redis caching to optimize retrieval speeds for frequently accessed business records. Integrated RAG-ready pipelines that allow structured business data to be queried via natural language, reducing the technical barrier for data access.",
    solution:
      "A modular ERP platform with finance and inventory modules, role-based access, and a Redis-accelerated data layer. The RAG integration allows business users to query their own data conversationally — no SQL or dashboards required.",
    learned:
      "Implementing Redis caching effectively required understanding the data access patterns — not everything benefits from caching, and invalidation logic needs to be deliberate. Designing the RAG pipeline to work on structured tabular data (rather than documents) required a different chunking and retrieval approach.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Redis", "RAG"],
    github: "#",
    live: "https://kenzo-one-erp.vercel.app/",
  },
  {
    id: "truthbomb",
    tag: "AI · Verification",
    emoji: "💣",
    title: "TruthBomb",
    tagline: "AI-powered fact verification — from raw claims to sourced, structured reports in seconds.",
    color: "#ef4444",
    colorLight: "rgba(239,68,68,0.08)",
    problem:
      "Misinformation spreads rapidly while manual fact-checking is slow, inconsistent, and doesn't scale. Existing tools don't provide structured, sourced reports — they surface information without grading or aggregating evidence.",
    approach:
      "Implemented a RAG pipeline coordinating AI-assisted fact verification across multiple models. Designed API endpoints to manage verification requests and route claims through retrieval and grading stages. Implemented a Redis caching layer to store and retrieve recent query results, reducing redundant external API calls.",
    solution:
      "A verification platform that takes a claim, retrieves live evidence via search APIs, grades it against multiple AI models, and generates a structured report with source citations. Redis caching ensures performance for repeated or trending claim types.",
    learned:
      "Grounding LLM outputs in retrieved evidence significantly reduces hallucination — but the quality of the retrieval step is the real bottleneck. Designing the query decomposition and evidence aggregation stages required the most iteration.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "RAG", "Multi-model AI"],
    github: "https://github.com/Sujal12345-pheoniix/TruthBomb",
    live: "#",
  },
];

const caseStudyLabels = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "solution", label: "Solution" },
  { key: "learned", label: "Learned" },
] as const;

/* Floating decorative shapes removed to keep a calm, paper-like layout */

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
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });

    // 3D tilt calculation
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 4;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 3;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="project-card"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => {
          handleMouseLeave();
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(16,24,32,0.04)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
          transformStyle: "preserve-3d",
          boxShadow: '0 10px 30px rgba(16,24,32,0.04)'
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${project.color}33`;
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 18px 46px -12px rgba(16,24,32,0.06)`;
        }}
      >

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
            data-project-header
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
                  transform: "translateZ(20px)",
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
              {project.live !== "#" && (
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
              )}
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
            data-project-tagline
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
            data-project-tabs
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
                data-project-tab
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
          <div data-project-body style={{ padding: "22px 32px" }}>
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
            data-project-footer
            style={{
              padding: "14px 32px 26px",
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              borderTop: "1px solid var(--border)",
            }}
          >
            {project.stack.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.06 + 0.3 + ti * 0.04 }}
                whileHover={{
                  scale: 1.07,
                  borderColor: project.color,
                  color: project.color,
                  y: -2,
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
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section
      id="projects"
      className="section-stack"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
      }}
    >
      {/* decorative shapes removed for a calmer layout */}

      {/* Header */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64, position: "relative", zIndex: 1 }}
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
          position: "relative",
          zIndex: 1,
        }}
        className="projects-grid"
      >
        {/* HRMS spans full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[0]} index={0} />
        </div>
        {/* Expense Tracker + DAP side by side */}
        <ProjectCard project={projects[1]} index={1} />
        <ProjectCard project={projects[2]} index={2} />
        {/* OneERP spans full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[3]} index={3} />
        </div>
        {/* TruthBomb spans full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[4]} index={4} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div { grid-column: 1 !important; }
          .project-card { transform: none !important; }
        }

        @media (max-width: 480px) {
          .projects-grid { gap: 18px; }
        }
      `}</style>
    </section>
  );
}
