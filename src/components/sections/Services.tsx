"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, Award, Star, Mail, Heart, MessageSquare, CheckCircle, AlertCircle, Send } from "lucide-react";

const hireOptions = [
  { icon: Briefcase, title: "JOB", desc: "Full-time position at your company.", color: "#3b82f6", formTitle: "Proposing a Job Offer", emoji: "💼" },
  { icon: Award, title: "INTERN", desc: "Internship opportunities and learning.", color: "#8b5cf6", formTitle: "Proposing an Internship Offer", emoji: "🎓" },
  { icon: Star, title: "FREELANCE", desc: "Project-based work and gigs.", color: "#14b8a6", formTitle: "Proposing a Freelance Project", emoji: "🚀" },
];

const quickActions = [
  { icon: Mail, label: "EMAIL ME", href: "mailto:sujalreal983@gmail.com" },
  { icon: Heart, label: "SPONSOR MY WORK", href: "https://github.com/Sujal12345-pheoniix" },
  { icon: MessageSquare, label: "DROP A MESSAGE", href: "#contact" },
];

const designations = ["Software Engineer (SDE)", "Full Stack Developer", "Backend Developer", "Frontend Developer", "Solutions Engineer", "Forward Deployed Engineer", "Other"];
const workAreas = ["Full Stack Development", "Backend Systems & APIs", "Database Design", "Enterprise Applications", "RBAC & Authentication", "AI / RAG Integration", "Other"];

const FORMSUBMIT_URL = "https://formsubmit.co/ajax/sujalreal983@gmail.com";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeHire, setActiveHire] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    company: "", email: "", designation: "", ctc: "", mobile: "", workArea: "", details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          _subject: `${hireOptions[activeHire].emoji} ${hireOptions[activeHire].title} Offer: ${form.designation} at ${form.company}`,
          _template: "table",
          "Company Name": form.company,
          "Email": form.email,
          "Designation": form.designation,
          "Offering CTC (per annum)": form.ctc,
          "Mobile Number": form.mobile || "Not provided",
          "Work Area": form.workArea,
          "Hire Type": hireOptions[activeHire].title,
          "Additional Details": form.details || "None",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setForm({ company: "", email: "", designation: "", ctc: "", mobile: "", workArea: "", details: "" });
      setTimeout(() => setSent(false), 6000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 6000);
    } finally {
      setSending(false);
    }
  };

  const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.68rem", fontFamily: "DM Mono, monospace", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 };
  const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 6, padding: "11px 14px", fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--fg)", outline: "none", transition: "border-color 0.2s ease, box-shadow 0.2s ease" };
  const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6.5 6.5 6.5-6.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 36 };

  return (
    <section id="services" className="section-stack section-alt" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 56, textAlign: "center" }} className="section-title-wrap">
          <p style={{ fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--blue)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Work with me</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--fg)", marginBottom: 18 }}>
            Hire Sujal For...
          </h2>
        </motion.div>

        {/* Job / Intern / Freelance Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }} className="services-grid">
          {hireOptions.map((opt, i) => {
            const Icon = opt.icon;
            const isActive = activeHire === i;
            return (
              <motion.button key={opt.title} onClick={() => setActiveHire(i)}
                whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
                style={{
                  background: isActive ? "var(--bg)" : "var(--bg)",
                  border: isActive ? `1.5px solid ${opt.color}` : "1px solid var(--border)",
                  borderRadius: 12, padding: "32px 20px", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? `0 8px 32px -8px ${opt.color}30` : "none",
                }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: isActive ? `${opt.color}18` : "var(--surface)", border: `1px solid ${isActive ? opt.color + "44" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? opt.color : "var(--muted)", transition: "all 0.3s ease" }}>
                  <Icon size={20} />
                </div>
                <p style={{ fontSize: "0.78rem", fontFamily: "DM Mono, monospace", fontWeight: 600, letterSpacing: "0.12em", color: isActive ? opt.color : "var(--muted)", transition: "color 0.3s ease" }}>{opt.title}</p>
                <p style={{ fontSize: "0.82rem", fontFamily: "Inter, sans-serif", color: "var(--muted)", fontWeight: 300, lineHeight: 1.5 }}>{opt.desc}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 72, flexWrap: "wrap" }}>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a key={action.label} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--muted)", letterSpacing: "0.08em", textDecoration: "none", transition: "all 0.25s ease", cursor: "pointer" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--blue)"; el.style.color = "var(--fg)"; el.style.boxShadow = "0 4px 16px var(--blue-glow)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--muted)"; el.style.boxShadow = "none"; }}>
                <Icon size={14} /> {action.label}
              </a>
            );
          })}
        </motion.div>

        {/* Job Offer Form */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeHire}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "0.82rem", fontFamily: "DM Mono, monospace", color: hireOptions[activeHire].color, letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "color 0.3s ease" }}
            >
              <span style={{ fontSize: "1.2rem" }}>{hireOptions[activeHire].emoji}</span>
              {hireOptions[activeHire].formTitle}
            </motion.p>
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ maxWidth: 820, margin: "0 auto", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "36px 32px" }}>
            {/* Row 1: Company, Email, Designation */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 20 }} className="offer-row-3">
              <div>
                <label style={labelStyle}>Company Name *</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your Company Name" required style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={labelStyle}>Your Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@company.com" required style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={labelStyle}>Designation *</label>
                <select name="designation" value={form.designation} onChange={handleChange} required style={selectStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <option value="" disabled>Select your role...</option>
                  {designations.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: CTC, Mobile, Work Area */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 20 }} className="offer-row-3">
              <div>
                <label style={labelStyle}>Offering CTC (per annum) *</label>
                <input type="text" name="ctc" value={form.ctc} onChange={handleChange} placeholder="Amount in your currency" required style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={labelStyle}>Mobile Number (optional)</label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+91 XXXXXXXXXX" style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={labelStyle}>What I will be working on</label>
                <select name="workArea" value={form.workArea} onChange={handleChange} style={selectStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <option value="" disabled>Select work areas...</option>
                  {workAreas.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>

            {/* Row 3: Additional Details */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Anything else (optional)</label>
              <textarea name="details" value={form.details} onChange={handleChange} placeholder="Any additional details..." rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }} />
            </div>

            {/* Status */}
            {sent && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter, sans-serif", color: "#4ade80", marginBottom: 16 }}>
                <CheckCircle size={16} /> Offer submitted! I&apos;ll review and get back to you within 24 hours.
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter, sans-serif", color: "#ef4444", marginBottom: 16 }}>
                <AlertCircle size={16} /> Failed to submit. Please email sujalreal983@gmail.com directly.
              </motion.div>
            )}

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.button type="submit" disabled={sending || sent}
                whileHover={!sending ? { scale: 1.02, boxShadow: "0 8px 24px rgba(59,130,246,0.3)" } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 36px", background: "var(--gradient-primary)", color: "#fff", border: "none", borderRadius: 8,
                  fontSize: "0.82rem", fontFamily: "DM Mono, monospace", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1,
                  boxShadow: "0 4px 16px rgba(59,130,246,0.2)", transition: "all 0.25s ease",
                }}>
                {sent ? "✓ SUBMITTED" : sending ? "SENDING..." : <><Send size={14} /> SUBMIT OFFER</>}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .offer-row-3 { grid-template-columns: 1fr !important; }
          #services form { padding: 28px 20px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .offer-row-3 { grid-template-columns: 1fr 1fr !important; }
        }
        #services select option {
          background: var(--bg);
          color: var(--fg);
        }
      `}</style>
    </section>
  );
}
