import type { Metadata } from "next";
import PhaseShell from "@/components/phase/PhaseShell";
import PrivateAIContent from "./PrivateAIContent";

export const metadata: Metadata = {
  title: "Private AI",
  description:
    "A managed private AI workspace and API for teams that need the speed of modern AI without giving up control over data, access or deployment.",
};

export default function PrivateAIPage() {
  return (
    <PhaseShell>
      <PrivateAIContent />
    </PhaseShell>
  );
}
