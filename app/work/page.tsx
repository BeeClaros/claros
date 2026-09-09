import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import PhaseHero from "@/components/phase/PhaseHero";
import PhaseCTA from "@/components/phase/PhaseCTA";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected software, integration and automation work across complex operational environments.",
};

export default function WorkPage() {
  return (
    <PhaseShell>
      <PhaseHero
        phase="Selected work"
        title="Systems built around how work actually happens."
        lead="Software, integration and automation across complex operational environments."
        statement="Designed around real operating constraints, existing systems and the people who use them."
        imageSrc="/images/hero-hive-bg.png"
      />
      <WorkContent />
      <PhaseCTA
        title="Have a process that should work better?"
        lead="Start from the workflow. Understand the systems around it. Build the smallest reliable implementation that improves how the operation runs."
        ctaLabel="Discuss the workflow"
      />
    </PhaseShell>
  );
}
