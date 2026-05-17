"use client";
import Link from "next/link";

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", emoji: "👨‍💼" },
  { name: "Priya Shah", role: "Head of Performance", emoji: "📈" },
  { name: "Rahul Verma", role: "Lead Engineer", emoji: "⚡" },
  { name: "Sneha Patel", role: "Creative Director", emoji: "🎨" },
];

const values = [
  {
    icon: "🎯",
    title: "Results-Obsessed",
    desc: "Every strategy starts and ends with measurable outcomes. Vanity metrics don't pay bills — we focus on what moves the needle.",
  },
  {
    icon: "🔬",
    title: "Data-First",
    desc: "We let the numbers guide decisions. From creative testing to budget allocation, everything is evidence-based.",
  },
  {
    icon: "🤝",
    title: "Transparent Always",
    desc: "You see exactly where your money goes. Live dashboards, weekly standups, no surprises.",
  },
  {
    icon: "⚡",
    title: "Execution Speed",
    desc: "Ideas without execution are worthless. We move fast, iterate faster, and never lose momentum.",
  },
];

function TeamCard({ t }: { t: typeof team[0] }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 24px",
        border: "1px solid var(--outline)",
        borderRadius: "24px",
        background: "#fff",
        transition: "all 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>{t.emoji}</div>
      <div
        style={{
          fontFamily: "Hanken Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: "17px",
          marginBottom: "6px",
        }}
      >
        {t.name}
      </div>
      <div className="label-sm" style={{ color: "var(--brand-magenta)" }}>
        {t.role}
      </div>
    </div>
  );
}

export default function AboutClient() {
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
            width: 700,
            height: 700,
            top: -200,
            right: -200,
            background: "radial-gradient(circle, rgba(236,12,170,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-magenta mb-6">Our Story</div>
          <h1 className="headline-xl mb-6" style={{ maxWidth: "800px" }}>
            We Exist to Make
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Brand Unstoppable
            </span>
          </h1>
          <p className="body-lg" style={{ maxWidth: "600px" }}>
            Founded in 2018, Medialooptech was built on a simple belief: great brands deserve great marketing. We&apos;re a team of strategists, engineers, and creatives who refuse to accept mediocrity.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding" style={{ background: "#050505" }}>
        <div className="container">
          <div
            className="about-mission-grid grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div
                className="badge mb-6"
                style={{
                  background: "rgba(236,12,170,0.15)",
                  color: "var(--brand-magenta)",
                  border: "1px solid rgba(236,12,170,0.2)",
                }}
              >
                Our Mission
              </div>
              <h2 className="headline-lg mb-6" style={{ color: "#fff" }}>
                Performance Over
                <br />
                <span style={{ color: "var(--brand-magenta)" }}>Promises</span>
              </h2>
              <p
                style={{
                  color: "#888",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                }}
              >
                We don&apos;t just run campaigns — we build growth systems. From the first impression to the final sale, every touchpoint is optimized, tracked, and improved.
              </p>
              <p style={{ color: "#888", fontSize: "16px", lineHeight: "1.8" }}>
                In 7+ years, we&apos;ve helped 150+ brands across India scale their digital presence, reduce their cost-per-acquisition, and build audiences that become loyal customers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Brands Scaled", val: "150+" },
                { label: "Ad Spend Managed", val: "₹50Cr+" },
                { label: "Avg. ROAS", val: "3.8x" },
                { label: "Team Members", val: "25+" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111",
                    border: "1px solid #1a1a1a",
                    borderRadius: "20px",
                    padding: "32px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "Hanken Grotesk, sans-serif",
                      fontSize: "40px",
                      fontWeight: 900,
                      marginBottom: "8px",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      color: "#444",
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: "#fafafa" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge badge-magenta mb-4">Our Values</div>
            <h2 className="headline-lg">
              How We Think,
              <br />
              <span style={{ color: "#bbb" }}>How We Work</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="glass-card">
                <div style={{ fontSize: "36px", marginBottom: "20px" }}>
                  {v.icon}
                </div>
                <h3
                  className="headline-md mb-3"
                  style={{ fontSize: "22px" }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "#666", lineHeight: "1.7", fontSize: "15px" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="badge badge-dark mb-4">The Team</div>
            <h2 className="headline-lg">
              People Behind
              <br />
              <span style={{ color: "var(--brand-magenta)" }}>the Results</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <TeamCard key={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding-sm"
        style={{ background: "#fafafa" }}
      >
        <div className="container text-center">
          <h2 className="headline-lg mb-6">Ready to Work Together?</h2>
          <Link
            href="/contact"
            className="btn-primary btn-magenta"
            style={{ padding: "16px 40px", fontSize: "16px" }}
          >
            Start a Conversation →
          </Link>
        </div>
      </section>
    </div>
  );
}
