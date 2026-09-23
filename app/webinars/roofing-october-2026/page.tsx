import type { Metadata } from "next";
import RoofingWebinarLanding from "./RoofingWebinarLanding";

export const metadata: Metadata = {
  title:
    "Roofing Webinar: Reduce Manual Work from Estimate to Production | CLAROS",
  description:
    "Free webinar for roofing owners and operators. See practical workflows for estimate follow-up, sold-job handoff and production visibility — without replacing the systems you already use.",
  alternates: {
    canonical: "https://beeclaros.com/webinars/roofing-october-2026/",
  },
  openGraph: {
    title:
      "Stop Losing Time Between the Estimate and the Job | Roofing Webinar",
    description:
      "See 3 practical workflows for estimate follow-up, sold-job handoff and production visibility — built around the systems your roofing company already uses.",
    type: "website",
    // TODO: add webinar OG image once a suitable asset is available
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Stop Losing Time Between the Estimate and the Job | Roofing Webinar",
    description:
      "A practical webinar for roofing owners and operators: estimate follow-up, production handoffs and job exceptions.",
  },
};

export default function RoofingWebinarPage() {
  return <RoofingWebinarLanding />;
}
