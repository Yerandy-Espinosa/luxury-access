"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminStats, mockRequests, providers as initialProviders } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProviderModal from "@/components/admin/ProviderModal";
import { 
  ArrowUpRight, Clock, CheckCircle, ShieldCheck, 
  Users, Home, LayoutDashboard, Plus, Edit, Trash2, 
  Search, ExternalLink
} from "lucide-react";
import { Provider, ProviderCategory } from "@/lib/types";

type Tab = "overview" | "chefs" | "villas";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [allProviders, setAllProviders] = useState<Provider[]>(initialProviders);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [modalCategory, setModalCategory] = useState<ProviderCategory>("chef");

  const pendingRequests = mockRequests.filter(r => r.status === "awaiting_provider_responses");

  const filteredProviders = allProviders.filter(p => {
    const matchesTab = p.category === (activeTab === "chefs" ? "chef" : "villa");
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.destinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return activeTab === "overview" ? true : (matchesTab && matchesSearch);
  });

  const handleSaveProvider = (provider: Provider) => {
    if (editingProvider) {
      setAllProviders(prev => prev.map(p => p.id === provider.id ? provider : p));
    } else {
      setAllProviders(prev => [provider, ...prev]);
    }
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  const handleDeleteProvider = (id: string) => {
    if (confirm("Are you sure you want to remove this provider?")) {
      setAllProviders(prev => prev.filter(p => p.id !== id));
    }
  };

  const openEditModal = (provider: Provider) => {
    setEditingProvider(provider);
    setModalCategory(provider.category);
    setIsModalOpen(true);
  };

  const openAddModal = (cat: ProviderCategory) => {
    setEditingProvider(null);
    setModalCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      <main className="container-luxury" style={{ paddingTop: 140, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ padding: 12, background: "var(--bg-surface)", border: "1px solid var(--gold-border)" }}>
              <ShieldCheck size={28} color="var(--gold)" />
            </div>
            <div>
              <h1 style={{ fontFamily: "Noto Serif, serif", fontSize: 32, fontWeight: 300, color: "var(--text-primary)" }}>
                Platform Control
              </h1>
              <p className="label-caps" style={{ color: "var(--text-muted)", fontSize: 10 }}>
                Administrator Command Center
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", background: "var(--bg-surface)", padding: 4, border: "1px solid var(--border)" }}>
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "chefs", label: "Manage Chefs", icon: Users },
              { id: "villas", label: "Manage Villas", icon: Home },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  border: "none",
                  cursor: "pointer",
                  background: activeTab === tab.id ? "var(--gold)" : "transparent",
                  color: activeTab === tab.id ? "#1a1a1a" : "var(--text-secondary)",
                  transition: "all 0.3s ease",
                }}
              >
                <tab.icon size={14} />
                <span className="hide-mobile">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 64 }}>
                {[
                  { label: "Revenue MTD", value: formatCurrency(adminStats.revenueThisMonth), icon: ArrowUpRight, color: "var(--gold)" },
                  { label: "Total Requests", value: adminStats.totalRequests, icon: CheckCircle, color: "var(--text-primary)" },
                  { label: "Approved Providers", value: allProviders.filter(p => p.status === "approved").length, icon: ShieldCheck, color: "var(--success)" },
                  { label: "Active Clients", value: "128", icon: Users, color: "var(--text-secondary)" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{ padding: 32, background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                      <span className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>
                        {stat.label}
                      </span>
                      <stat.icon size={16} color={stat.color} />
                    </div>
                    <div style={{ fontFamily: "Noto Serif, serif", fontSize: 32, color: "var(--text-primary)", fontWeight: 300 }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pending Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
                <div>
                  <h2 style={{ fontFamily: "Noto Serif, serif", fontSize: 24, color: "var(--text-primary)", marginBottom: 24 }}>
                    Recent Requests requiring attention
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {pendingRequests.map((req) => (
                      <div
                        key={req.id}
                        style={{
                          padding: 24,
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 16
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            <span className="label-caps" style={{ color: "var(--gold)", fontSize: 10 }}>{req.id}</span>
                            <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>{req.clientName}</span>
                          </div>
                          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                            {req.category === "chef" ? "👨‍🍳" : "🏛️"} Requesting {req.category} in {req.destination} for {req.guests} guests.
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <button className="btn btn-ghost btn-sm">View details</button>
                          <button className="btn btn-primary btn-sm">Review match</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(activeTab === "chefs" || activeTab === "villas") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Management Controls */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
                <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
                  <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input 
                    className="input-box" 
                    placeholder={`Search ${activeTab === "chefs" ? "chefs" : "villas"}...`}
                    style={{ paddingLeft: 44 }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => openAddModal(activeTab === "chefs" ? "chef" : "villa")}
                >
                  <Plus size={16} /> Add New {activeTab === "chefs" ? "Chef" : "Villa"}
                </button>
              </div>

              {/* Data Table */}
              <div style={{ overflowX: "auto", background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
                      <th className="label-caps" style={{ padding: "16px 24px", fontSize: 9, color: "var(--text-muted)" }}>Provider</th>
                      <th className="label-caps" style={{ padding: "16px 24px", fontSize: 9, color: "var(--text-muted)" }}>Location</th>
                      <th className="label-caps" style={{ padding: "16px 24px", fontSize: 9, color: "var(--text-muted)" }}>Status</th>
                      <th className="label-caps" style={{ padding: "16px 24px", fontSize: 9, color: "var(--text-muted)" }}>Pricing</th>
                      <th className="label-caps" style={{ padding: "16px 24px", fontSize: 9, color: "var(--text-muted)", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProviders.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }} className="hover:bg-white/5">
                        <td style={{ padding: "20px 24px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, background: "var(--bg-surface-high)", position: "relative", overflow: "hidden" }}>
                              {p.imageUrl ? (
                                <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              ) : (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                                  {p.category === "chef" ? "👨‍🍳" : "🏛️"}
                                </div>
                              )}
                            </div>
                            <div>
                              <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>{p.name}</div>
                              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.tagline.substring(0, 40)}...</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "20px 24px", fontSize: 13, color: "var(--text-secondary)" }}>
                          {p.destinations[0]}{p.destinations.length > 1 ? `, +${p.destinations.length - 1}` : ""}
                        </td>
                        <td style={{ padding: "20px 24px" }}>
                          <span className="label-caps" style={{ 
                            fontSize: 8, 
                            padding: "4px 8px", 
                            background: p.status === "approved" ? "rgba(74,124,89,0.15)" : "rgba(196,162,101,0.1)",
                            color: p.status === "approved" ? "var(--success)" : "var(--gold)",
                            border: `1px solid ${p.status === "approved" ? "rgba(74,124,89,0.3)" : "rgba(196,162,101,0.3)"}`
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: "20px 24px", fontSize: 13, color: "var(--gold)", fontFamily: "Noto Serif" }}>
                          {formatCurrency(p.priceFrom)}+
                        </td>
                        <td style={{ padding: "20px 24px", textAlign: "right" }}>
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                            <button 
                              onClick={() => openEditModal(p)}
                              style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 6 }}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProvider(p.id)}
                              style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer", padding: 6, opacity: 0.7 }}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProviders.length === 0 && (
                  <div style={{ padding: "64px", textAlign: "center", color: "var(--text-muted)" }}>
                    No {activeTab} found matching your criteria.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <ProviderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProvider}
        provider={editingProvider}
        category={modalCategory}
      />
    </div>
  );
}
