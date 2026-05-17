import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from Medialooptech — real results from performance marketing, web engineering, and brand strategy campaigns.",
};

export default function Portfolio() {
  return <PortfolioClient />;
}
