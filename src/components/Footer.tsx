import Link from "next/link";

const services = [
  "Performance Marketing",
  "Web Engineering",
  "SEO & Content",
  "Social Media",
  "Brand Strategy",
  "Video Production",
];

export default function Footer() {
  return (
    <footer style={{ background: "#050505", color: "#fff", padding: "100px 0 0" }}>
      <div className="container">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12" style={{ paddingBottom: "80px" }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "26px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              marginBottom: "20px",
            }}>
              MEDIA<span style={{ color: "var(--brand-magenta)" }}>LOOP</span>TECH
            </div>
            <p style={{ color: "#888", lineHeight: "1.7", maxWidth: "340px", fontSize: "15px", marginBottom: "32px" }}>
              A performance-first digital agency engineered for brands that refuse to settle. We turn strategy into measurable growth.
            </p>
            <div className="flex gap-3">
              {["LinkedIn", "Instagram", "X"].map((s) => (
                <a key={s} href="#" style={{
                  width: "40px", height: "40px",
                  border: "1px solid #2a2a2a",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#666", textDecoration: "none", fontSize: "11px",
                  fontWeight: 600, letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--brand-magenta)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--brand-magenta)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLAnchorElement).style.color = "#666"; }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="label-sm mb-6" style={{ color: "#555" }}>Services</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" style={{ color: "#888", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="label-sm mb-6" style={{ color: "#555" }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
              {[["About", "/about"], ["Work", "/portfolio"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: "#888", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                  >{label}</Link>
                </li>
              ))}
            </ul>
            <div style={{ padding: "20px", border: "1px solid #1a1a1a", borderRadius: "16px", background: "#0a0a0a" }}>
              <div className="label-sm mb-2" style={{ color: "var(--brand-magenta)" }}>Email Us</div>
              <a href="mailto:hello@medialooptech.com" style={{ color: "#ccc", fontSize: "13px", textDecoration: "none" }}>
                hello@medialooptech.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #111", padding: "28px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p className="label-sm" style={{ color: "#444" }}>© 2025 MEDIALOOPTECH. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="label-sm" style={{ color: "#444", textDecoration: "none" }}>Privacy</a>
            <a href="/terms" className="label-sm" style={{ color: "#444", textDecoration: "none" }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
