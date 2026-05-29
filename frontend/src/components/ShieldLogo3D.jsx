import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TEST_IDS } from "@/constants/testIds";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_73674b8e-f3bf-40a4-ac5d-79e1db85f935/artifacts/g5ozb603_1000005315.png";

/**
 * Drag-to-spin 3D shield. CSS 3D + framer-motion.
 * - Click and drag to spin freely in any direction
 * - On release, momentum carries it and decays into gentle auto-rotation
 * - Hover (no drag) gives subtle mouse-follow tilt
 */
const ShieldLogo3D = () => {
  const ref = useRef(null);
  const rotRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0, hoverX: 0, hoverY: 0 });
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tick = useCallback(() => {
    const r = rotRef.current;
    const d = dragRef.current;

    if (d.dragging) {
      // While dragging, rotation is set directly via pointer move
    } else {
      // Apply velocity (momentum)
      r.x += r.vx;
      r.y += r.vy;
      // Damping
      r.vx *= 0.95;
      r.vy *= 0.95;

      // Auto-rotate when nearly stopped (gentle idle motion)
      if (!hasInteracted) {
        const t = performance.now() / 1000;
        r.y = Math.sin(t * 0.55) * 18 + d.hoverX * 12;
        r.x = Math.sin(t * 0.4) * 6 + d.hoverY * -12;
      } else if (Math.abs(r.vx) < 0.05 && Math.abs(r.vy) < 0.05) {
        // Idle drift toward 0 with mouse-follow influence
        r.y += (d.hoverX * 12 - r.y) * 0.02;
        r.x += (d.hoverY * -12 - r.x) * 0.02;
      }
    }

    setRot({ x: r.x, y: r.y });
    rafRef.current = requestAnimationFrame(tick);
  }, [hasInteracted]);

  const rafRef = useRef();
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current.dragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    rotRef.current.vx = 0;
    rotRef.current.vy = 0;
    setIsDragging(true);
    setHasInteracted(true);
  };

  const onPointerMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      // hover tracking (mouse follow when not dragging)
      dragRef.current.hoverX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      dragRef.current.hoverY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    if (!dragRef.current.dragging) return;

    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;

    // Sensitivity
    const dyRot = dx * 0.5;
    const dxRot = -dy * 0.5;

    rotRef.current.y += dyRot;
    rotRef.current.x += dxRot;
    // store velocity for momentum
    rotRef.current.vx = dxRot;
    rotRef.current.vy = dyRot;
  };

  const onPointerUp = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.dragging = false;
    setIsDragging(false);
  };

  const onPointerLeave = () => {
    dragRef.current.hoverX = 0;
    dragRef.current.hoverY = 0;
  };

  const onClickSpin = () => {
    // Quick double-tap spin trick: kick a 360 spin
    rotRef.current.vy += 25;
    setHasInteracted(true);
  };

  return (
    <div
      ref={ref}
      data-testid={TEST_IDS.hero.shieldCanvas}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
      onDoubleClick={onClickSpin}
      className="relative w-full h-full flex items-center justify-center select-none touch-none"
      style={{
        perspective: "1400px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
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

      {/* Drag hint */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, delay: 1.6, times: [0, 0.2, 0.85, 1] }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/30 bg-black/60 backdrop-blur-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
            <path d="M9 11l3-3 3 3M9 13l3 3 3-3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#D4AF37]">
            Drag to Spin · Double-tap
          </span>
        </motion.div>
      )}

      {/* Shield wrapper - 3D rotation (no spring, direct for responsive drag) */}
      <div
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: isDragging ? "none" : "transform 80ms linear",
        }}
        className="relative shield-glow"
      >
        {/* Back glow layer */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.65), transparent 60%)",
            transform: "translateZ(-80px) scale(1.2)",
          }}
        />

        {/* Logo image - front face */}
        <img
          src={LOGO_URL}
          alt="Gloss Kings Auto Detailing"
          className="relative block w-[300px] sm:w-[380px] md:w-[440px] lg:w-[500px] h-auto pointer-events-none"
          style={{
            transform: "translateZ(40px)",
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 25px rgba(212,175,55,0.35))",
            backfaceVisibility: "hidden",
          }}
          draggable="false"
        />

        {/* Back face - mirrored logo (shows when spun around) */}
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 block w-[300px] sm:w-[380px] md:w-[440px] lg:w-[500px] h-auto pointer-events-none"
          style={{
            transform: "translateZ(-40px) rotateY(180deg)",
            filter:
              "drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 25px rgba(212,175,55,0.25)) brightness(0.85)",
            backfaceVisibility: "hidden",
            opacity: 0.92,
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
      </div>

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
