import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Sofa, Droplets, Shield, Wand2, Wind } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const SERVICES = [
  {
    key: "ceramic",
    title: "Ceramic Coating",
    tag: "Exterior",
    icon: Shield,
    image:
      "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/4634ce9abb7958074be7c625c5fdb5173357e75afac1b30a71b04c55fd6dbb0a.png",
    description:
      "9H-grade nano coating that locks in a mirror-deep gloss, repels water, and protects clear coat for years — not weeks.",
    bullets: ["Multi-year hydrophobic protection", "UV & chemical resistant", "Showroom mirror finish"],
  },
  {
    key: "paint-correction",
    title: "Paint Correction",
    tag: "Exterior",
    icon: Wand2,
    image:
      "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/739a90e6a73ce9a7f0d0df006e5e0df393f242a7b9e4092889b65da009c67425.png",
    description:
      "Multi-stage machine polishing that removes swirls, holograms, oxidation, and light scratches to restore factory clarity.",
    bullets: ["Swirl & scratch removal", "Depth & gloss restored", "Pre-coating prep"],
  },
  {
    key: "exterior-detail",
    title: "Exterior Detail",
    tag: "Exterior",
    icon: Droplets,
    image:
      "https://images.pexels.com/photos/18320398/pexels-photo-18320398.jpeg",
    description:
      "Hand wash, iron decon, clay bar, sealant, tire dressing and trim restoration — a complete reset for your paintwork.",
    bullets: ["Two-bucket hand wash", "Iron & tar decontamination", "Sealant + tire dressing"],
  },
  {
    key: "interior-deep",
    title: "Interior Deep Clean",
    tag: "Interior",
    icon: Sofa,
    image:
      "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/d33e78bb99c19a315f5b411809e7977f045a1641c12681f171c2915c13bc5877.png",
    description:
      "Hot-water extraction, hand-scrubbed carpets, headliner refresh, and every crevice vacuumed. The factory feeling — restored.",
    bullets: ["Extraction-grade shampoo", "Headliner & vents", "Pet hair removal"],
  },
  {
    key: "steam-leather",
    title: "Steam & Leather Care",
    tag: "Interior",
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1608259243654-70c070e0f6ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBpbnRlcmlvciUyMGxlYXRoZXIlMjBjbGVhbnxlbnwwfHx8fDE3ODAwMTI4NTJ8MA&ixlib=rb-4.1.0&q=85",
    description:
      "Pharma-grade steam sanitation, pH-neutral leather cleaner and conditioner — soft, breathable, and protected from cracking.",
    bullets: ["180°F antibacterial steam", "Leather conditioning", "UV interior protection"],
  },
  {
    key: "the-king",
    title: "The King's Package",
    tag: "Signature",
    icon: Sparkles,
    image:
      "https://static.prod-images.emergentagent.com/jobs/73674b8e-f3bf-40a4-ac5d-79e1db85f935/images/25cfa1f0027dceeb736478bff1b1541f0a4838a877718c71151f3327af385bf2.png",
    description:
      "Our flagship treatment. Full paint correction, two-layer ceramic coat, interior steam, and leather restoration — the throne.",
    bullets: ["Multi-stage correction", "2-layer ceramic", "Full interior reset"],
  },
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      data-testid={TEST_IDS.services.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="divider-gold mb-8">
            <span>Services</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-chrome">
            Treatments worthy of <span className="text-gold">the crown</span>.
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl">
            Every package is hand-tailored to your vehicle, your paintwork, and
            your driving life. Pick a service or let us design the throne for you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.key}
                data-testid={TEST_IDS.services.card(s.key)}
                custom={i}
                variants={variants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="card-luxe group relative overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 border border-[#D4AF37]/40 bg-black/50 backdrop-blur text-[0.6rem] tracking-[0.25em] uppercase text-[#D4AF37]">
                    {s.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <h3 className="font-serif-display text-2xl tracking-tight text-white">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">
                    {s.description}
                  </p>
                  <ul className="space-y-1.5">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-xs text-white/70"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
