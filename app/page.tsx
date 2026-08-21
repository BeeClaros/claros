import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import PrivateAIFoundation from "@/components/home/PrivateAIFoundation";
import HowWeWork from "@/components/home/HowWeWork";
import TrustSection from "@/components/home/TrustSection";
import BrandStatement from "@/components/home/BrandStatement";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div
      className="v8-theme"
      style={{ minHeight: "100vh", backgroundColor: "var(--v8-bg-primary)" }}
    >
      <Navigation />
      <main>
        <Hero />
        <WhatWeDo />
        <PrivateAIFoundation />
        <HowWeWork />
        <TrustSection />
        <BrandStatement />
      </main>
      <Footer />
    </div>
  );
}
