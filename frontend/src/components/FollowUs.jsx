import React from "react";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const INSTAGRAM_URL = "https://www.instagram.com/glosskings_autodetailing";

const SHOWCASE = [
  {
    src: "https://images.pexels.com/photos/18320398/pexels-photo-18320398.jpeg",
    span: "lg:col-span-2 lg:row-span-2",
    label: "Studio Finish",
  },
  {
    src: "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/4634ce9abb7958074be7c625c5fdb5173357e75afac1b30a71b04c55fd6dbb0a.png",
    span: "",
    label: "Ceramic Layer",
  },
  {
    src: "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/739a90e6a73ce9a7f0d0df006e5e0df393f242a7b9e4092889b65da009c67425.png",
    span: "",
    label: "Hand Polish",
  },
  {
    src: "https://images.unsplash.com/photo-1608259243654-70c070e0f6ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMGxlYXRoZXIlMjBjbGVhbnxlbnwwfHx8fDE3ODAwMTI4NTJ8MA&ixlib=rb-4.1.0&q=85",
    span: "lg:col-span-2",
    label: "Leather Restored",
  },
  {
    src: "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/d33e78bb99c19a315f5b411809e7977f045a1641c12681f171c2915c13bc5877.png",
    span: "",
    label: "Interior Detail",
  },
];

export default function FollowUs() {
  return (
    <section
      id="follow"
      data-testid={TEST_IDS.follow.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid lg:grid-cols-2 gap-8 items-end"
        >
          <div>
            <div className="divider-gold mb-8 max-w-xs">
              <span>Follow Us</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              <span className="text-chrome">See the gloss,</span>{" "}
              <span data-text="live on the gram." className="text-gloss">live on the gram.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <a
              data-testid={TEST_IDS.follow.cta}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 px-6 py-4 border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-black/40 hover:bg-[#D4AF37]/5 transition-all"
            >
              <Instagram className="w-5 h-5 text-[#D4AF37]" />
              <div className="text-left">
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-white/50">
                  Instagram
                </div>
                <div className="font-sans-display text-sm tracking-[0.05em] text-white">
                  @glosskings_autodetailing
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-3 auto-rows-[200px] md:auto-rows-[260px]">
            {SHOWCASE.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className={`relative overflow-hidden group ${img.span} border border-white/5`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Instagram className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs tracking-[0.25em] uppercase text-white/90">
                    {img.label}
                  </span>
                  <span className="text-xs text-[#D4AF37]">★</span>
                </div>
              </motion.div>
            ))}
          </div>
        </a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-[0.7rem] tracking-[0.3em] uppercase text-white/40"
        >
          Tap any tile · DM us for a slot
        </motion.p>
      </div>
    </section>
  );
}
