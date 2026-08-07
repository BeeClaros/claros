import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./v10-theme.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v10-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-v10-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v10-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - AI adoption that works with the business",
  description:
    "AI adoption and implementation for organisations that want measurable business value. We find where AI creates real value, implement the right solutions and build the foundations to use them across the business.",
};

export default function V10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`v10-theme ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: "100vh", backgroundColor: "var(--v10-bg-primary)" }}
    >
      {children}
    </div>
  );
}
