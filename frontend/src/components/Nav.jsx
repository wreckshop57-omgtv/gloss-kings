import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const links = [
  { id: "services", label: "Services", testid: TEST_IDS.nav.linkServices },
  { id: "process", label: "Process", testid: TEST_IDS.nav.linkProcess },
  { id: "gallery", label: "Gallery", testid: TEST_IDS.nav.linkGallery },
  { id: "contact", label: "Contact", testid: TEST_IDS.nav.linkContact },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      data-testid={TEST_IDS.nav.container}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          data-testid={TEST_IDS.nav.logo}
          className="flex items-center gap-2.5 group"
        >
          <Crown className="w-5 h-5 text-[#D4AF37] group-hover:text-[#FFE07A] transition" strokeWidth={2.2} />
          <span className="font-sans-display tracking-[0.25em] text-[0.78rem] uppercase">
            <span className="text-chrome">Gloss</span>{" "}
            <span className="text-gold">Kings</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testid}
              onClick={() => scrollTo(l.id)}
              className="text-[0.72rem] tracking-[0.25em] uppercase text-white/70 hover:text-[#D4AF37] transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid={TEST_IDS.nav.ctaQuote}
            onClick={() => scrollTo("quote")}
            className="btn-gold"
          >
            Request Quote
          </button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          data-testid={TEST_IDS.nav.mobileToggle}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black/95"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setOpen(false);
                    scrollTo(l.id);
                  }}
                  className="text-left text-sm tracking-[0.2em] uppercase text-white/80"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  scrollTo("quote");
                }}
                className="btn-gold w-full"
              >
                Request Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
