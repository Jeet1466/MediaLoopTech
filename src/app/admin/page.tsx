"use client";
import { useState, useEffect, useCallback } from "react";

type Submission = {
  id: string; name: string; email: string; phone?: string;
  service?: string; budget?: string; message: string;
  status: "new" | "contacted" | "converted" | "closed"; createdAt: string;
};
type Service = {
  id: string; title: string; icon: string; color: string; description: string; active: boolean;
};
type Tab = "dashboard" | "requests" | "services";

const ADMIN_PASS = "medialoop2025";
const statusColors: Record<string, string> = {
  new: "#EC0CAA", contacted: "#FF6B2B", converted: "#10B981", closed: "#888",
};

const inputStyle = {
  width: "100%", padding: "12px 16px", background: "#1a1a1a",
  border: "1px solid #2a2a2a", borderRadius: "10px", color: "#fff",
  fontSize: "14px", outline: "none",
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

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505", padding: "20px" }}>
      <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "24px", padding: "40px 28px", width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "22px", fontWeight: 900, color: "#fff", marginBottom: "6px" }}>
            MEDIA<span style={{ color: "var(--brand-magenta)" }}>LOOP</span>TECH
          </div>
          <p style={{ color: "#555", fontSize: "13px" }}>Admin Portal</p>
        </div>
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#555", marginBottom: "8px" }}>PASSWORD</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && pass === ADMIN_PASS && setAuthed(true)}
            style={inputStyle} placeholder="Enter admin password" />
        </div>
        <button onClick={() => pass === ADMIN_PASS ? setAuthed(true) : alert("Wrong password")}
          style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, var(--brand-magenta), #c8008e)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
          Access Dashboard
        </button>
      </div>
    </div>
  );

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

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "requests", label: "Requests", icon: "📬" },
    { id: "services", label: "Services", icon: "⚙️" },
  ];

  return (
    <>
      <style>{`
        .admin-layout { display: flex; min-height: 100vh; background: #0a0a0a; }

        /* ── Sidebar (desktop) ── */
        .admin-sidebar {
          width: 220px; flex-shrink: 0; background: #050505;
          border-right: 1px solid #111; min-height: 100vh;
          padding: 20px 12px; display: flex; flex-direction: column; gap: 4px;
        }
        .admin-main { flex: 1; padding: 36px 32px; overflow: auto; }

        /* ── Bottom tab bar (mobile) ── */
        .admin-bottom-nav { display: none; }

        @media (max-width: 767px) {
          .admin-sidebar { display: none; }
          .admin-main { padding: 20px 16px 80px; }
          .admin-bottom-nav {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
            background: #050505; border-top: 1px solid #1a1a1a;
            padding: 8px 0; justify-content: space-around; align-items: center;
          }
          .admin-bottom-nav button {
            flex: 1; display: flex; flex-direction: column; align-items: center;
            gap: 3px; background: none; border: none; cursor: pointer;
            padding: 6px 4px; font-size: 10px; font-weight: 600;
            letter-spacing: 0.05em; text-transform: uppercase;
          }
          .admin-bottom-nav .nav-icon { font-size: 20px; }
        }

        /* ── Stats grid ── */
        .admin-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px;
        }
        @media (max-width: 900px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        /* ── Requests layout ── */
        .requests-layout { display: flex; gap: 20px; }
        .requests-list {
          width: 300px; flex-shrink: 0; display: flex; flex-direction: column;
          gap: 8px; overflow-y: auto; max-height: calc(100vh - 100px);
        }
        .requests-detail {
          flex: 1; background: #111; border: 1px solid #1a1a1a;
          border-radius: 20px; padding: 28px; overflow-y: auto;
          max-height: calc(100vh - 100px);
        }
        @media (max-width: 767px) {
          .requests-layout { flex-direction: column; }
          .requests-list { width: 100%; max-height: none; overflow-y: visible; }
          .requests-detail { max-height: none; }
        }

        /* ── Detail meta grid ── */
        .detail-meta-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;
        }
        @media (max-width: 480px) {
          .detail-meta-grid { grid-template-columns: 1fr; }
        }

        /* ── Services grid ── */
        .services-grid-admin {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        @media (max-width: 640px) {
          .services-grid-admin { grid-template-columns: 1fr; }
        }

        /* ── New service form grid ── */
        .new-svc-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
        }
        @media (max-width: 560px) {
          .new-svc-grid { grid-template-columns: 1fr; }
          .new-svc-grid [style*="span 2"] { grid-column: span 1 !important; }
        }

        /* ── Services header ── */
        .services-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }

        /* ── Recent row ── */
        .recent-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; gap: 12px;
        }
        @media (max-width: 480px) {
          .recent-row { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>

      <div className="admin-layout">
        {/* Desktop Sidebar */}
        <aside className="admin-sidebar">
          <div style={{ padding: "6px 12px 20px", borderBottom: "1px solid #1a1a1a", marginBottom: "12px" }}>
            <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "15px", fontWeight: 900, color: "#fff" }}>
              MEDIA<span style={{ color: "var(--brand-magenta)" }}>LOOP</span>
            </div>
            <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.1em", marginTop: "2px" }}>ADMIN PANEL</div>
          </div>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px",
              borderRadius: "10px", border: "none", width: "100%", textAlign: "left",
              background: tab === t.id ? "#1a1a1a" : "transparent",
              color: tab === t.id ? "#fff" : "#666", fontSize: "14px", fontWeight: 600, cursor: "pointer",
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #111" }}>
            <button onClick={() => setAuthed(false)} style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px",
              borderRadius: "10px", border: "none", background: "transparent",
              color: "#444", fontSize: "13px", cursor: "pointer", width: "100%",
            }}>
              🚪 Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">

          {/* ── Dashboard ── */}
          {tab === "dashboard" && (
            <div>
              <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, marginBottom: "6px" }}>Dashboard</h1>
              <p style={{ color: "#555", marginBottom: "32px", fontSize: "14px" }}>Overview of your leads and performance.</p>

              <div className="admin-stats-grid">
                {[
                  { label: "Total Requests", value: stats.total, color: "#fff", icon: "📥" },
                  { label: "New Leads", value: stats.new, color: "var(--brand-magenta)", icon: "🔥" },
                  { label: "Converted", value: stats.converted, color: "#10B981", icon: "✅" },
                  { label: "Est. Revenue", value: `₹${(stats.revenue / 1000).toFixed(0)}K`, color: "#F59E0B", icon: "💰" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "22px 18px" }}>
                    <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
                    <div style={{ color: s.color, fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, marginBottom: "4px" }}>{s.value}</div>
                    <div style={{ color: "#555", fontSize: "11px", letterSpacing: "0.06em" }}>{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "24px" }}>
                <h3 style={{ color: "#fff", marginBottom: "18px", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "16px" }}>Recent Requests</h3>
                {loading && <p style={{ color: "#555" }}>Loading...</p>}
                {submissions.slice(0, 5).map(s => (
                  <div key={s.id} className="recent-row"
                    onClick={() => { setSelected(s); setTab("requests"); }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>{s.name}</div>
                      <div style={{ color: "#555", fontSize: "12px" }}>{s.service || "General"} · {s.email}</div>
                    </div>
                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${statusColors[s.status]}22`, color: statusColors[s.status], whiteSpace: "nowrap" }}>
                      {s.status}
                    </span>
                  </div>
                ))}
                {!loading && submissions.length === 0 && <p style={{ color: "#444", fontSize: "14px" }}>No requests yet.</p>}
              </div>
            </div>
          )}

          {/* ── Requests ── */}
          {tab === "requests" && (
            <div>
              <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(18px,4vw,22px)", fontWeight: 800, marginBottom: "20px" }}>
                Requests <span style={{ color: "#444", fontSize: "14px" }}>({submissions.length})</span>
              </h1>
              <div className="requests-layout">
                {/* List */}
                <div className="requests-list">
                  {loading && <p style={{ color: "#555" }}>Loading...</p>}
                  {submissions.map(s => (
                    <div key={s.id} onClick={() => setSelected(s)} style={{
                      padding: "14px", borderRadius: "14px",
                      border: `1px solid ${selected?.id === s.id ? "#333" : "#1a1a1a"}`,
                      background: selected?.id === s.id ? "#1a1a1a" : "#111",
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{s.name}</span>
                        <span style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, background: `${statusColors[s.status]}22`, color: statusColors[s.status] }}>{s.status}</span>
                      </div>
                      <div style={{ color: "#555", fontSize: "12px" }}>{s.service || "General"}</div>
                      <div style={{ color: "#333", fontSize: "11px", marginTop: "5px" }}>{new Date(s.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>

                {/* Detail */}
                <div className="requests-detail">
                  {selected ? (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", gap: "12px", flexWrap: "wrap" }}>
                        <div>
                          <h2 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(18px,3vw,24px)", fontWeight: 800 }}>{selected.name}</h2>
                          <p style={{ color: "#555", fontSize: "13px" }}>{selected.email}{selected.phone && ` · ${selected.phone}`}</p>
                        </div>
                        <button onClick={() => deleteSubmission(selected.id)} style={{ background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", color: "#ff5555", borderRadius: "10px", padding: "8px 16px", cursor: "pointer", fontSize: "13px", whiteSpace: "nowrap" }}>Delete</button>
                      </div>

                      <div className="detail-meta-grid">
                        {[
                          { label: "Service", value: selected.service || "—" },
                          { label: "Budget", value: selected.budget || "—" },
                          { label: "Date", value: new Date(selected.createdAt).toLocaleString() },
                          { label: "Status", value: selected.status },
                        ].map(f => (
                          <div key={f.label} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "14px" }}>
                            <div style={{ color: "#444", fontSize: "10px", letterSpacing: "0.08em", marginBottom: "5px" }}>{f.label.toUpperCase()}</div>
                            <div style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>{f.value}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "18px", marginBottom: "24px" }}>
                        <div style={{ color: "#444", fontSize: "10px", letterSpacing: "0.08em", marginBottom: "8px" }}>MESSAGE</div>
                        <p style={{ color: "#ccc", lineHeight: "1.7", fontSize: "13px" }}>{selected.message}</p>
                      </div>

                      <div>
                        <div style={{ color: "#555", fontSize: "11px", marginBottom: "10px" }}>UPDATE STATUS</div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {(["new", "contacted", "converted", "closed"] as const).map(st => (
                            <button key={st} onClick={() => updateStatus(selected.id, st)} style={{
                              padding: "8px 16px", borderRadius: "20px", border: `1px solid ${statusColors[st]}44`,
                              background: selected.status === st ? `${statusColors[st]}22` : "transparent",
                              color: statusColors[st], fontSize: "12px", fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
                            }}>{st}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "#333", fontSize: "14px" }}>
                      Select a request to view details
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Services ── */}
          {tab === "services" && (
            <div>
              <div className="services-header">
                <div>
                  <h1 style={{ color: "#fff", fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, marginBottom: "4px" }}>Services</h1>
                  <p style={{ color: "#555", fontSize: "13px" }}>Manage services displayed on the website.</p>
                </div>
                <button onClick={() => setShowNewService(true)} style={{ padding: "11px 20px", background: "linear-gradient(135deg, var(--brand-magenta), #c8008e)", color: "#fff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>
                  + Add Service
                </button>
              </div>

              {showNewService && (
                <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "24px", marginBottom: "20px" }}>
                  <h3 style={{ color: "#fff", marginBottom: "18px", fontSize: "16px" }}>New Service</h3>
                  <div className="new-svc-grid">
                    {(["title", "icon", "color", "description"] as const).map(field => (
                      <div key={field} style={field === "description" ? { gridColumn: "span 2" } : {}}>
                        <label style={{ display: "block", color: "#555", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "7px" }}>{field.toUpperCase()}</label>
                        <input value={newService[field]} onChange={e => setNewService({ ...newService, [field]: e.target.value })} style={inputStyle} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                    <button onClick={createService} style={{ padding: "10px 22px", background: "#10B981", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>Save</button>
                    <button onClick={() => setShowNewService(false)} style={{ padding: "10px 22px", background: "transparent", color: "#555", border: "1px solid #2a2a2a", borderRadius: "10px", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              <div className="services-grid-admin">
                {services.map(s => (
                  <div key={s.id} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "20px", padding: "24px" }}>
                    {editService?.id === s.id ? (
                      <div>
                        {(["title", "icon", "color", "description"] as const).map(field => (
                          <div key={field} style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", color: "#555", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "6px" }}>{field.toUpperCase()}</label>
                            <input value={editService[field]} onChange={e => setEditService({ ...editService, [field]: e.target.value })}
                              style={{ ...inputStyle, fontSize: "13px", padding: "10px 14px" }} />
                          </div>
                        ))}
                        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                          <button onClick={saveService} style={{ padding: "8px 20px", background: "#10B981", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "13px" }}>Save</button>
                          <button onClick={() => setEditService(null)} style={{ padding: "8px 20px", background: "transparent", color: "#555", border: "1px solid #2a2a2a", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "26px" }}>{s.icon}</span>
                            <div>
                              <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{s.title}</div>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, display: "inline-block", marginTop: "4px" }} />
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                            <button onClick={() => setEditService(s)} style={{ padding: "6px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#888", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Edit</button>
                            <button onClick={() => deleteService(s.id)} style={{ padding: "6px 12px", background: "rgba(255,50,50,0.1)", border: "1px solid rgba(255,50,50,0.2)", color: "#ff5555", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Del</button>
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

      {/* Mobile Bottom Tab Bar */}
      <nav className="admin-bottom-nav">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ color: tab === t.id ? "var(--brand-magenta)" : "#555" }}>
            <span className="nav-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
        <button onClick={() => setAuthed(false)} style={{ color: "#444" }}>
          <span className="nav-icon">🚪</span>
          Sign Out
        </button>
      </nav>
    </>
  );
}
