"use client";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "150+", label: "Campaigns Launched" },
  { value: "98%", label: "Client Retention" },
  { value: "₹50Cr+", label: "Ad Spend Managed" },
  { value: "7+", label: "Years of Excellence" },
];

const services = [
  { title: "Performance Marketing", desc: "Meta, Google & YouTube ads engineered for maximum ROAS.", icon: "📈", color: "var(--brand-magenta)", href: "/services#performance" },
  { title: "Web Engineering", desc: "High-performance websites & apps built for speed and conversion.", icon: "⚡", color: "var(--brand-orange)", href: "/services#web" },
  { title: "SEO & Content", desc: "Dominate search rankings with data-driven strategies that last.", icon: "🔍", color: "var(--brand-violet)", href: "/services#seo" },
  { title: "Social Media", desc: "Consistent, compelling presence managed end-to-end.", icon: "📱", color: "var(--brand-cyan)", href: "/services#social" },
  { title: "Brand Strategy", desc: "Distinctive identity systems that command premium positioning.", icon: "🎯", color: "#10B981", href: "/services#brand" },
  { title: "Video Production", desc: "Cinematic ad creatives and brand films that stop the scroll.", icon: "🎬", color: "#F59E0B", href: "/services#video" },
];

const logos = ["Fintech Co.", "Retail Brand", "SaaS Corp", "PropTech", "EduBrand", "HealthCo", "Fintech Co.", "Retail Brand", "SaaS Corp", "PropTech", "EduBrand", "HealthCo"];

