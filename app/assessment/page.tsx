import type { Metadata } from "next";
import PhaseShell from "../v8/components/phase/PhaseShell";
import PhaseHero from "../v8/components/phase/PhaseHero";
import PhaseSection from "../v8/components/phase/PhaseSection";
import PhaseCTA from "../v8/components/phase/PhaseCTA";
import AssessmentContent from "./AssessmentContent";

export const metadata: Metadata = {
  title: "Assessment - CLAROS",
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
        imageSrc="/v8/hero-hive-bg.png"
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
