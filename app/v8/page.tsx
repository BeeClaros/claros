/**
 * /v8 Homepage - "CLAROS"
 *
 * Lean homepage: Hero → What We Do → How We Work → Brand Statement + CTA.
 * Detailed phase content lives on dedicated sub-pages:
 *   /assessment  /build  /delivery
 */

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import HowWeWork from "./components/HowWeWork";
import BrandStatement from "./components/BrandStatement";
import Footer from "./components/Footer";

export default function V8Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhatWeDo />
        <HowWeWork />
        <BrandStatement />
      </main>
      <Footer />
    </>
  );
}
