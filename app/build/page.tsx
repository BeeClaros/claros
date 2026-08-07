import type { Metadata } from "next";
import PhaseShell from "../v8/components/phase/PhaseShell";
import PhaseHero from "../v8/components/phase/PhaseHero";
import PhaseCTA from "../v8/components/phase/PhaseCTA";
import BuildContent from "./BuildContent";

export const metadata: Metadata = {
  title: "Build - CLAROS",
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
        imageSrc="/v8/bg-hive.png"
      />
      <BuildContent />
      <PhaseCTA
        title="Ready to build?"
        lead="Let's talk about what your organisation needs and how we can implement it."
        ctaLabel="Discuss implementation"
      />
    </PhaseShell>
  );
}
