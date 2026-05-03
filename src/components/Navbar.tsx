"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0",
        transition: "all 0.4s ease",
      }}
      className={scrolled ? "glass" : ""}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ display: 'inline-block' }}>Sujal</span>
          <span style={{ fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 600 }}>.
            <span className="handwritten-underline">dev</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif",
                color: "var(--muted)",
                letterSpacing: "0.01em",
                fontWeight: 400,
                animationDelay: `${i * 0.05}s`,
              }}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              background: "none",
              color: "var(--muted)",
              flexShrink: 0,
            }}
            className="nav-toggle"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              background: "var(--accent)",
              borderRadius: 8,
              fontSize: "0.82rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.01em",
              textDecoration: "none",
            }}
            className="nav-cta"
          >
            Hire Me ✦
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile nav-toggle"
          style={{
            cursor: "pointer",
            color: "var(--fg)",
          }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
              overflow: "hidden",
            }}
            className="menu-panel"
          >
            <div
              style={{
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: "var(--fg)",
                    fontSize: "1rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                  }}
                  className="menu-item"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#services"
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px 14px",
                  background: "var(--gradient-primary)",
                  borderRadius: 6,
                  fontSize: "0.875rem",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                }}
                className="nav-cta"
              >
                Hire Me ✦
              </a>
              <button
                onClick={() => { toggle(); setOpen(false); }}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "8px 14px",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                }}
                className="menu-chip"
              >
                {theme === "dark" ? "☀ Light mode" : "☾ Dark mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>

      <style>{`
        @media (min-width: 640px) { .show-mobile { display: none; } }
        @media (max-width: 639px) { .hidden-mobile { display: none; } .show-mobile { display: flex; } }
      `}</style>
    </motion.header>
  );
}
