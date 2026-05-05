"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LayoutDashboard, Inbox, CheckSquare, Star, ChefHat, Menu, X, Bell, Lock, Check, ArrowRight, Phone, Mail } from "lucide-react";
import { mockRequests, providers, providerContacts } from "@/lib/mock-data";
import { formatDate, getStatusLabel, getStatusBadgeClass } from "@/lib/utils";

type Tab = "overview" | "pending" | "accepted" | "completed";

const providerProfile = providers[0]; // Chef Mateo — logged in
const incomingRequests = mockRequests.filter(r => r.category === "chef");

export default function ProviderDashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set(["req-001"]));
  const [declinedIds, setDeclinedIds] = useState<Set<string>>(new Set());

  const accept = (id: string) => setAcceptedIds(prev => new Set([...prev, id]));
  const decline = (id: string) => setDeclinedIds(prev => new Set([...prev, id]));

  const paidRequest = incomingRequests.find(r => r.status === "paid");
  const contact = paidRequest ? { phone: "+1 (242) 555-0912", email: "alexm@private.com", name: "Alexandra M." } : null;

  const navItems: { key: Tab; icon: React.ReactNode; label: string }[] = [
    { key: "overview", icon: <LayoutDashboard size={16} />, label: "Overview" },
    { key: "pending", icon: <Inbox size={16} />, label: "Pending Requests" },
    { key: "accepted", icon: <CheckSquare size={16} />, label: "Accepted" },
    { key: "completed", icon: <Star size={16} />, label: "Completed" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <Link href="/">
            <Image src="/logo1.png" alt="Luxury Access" width={40} height={40} style={{ objectFit: "contain" }} />
          </Link>
          <p className="label-caps" style={{ color: "var(--text-muted)", marginTop: 16, fontSize: 9 }}>Provider Portal</p>
        </div>

        <div style={{ padding: "8px 0", flex: 1 }}>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`sidebar-link ${tab === item.key ? "active" : ""}`}
              style={{ background: "none", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="img-placeholder" style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, fontSize: 14 }}>👨‍🍳</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Chef Mateo</div>
              <span className="badge badge-success" style={{ fontSize: 9, padding: "2px 6px" }}>Approved</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {/* Topbar */}
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <h1 style={{ fontFamily: "Noto Serif", fontSize: 22 }}>
            {navItems.find(n => n.key === tab)?.label}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Bell size={18} color="var(--text-muted)" />
              <span style={{ position: "absolute", top: -4, right: -4, width: 10, height: 10, background: "var(--gold)", borderRadius: "50%" }} />
            </div>
          </div>
        </div>

        <div style={{ padding: "32px" }}>
          {/* OVERVIEW */}
          {tab === "overview" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 40 }}>
                {[
                  { label: "Pending Requests", value: "2", color: "var(--gold)" },
                  { label: "Accepted", value: "3", color: "var(--success)" },
                  { label: "Completed Services", value: "87", color: "var(--text-secondary)" },
                  { label: "Response Rate", value: "98%", color: "var(--gold)" },
                ].map(stat => (
                  <div key={stat.label} className="card" style={{ padding: "24px 20px" }}>
                    <div style={{ fontFamily: "Noto Serif", fontSize: 32, color: stat.color, fontWeight: 300, marginBottom: 6 }}>{stat.value}</div>
                    <div className="label-caps" style={{ color: "var(--text-muted)", fontSize: 10 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Anti-leakage reminder */}
              <div style={{ padding: "20px 24px", background: "var(--gold-muted)", border: "1px solid var(--gold-border)", marginBottom: 32, display: "flex", gap: 14 }}>
                <Lock size={18} color="var(--gold)" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Platform Policy Reminder</p>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    You may not share your personal phone, email, Instagram, WhatsApp, or any external contact with clients before payment is completed. Violations may result in suspension.
                  </p>
                </div>
              </div>

              {/* Recent activity */}
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 16 }}>Recent Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {incomingRequests.slice(0, 2).map(req => (
                  <div key={req.id} className="card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                    <ChefHat size={20} color="var(--gold)" />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope", fontWeight: 500 }}>
                        {req.destination} · {formatDate(req.dateFrom)} · {req.guests} guests
                      </span>
                    </div>
                    <span className={`badge ${getStatusBadgeClass(req.status)}`}>{getStatusLabel(req.status)}</span>
                    <button onClick={() => setTab("pending")} className="btn btn-ghost btn-sm">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PENDING */}
          {tab === "pending" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {incomingRequests.map(req => {
                const isAccepted = acceptedIds.has(req.id);
                const isDeclined = declinedIds.has(req.id);
                return (
                  <div key={req.id} className="card" style={{ padding: 28 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: "Noto Serif", fontSize: 18, marginBottom: 4 }}>
                          {req.destination} · {req.guests} guests
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                          {formatDate(req.dateFrom)} → {formatDate(req.dateTo)}
                        </div>
                      </div>
                      {isAccepted && <span className="badge badge-success"><Check size={11} /> Accepted</span>}
                      {isDeclined && <span className="badge badge-error">Declined</span>}
                      {!isAccepted && !isDeclined && <span className="badge badge-gold">New Request</span>}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
                      {[
                        { label: "Cuisine", value: req.cuisinePreference ?? "Any" },
                        { label: "Meals", value: req.meals?.join(", ") ?? "Dinner" },
                        { label: "Dietary", value: req.dietaryRestrictions ?? "None specified" },
                        { label: "Budget", value: req.budget },
                      ].map(f => (
                        <div key={f.label} style={{ padding: "12px 14px", background: "var(--bg-surface-high)", border: "1px solid var(--border)" }}>
                          <div className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9, marginBottom: 4 }}>{f.label}</div>
                          <div style={{ fontSize: 13, color: "var(--text-primary)", fontFamily: "Manrope", textTransform: "capitalize" }}>{f.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Client info — masked before payment */}
                    <div style={{ padding: "12px 16px", background: "var(--gold-muted)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <Lock size={13} color="var(--gold)" />
                      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                        Client contact details are hidden until payment is confirmed.
                        Client: <span className="masked-text">●●●●●●●</span>
                      </span>
                    </div>

                    {!isAccepted && !isDeclined && (
                      <div style={{ display: "flex", gap: 12 }}>
                        <button className="btn btn-primary" onClick={() => accept(req.id)}>
                          <Check size={14} /> Accept Request
                        </button>
                        <button className="btn btn-ghost" onClick={() => decline(req.id)} style={{ borderColor: "var(--error)", color: "var(--error)" }}>
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ACCEPTED */}
          {tab === "accepted" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 8 }}>
                Requests you have accepted. Client contact is released after payment.
              </p>
              {incomingRequests.filter(r => acceptedIds.has(r.id)).map(req => (
                <div key={req.id} className="card" style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontFamily: "Noto Serif", fontSize: 18, marginBottom: 4 }}>{req.destination} · {req.guests} guests</div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{formatDate(req.dateFrom)} → {formatDate(req.dateTo)}</div>
                    </div>
                    <span className={`badge ${getStatusBadgeClass(req.status)}`}>{getStatusLabel(req.status)}</span>
                  </div>

                  {req.status === "paid" && contact ? (
                    <div>
                      <p style={{ fontSize: 13, color: "var(--success)", fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                        <Check size={14} /> Payment confirmed — contact released
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          { icon: <Phone size={14} />, label: "Phone", value: contact.phone },
                          { icon: <Mail size={14} />, label: "Email", value: contact.email },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(74,124,89,0.06)", border: "1px solid rgba(74,124,89,0.2)" }}>
                            <span style={{ color: "var(--success)" }}>{row.icon}</span>
                            <div>
                              <div className="label-caps" style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 2 }}>{row.label}</div>
                              <div style={{ fontSize: 13, fontFamily: "Manrope" }}>{row.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="contact-locked">
                      <Lock size={13} /> Waiting for client payment — contact will appear here
                    </div>
                  )}
                </div>
              ))}
              {[...acceptedIds].length === 0 && (
                <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "48px 0" }}>No accepted requests yet.</p>
              )}
            </div>
          )}

          {/* COMPLETED */}
          {tab === "completed" && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 24, marginBottom: 12 }}>87 Completed Services</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Your track record of excellence with Luxury Access clients.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
