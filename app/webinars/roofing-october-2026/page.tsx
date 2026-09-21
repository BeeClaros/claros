import type { Metadata } from "next";
import RoofingWebinarLanding from "./RoofingWebinarLanding";

export const metadata: Metadata = {
  title:
    "How Roofing Companies Can Remove Manual Coordination from Estimate to Production | CLAROS Webinar",
  description:
    "Live webinar: see three practical workflows that turn estimates, sold jobs and production signals into the right next action — without replacing the systems you already use.",
  openGraph: {
    title:
      "How Roofing Companies Can Remove Manual Coordination from Estimate to Production",
    description:
      "Live webinar for roofing company owners and operations leaders. See practical workflow demonstrations for estimate follow-up, sold-job handoff and production visibility.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How Roofing Companies Can Remove Manual Coordination from Estimate to Production",
    description:
      "Live webinar for roofing company owners and operations leaders. Practical workflow demonstrations — register for free.",
  },
};

export default function RoofingWebinarPage() {
  return <RoofingWebinarLanding />;
}
