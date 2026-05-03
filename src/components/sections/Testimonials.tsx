"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Open Source Community", role: "GitHub Collaborators", quote: "Sujal's contributions are clean, well-documented, and always come with thoughtful commit messages. A developer who clearly cares about code quality.", color: "#3b82f6" },
  { name: "Hackathon Team", role: "Co-Participants", quote: "Working with Sujal during the hackathon was incredible. He took the lead on architecture and had the MVP running before most teams finished brainstorming.", color: "#8b5cf6" },
  { name: "Freelance Client", role: "Startup Founder", quote: "Sujal delivered our landing page and dashboard ahead of schedule. The attention to micro-interactions and performance was beyond what we expected.", color: "#14b8a6" },
  { name: "Peer Developer", role: "Learning Partner", quote: "Sujal has a rare ability to explain complex AI concepts in simple terms. His Crick-Buddy project is a great example of AI solving a real problem.", color: "#f59e0b" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section-stack" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 64, textAlign: "center" }} className="section-title-wrap">
        <p style={{ fontSize: "0.72rem", fontFamily: "DM Mono, monospace", color: "var(--blue)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>What people say</p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--fg)" }}>Testimonials</h2>
      </motion.div>

      {/* Featured testimonial */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
        style={{ maxWidth: 700, margin: "0 auto", position: "relative", minHeight: 220 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.97 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "40px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${testimonials[active].color}, ${testimonials[active].color}55)` }} />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${testimonials[active].color}12`, border: `1px solid ${testimonials[active].color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: testimonials[active].color }}>
                <Quote size={18} />
              </div>
            </div>
            <p style={{ fontSize: "1.05rem", fontFamily: "Georgia, serif", color: "var(--fg)", lineHeight: 1.8, fontWeight: 400, fontStyle: "italic", marginBottom: 24, opacity: 0.9 }}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
            <div>
              <p style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", fontWeight: 600, color: "var(--fg)", marginBottom: 2 }}>{testimonials[active].name}</p>
              <p style={{ fontSize: "0.78rem", fontFamily: "DM Mono, monospace", color: testimonials[active].color, letterSpacing: "0.04em" }}>{testimonials[active].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
        {testimonials.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`}
            style={{ width: active === i ? 28 : 8, height: 8, borderRadius: 4, background: active === i ? t.color : "var(--border)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #testimonials > div[style*="min-height: 220px"] > div {
            padding: 30px 22px !important;
          }
        }
      `}</style>
    </section>
  );
}
