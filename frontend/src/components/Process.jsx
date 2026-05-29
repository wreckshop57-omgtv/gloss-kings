import React from "react";
import { motion } from "framer-motion";
import { TEST_IDS } from "@/constants/testIds";

const STEPS = [
  {
    n: "01",
    title: "Consult & Inspect",
    desc: "We meet you and the vehicle. Paint thickness gauged, panels assessed, and a custom plan written — no upsells, only honesty.",
  },
  {
    n: "02",
    title: "Decontaminate",
    desc: "Foam pre-soak, two-bucket hand wash, iron-fallout dissolver, and clay-bar pass. The canvas is prepared like a museum piece.",
  },
  {
    n: "03",
    title: "Correct & Refine",
    desc: "Multi-stage machine polishing under tri-spectrum lighting. Swirls, scratches, and oxidation removed — clarity restored to factory or better.",
  },
  {
    n: "04",
    title: "Coat & Crown",
    desc: "Application of premium ceramic coatings, leather conditioning, and a final hand-buff. Your vehicle leaves wearing the crown.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-testid={TEST_IDS.process.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 bg-[#070707]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid lg:grid-cols-2 gap-8 items-end"
        >
          <div>
            <div className="divider-gold mb-8 max-w-xs">
              <span>The Process</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-chrome">
              Obsession,<br />
              <span className="text-gold">in four acts.</span>
            </h2>
          </div>
          <p className="text-white/55 text-lg max-w-md lg:justify-self-end">
            We don't rush a king. Every detail follows a deliberate sequence
            engineered to extract maximum gloss, depth, and longevity from
            your paint and cabin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-[#050505] p-8 md:p-10 group hover:bg-[#0A0A0C] transition-colors duration-500"
            >
              <div className="font-serif-display text-5xl text-gold mb-4">
                {s.n}
              </div>
              <h3 className="font-sans-display text-lg uppercase tracking-[0.15em] text-white mb-3">
                {s.title}
              </h3>
              <div className="w-10 h-px bg-[#D4AF37]/40 mb-5 group-hover:w-20 group-hover:bg-[#D4AF37] transition-all duration-500" />
              <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
