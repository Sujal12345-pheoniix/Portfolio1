"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
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
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--fg)",
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          Sujal
          <span
            style={{
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            .dev
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
                transition: "color 0.2s ease",
                animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--muted)")
              }
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--muted)",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--blue)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--blue)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 0 3px var(--blue-glow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg)",
          }}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
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
                >
                  {link.label}
                </a>
              ))}
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
              >
                {theme === "dark" ? "☀ Light mode" : "☾ Dark mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) { .show-mobile { display: none; } }
        @media (max-width: 639px) { .hidden-mobile { display: none; } .show-mobile { display: flex; } }
      `}</style>
    </motion.header>
  );
}
