/**
 * /v3 Nested Layout
 *
 * Loads Instrument Sans and IBM Plex Mono independently from the
 * repository's Geist fonts. Wraps children in .signal-theme so all
 * CSS variables and font overrides are scoped to this subtree only.
 *
 * Does NOT add a second <html> or <body> - those come from the root
 * layout. This layout simply inserts a wrapper div that overrides
 * all inherited visual tokens from the parent theme.
 */

import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./signal-theme.css";

/* ── Fonts - completely separate from repository Geist setup ─── */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-signal-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-signal-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Signal - AI Implementation Consultancy",
  description:
    "We identify the strongest AI opportunities, validate what is practical and help move selected use cases into operation.",
};

export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
   * The font variables are injected on this div, making --font-signal-sans
   * and --font-signal-mono available to all descendants. The .signal-theme
   * class then applies the new visual system, overriding any inherited
   * styles from the root body/html.
   */
  return (
    <div
      className={`signal-theme signal-page-bg signal-grain ${instrumentSans.variable} ${ibmPlexMono.variable}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
