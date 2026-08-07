/**
 * /v5 Nested Layout
 *
 * Loads Cormorant Garamond (editorial serif), Inter (interface sans)
 * and JetBrains Mono (technical labels) independently from the
 * repository's Geist fonts. Wraps children in .editorial-theme so
 * all CSS variables are scoped to this subtree.
 */

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./editorial-theme.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ed-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ed-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ed-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - AI Adoption & Implementation Consultancy",
  description:
    "We help organisations identify where AI can create measurable value, implement the right solutions and build the foundations to use them across the business.",
};

export default function V5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`editorial-theme ${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
