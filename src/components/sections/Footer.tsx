"use client";

import { motion } from "framer-motion";
import { ArrowUp, GitBranch, Mail, LinkIcon } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Sujal12345-pheoniix", icon: GitBranch, color: "#8b5cf6" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sujal-kumar-95b723291/", icon: LinkIcon, color: "#14b8a6" },
  { label: "Email", href: "mailto:sujalreal983@gmail.com", icon: Mail, color: "#3b82f6" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <a href="#" style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--fg)", display: "inline-flex", alignItems: "center", letterSpacing: "-0.03em", marginBottom: 12 }}>
              Sujal<span style={{ background: "var(--gradient-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1.2rem" }}>.dev</span>
            </a>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.75, fontFamily: "Inter, sans-serif", fontWeight: 300, marginTop: 12 }}>
              Full Stack Developer &amp; AI Enthusiast. Building scalable web applications and intelligent systems that solve real problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--blue)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 32px" }}>
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} style={{ fontSize: "0.85rem", fontFamily: "Inter, sans-serif", color: "var(--muted)", transition: "color 0.2s ease", fontWeight: 400 }}
                  onMouseEnter={(e) => { (e.currentTarget).style.color = "var(--fg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.color = "var(--muted)"; }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials + Resume */}
          <div>
            <p style={{ fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--blue)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Connect</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", transition: "all 0.25s ease" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = s.color; el.style.color = s.color; el.style.boxShadow = `0 0 0 3px ${s.color}20`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; el.style.boxShadow = "none"; }}>
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
            <a href="/sujal_kumar_resume.pdf" download="Sujal_Kumar_Resume.pdf"
              style={{ fontSize: "0.8rem", fontFamily: "DM Mono, monospace", color: "var(--muted)", letterSpacing: "0.04em", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = "var(--muted)"; }}>
              📄 Download Resume →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: "0.75rem", fontFamily: "DM Mono, monospace", color: "var(--muted)", letterSpacing: "0.04em" }}>
            Built by hand. No templates. © {new Date().getFullYear()} Sujal Kumar.
          </p>
          <motion.button onClick={scrollToTop} whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, fontSize: "0.75rem", fontFamily: "DM Mono, monospace", color: "var(--muted)", cursor: "pointer", transition: "border-color 0.2s ease" }}>
            Back to top <ArrowUp size={13} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
