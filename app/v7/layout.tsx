import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./hive-theme.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hv-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-hv-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hv-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - AI adoption, built in coordination",
  description:
    "AI adoption and implementation for organisations that want measurable business value. We find where AI creates real value, implement the right solutions and build the foundations to use them across the business.",
};

export default function V7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`hive-theme ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
