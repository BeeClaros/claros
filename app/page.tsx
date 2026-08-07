import Navigation from "./v8/components/Navigation";
import Hero from "./v8/components/Hero";
import WhatWeDo from "./v8/components/WhatWeDo";
import HowWeWork from "./v8/components/HowWeWork";
import BrandStatement from "./v8/components/BrandStatement";
import Footer from "./v8/components/Footer";

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
        <HowWeWork />
        <BrandStatement />
      </main>
      <Footer />
    </div>
  );
}
