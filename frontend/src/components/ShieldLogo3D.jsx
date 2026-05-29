import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TEST_IDS } from "@/constants/testIds";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_73674b8e-f3bf-40a4-ac5d-79e1db85f935/artifacts/g5ozb603_1000005315.png";

/**
 * Cinematic 3D shield using CSS 3D transforms.
 * - Auto-rotates slowly on Y axis with subtle X wobble
 * - Reacts to mouse / pointer position
 * - Gold sweeping highlight overlay
 * - Floating particles + reflection floor
 */
const ShieldLogo3D = () => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Auto-rotation tick
  useEffect(() => {
    let raf;
    let t0 = performance.now();
    const tick = (t) => {
      const elapsed = (t - t0) / 1000;
      const baseY = Math.sin(elapsed * 0.55) * 18; // gentle rotation
      const baseX = Math.sin(elapsed * 0.4) * 6;
      setTilt((prev) => ({
        x: baseX + prev.mx * 12,
        y: baseY + prev.my * 18,
        mx: prev.mx ?? 0,
        my: prev.my ?? 0,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt((prev) => ({ ...prev, mx, my: -my }));
  };

  const handleLeave = () => setTilt((prev) => ({ ...prev, mx: 0, my: 0 }));

  return (
    <div
      ref={ref}
      data-testid={TEST_IDS.hero.shieldCanvas}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => {
          const left = (i * 73) % 100;
          const top = (i * 41 + 5) % 100;
          const delay = (i * 0.4) % 4;
          const size = 1 + (i % 3);
          return (
            <span
              key={i}
              className="absolute rounded-full bg-[#FFE07A] twinkle"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                boxShadow: "0 0 6px rgba(255, 224, 122, 0.8)",
              }}
            />
          );
        })}
      </div>

      {/* Shield wrapper - 3D rotation */}
      <motion.div
        animate={{
          rotateY: tilt.y,
          rotateX: tilt.x,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative shield-glow"
      >
        {/* Back glow layer (further back) */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.65), transparent 60%)",
            transform: "translateZ(-80px) scale(1.2)",
          }}
        />

        {/* Logo image */}
        <img
          src={LOGO_URL}
          alt="Gloss Kings Auto Detailing"
          className="relative block w-[300px] sm:w-[380px] md:w-[440px] lg:w-[500px] h-auto select-none pointer-events-none"
          style={{
            transform: "translateZ(40px)",
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 25px rgba(212,175,55,0.35))",
          }}
          draggable="false"
        />

        {/* Gold sweep overlay */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ transform: "translateZ(60px)", mixBlendMode: "screen" }}
        >
          <div
            className="absolute -inset-y-10 -inset-x-1/2 opacity-30"
            style={{
              background:
                "linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.7) 50%, transparent 65%)",
              animation: "shieldSweep 5s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>

      {/* Reflection floor */}
      <div className="reflection-floor" />

      <style>{`
        @keyframes shieldSweep {
          0% { transform: translateX(-60%); }
          60% { transform: translateX(60%); }
          100% { transform: translateX(60%); }
        }
      `}</style>
    </div>
  );
};

export default ShieldLogo3D;
