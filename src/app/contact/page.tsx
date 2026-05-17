"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ paddingTop: "76px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <div style={{ textAlign: "center", maxWidth: "480px", padding: "60px 32px" }}>
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
          <h2 className="headline-lg mb-4">Message Received!</h2>
          <p style={{ color: "#666", marginBottom: "32px" }}>We'll get back to you within 24 hours with a custom plan for your brand.</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "76px" }}>
      <section className="section-padding" style={{ background: "linear-gradient(170deg, #fff 60%, #fdf0f8 100%)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ width: 500, height: 500, top: -100, right: -100, background: "radial-gradient(circle, rgba(236,12,170,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="badge badge-magenta mb-6">Let&apos;s Connect</div>
              <h1 className="headline-xl mb-6" style={{ maxWidth: "520px" }}>
                Start Your<br />
                <span style={{ background: "linear-gradient(135deg, var(--brand-magenta), var(--brand-orange))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Growth Journey
                </span>
              </h1>
              <p className="body-lg" style={{ marginBottom: "48px", maxWidth: "440px" }}>
                Tell us about your brand. We&apos;ll craft a custom strategy to help you grow faster and smarter.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { icon: "✉️", label: "Email Us", value: "hello@medialooptech.com", href: "mailto:hello@medialooptech.com" },
                  { icon: "📞", label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { icon: "📍", label: "Find Us", value: "Mumbai, Maharashtra, India", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} style={{ display: "flex", gap: "16px", alignItems: "flex-start", textDecoration: "none", padding: "20px 24px", borderRadius: "16px", border: "1px solid var(--outline)", background: "#fff", transition: "box-shadow 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <span style={{ fontSize: "24px" }}>{c.icon}</span>
                    <div>
                      <div className="label-sm mb-1" style={{ color: "#999" }}>{c.label}</div>
                      <div style={{ color: "#000", fontWeight: 600, fontSize: "15px" }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ background: "#fff", border: "1px solid var(--outline)", borderRadius: "28px", padding: "48px", boxShadow: "var(--shadow-md)" }}>
              <h2 className="headline-md mb-6">Tell Us About Your Project</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Full Name *</label>
                    <input required className="input-field" type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Email *</label>
                    <input required className="input-field" type="email" placeholder="rahul@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Phone Number</label>
                  <input className="input-field" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Service Interested In *</label>
                  <select required className="input-field" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a Service</option>
                    <option>Performance Marketing</option>
                    <option>Web Engineering</option>
                    <option>SEO & Content</option>
                    <option>Social Media Management</option>
                    <option>Brand Strategy</option>
                    <option>Video Production</option>
                    <option>Full Package</option>
                  </select>
                </div>
                <div>
                  <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Monthly Budget</label>
                  <select className="input-field" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option value="">Select Budget Range</option>
                    <option>Under ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000 – ₹2,50,000</option>
                    <option>₹2,50,000+</option>
                  </select>
                </div>
                <div>
                  <label className="label-sm" style={{ display: "block", marginBottom: "8px", color: "#888" }}>Tell Us About Your Brand *</label>
                  <textarea required className="input-field" rows={4} placeholder="What does your business do? What goals are you trying to achieve?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary btn-magenta" style={{ padding: "16px", fontSize: "15px", width: "100%", justifyContent: "center" }} disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>
                {status === "error" && <p style={{ color: "red", fontSize: "13px", textAlign: "center" }}>Something went wrong. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
