import Navigation from "./v8/components/Navigation";
import Hero from "./v8/components/Hero";
// V1 imports (kept for reference):
// import WhatWeDo from "./v8/components/WhatWeDo";
// import PrivateAIFoundation from "./v8/components/PrivateAIFoundation";
// import TrustSection from "./v8/components/TrustSection";
import WhatWeDo from "./v8/components/WhatWeDoV2";
import PrivateAIFoundation from "./v8/components/PrivateAIFoundationV2";
import HowWeWork from "./v8/components/HowWeWork";
import TrustSection from "./v8/components/TrustSectionV2";
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
        <PrivateAIFoundation />
        <HowWeWork />
        <TrustSection />
        <BrandStatement />
      </main>
      <Footer />
    </div>
  );
}
