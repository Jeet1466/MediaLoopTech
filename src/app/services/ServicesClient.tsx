"use client";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "performance",
    icon: "",
    color: "var(--brand-magenta)",
    label: "Performance Marketing",
    title: "Ads That Actually Convert",
    desc: "We manage end-to-end paid media campaigns on Meta, Google, YouTube, and more. From creative strategy to pixel-perfect tracking — every rupee spent is accountable.",
    features: [
      "Meta & Google Ads Management",
      "Creative Strategy & Production",
      "Audience Targeting & Retargeting",
      "Conversion Rate Optimization",
      "Real-time Reporting Dashboard",
      "A/B Testing & Scaling",
    ],
    result: "Average 3.8x ROAS across client portfolio",
  },
  {
    id: "web",
    icon: "",
    color: "var(--brand-orange)",
    label: "Web Engineering",
    title: "Websites Built to Perform",
    desc: "We design and develop high-performance websites, landing pages, and web apps. Built on modern stacks, optimized for Core Web Vitals, and engineered to convert.",
    features: [
      "Custom Website & Landing Pages",
      "E-commerce Development",
      "Next.js / React Applications",
      "Speed & Core Web Vitals Optimization",
      "CMS Integration (Sanity, Strapi)",
      "Maintenance & Support",
    ],
    result: "Sub-1s load times, 95+ PageSpeed scores",
  },
  {
    id: "seo",
    icon: "",
    color: "var(--brand-violet)",
    label: "SEO & Content",
    title: "Rank Higher, Grow Faster",
    desc: "Sustainable organic growth through technical SEO, content strategy, and link building. We make Google work for you — 24/7, without ad spend.",
    features: [
      "Technical SEO Audit & Fixes",
      "Keyword Research & Strategy",
      "Content Creation & Optimization",
      "Local SEO & Google Business",
      "Link Building Campaigns",
      "Monthly Ranking Reports",
    ],
    result: "Average 280% organic traffic growth in 6 months",
  },
  {
    id: "social",
    icon: "",
    color: "var(--brand-cyan)",
    label: "Social Media Management",
    title: "Consistent. Compelling. Viral.",
    desc: "Full-service social media management — from content creation to community management. We build audiences that become customers.",
    features: [
      "Multi-platform Content Strategy",
      "Graphic Design & Reels Creation",
      "Daily Posting & Scheduling",
      "Community Management",
      "Influencer Collaboration",
      "Analytics & Growth Reports",
    ],
    result: "Average 4x follower growth in 90 days",
  },
  {
    id: "brand",
    icon: "",
    color: "#10B981",
    label: "Brand Strategy",
    title: "Identity That Commands Attention",
    desc: "We build brand identities that own their market category — from logo design to full visual systems, tone of voice, and positioning strategy.",
    features: [
      "Brand Identity & Logo Design",
      "Visual System & Style Guide",
      "Tone of Voice & Messaging",
      "Market Positioning Strategy",
      "Brand Photography Direction",
      "Packaging & Collateral Design",
    ],
    result: "Premium positioning that justifies higher pricing",
  },
  {
    id: "video",
    icon: "",
    color: "#F59E0B",
    label: "Video Production",
    title: "Content That Stops the Scroll",
    desc: "Cinematic brand films, performance ad creatives, reels, and testimonials — produced in-house for maximum quality and speed.",
    features: [
      "Ad Creative Production",
      "Brand Films & Corporate Videos",
      "Instagram & YouTube Reels",
      "Product Photography & Videography",
      "Motion Graphics & Animation",
      "Script Writing & Storyboarding",
    ],
    result: "Video ads outperform static by 3x on average",
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={s.id}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px, 5vw, 64px)",
        alignItems: "center",
        padding: "clamp(40px, 6vw, 72px) clamp(32px, 5vw, 64px)",
        borderRadius: "28px",
        background: "#fff",
        border: "1px solid var(--outline)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Text side */}
      <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>{s.icon}</div>
        <div
          className="badge mb-4"
          style={{
            background: `rgba(0,0,0,0.04)`,
            color: s.color,
            border: `1px solid ${s.color}33`,
          }}
        >
          {s.label}
        </div>
        <h2
          className="headline-lg mb-4"
          style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
        >
          {s.title}
        </h2>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.75", marginBottom: "28px" }}>
          {s.desc}
        </p>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "12px",
            background: `${s.color}0d`,
            border: `1px solid ${s.color}22`,
            marginBottom: "28px",
          }}
        >
          <span style={{ color: s.color, fontWeight: 700, fontSize: "13px" }}>
            📊 {s.result}
          </span>
        </div>
        <Link href="/contact" className="btn-primary" style={{ background: "#000" }}>
          Get Started →
        </Link>
      </div>

      {/* Features side */}
      <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "20px",
            padding: "32px",
            border: "1px solid var(--outline)",
          }}
        >
          <div className="label-sm mb-6" style={{ color: "#999" }}>
            What&apos;s Included
          </div>
          <div className="flex flex-col gap-3">
            {s.features.map((f, j) => (
              <div key={j} className="flex items-center gap-3">
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: `${s.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    flexShrink: 0,
                    color: s.color,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span style={{ color: "#333", fontSize: "14px" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesClient() {
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
            background: "radial-gradient(circle, rgba(236,12,170,0.09) 0%, transparent 70%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-magenta mb-6">Our Capabilities</div>
          <h1 className="headline-xl mb-6" style={{ maxWidth: "800px" }}>
            Everything Your Brand
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Needs to Grow
            </span>
          </h1>
          <p className="body-lg" style={{ maxWidth: "560px", marginBottom: "40px" }}>
            Six core disciplines. One integrated team. Relentless focus on results that matter.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="badge"
                style={{
                  background: "#f5f5f5",
                  color: "#333",
                  border: "1px solid #e5e5e5",
                  textDecoration: "none",
                }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="section-padding" style={{ background: "#fafafa" }}>
        <div className="container">
          <div className="flex flex-col gap-8">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} i={i} />
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
            Not Sure Where to Start?
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: "16px",
              marginBottom: "32px",
              maxWidth: "480px",
              margin: "0 auto 32px",
            }}
          >
            Book a free 30-min strategy call. We&apos;ll audit your current setup and show you the fastest path to growth.
          </p>
          <Link
            href="/contact"
            className="btn-primary btn-magenta"
            style={{ padding: "16px 40px", fontSize: "16px" }}
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
