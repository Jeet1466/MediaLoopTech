import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Medialooptech offers performance marketing, web engineering, SEO, social media management, brand strategy, and video production — all under one roof.",
};

export default function Services() {
  return <ServicesClient />;
}
