import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import PhaseHero from "@/components/phase/PhaseHero";
import PhaseCTA from "@/components/phase/PhaseCTA";
import AssessmentContent from "./AssessmentContent";

export const metadata: Metadata = {
  title: "Assessment",
  description:
    "Understand where AI can create the strongest business value before investing in tools or experiments.",
};

export default function AssessmentPage() {
  return (
    <PhaseShell>
      <PhaseHero
        phase="Phase 01"
        title="Start with clarity."
        lead="Before investing in more tools or launching more experiments, understand where AI can create the strongest business value."
        statement="You leave knowing what to do first, what it requires and why it matters."
        imageSrc="/images/hero-hive-bg.png"
      />
      <AssessmentContent />
      <PhaseCTA
        title="Find where AI can make a real difference."
        lead="A first conversation helps us understand your priorities and where focused support could create value."
        ctaLabel="Discuss an assessment"
      />
    </PhaseShell>
  );
}
