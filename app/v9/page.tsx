/**
 * /v9 Homepage - "CLAROS"
 *
 * Premium homepage for an AI-adoption consultancy, built around a
 * mechanical-bee identity - reimagined as a precision navigation
 * instrument. Editorial · technical · light. Ivory surfaces, ultramarine
 * direction, minimal copper energy. Aviation charts, technical drawings
 * and precisely observed natural structures.
 *
 * Fully isolated from every other route version (own theme, fonts,
 * SVG artwork and components). Homepage only - the menu items scroll
 * to sections; no additional pages.
 *
 * Flow:
 *  1. Hero          - turn AI activity into business progress
 *  2. Problem       - more AI does not always mean more value
 *  3. WhatWeDo      - flight path: understand → prioritise → implement → embed
 *  4. Assessment    - start by knowing what matters (dark)
 *  5. ValueAreas    - where we create value
 *  6. HumanAI       - human judgement gives technology direction
 *  7. Collaboration - one direction, three stages
 *  8. BrandStatement- different capabilities, one direction (ultramarine)
 *  9. FinalCTA      - find the right place to begin
 * 10. Footer
 */

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import WhatWeDo from "./components/WhatWeDo";
import Assessment from "./components/Assessment";
import ValueAreas from "./components/ValueAreas";
import HumanAI from "./components/HumanAI";
import Collaboration from "./components/Collaboration";
import BrandStatement from "./components/BrandStatement";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function V9Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <WhatWeDo />
        <Assessment />
        <ValueAreas />
        <HumanAI />
        <Collaboration />
        <BrandStatement />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
