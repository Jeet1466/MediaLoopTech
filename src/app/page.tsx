import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://medialooptech.com"),
  title: "Medialooptech | Performance Digital Agency",
  description:
    "Medialooptech is a full-stack performance digital agency — we deliver paid ads, web engineering, SEO, brand strategy, and social media solutions that drive measurable growth.",
  openGraph: {
    type: "website",
    url: "https://medialooptech.com",
    title: "Medialooptech | Performance Digital Agency",
    description: "Precision-engineered digital solutions — ads, web, SEO, brand & social that scale.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return <HomeClient />;
}
