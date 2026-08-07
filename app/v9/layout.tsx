import type { Metadata } from "next";
import { Manrope, Inter, Instrument_Serif } from "next/font/google";
import "./aero-theme.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ae-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ae-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-ae-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - Turn AI activity into business progress",
  description:
    "AI adoption and implementation for organisations that want measurable business value. We help you find where AI creates real value, implement the right solutions and make them part of daily work.",
};

export default function V9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`aero-theme ${manrope.variable} ${inter.variable} ${instrumentSerif.variable}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
