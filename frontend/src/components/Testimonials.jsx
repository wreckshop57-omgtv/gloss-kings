import React from "react";
import { motion } from "framer-motion";
import { Star, Quote as QuoteIcon } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const TESTIMONIALS = [
  {
    name: "Marcus J.",
    car: "BMW M4 Competition",
    body: "These guys treated my M4 like it was theirs. Paint correction was insane — looks better than the day I picked it up off the lot. The ceramic still beads water 8 months in.",
  },
  {
    name: "Alina R.",
    car: "Tesla Model S Plaid",
    body: "Booked the King's Package. Interior smelled like a new car again, and the gloss on the paint? I've literally had three people ask if I repainted it.",
  },
  {
    name: "Devon K.",
    car: "Range Rover Sport",
    body: "Professional from first text to handoff. Steamed the seats, conditioned the leather, made it feel pristine. Gloss Kings is the only crew touching my Rover now.",
  },
];

const MARQUEE = [
  "Houston · Sugar Land · Katy · Pearland · Spring",
  "Mobile service available · Ceramic certified",
  "Concierge detailing for enthusiasts",
];

export default function Testimonials() {
  return (
    <section
      data-testid={TEST_IDS.testimonials.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 bg-[#070707]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <div className="divider-gold mb-8 max-w-xs">
            <span>The Court</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            <span className="text-chrome">Words from</span>{" "}
            <span className="text-gold">the loyal.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="card-luxe p-8 md:p-10 relative"
            >
              <QuoteIcon className="absolute top-6 right-6 w-10 h-10 text-[#D4AF37]/15" />
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-7 text-[0.95rem]">
                "{t.body}"
              </p>
              <div className="border-t border-white/5 pt-5">
                <p className="font-sans-display tracking-[0.15em] uppercase text-sm text-white">
                  {t.name}
                </p>
                <p className="text-xs text-[#D4AF37] mt-1">{t.car}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="marquee py-6 border-y border-white/5">
          <div className="marquee__inner font-serif-display text-2xl md:text-3xl text-white/40 italic">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-16">
                {m}
                <span className="text-gold not-italic">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
