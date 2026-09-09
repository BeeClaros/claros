import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import PhaseHero from "@/components/phase/PhaseHero";
import PhaseCTA from "@/components/phase/PhaseCTA";
import BuildContent from "./BuildContent";

export const metadata: Metadata = {
  title: "Build",
  description:
    "Practical AI implementation - product and process transformation that fits existing teams and systems.",
};

export default function BuildPage() {
  return (
    <PhaseShell>
      <PhaseHero
        phase="Phase 02"
        title="Build what fits."
        lead="Practical AI implementation - product and process transformation designed for your teams, your systems and your business."
        imageSrc="/images/bg-hive.png"
      />
      <BuildContent />
      <PhaseCTA
        title="Ready to build?"
        lead="Let's talk about what your company needs and how we can implement it."
        ctaLabel="Discuss implementation"
      />
    </PhaseShell>
  );
}
