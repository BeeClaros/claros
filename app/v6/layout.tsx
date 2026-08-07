import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./partnership-theme.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pt-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-pt-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-pt-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLAROS - AI implementation, done in partnership",
  description:
    "AI transformation is a partnership, not a product. We help organisations find where AI creates real value, then build and ship it - working solutions, not slides.",
};

export default function V6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`partnership-theme ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
