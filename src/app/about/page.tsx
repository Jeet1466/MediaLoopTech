import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Medialooptech is a performance digital agency founded with one mission: turn every marketing rupee into measurable growth for ambitious brands.",
};

export default function About() {
  return <AboutClient />;
}
