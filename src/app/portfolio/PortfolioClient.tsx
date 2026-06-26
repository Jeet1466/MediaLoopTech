"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Nova Finance",
    cat: "FINTECH PLATFORM",
    img: "/fintech.png",
    color: "#EC0CAA",
    gradientFrom: "#EC0CAA",
    gradientTo: "#7C3AED",
    result: "+340%",
    resultLabel: "Conversions",
    tag: "Web + Ads",
    desc: "Full funnel rebuild — landing pages, Meta campaigns, and CRO strategy that tripled conversion rates in 90 days.",
    span: "large",
  },
  {
    title: "Vogue Retail",
    cat: "LUXURY E-COMMERCE",
    img: "/ecommerce.png",
    color: "#FF6B2B",
    gradientFrom: "#FF6B2B",
    gradientTo: "#EC0CAA",
    result: "4.2x",
    resultLabel: "ROAS",
    tag: "Performance",
    desc: "Google Shopping + Meta retargeting engineered for a luxury fashion brand targeting HNI buyers.",
    span: "normal",
  },
  {
    title: "Pulse Analytics",
    cat: "SAAS DASHBOARD",
    img: "/fintech.png",
    color: "#7C3AED",
    gradientFrom: "#7C3AED",
    gradientTo: "#06B6D4",
    result: "220%",
    resultLabel: "Organic Growth",
    tag: "SEO",
    desc: "Technical SEO overhaul and content strategy that drove 3x organic traffic within 6 months.",
    span: "normal",
  },
  {
    title: "Zenith Portal",
    cat: "PROPERTY TECH",
    img: "/ecommerce.png",
    color: "#06B6D4",
    gradientFrom: "#06B6D4",
    gradientTo: "#10B981",
    result: "5x",
    resultLabel: "Lead Volume",
    tag: "Full Stack",
    desc: "End-to-end digital system — web app, lead gen ads, and automated CRM integration for real estate.",
    span: "large",
  },
];

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLarge = p.span === "large";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        height: isLarge ? "520px" : "460px",
        cursor: "pointer",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.05)`
          : "0 8px 32px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={p.img}
        alt={p.title}
        fill
        style={{
          objectFit: "cover",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)",
      }} />

      {/* Colour accent on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, ${p.gradientFrom}22 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Top row */}
      <div style={{ position: "absolute", top: "24px", left: "24px", right: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#fff",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          {p.tag}
        </span>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
      </div>

      {/* Bottom content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px" }}>
        {/* Result pill */}
        <motion.div
          animate={hovered ? { y: 0, opacity: 1 } : { y: 8, opacity: 0.65 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "8px",
            background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})`,
            borderRadius: "12px",
            padding: "8px 16px",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 900, fontSize: "22px", letterSpacing: "-0.04em" }}>{p.result}</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600 }}>{p.resultLabel}</span>
        </motion.div>

        <div style={{ color: p.color, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "JetBrains Mono, monospace" }}>
          {p.cat}
        </div>
        <h3 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.03em", marginBottom: "10px", lineHeight: 1.1 }}>
          {p.title}
        </h3>
        <motion.p
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: "1.6", maxWidth: "360px" }}
        >
          {p.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function PortfolioClient() {
  return (
    <div style={{ paddingTop: "76px" }}>

      {/* ── Hero (old structure) ─────────────────── */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(170deg, #fff 60%, #fdf0f8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="blob" style={{ width: 600, height: 600, top: -100, right: -150, background: "radial-gradient(circle, rgba(236,12,170,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-dark mb-6">Our Work</div>
          <div className="flex justify-between items-end mb-12" style={{ flexWrap: "wrap", gap: "20px" }}>
            <h1 className="headline-xl" style={{ maxWidth: "700px" }}>
              Projects That
              <br />
              <span style={{
                background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Moved the Needle
              </span>
            </h1>
            <Link href="/contact" className="btn-primary" style={{ borderRadius: "10px", fontSize: "16px", height: "50px" }}>
              Start a Project →
            </Link>
          </div>

          {/* New bento-grid project cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (old structure) ──────────────────── */}
      <section className="section-padding-sm" style={{ background: "#050505" }}>
        <div className="container text-center">
          <h2 className="headline-lg mb-6" style={{ color: "#fff" }}>
            Want Results Like These?
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "32px", maxWidth: "440px", margin: "0 auto 32px" }}>
            Let&apos;s talk about your brand and build a strategy that delivers.
          </p>
          <Link href="/contact" className="btn-primary btn-magenta" style={{ padding: "16px 40px", fontSize: "16px" }}>
            Get a Free Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
