/**
 * /v4 Nested Layout
 *
 * Loads Space Grotesk (headings) and Inter (body) independently
 * from the repository's Geist fonts. Wraps children in .v4-theme
 * so all CSS variables and font overrides are scoped to this subtree.
 *
 * Does NOT add a second <html> or <body> - those come from the root layout.
 */

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./v4-theme.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v4-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-v4-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - AI Adoption Consultancy",
  description:
    "We help organisations identify where AI creates measurable value, implement it safely, and make it part of everyday operations.",
};

export default function V4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`v4-theme ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {children}
    </div>
  );
}
