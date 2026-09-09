import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Technology should fit the business, not the other way around. Meet the team behind CLAROS.",
};

export default function AboutPage() {
  return (
    <PhaseShell>
      <AboutContent />
    </PhaseShell>
  );
}
