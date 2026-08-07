/**
 * /v3 Homepage
 *
 * Fully isolated from the repository's existing theme.
 * Fonts, colours, spacing, buttons and headings are all
 * defined in signal-theme.css and applied via .signal-theme
 * on the layout wrapper - none of the root globals.css
 * design tokens are active within this subtree.
 *
 * Structure:
 *  ParticleCanvas  - fixed full-page scroll-driven animation
 *  Navigation      - fixed top bar
 *  Hero            - primary message + CTAs
 *  WhatWeDo        - three evolving visual stages
 *  WhatClientsBring - entry points
 *  FinalCTA        - closing call to action
 *  Footer          - links and copyright
 */

import ParticleCanvas      from "./components/ParticleCanvas";
import Navigation          from "./components/Navigation";
import Hero                from "./components/Hero";
import WhatWeDo            from "./components/WhatWeDo";
import WhatClientsBring    from "./components/WhatClientsBring";
import FinalCTA            from "./components/FinalCTA";
import Footer              from "./components/Footer";

export default function V3Page() {
  return (
    <>
      {/* Fixed particle canvas - sits behind all content */}
      <ParticleCanvas />

      {/* Fixed navigation */}
      <Navigation />

      {/* Scrollable content - z-index above canvas */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <main>
          <Hero />
          <WhatWeDo />
          <WhatClientsBring />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
