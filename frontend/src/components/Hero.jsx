import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import ShieldLogo3D from "@/components/ShieldLogo3D";
import { TEST_IDS } from "@/constants/testIds";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/25cfa1f0027dceeb736478bff1b1541f0a4838a877718c71151f3327af385bf2.png";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      data-testid={TEST_IDS.hero.section}
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            filter: "brightness(0.45) saturate(0.9)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
      </motion.div>

      {/* Decorative gold light bars */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="light-bar" style={{ left: "12%" }} />
        <div className="light-bar" style={{ left: "78%" }} />
      </div>

      <motion.div
        style={{ y: yMid, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left — copy */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mb-7"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[0.7rem] tracking-[0.35em] uppercase text-[#D4AF37]">
              Houston · Auto Detailing Royalty
            </span>
          </motion.div>

          <motion.h1
            data-testid={TEST_IDS.hero.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="font-serif-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
          >
            <span className="block text-chrome">A Throne For</span>
            <span className="block">
              <span data-text="Every Vehicle." className="text-gloss">Every Vehicle.</span>
            </span>
          </motion.h1>

          <motion.p
            data-testid={TEST_IDS.hero.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Concierge-grade ceramic coatings, paint correction, and interior
            restoration — performed by obsessives with a microfiber and a
            polishing torque. Your ride deserves the crown.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              data-testid={TEST_IDS.hero.ctaQuote}
              onClick={() => scrollTo("quote")}
              className="btn-gold"
            >
              Claim Your Royal Detail
            </button>
            <button
              data-testid={TEST_IDS.hero.ctaServices}
              onClick={() => scrollTo("services")}
              className="btn-ghost-gold"
            >
              View Services
            </button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 flex flex-wrap gap-8 text-[0.7rem] tracking-[0.2em] uppercase text-white/40"
          >
            <span>★★★★★ 5.0 Average</span>
            <span>Ceramic Certified</span>
            <span>Mobile Service</span>
          </motion.div>
        </div>

        {/* Right — 3D shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px] w-full"
        >
          {/* Spinning gold ring backdrop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="slow-spin">
              <svg width="520" height="520" viewBox="0 0 520 520" className="opacity-30">
                <defs>
                  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE07A" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <circle cx="260" cy="260" r="240" fill="none" stroke="url(#ring)" strokeWidth="0.5" strokeDasharray="2 8" />
                <circle cx="260" cy="260" r="200" fill="none" stroke="url(#ring)" strokeWidth="0.5" strokeDasharray="1 16" />
              </svg>
            </div>
          </div>
          <ShieldLogo3D />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[0.65rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
