"use client";

import { useEffect, useRef, useState } from "react";

export default function AlienMascot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation states
  const [isWaving, setIsWaving] = useState(false);

  // We use refs to keep track of values without triggering component re-renders
  // This guarantees 60fps drawing inside the requestAnimationFrame loop
  const stateRef = useRef<{
    x: number;
    targetX: number;
    y: number;
    facingRight: boolean;
    state: "idle" | "running" | "waving";
    walkCycle: number;
    waveCycle: number;
    blinkTimer: number;
    blinkFrame: number;
    lastScrollY: number;
    scrollTimeout: number;
    mouseX: number;
    mouseY: number;
    idleWanderTimer: number;
    accentColor: string;
    bgColor: string;
    borderColor: string;
  }>({
    x: 40,
    targetX: 40,
    y: 0,
    facingRight: true,
    state: "idle",
    walkCycle: 0,
    waveCycle: 0,
    blinkTimer: 120, // Blink every 2-3 seconds
    blinkFrame: 0,
    lastScrollY: 0,
    scrollTimeout: 0,
    mouseX: 0,
    mouseY: 0,
    idleWanderTimer: 300, // Decide to wander every 5 seconds if idle
    accentColor: "#35c7b8", // Fallbacks
    bgColor: "#0b0d12",
    borderColor: "#263041",
  });

  useEffect(() => {
    // Initial position setup
    if (typeof window !== "undefined") {
      stateRef.current.x = 40;
      stateRef.current.targetX = 40;
      stateRef.current.lastScrollY = window.scrollY;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse coordinates for eye tracking
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Relative to alien head (around x: center, y: 35)
      const headX = rect.left + rect.width / 2;
      const headY = rect.top + 35;
      const dx = e.clientX - headX;
      const dy = e.clientY - headY;
      const dist = Math.hypot(dx, dy);

      if (dist < 300) {
        stateRef.current.mouseX = dx / dist; // Normalized
        stateRef.current.mouseY = dy / dist;
      } else {
        stateRef.current.mouseX = 0;
        stateRef.current.mouseY = 0;
      }
    };

    // Track scrolls to animate running
    const handleScroll = () => {
      const data = stateRef.current;
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - data.lastScrollY;

      if (Math.abs(diff) > 0.5) {
        // Clear any idle wander target
        data.state = "running";
        
        // Move target X based on scroll
        const scrollFactor = 0.65;
        data.targetX += diff * scrollFactor;

        // Bound within screen
        const padding = 30;
        const maxLimit = window.innerWidth - 110;
        if (data.targetX < padding) data.targetX = padding;
        if (data.targetX > maxLimit) data.targetX = maxLimit;

        // Update facing direction
        if (diff > 0) {
          data.facingRight = true;
        } else {
          data.facingRight = false;
        }

        data.lastScrollY = currentScrollY;

        // Reset scroll stop timer
        window.clearTimeout(data.scrollTimeout);
        data.scrollTimeout = window.setTimeout(() => {
          if (data.state === "running") {
            data.state = "idle";
          }
        }, 200) as unknown as number;
      }
    };

    window.addEventListener("mousemove", handleMouseMoveGlobal);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    // Drawing & Update Game Loop
    const draw = () => {
      const data = stateRef.current;
      
      // Update theme colors dynamically from CSS variables
      if (typeof window !== "undefined") {
        const style = window.getComputedStyle(document.documentElement);
        data.accentColor = style.getPropertyValue("--accent").trim() || "#f08a5d";
        data.bgColor = style.getPropertyValue("--bg").trim() || "#0b0d12";
        data.borderColor = style.getPropertyValue("--border").trim() || "#263041";
      }

      // Smooth horizontal interpolation (lerp)
      const prevX = data.x;
      data.x += (data.targetX - data.x) * 0.12;

      // Detect movement speed
      const speed = Math.abs(data.x - prevX);
      if (speed > 0.2 && data.state !== "waving") {
        data.state = "running";
        data.walkCycle += speed * 0.15;
      } else if (data.state === "running") {
        data.state = "idle";
      }

      // Update position in the DOM
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${data.x}px)`;
      }

      // Idle wandering: if idle for a while, wander around a bit
      if (data.state === "idle") {
        data.idleWanderTimer--;
        if (data.idleWanderTimer <= 0) {
          // Wander to a nearby target
          const wanderRange = 80;
          const randomOffset = (Math.random() - 0.5) * 2 * wanderRange;
          data.targetX = Math.max(
            30,
            Math.min(window.innerWidth - 110, data.x + randomOffset)
          );
          data.facingRight = data.targetX > data.x;
          data.idleWanderTimer = 300 + Math.random() * 400; // Reset timer (5-10s)
        }
      }

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save context for facing direction flips
      ctx.save();
      // Mirror drawing if facing left
      if (!data.facingRight) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      // Time variables
      const time = performance.now() * 0.005;

      // Breathing bobbing
      let bobY = 0;
      if (data.state === "idle") {
        bobY = Math.sin(time * 3) * 2.5;
      } else if (data.state === "waving") {
        bobY = Math.sin(time * 6) * 1.5;
      } else if (data.state === "running") {
        bobY = Math.abs(Math.sin(data.walkCycle * 2)) * -4; // bounce up on steps
      }

      // ─── DRAW LEGS ───
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = data.borderColor;

      const bodyCenterX = canvas.width / 2;
      const legBaseY = 70 + bobY;

      let leftLegOffset = { x: -8, y: 15 };
      let rightLegOffset = { x: 8, y: 15 };

      if (data.state === "running") {
        // Alternating stride movement
        leftLegOffset.x = -8 + Math.cos(data.walkCycle) * 7;
        leftLegOffset.y = 15 + Math.max(0, Math.sin(data.walkCycle) * 6);

        rightLegOffset.x = 8 - Math.cos(data.walkCycle) * 7;
        rightLegOffset.y = 15 + Math.max(0, -Math.sin(data.walkCycle) * 6);
      } else if (data.state === "waving") {
        // Tiny happy leg taps
        leftLegOffset.y = 15 + Math.max(0, Math.sin(time * 10) * 2);
        rightLegOffset.y = 15 + Math.max(0, Math.cos(time * 10) * 2);
      }

      // Draw Left Leg
      ctx.beginPath();
      ctx.moveTo(bodyCenterX - 6, legBaseY);
      ctx.lineTo(bodyCenterX + leftLegOffset.x, legBaseY + leftLegOffset.y);
      ctx.stroke();

      // Draw Right Leg
      ctx.beginPath();
      ctx.moveTo(bodyCenterX + 6, legBaseY);
      ctx.lineTo(bodyCenterX + rightLegOffset.x, legBaseY + rightLegOffset.y);
      ctx.stroke();

      // ─── DRAW ARMS ───
      // Left Arm (on the back side)
      ctx.beginPath();
      if (data.state === "running") {
        // Swing backward
        ctx.moveTo(bodyCenterX - 12, 54 + bobY);
        ctx.lineTo(bodyCenterX - 22 - Math.sin(data.walkCycle) * 5, 62 + bobY);
      } else {
        ctx.moveTo(bodyCenterX - 12, 54 + bobY);
        ctx.lineTo(bodyCenterX - 22, 60 + bobY + Math.sin(time * 2) * 1.5);
      }
      ctx.stroke();

      // ─── DRAW BODY (TORSO) ───
      ctx.fillStyle = data.accentColor;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(bodyCenterX - 13, 44 + bobY, 26, 28, 12);
      } else {
        ctx.rect(bodyCenterX - 13, 44 + bobY, 26, 28);
      }
      ctx.fill();
      ctx.stroke();

      // ─── DRAW HEAD ───
      const headY = 32 + bobY;
      ctx.beginPath();
      ctx.ellipse(bodyCenterX, headY, 22, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // ─── DRAW ANTENNA ───
      ctx.beginPath();
      ctx.moveTo(bodyCenterX, headY - 17);
      ctx.quadraticCurveTo(
        bodyCenterX - 4 + Math.sin(time * 3) * 2,
        headY - 26,
        bodyCenterX - 2 + Math.sin(time * 3) * 3,
        headY - 32
      );
      ctx.stroke();

      // Antenna Bulb (glow)
      const bulbX = bodyCenterX - 2 + Math.sin(time * 3) * 3;
      const bulbY = headY - 34;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Glow effect overlay
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = data.accentColor;
      ctx.fillStyle = data.accentColor;
      ctx.globalAlpha = 0.5 + Math.sin(time * 6) * 0.3;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ─── DRAW EYES ───
      const eyeY = headY - 1;
      const leftEyeX = bodyCenterX - 8;
      const rightEyeX = bodyCenterX + 8;
      const eyeRadiusX = 5;
      const eyeRadiusY = 7;

      // Handle Blinking logic
      let blinkScaleY = 1;
      data.blinkTimer--;
      if (data.blinkTimer <= 0) {
        data.blinkFrame++;
        if (data.blinkFrame < 8) {
          // Closing
          blinkScaleY = 1 - data.blinkFrame / 8;
        } else if (data.blinkFrame < 16) {
          // Opening
          blinkScaleY = (data.blinkFrame - 8) / 8;
        } else {
          // Reset
          data.blinkTimer = 120 + Math.random() * 180;
          data.blinkFrame = 0;
        }
      }

      const drawEye = (x: number) => {
        ctx.fillStyle = data.bgColor;
        ctx.beginPath();
        ctx.ellipse(x, eyeY, eyeRadiusX, eyeRadiusY * blinkScaleY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eye pupil highlight (looks towards cursor if blinkScaleY is open)
        if (blinkScaleY > 0.3) {
          const lookX = data.mouseX * 2;
          const lookY = data.mouseY * 2.5;

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(x + lookX + 1.2, eyeY + lookY - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawEye(leftEyeX);
      drawEye(rightEyeX);

      // ─── DRAW MOUTH ───
      ctx.strokeStyle = data.borderColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      if (data.state === "waving") {
        // Wide open happy smile
        ctx.arc(bodyCenterX, headY + 7, 5, 0, Math.PI, false);
      } else if (data.state === "running") {
        // Simple horizontal line or small curve
        ctx.arc(bodyCenterX, headY + 7, 3, 0.1, Math.PI - 0.1, false);
      } else {
        // Cute neutral smile
        ctx.arc(bodyCenterX, headY + 6, 4, 0.2, Math.PI - 0.2, false);
      }
      ctx.stroke();

      // ─── DRAW FRONT ARM (RIGHT) ───
      // Restore stroke properties
      ctx.lineWidth = 5;
      ctx.strokeStyle = data.borderColor;

      ctx.beginPath();
      if (data.state === "waving") {
        // Waving arm cycle: goes up and swings
        const waveAngle = Math.sin(time * 16) * 0.45 - 0.5; // swing angle
        const armStartX = bodyCenterX + 12;
        const armStartY = 54 + bobY;
        
        ctx.moveTo(armStartX, armStartY);
        // Calculate waving hand position
        const armLength = 16;
        const handX = armStartX + Math.cos(waveAngle) * armLength;
        const handY = armStartY + Math.sin(waveAngle) * armLength;
        ctx.lineTo(handX, handY);
      } else if (data.state === "running") {
        // Swing opposite to left leg
        ctx.moveTo(bodyCenterX + 12, 54 + bobY);
        ctx.lineTo(bodyCenterX + 22 + Math.sin(data.walkCycle) * 5, 62 + bobY);
      } else {
        // Idle breathing/resting arm
        ctx.moveTo(bodyCenterX + 12, 54 + bobY);
        ctx.lineTo(bodyCenterX + 22, 60 + bobY - Math.sin(time * 2) * 1.5);
      }
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMoveGlobal);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(stateRef.current.scrollTimeout);
    };
  }, []);

  const handleMouseEnter = () => {
    stateRef.current.state = "waving";
    setIsWaving(true);
  };

  const handleMouseLeave = () => {
    stateRef.current.state = "idle";
    setIsWaving(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 z-[100] pointer-events-none select-none will-change-transform pb-2"
      style={{
        width: "90px",
        height: "98px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={90}
        height={98}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseEnter}
        className="pointer-events-auto cursor-pointer"
        aria-label="Interactive alien companion"
        title="Hi! Hover/Click me to wave!"
      />
    </div>
  );
}
