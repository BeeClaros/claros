/**
 * /v6 Homepage
 *
 * Dark, cinematic partnership theme - lean sales funnel.
 * Fully isolated from all other route versions.
 *
 * Voice: editorial, direct, anti-hype. Peer, not salesperson.
 * Metaphor: the human hand (judgment, context, ownership) meets the
 * machine hand (capability, scale, reach). Value lives where they meet.
 *
 * Funnel flow (kept deliberately short):
 *  1. Hero        - Attention: bold claim over the fist-bump image
 *  2. Problem     - Pain: "AI everywhere. Value nowhere."
 *  3. Partnership - Metaphor: two hands, one grip
 *  4. Marquee     - Rhythm: running maxims
 *  5. Journey     - How we help: three phases, enter anywhere
 *  6. Principles  - Anti-hype: what we won't compromise
 *  7. FinalCTA    - Conversion: book an intro call
 */

import Navigation  from "./components/Navigation";
import Hero        from "./components/Hero";
import Problem     from "./components/Problem";
import Partnership from "./components/Partnership";
import Marquee     from "./components/Marquee";
import Journey     from "./components/Journey";
import Principles  from "./components/Principles";
import FinalCTA    from "./components/FinalCTA";
import Footer      from "./components/Footer";

export default function V6Page() {
  return (
    <>
      <Navigation />

      <div style={{ position: "relative" }}>
        <main>
          <Hero />
          <Problem />
          <Partnership />
          <Marquee />
          <Journey />
          <Principles />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
