"use client";

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL",
  "OpenAI", "LangChain", "Tailwind CSS", "Framer Motion", "Docker", "Git",
  "REST APIs", "GraphQL", "Vercel", "Figma", "Linux",
];

export default function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className="marquee-track" style={{ position: "relative", overflow: "hidden" }}>
      <div className="marquee-inner">
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} style={{
            fontSize: "0.8rem",
            fontFamily: "DM Mono, monospace",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}>
            {tech}
            <span style={{ color: "var(--blue)", fontSize: "0.5rem", opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
      <div className="marquee-inner" aria-hidden="true" style={{ position: "absolute", top: 0, left: "100%" }}>
        {items.map((tech, i) => (
          <span key={`dup-${tech}-${i}`} style={{
            fontSize: "0.8rem",
            fontFamily: "DM Mono, monospace",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}>
            {tech}
            <span style={{ color: "var(--blue)", fontSize: "0.5rem", opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