export default function HomeClient() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "76px",
        background: "linear-gradient(170deg, #ffffff 60%, #fdf0f8 100%)",
      }}>
        <div className="blob" style={{ width: 700, height: 700, top: -150, right: -200, background: "radial-gradient(circle, rgba(236,12,170,0.10) 0%, transparent 70%)", animationDuration: "10s" }} />
        <div className="blob" style={{ width: 500, height: 500, bottom: -100, left: -150, background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)", animationDelay: "3s" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, padding: "80px var(--margin-desktop)" }}>
          <div className="flex flex-col items-center text-center">
            <div className="badge badge-magenta mb-6 animate-fade-up">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand-magenta)", display: "inline-block" }} />
              Performance-First Digital Agency
            </div>

            <h1 className="headline-xl mb-6 animate-fade-up delay-100" style={{ maxWidth: "980px" }}>
              We Build Brands
              <br />
              <span style={{
                background: "linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-orange) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                That Dominate.
              </span>
            </h1>

            <p className="body-lg animate-fade-up delay-200" style={{ maxWidth: "620px", marginBottom: "48px" }}>
              From precision ad campaigns to stunning web experiences — Medialooptech turns strategy into scalable, measurable growth for ambitious brands.
            </p>

            <div className="flex gap-4 animate-fade-up delay-300" style={{ flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact" className="btn-primary btn-magenta" style={{ padding: "16px 36px", fontSize: "16px" }}>
                Start Your Growth →
              </Link>
              <Link href="/portfolio" className="btn-outline" style={{ padding: "16px 36px", fontSize: "16px" }}>
                View Our Work
              </Link>
            </div>

            <div className="flex items-center gap-6 animate-fade-up delay-400" style={{ marginTop: "56px", flexWrap: "wrap", justifyContent: "center" }}>
              <div className="flex items-center gap-2">
                <div style={{ display: "flex" }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#F59E0B", fontSize: "14px" }}>★</span>)}
                </div>
                <span style={{ fontSize: "13px", color: "#666" }}>5.0 on Google</span>
              </div>
              <div style={{ width: 1, height: 20, background: "#e0e0e0" }} />
              <span style={{ fontSize: "13px", color: "#666" }}>150+ Satisfied Clients</span>
              <div style={{ width: 1, height: 20, background: "#e0e0e0" }} />
              <span style={{ fontSize: "13px", color: "#666" }}>₹50Cr+ Ad Spend Managed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--outline)", borderBottom: "1px solid var(--outline)", padding: "18px 0", overflow: "hidden", background: "#fff" }}>
        <div style={{ display: "flex", gap: "64px", animation: "marquee 28s linear infinite", width: "max-content" }}>
          {logos.map((l, i) => (
            <span key={i} className="label-sm" style={{ color: "#ccc", whiteSpace: "nowrap" }}>{l}</span>
          ))}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────── */}
      <section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6 text-center sm:grid-cols-2" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "32px 20px", borderRadius: "20px", border: "1px solid var(--outline)", background: "#fff" }}>
                <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.03em", marginBottom: "8px", background: "linear-gradient(135deg, #000, #444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
                <div className="label-sm" style={{ color: "#999" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────── */}
      <section className="section-padding" style={{ background: "#fafafa" }}>
        <div className="container">
          <div className="flex justify-between items-end mb-12" style={{ flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="badge badge-magenta mb-4">Our Capabilities</div>
              <h2 className="headline-lg">
                What We Do
                <br />
                <span style={{ color: "#bbb" }}>Best</span>
              </h2>
            </div>
            <Link href="/services" className="btn-ghost">All Services →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {services.map((s, i) => (
              <Link key={i} href={s.href} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{ height: "100%", cursor: "pointer" }}>
                  <div style={{ fontSize: "32px", marginBottom: "20px" }}>{s.icon}</div>
                  <div className="label-sm mb-2" style={{ color: s.color }}>{s.title}</div>
                  <h3 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", marginBottom: "12px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.65" }}>{s.desc}</p>
                  <div style={{ marginTop: "24px", color: s.color, fontSize: "13px", fontWeight: 600 }}>Learn more →</div>
                </div>
              </Link>
            ))}
          </div>

          <style>{`
            @media (max-width: 900px) {
              .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .services-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Featured Work ────────────────────────── */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge badge-dark mb-4">Selected Work</div>
            <h2 className="headline-lg">
              Results That
              <br />
              <span style={{ color: "var(--brand-magenta)" }}>Speak</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            {[
              { title: "Nova Finance", cat: "FINTECH PLATFORM", img: "/fintech.png", color: "var(--brand-magenta)", result: "+340% Conversions" },
              { title: "Vogue Retail", cat: "LUXURY E-COMMERCE", img: "/ecommerce.png", color: "var(--brand-orange)", result: "4.2x ROAS" },
            ].map((p, i) => (
              <div key={i} style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid var(--outline)", background: "#f9f9f9", position: "relative", height: "400px" }}>
                <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover", opacity: 0.65 }} sizes="(max-width: 768px) 100vw, 50vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.1) 60%)" }} />
                <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <div className="label-sm" style={{ color: p.color, marginBottom: "6px" }}>{p.cat}</div>
                    <h3 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(20px,2.5vw,28px)", letterSpacing: "-0.03em" }}>{p.title}</h3>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", borderRadius: "12px", padding: "9px 14px", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px" }}>{p.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/portfolio" className="btn-outline">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ──────────────────────────────── */}
      <section className="section-padding" style={{ background: "#050505", color: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              <div className="badge mb-6" style={{ background: "rgba(236,12,170,0.15)", color: "var(--brand-magenta)", border: "1px solid rgba(236,12,170,0.2)" }}>
                Why Medialooptech
              </div>
              <h2 className="headline-lg mb-6" style={{ color: "#fff" }}>
                Precision Over
                <br />
                <span style={{ color: "var(--brand-magenta)" }}>Promises</span>
              </h2>
              <p style={{ color: "#888", fontSize: "16px", lineHeight: "1.8", marginBottom: "40px" }}>
                We don&apos;t just run ads or build websites. We architect complete digital growth systems — from first click to loyal customer, every touchpoint optimized.
              </p>
              <Link href="/about" className="btn-primary" style={{ background: "#fff", color: "#000" }}>
                Learn Our Approach →
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "🎯", title: "Data-Driven Decisions", desc: "Every strategy backed by analytics, A/B tests, and real ROI metrics." },
                { icon: "⚡", title: "Execution Speed", desc: "Launch campaigns in 48 hours. No endless meetings, just results." },
                { icon: "🔒", title: "Full Transparency", desc: "Live dashboards, weekly reports, and direct access to your team." },
                { icon: "📊", title: "Proven Frameworks", desc: "Battle-tested playbooks refined over 7+ years and 150+ clients." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "18px", padding: "22px 24px", border: "1px solid #1a1a1a", borderRadius: "16px", background: "#0a0a0a" }}>
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, marginBottom: "5px", fontSize: "15px" }}>{item.title}</div>
                    <div style={{ color: "#666", fontSize: "13px", lineHeight: "1.6" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(236,12,170,0.07) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "80px 40px", border: "1px solid var(--outline)", borderRadius: "32px", background: "#fff", boxShadow: "var(--shadow-premium)" }}>
            <div className="badge badge-magenta mb-6">Ready to Scale?</div>
            <h2 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,60px)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "24px" }}>
              Let&apos;s Build Something
              <br />
              <span style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Remarkable
              </span>
            </h2>
            <p style={{ color: "#666", fontSize: "17px", marginBottom: "40px", lineHeight: "1.7" }}>
              Book a free strategy call. No obligations — just clarity on how to grow your brand faster.
            </p>
            <div className="flex gap-4 justify-center" style={{ flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary btn-magenta" style={{ padding: "16px 40px", fontSize: "16px" }}>
                Book Free Strategy Call
              </Link>
              <Link href="/services" className="btn-outline" style={{ padding: "16px 40px", fontSize: "16px" }}>
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
