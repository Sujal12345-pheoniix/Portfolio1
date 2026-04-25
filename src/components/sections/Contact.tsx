"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, GitBranch, LinkIcon, Send, CheckCircle, AlertCircle } from "lucide-react";

const socials = [
  {
    label: "Email",
    value: "sujalreal983@gmail.com",
    href: "mailto:sujalreal983@gmail.com",
    icon: Mail,
    color: "#3b82f6",
  },
  {
    label: "github",
    value: "github.com/sujal",
    href: "https://github.com/Sujal12345-pheoniix",
    icon: GitBranch,
    color: "#8b5cf6",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/sujal",
    href: "https://www.linkedin.com/in/sujal-kumar-95b723291/",
    icon: LinkIcon,
    color: "#14b8a6",
  },
];

// Using FormSubmit.co — free, no API key, no signup. Emails go directly to your inbox.
// First submission triggers a confirmation email — click the link to activate.
const FORMSUBMIT_URL = "https://formsubmit.co/ajax/sujalreal983@gmail.com";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }} ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <p style={{ fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--blue)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
            Let&apos;s talk
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, color: "var(--fg)", marginBottom: 18 }}>
            Have something worth building?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.8, fontFamily: "Inter, sans-serif", fontWeight: 300, maxWidth: 520, margin: "0 auto" }}>
            Have a project in mind or want to discuss the latest in AI? I&apos;m open to
            freelance work, full-time roles, and interesting collaborations.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }} className="contact-grid">
          {/* Left — Connect with me */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "32px 28px" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontFamily: "Georgia, serif", fontWeight: 700, color: "var(--fg)", marginBottom: 28, letterSpacing: "-0.02em" }}>
              Connect with me
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, transition: "all 0.25s ease", textDecoration: "none" }}
                    whileHover={{ scale: 1.02, borderColor: `${s.color}44`, boxShadow: `0 4px 20px ${s.color}15` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: s.color }}>
                      <Icon size={17} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.65rem", fontFamily: "DM Mono, monospace", color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{s.label}</p>
                      <p style={{ fontSize: "0.83rem", fontFamily: "Inter, sans-serif", color: "var(--muted)", fontWeight: 400 }}>{s.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Download Resume */}
            <motion.a href="/sujal_kumar_resume.pdf" download="Sujal_Kumar_Resume.pdf"
              whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, padding: "12px 20px", background: "var(--gradient-primary)", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter, sans-serif", fontWeight: 500, color: "#fff", textDecoration: "none", boxShadow: "0 4px 16px rgba(59,130,246,0.25)" }}
            >
              📄 Download Resume
            </motion.a>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-row">
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "Inter, sans-serif", fontWeight: 500, color: "var(--muted)", marginBottom: 6 }}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="form-input" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "Inter, sans-serif", fontWeight: 500, color: "var(--muted)", marginBottom: 6 }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="form-input" />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "Inter, sans-serif", fontWeight: 500, color: "var(--muted)", marginBottom: 6 }}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows={5} required className="form-input" style={{ resize: "vertical", minHeight: 120 }} />
            </div>

            {sent && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter, sans-serif", color: "#4ade80" }}>
                <CheckCircle size={16} /> Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter, sans-serif", color: "#ef4444" }}>
                <AlertCircle size={16} /> Failed to send. Try emailing me directly at sujalreal983@gmail.com
              </motion.div>
            )}

            <motion.button type="submit" disabled={sending || sent} className="btn-gradient"
              whileHover={!sending && !sent ? { scale: 1.01 } : {}} whileTap={!sending && !sent ? { scale: 0.98 } : {}}
              style={{ opacity: sending ? 0.7 : 1, cursor: sending ? "wait" : "pointer" }}
            >
              {sent ? (<>✓ Message Sent!</>) : sending ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} style={{ display: "inline-block" }}>◌</motion.span>
                  Sending…
                </span>
              ) : (<>Send Message <Send size={15} /></>)}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
