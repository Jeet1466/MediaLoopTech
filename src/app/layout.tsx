import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medialooptech.com"),
  title: {
    default: "Medialooptech | Performance Digital Agency",
    template: "%s | Medialooptech",
  },
  description:
    "Medialooptech is a full-stack performance digital agency — we deliver paid ads, web engineering, SEO, brand strategy, and social media solutions that drive measurable growth.",
  keywords: [
    "digital agency",
    "performance marketing",
    "paid ads",
    "web development",
    "SEO agency",
    "social media marketing",
    "brand strategy",
    "medialooptech",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medialooptech.com",
    siteName: "Medialooptech",
    title: "Medialooptech | Performance Digital Agency",
    description: "Precision-engineered digital solutions — ads, web, SEO, brand & social that scale.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medialooptech | Performance Digital Agency",
    description: "Precision-engineered digital solutions that scale.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ overflowX: "hidden" }}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
