"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), { ssr: false });

export default function Hero() {
  const [canHover] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!canHover) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) * 0.05);
      mouseY.set((e.clientY - cy) * 0.05);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [canHover, mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] opacity-80 pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-5xl mx-auto mix-blend-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-xs font-mono uppercase tracking-widest"
        >
          Software Engineer · Full-Stack &amp; Backend
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] font-bold tracking-tighter text-white text-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Sujal Kumar
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mt-4">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[clamp(1.5rem,3vw,3rem)] leading-tight font-light text-white/50 text-center italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Building enterprise software that works.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "linear", delay: 1 }}
          className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl text-center font-light leading-relaxed"
        >
          I build full-stack and enterprise applications with a focus on backend systems, APIs, databases, and scalable multi-user workflows. <br className="hidden md:block"/>
          Recent work spans HRMS, ERP, Expense Management, Digital Adoption, and AI-powered verification.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center"
        >
          <MagneticButton href="#projects" primary>
            Explore Work
          </MagneticButton>
          <MagneticButton href="#about" primary={false}>
            My Journey
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-white/80 absolute top-0 left-0"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary: boolean; }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.4);
    y.set((e.clientY - cy) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      className={`relative overflow-hidden rounded-full font-medium tracking-wide transition-colors duration-300 flex items-center justify-center border border-white/20 ${
        primary ? "bg-black text-white hover:bg-white/10" : "bg-transparent text-white hover:bg-white/5"
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 block px-6 py-3 md:px-8 md:py-4 text-base md:text-lg">{children}</span>
    </motion.a>
  );
}

