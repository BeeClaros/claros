import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "./v8/v8-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v8-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-v8-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v8-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CLAROS - AI adoption that works with the business",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "AI adoption and implementation for organisations that want measurable business value. We find where AI creates real value, implement the right solutions and build the foundations to use them across the business.",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "CLAROS - AI adoption that works with the business",
    description:
      "AI adoption and implementation for organisations that want measurable business value.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLAROS - AI adoption that works with the business",
    description:
      "AI adoption and implementation for organisations that want measurable business value.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              contactPoint: {
                "@type": "ContactPoint",
                email: siteConfig.email,
                contactType: "sales",
              },
              sameAs: [siteConfig.linkedin],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
