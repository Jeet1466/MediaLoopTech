"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    title: "Nova Finance",
    cat: "FINTECH PLATFORM",
    img: "/fintech.png",
    color: "var(--brand-magenta)",
    result: "+340% Conversions",
    tag: "Web + Ads",
    desc: "Full funnel rebuild — landing pages, Meta campaigns, and CRO strategy that tripled conversion rates in 90 days.",
  },
  {
    title: "Vogue Retail",
    cat: "LUXURY E-COMMERCE",
    img: "/ecommerce.png",
    color: "var(--brand-orange)",
    result: "4.2x ROAS",
    tag: "Performance",
    desc: "Google Shopping + Meta retargeting system engineered for a luxury fashion brand targeting HNI buyers.",
  },
  {
    title: "Pulse Analytics",
    cat: "SAAS DASHBOARD",
    img: "/fintech.png",
    color: "var(--brand-violet)",
    result: "220% Organic Growth",
    tag: "SEO",
    desc: "Technical SEO overhaul and content strategy that drove 3x organic traffic within 6 months of engagement.",
  },
  {
    title: "Zenith Portal",
    cat: "PROPERTY TECH",
    img: "/ecommerce.png",
    color: "var(--brand-cyan)",
    result: "5x Lead Volume",
    tag: "Full Stack",
    desc: "End-to-end digital system — web app, lead gen ads, and automated CRM integration for a real estate platform.",
  },
];

function ProjectCard({ p }: { p: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid var(--outline)",
        background: "#f9f9f9",
        position: "relative",
        height: "480px",
        cursor: "pointer",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered ? "var(--shadow-premium)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={p.img}
        alt={p.title}
        fill
        style={{ objectFit: "cover", opacity: 0.65 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 60%)",
        }}
      />
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <span
          className="badge"
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {p.tag}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "32px",
          right: "32px",
        }}
      >
        <div className="label-sm" style={{ color: p.color, marginBottom: "8px" }}>
          {p.cat}
        </div>
        <div
          className="flex justify-between items-end"
          style={{ flexWrap: "wrap", gap: "12px" }}
        >
          <div>
            <h3
              style={{
                color: "#fff",
                fontFamily: "Hanken Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.03em",
                marginBottom: "6px",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                maxWidth: "280px",
                lineHeight: "1.5",
              }}
            >
              {p.desc}
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              padding: "10px 16px",
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
              {p.result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  return (
    <div style={{ paddingTop: "76px" }}>
      {/* Hero */}
      <section
        className="section-padding"
        style={{
          background: "linear-gradient(170deg, #fff 60%, #fdf0f8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="blob"
          style={{
            width: 600,
            height: 600,
            top: -100,
            right: -150,
            background: "radial-gradient(circle, rgba(236,12,170,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-dark mb-6">Our Work</div>
          <div
            className="flex justify-between items-end mb-12"
            style={{ flexWrap: "wrap", gap: "20px" }}
          >
            <h1 className="headline-xl" style={{ maxWidth: "700px" }}>
              Projects That
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Moved the Needle
              </span>
            </h1>
            <Link href="/contact" className="btn-primary" style={{ borderRadius: "10px", fontSize: "16px", height: "50px"}}>
              Start a Project →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding-sm"
        style={{ background: "#050505" }}
      >
        <div className="container text-center">
          <h2 className="headline-lg mb-6" style={{ color: "#fff" }}>
            Want Results Like These?
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: "16px",
              marginBottom: "32px",
              maxWidth: "440px",
              margin: "0 auto 32px",
            }}
          >
            Let&apos;s talk about your brand and build a strategy that delivers.
          </p>
          <Link
            href="/contact"
            className="btn-primary btn-magenta"
            style={{ padding: "16px 40px", fontSize: "16px" }}
          >
            Get a Free Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
}
