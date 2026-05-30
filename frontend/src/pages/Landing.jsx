import React from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import FollowUs from "@/components/FollowUs";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <FollowUs />
      <Testimonials />
      <QuoteForm />
      <Footer />
    </main>
  );
}
