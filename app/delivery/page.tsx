import type { Metadata } from "next";
import PhaseShell from "../v8/components/phase/PhaseShell";
import PhaseHero from "../v8/components/phase/PhaseHero";
import PhaseCTA from "../v8/components/phase/PhaseCTA";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Continuous Delivery - CLAROS",
  description:
    "Adoption that lasts - measurement, team support and governance to expand what works across the organisation.",
};

export default function DeliveryPage() {
  return (
    <PhaseShell>
      <PhaseHero
        phase="Phase 03"
        title="Make it stick."
        lead="AI only creates lasting value when teams adopt it, governance supports it and the organisation keeps improving."
        imageSrc="/v8/hero-hive-bg.png"
      />
      <DeliveryContent />
      <PhaseCTA
        title="Adoption is where the value lives."
        lead="Let's discuss how to make AI part of how your teams work, not just another tool they ignore."
        ctaLabel="Discuss ongoing support"
      />
    </PhaseShell>
  );
}
