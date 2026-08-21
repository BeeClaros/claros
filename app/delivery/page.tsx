import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import PhaseHero from "@/components/phase/PhaseHero";
import PhaseCTA from "@/components/phase/PhaseCTA";
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
        lead="AI creates lasting value when teams adopt it, ownership is clear and the organisation keeps improving how it is used."
        imageSrc="/images/hero-hive-bg.png"
      />
      <DeliveryContent />
      <PhaseCTA
        title="Turn implementation into lasting value."
        lead="Let's discuss how to make AI part of how your teams work, with adoption, measurement and support built in."
        ctaLabel="Discuss ongoing support"
      />
    </PhaseShell>
  );
}
