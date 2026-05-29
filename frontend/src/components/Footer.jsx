import React from "react";
import { motion } from "framer-motion";
import { Instagram, Phone, Mail, MapPin, Crown } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-testid={TEST_IDS.footer.section}
      className="relative border-t border-white/5 bg-black pt-20 pb-10 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Crown className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-sans-display tracking-[0.25em] uppercase text-sm">
                <span className="text-chrome">Gloss</span>{" "}
                <span className="text-gold">Kings</span>
              </span>
            </div>
            <p className="text-white/50 leading-relaxed max-w-md">
              Premium mobile auto detailing in Houston, TX. Ceramic coatings,
              paint correction, interior restoration. We treat every vehicle
              like royalty.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                data-testid={TEST_IDS.footer.instagram}
                href="https://instagram.com/glosskings_autodetailing"
                target="_blank"
                rel="noreferrer noopener"
                className="w-10 h-10 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37]" />
              </a>
              <a
                data-testid={TEST_IDS.footer.phone}
                href="tel:3465076085"
                className="w-10 h-10 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 flex items-center justify-center transition-colors group"
                aria-label="Call"
              >
                <Phone className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37]" />
              </a>
              <a
                data-testid={TEST_IDS.footer.email}
                href="mailto:Glosskings.autodetailing1012@gmail.com"
                className="w-10 h-10 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37]" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.3em] uppercase text-[#D4AF37] mb-5 gold-underline inline-block">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <Phone className="w-4 h-4 mt-0.5 text-[#D4AF37]/70" />
                <a href="tel:3465076085" className="hover:text-white transition">
                  346-507-6085
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Mail className="w-4 h-4 mt-0.5 text-[#D4AF37]/70" />
                <a
                  href="mailto:Glosskings.autodetailing1012@gmail.com"
                  className="hover:text-white transition break-all"
                >
                  Glosskings.autodetailing1012@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Instagram className="w-4 h-4 mt-0.5 text-[#D4AF37]/70" />
                <a
                  href="https://instagram.com/glosskings_autodetailing"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition"
                >
                  @glosskings_autodetailing
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D4AF37]/70" />
                <span>Houston, TX</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.3em] uppercase text-[#D4AF37] mb-5 gold-underline inline-block">
              Hours
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex justify-between"><span>Services are provided by appointment ONLY.</span></li>
            </ul>
            <p className="mt-6 text-[0.7rem] tracking-[0.2em] uppercase text-white/40">
              Mobile service available
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Gloss Kings Auto Detailing · All rights reserved
          </p>
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/30">
            Crafted for the Crown
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
