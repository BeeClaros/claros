import type { Metadata } from "next";
import SupremeRoofingPresentation from "./SupremeRoofingPresentation";

export const metadata: Metadata = {
  title: "Supreme Roofing Proposal | Claros",
  description:
    "Video presentation of the Claros proposal for Supreme Roofing.",
};

export default function SupremeRoofingPresentationPage() {
  return <SupremeRoofingPresentation />;
}
