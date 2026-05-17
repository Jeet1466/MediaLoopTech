"use client";
import { useState, useEffect, useCallback } from "react";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "converted" | "closed";
  createdAt: string;
};

type Service = {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  active: boolean;
};

type Tab = "dashboard" | "requests" | "services";

const ADMIN_PASS = "medialoop2025";

const statusColors: Record<string, string> = {
  new: "#EC0CAA",
  contacted: "#FF6B2B",
  converted: "#10B981",
  closed: "#888",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [editService, setEditService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ title: "", icon: "🚀", color: "#EC0CAA", description: "" });
  const [showNewService, setShowNewService] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [subRes, svcRes] = await Promise.all([fetch("/api/contact"), fetch("/api/services")]);
    setSubmissions(await subRes.json());
    setServices(await svcRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
        <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "60px", width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "22px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>
              MEDIA<span style={{ color: "var(--brand-magenta)" }}>LOOP</span>TECH
            </div>
            <p style={{ color: "#555", fontSize: "14px" }}>Admin Portal</p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#555", marginBottom: "8px" }}>PASSWORD</label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === "Enter" && pass === ADMIN_PASS && setAuthed(true)}
              style={{ width: "100%", padding: "14px 18px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none" }}
              placeholder="Enter admin password"
            />
          </div>
          <button
            onClick={() => pass === ADMIN_PASS ? setAuthed(true) : alert("Wrong password")}
            style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, var(--brand-magenta), #c8008e)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/contact", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: status as Submission["status"] } : s));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Submission["status"] } : null);
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await fetch("/api/contact", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setSubmissions(prev => prev.filter(s => s.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch("/api/services", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const saveService = async () => {
    if (!editService) return;
    await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editService) });
    setServices(prev => prev.map(s => s.id === editService.id ? editService : s));
    setEditService(null);
  };

  const createService = async () => {
    const res = await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newService) });
    const created = await res.json();
    setServices(prev => [...prev, created]);
    setShowNewService(false);
    setNewService({ title: "", icon: "🚀", color: "#EC0CAA", description: "" });
  };

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === "new").length,
    converted: submissions.filter(s => s.status === "converted").length,
    revenue: submissions.filter(s => s.status === "converted").length * 35000,
  };

  const sidebarStyle = {
    width: "240px",
    background: "#050505",
    borderRight: "1px solid #111",
    minHeight: "100vh",
    padding: "24px 16px",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "4px",
    flexShrink: 0,
  };

  const navBtn = (t: Tab, label: string, icon: string) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 16px", borderRadius: "10px", border: "none",
        background: tab === t ? "#1a1a1a" : "transparent",
        color: tab === t ? "#fff" : "#666",
        fontSize: "14px", fontWeight: 600, cursor: "pointer", width: "100%", textAlign: "left",
      }}
    >
      <span>{icon}</span> {label}
    </button>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", paddingTop: "0" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={{ padding: "8px 16px 24px", borderBottom: "1px solid #1a1a1a", marginBottom: "16px" }}>
          <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "16px", fontWeight: 900, color: "#fff" }}>
            MEDIA<span style={{ color: "var(--brand-magenta)" }}>LOOP</span>
          </div>
          <div style={{ fontSize: "10px", color: "#444", letterSpacing: "0.08em", marginTop: "2px" }}>ADMIN PANEL</div>
        </div>
        {navBtn("dashboard", "Dashboard", "📊")}
        {navBtn("requests", "Requests", "📬")}
        {navBtn("services", "Services", "⚙️")}
        <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid #111" }}>
          <button onClick={() => setAuthed(false)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", border: "none", background: "transparent", color: "#444", fontSize: "13px", cursor: "pointer", width: "100%" }}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px", overflow: "auto" }}>
        {/* Dashboard */}
        {tab === "dashboard" && (
          <div>
            <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Dashboard</h1>
            <p style={{ color: "#555", marginBottom: "40px" }}>Overview of your leads and performance.</p>

            <div className="grid md:grid-cols-4 gap-6" style={{ marginBottom: "40px" }}>
              {[
                { label: "Total Requests", value: stats.total, color: "#fff", icon: "" },
                { label: "New Leads", value: stats.new, color: "var(--brand-magenta)", icon: "" },
                { label: "Converted", value: stats.converted, color: "#10B981", icon: "" },
                { label: "Est. Revenue", value: `₹${(stats.revenue / 1000).toFixed(0)}K`, color: "#F59E0B", icon: "" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "28px 24px" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{ color: s.color, fontFamily: "Hanken Grotesk, sans-serif", fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>{s.value}</div>
                  <div style={{ color: "#555", fontSize: "12px", letterSpacing: "0.06em" }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Recent */}
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "28px" }}>
              <h3 style={{ color: "#fff", marginBottom: "20px", fontFamily: "Hanken Grotesk, sans-serif" }}>Recent Requests</h3>
              {submissions.slice(0, 5).map(s => (
                <div key={s.id} onClick={() => { setSelected(s); setTab("requests"); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #1a1a1a", cursor: "pointer" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>{s.name}</div>
                    <div style={{ color: "#555", fontSize: "12px" }}>{s.service || "General"} · {s.email}</div>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${statusColors[s.status]}22`, color: statusColors[s.status] }}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests */}
        {tab === "requests" && (
          <div style={{ display: "flex", gap: "24px", height: "calc(100vh - 120px)" }}>
            {/* List */}
            <div style={{ width: "340px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
              <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>
                Requests <span style={{ color: "#444", fontSize: "14px" }}>({submissions.length})</span>
              </h1>
              {loading && <p style={{ color: "#555" }}>Loading...</p>}
              {submissions.map(s => (
                <div key={s.id} onClick={() => setSelected(s)} style={{
                  padding: "16px", borderRadius: "14px", border: `1px solid ${selected?.id === s.id ? "#333" : "#1a1a1a"}`,
                  background: selected?.id === s.id ? "#1a1a1a" : "#111",
                  cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: "4px" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{s.name}</span>
                    <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, background: `${statusColors[s.status]}22`, color: statusColors[s.status] }}>{s.status}</span>
                  </div>
                  <div style={{ color: "#555", fontSize: "12px" }}>{s.service || "General"}</div>
                  <div style={{ color: "#333", fontSize: "11px", marginTop: "6px" }}>{new Date(s.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>

            {/* Detail */}
            <div style={{ flex: 1, background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "32px", overflowY: "auto" }}>
              {selected ? (
                <div>
                  <div className="flex justify-between items-start" style={{ marginBottom: "28px" }}>
                    <div>
                      <h2 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "24px", fontWeight: 800 }}>{selected.name}</h2>
                      <p style={{ color: "#555", fontSize: "14px" }}>{selected.email} {selected.phone && `· ${selected.phone}`}</p>
                    </div>
                    <button onClick={() => deleteSubmission(selected.id)} style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", color: "#ff5555", borderRadius: "10px", padding: "8px 16px", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4" style={{ marginBottom: "24px" }}>
                    {[
                      { label: "Service", value: selected.service || "—" },
                      { label: "Budget", value: selected.budget || "—" },
                      { label: "Date", value: new Date(selected.createdAt).toLocaleString() },
                      { label: "Status", value: selected.status },
                    ].map(f => (
                      <div key={f.label} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "16px" }}>
                        <div style={{ color: "#444", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "6px" }}>{f.label.toUpperCase()}</div>
                        <div style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "20px", marginBottom: "28px" }}>
                    <div style={{ color: "#444", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "10px" }}>MESSAGE</div>
                    <p style={{ color: "#ccc", lineHeight: "1.7", fontSize: "14px" }}>{selected.message}</p>
                  </div>

                  <div>
                    <div style={{ color: "#555", fontSize: "12px", marginBottom: "10px" }}>UPDATE STATUS</div>
                    <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                      {(["new", "contacted", "converted", "closed"] as const).map(st => (
                        <button key={st} onClick={() => updateStatus(selected.id, st)} style={{
                          padding: "8px 18px", borderRadius: "20px", border: `1px solid ${statusColors[st]}44`,
                          background: selected.status === st ? `${statusColors[st]}22` : "transparent",
                          color: statusColors[st], fontSize: "12px", fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
                        }}>{st}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#333", fontSize: "15px" }}>
                  Select a request to view details
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services */}
        {tab === "services" && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: "32px" }}>
              <div>
                <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, marginBottom: "4px" }}>Services</h1>
                <p style={{ color: "#555" }}>Manage services displayed on the website.</p>
              </div>
              <button onClick={() => setShowNewService(true)} style={{ padding: "12px 24px", background: "linear-gradient(135deg, var(--brand-magenta), #c8008e)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}>
                + Add Service
              </button>
            </div>

            {/* New Service Form */}
            {showNewService && (
              <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "32px", marginBottom: "24px" }}>
                <h3 style={{ color: "#fff", marginBottom: "20px" }}>New Service</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(["title", "icon", "color", "description"] as const).map(field => (
                    <div key={field} style={field === "description" ? { gridColumn: "span 2" } : {}}>
                      <label style={{ display: "block", color: "#555", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "8px" }}>{field.toUpperCase()}</label>
                      <input
                        value={newService[field]}
                        onChange={e => setNewService({ ...newService, [field]: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3" style={{ marginTop: "20px" }}>
                  <button onClick={createService} style={{ padding: "10px 24px", background: "#10B981", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>Save</button>
                  <button onClick={() => setShowNewService(false)} style={{ padding: "10px 24px", background: "transparent", color: "#555", border: "1px solid #2a2a2a", borderRadius: "10px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s.id} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "28px" }}>
                  {editService?.id === s.id ? (
                    <div>
                      {(["title", "icon", "color", "description"] as const).map(field => (
                        <div key={field} style={{ marginBottom: "12px" }}>
                          <label style={{ display: "block", color: "#555", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "6px" }}>{field.toUpperCase()}</label>
                          <input
                            value={editService[field]}
                            onChange={e => setEditService({ ...editService, [field]: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }}
                          />
                        </div>
                      ))}
                      <div className="flex gap-2" style={{ marginTop: "12px" }}>
                        <button onClick={saveService} style={{ padding: "8px 20px", background: "#10B981", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}>Save</button>
                        <button onClick={() => setEditService(null)} style={{ padding: "8px 20px", background: "transparent", color: "#555", border: "1px solid #2a2a2a", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start" style={{ marginBottom: "16px" }}>
                        <div className="flex items-center gap-3">
                          <span style={{ fontSize: "28px" }}>{s.icon}</span>
                          <div>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{s.title}</div>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, display: "inline-block", marginTop: "4px" }} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditService(s)} style={{ padding: "6px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#888", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Edit</button>
                          <button onClick={() => deleteService(s.id)} style={{ padding: "6px 14px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", color: "#ff5555", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Del</button>
                        </div>
                      </div>
                      <p style={{ color: "#555", fontSize: "13px", lineHeight: "1.6" }}>{s.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
