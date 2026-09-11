import type { Metadata } from "next";
import SupremeRoofingDemo from "./SupremeRoofingDemo";

export const metadata: Metadata = {
  title: "Supreme Roofing | Connected Red Folder by Claros",
  description:
    "Interactive demonstration of the Red Folder workflow for Supreme Roofing - how estimating, contracts and accounting connect in one clear handoff.",
};

export default function SupremeRoofingDemoPage() {
  return <SupremeRoofingDemo />;
}
