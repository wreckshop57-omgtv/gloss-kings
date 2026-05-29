import React from "react";
import { motion } from "framer-motion";
import { TEST_IDS } from "@/constants/testIds";

const IMAGES = [
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
    label: "Paint Correction",
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

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid={TEST_IDS.gallery.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16"
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
            <span>The Gallery</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            <span className="text-chrome">Reflections</span>{" "}
            <span className="text-gold">worth framing.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-3 auto-rows-[200px] md:auto-rows-[260px]">
          {IMAGES.map((img, i) => (
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs tracking-[0.25em] uppercase text-white/90">
                  {img.label}
                </span>
                <span className="text-xs text-[#D4AF37]">★</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
