import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Crown, Sparkles, Wand2, Shield, Plus } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const VEHICLE_TYPES = [
  { key: "sedan", label: "Sedan / Coupe" },
  { key: "midsize", label: "Midsize SUV / Truck" },
  { key: "fullsize", label: "Full-Size SUV / Van" },
];

const TIERS = [
  {
    key: "basic",
    name: "Basic Wash & Vac",
    duration: "1 hr",
    icon: Sparkles,
    blurb: "Routine weekly or bi-weekly maintenance cleaning.",
    prices: { sedan: "$60 – $70", midsize: "$75 – $85", fullsize: "$90 – $100" },
    accent: "from-white/10 to-white/5",
    badge: null,
    items: [
      "100% scratch-free hand wash and dry",
      "Wheels, tires, fender wells + tire dressing",
      "Door jamb wipe down",
      "Light interior vacuum (seats, carpets, mats)",
      "Dashboard & console wipe down",
      "Exterior + interior glass cleaned",
    ],
  },
  {
    key: "mini",
    name: "Mini Detail",
    duration: "1 – 2 hrs",
    icon: Wand2,
    blurb: "Elevated express with exterior gloss and a thorough interior wipe-down.",
    prices: { sedan: "$120 – $135", midsize: "$140 – $155", fullsize: "$160 – $190" },
    accent: "from-[#D4AF37]/10 to-white/5",
    badge: null,
    items: [
      "Everything in Basic Wash",
      "Exterior spray sealant (1–2 months hydrophobic shine)",
      "Detailed interior blowout + deep vacuum",
      "Sanitation of all plastic / vinyl panels",
      "UV protection for dash + door panels",
    ],
  },
  {
    key: "standard",
    name: "Standard Detail",
    duration: "3 – 4 hrs",
    icon: Shield,
    blurb: "Full interior + exterior. Our bread-and-butter package.",
    prices: { sedan: "$200 – $210", midsize: "$215 – $245", fullsize: "$250 – $280" },
    accent: "from-[#D4AF37]/15 to-[#FFE07A]/5",
    badge: "Most Popular",
    items: [
      "Everything in Mini Detail",
      "Clay bar + iron decontamination",
      "Premium machine polish or 6-month wax/sealant",
      "Light steam clean of vents & cup holders",
      "Hot-water extraction of cloth seats & carpet",
      "Leather cleaned + pH-balanced conditioner",
    ],
  },
  {
    key: "executive",
    name: "Executive Detail",
    duration: "4 – 6 hrs",
    icon: Crown,
    blurb: "Top-tier restoration, deep disinfection, and paint enhancement.",
    prices: { sedan: "$300 – $345", midsize: "$350 – $385", fullsize: "$400 – $435" },
    accent: "from-[#FFE07A]/25 to-[#D4AF37]/10",
    badge: "The King",
    items: [
      "Everything in Standard Detail",
      "Single-stage paint correction (~50-70% swirl removal)",
      "Engine bay deep clean + dressing",
      "Deep steam sterilization of full cabin",
      "Intensive multi-pass seat/carpet shampooing",
      "1-year ceramic spray coating (paint + windshield)",
    ],
  },
];

const ADDONS = [
  { name: "Pet Hair Removal", price: "$25 – $75" },
  { name: "Clay Bar Treatment", price: "$50" },
  { name: "Odor Removal", price: "$40" },
  { name: "Engine Bay Cleaning", price: "$50" },
  { name: "Ceramic Spray Coating", price: "$75" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Pricing() {
  const [vehicle, setVehicle] = useState("sedan");

  return (
    <section
      id="pricing"
      data-testid={TEST_IDS.pricing.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 bg-[#070707]"
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
              <span>Pricing</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              <span className="text-chrome">Choose your</span>{" "}
              <span data-text="coronation." className="text-gloss">coronation.</span>
            </h2>
          </div>
          <p className="text-white/55 text-lg max-w-md lg:justify-self-end">
            Transparent, honest pricing. Pick a vehicle size and a package — or
            mix in an add-on. We'll confirm the exact quote within 24 hours.
          </p>
        </motion.div>

        {/* Vehicle size toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid={TEST_IDS.pricing.vehicleToggle}
          className="mb-12 inline-flex flex-wrap gap-1 p-1 border border-white/10 bg-black/40"
        >
          {VEHICLE_TYPES.map((v) => {
            const active = vehicle === v.key;
            return (
              <button
                key={v.key}
                data-testid={TEST_IDS.pricing.vehicleButton(v.key)}
                onClick={() => setVehicle(v.key)}
                className={`px-5 py-2.5 text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  active
                    ? "bg-[#D4AF37] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tiers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((t, i) => {
            const Icon = t.icon;
            const isFlagship = t.key === "executive";
            return (
              <motion.div
                key={t.key}
                data-testid={TEST_IDS.pricing.tier(t.key)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className={`group relative flex flex-col bg-gradient-to-br ${t.accent} border ${
                  isFlagship ? "border-[#D4AF37]/50" : "border-white/8"
                } hover:border-[#D4AF37]/60 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Badge */}
                {t.badge && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-[#070707] border border-[#D4AF37]/50 text-[0.6rem] tracking-[0.3em] uppercase text-[#D4AF37]">
                    {t.badge}
                  </div>
                )}

                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isFlagship ? "text-[#FFE07A]" : "text-[#D4AF37]"
                      }`}
                    />
                    <div className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-white/50">
                      <Clock className="w-3 h-3" />
                      {t.duration}
                    </div>
                  </div>

                  <h3 className="font-serif-display text-2xl tracking-tight text-white mb-2">
                    {t.name}
                  </h3>
                  <p className="text-xs text-white/55 leading-relaxed mb-6 min-h-[3.5rem]">
                    {t.blurb}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/8">
                    <div className="font-serif-display text-3xl text-gold leading-none">
                      {t.prices[vehicle]}
                    </div>
                    <div className="mt-2 text-[0.6rem] tracking-[0.25em] uppercase text-white/40">
                      {VEHICLE_TYPES.find((v) => v.key === vehicle)?.label}
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {t.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed"
                      >
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    data-testid={TEST_IDS.pricing.cta(t.key)}
                    onClick={() => scrollTo("quote")}
                    className={
                      isFlagship
                        ? "btn-gold w-full !text-[0.7rem]"
                        : "btn-ghost-gold w-full !text-[0.7rem]"
                    }
                  >
                    Book {t.name.split(" ")[0]}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add-Ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 border border-white/8 bg-[#050505]"
          data-testid={TEST_IDS.pricing.addons}
        >
          <div className="p-7 md:p-10">
            <div className="flex items-center gap-3 mb-7">
              <Plus className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-sans-display text-sm tracking-[0.3em] uppercase text-white">
                Add-On Services
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
              {ADDONS.map((a) => (
                <div
                  key={a.name}
                  className="bg-[#050505] p-5 hover:bg-[#0A0A0C] transition-colors"
                >
                  <div className="text-[0.7rem] tracking-[0.15em] uppercase text-white/75 mb-2">
                    {a.name}
                  </div>
                  <div className="font-serif-display text-xl text-gold">
                    {a.price}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 text-xs text-white/40 leading-relaxed">
              * Prices are starting estimates. Final quotes depend on vehicle
              condition, size, and selected services. We confirm in writing
              before any work begins — no surprise fees.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
