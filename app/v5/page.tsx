/**
 * /v5 Homepage
 *
 * Premium editorial homepage for an AI adoption consultancy.
 * Fully isolated from the repository's existing theme.
 * Light, warm, architectural visual system.
 *
 * Structure:
 *  Navigation       - fixed minimal header
 *  Hero             - primary message + structure canvas
 *  Problem          - editorial statement on the challenge
 *  WhatWeDo         - four connected stages
 *  StartingPoint    - cobalt assessment section
 *  ValueMatrix      - business function matrix
 *  HowWeWork        - principles and approach
 *  EngagementModel  - three phases
 *  WhyUs            - differentiators
 *  FinalCTA         - closing call to action
 *  Footer           - minimal institutional footer
 */

import Navigation      from "./components/Navigation";
import Hero            from "./components/Hero";
import Problem         from "./components/Problem";
import WhatWeDo        from "./components/WhatWeDo";
import StartingPoint   from "./components/StartingPoint";
import ValueMatrix     from "./components/ValueMatrix";
import HowWeWork       from "./components/HowWeWork";
import EngagementModel from "./components/EngagementModel";
import WhyUs           from "./components/WhyUs";
import FinalCTA        from "./components/FinalCTA";
import Footer          from "./components/Footer";

export default function V5Page() {
  return (
    <>
      <Navigation />

      <div style={{ position: "relative" }}>
        <main>
          <Hero />
          <Problem />
          <WhatWeDo />
          <StartingPoint />
          <ValueMatrix />
          <HowWeWork />
          <EngagementModel />
          <WhyUs />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
