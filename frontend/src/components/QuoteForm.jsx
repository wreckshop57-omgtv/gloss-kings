import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Crown, Check, Loader2 } from "lucide-react";
import { TEST_IDS } from "@/constants/testIds";

const API = "/api";

const SERVICES = [
  "Basic Wash & Vac",
  "Mini Detail",
  "Standard Detail",
  "Executive Detail",
  "Not Sure - Recommend One",
];
export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: SERVICES[0],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.vehicle.trim()) {
      toast.error("Name, phone, and vehicle are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
      setSuccess(true);
      toast.success("Request received — we'll text you within 24h.");
      setForm({
        name: "",
        phone: "",
        email: "",
        vehicle: "",
        service: SERVICES[0],
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.detail || "Could not submit. Try again or call us."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote"
      data-testid={TEST_IDS.quote.section}
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background flair */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#FFE07A]/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="divider-gold mb-8 max-w-xs">
            <span>Request a Quote</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            <span className="text-chrome">Tell us about</span>{" "}
            <span data-text="your ride." className="text-gloss">your ride.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-md leading-relaxed">
            Drop a few details. We'll respond within 24 hours with a tailored
            quote, available slots, and a recommended package.
          </p>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
              <span className="text-white/70">Free no-obligation consultation</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
              <span className="text-white/70">Mobile Service — <span className="text-white">"We come to you."</span></span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
              <span className="text-white/70">Transparent, written quote — no surprise fees</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          data-testid={TEST_IDS.quote.form}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={onSubmit}
          className="card-luxe p-8 md:p-10 relative"
        >
          <div className="absolute -top-3 left-8 px-3 py-1 bg-[#050505] border border-[#D4AF37]/40 flex items-center gap-2">
            <Crown className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#D4AF37]">
              Royal Inquiry
            </span>
          </div>

          {success ? (
            <motion.div
              data-testid={TEST_IDS.quote.success}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
                <Check className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif-display text-3xl text-chrome mb-3">
                Request Received
              </h3>
              <p className="text-white/60 max-w-sm mx-auto mb-8">
                Your throne is being prepared. We'll text or call you at the
                number provided within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="btn-ghost-gold"
              >
                Submit Another
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                    Full Name *
                  </label>
                  <input
                    data-testid={TEST_IDS.quote.name}
                    type="text"
                    value={form.name}
                    onChange={onChange("name")}
                    placeholder="Jane Doe"
                    className="input-luxe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                    Phone *
                  </label>
                  <input
                    data-testid={TEST_IDS.quote.phone}
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    placeholder="(346) 507-6085"
                    className="input-luxe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Email
                </label>
                <input
                  data-testid={TEST_IDS.quote.email}
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="you@email.com"
                  className="input-luxe"
                />
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Year / Make / Model *
                </label>
                <input
                  data-testid={TEST_IDS.quote.vehicle}
                  type="text"
                  value={form.vehicle}
                  onChange={onChange("vehicle")}
                  placeholder="2022 BMW M4"
                  className="input-luxe"
                  required
                />
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Service
                </label>
                <select
                  data-testid={TEST_IDS.quote.service}
                  value={form.service}
                  onChange={onChange("service")}
                  className="input-luxe appearance-none cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[#050505] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.25em] uppercase text-white/50 mb-2">
                  Tell us about your ride
                </label>
                <textarea
                  data-testid={TEST_IDS.quote.message}
                  value={form.message}
                  onChange={onChange("message")}
                  placeholder="Swirls, water spots, preferred timeframe..."
                  rows={4}
                  className="input-luxe resize-none"
                />
              </div>

              <button
                data-testid={TEST_IDS.quote.submit}
                type="submit"
                disabled={loading}
                className="btn-gold w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending
                  </>
                ) : (
                  "Send Royal Inquiry"
                )}
              </button>

              <p className="text-[0.7rem] text-white/40 text-center mt-4">
                Or text us directly:{" "}
                <a href="tel:3465076085" className="text-[#D4AF37] hover:underline">
                  346-507-6085
                </a>
              </p>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
