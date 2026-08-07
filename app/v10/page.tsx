/**
 * /v10 Homepage - "CLAROS"
 *
 * V8 light + lime styling with v6 human-robot partnership artwork.
 *
 * Light + lime palette. Fully isolated from every other route version
 * (own theme, fonts, components and generated raster artwork).
 *
 * Flow:
 *  1. Hero          - AI works better when the business works with it
 *  2. Problem       - activity is growing, direction is missing
 *  3. WhatWeDo      - flight path: understand → prioritise → implement → embed
 *  4. Assessment    - start with clarity
 *  5. ValueAreas    - where we create value
 *  6. HowWeWork     - human direction, AI capability (dark section)
 *  7. Collaboration - one path, different ways to work together
 *  8. BrandStatement- alone limited, together a working system (lime)
 *  9. FinalCTA      - find where AI can make a real difference
 * 10. Footer
 */

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import WhatWeDo from "./components/WhatWeDo";
import Assessment from "./components/Assessment";
import ValueAreas from "./components/ValueAreas";
import HowWeWork from "./components/HowWeWork";
import Collaboration from "./components/Collaboration";
import BrandStatement from "./components/BrandStatement";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function V10Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <WhatWeDo />
        <Assessment />
        <ValueAreas />
        <HowWeWork />
        <Collaboration />
        <BrandStatement />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
