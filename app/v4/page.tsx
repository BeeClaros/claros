/**
 * /v4 Homepage
 *
 * Fully isolated from the repository's existing theme.
 * Fonts, colours, spacing and typography are all defined in
 * v4-theme.css and applied via .v4-theme on the layout wrapper.
 *
 * Structure:
 *  DotField       - fixed full-page scroll-driven dot animation
 *  Navigation     - fixed top bar
 *  Hero           - primary statement + CTAs
 *  ValueProp      - three value blocks
 *  HowWeWork      - three numbered steps
 *  Industries     - industry impact cards
 *  Impact         - large metrics
 *  WhyUs          - direct statements
 *  FinalCTA       - closing call to action
 *  Footer         - minimal footer
 */

import DotField    from "./components/DotField";
import Navigation  from "./components/Navigation";
import Hero        from "./components/Hero";
import ValueProp   from "./components/ValueProp";
import HowWeWork   from "./components/HowWeWork";
import Industries  from "./components/Industries";
import Impact      from "./components/Impact";
import WhyUs       from "./components/WhyUs";
import FinalCTA    from "./components/FinalCTA";
import Footer      from "./components/Footer";

export default function V4Page() {
  return (
    <>
      {/* Fixed dot field - sits behind all content */}
      <DotField />

      {/* Fixed navigation */}
      <Navigation />

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <main>
          <Hero />
          <ValueProp />
          <HowWeWork />
          <Industries />
          <Impact />
          <WhyUs />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
