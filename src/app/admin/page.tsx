"use client";

import { motion } from "framer-motion";
import { adminStats, mockRequests } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { ArrowUpRight, Clock, CheckCircle, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const pendingRequests = mockRequests.filter(r => r.status === "awaiting_provider_responses");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
      <Navbar />

      <main className="container-luxury" style={{ paddingTop: 140, paddingBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <div style={{ padding: 12, background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <ShieldCheck size={28} color="var(--gold)" />
            </div>
            <div>
              <h1 style={{ fontFamily: "Noto Serif, serif", fontSize: 32, fontWeight: 300, color: "var(--text-primary)" }}>
                Platform Administration
              </h1>
              <p style={{ color: "var(--text-secondary)", fontFamily: "Manrope", fontSize: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Command Center
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 64 }}>
            {[
              { label: "Revenue MTD", value: formatCurrency(adminStats.revenueThisMonth), icon: ArrowUpRight, color: "var(--gold)" },
              { label: "Total Requests", value: adminStats.totalRequests, icon: CheckCircle, color: "var(--text-primary)" },
              { label: "Pending Responses", value: adminStats.pendingProviderResponses, icon: Clock, color: "var(--text-secondary)" },
              { label: "Providers Under Review", value: adminStats.providersUnderReview, icon: ShieldCheck, color: "var(--gold-border)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                style={{ padding: 24, background: "var(--bg-surface)", border: "1px solid var(--border)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "Manrope", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                    {stat.label}
                  </span>
                  <stat.icon size={16} color={stat.color} />
                </div>
                <div style={{ fontFamily: "Noto Serif, serif", fontSize: 28, color: "var(--text-primary)" }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pending Actions */}
          <div>
            <h2 style={{ fontFamily: "Noto Serif, serif", fontSize: 24, color: "var(--text-primary)", marginBottom: 24 }}>
              Action Required
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {pendingRequests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  style={{
                    padding: 24,
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span className="label-caps" style={{ color: "var(--text-primary)", fontWeight: 700 }}>{req.id}</span>
                      <span className="label-caps" style={{ padding: "2px 8px", background: "rgba(196,162,101,0.1)", color: "var(--gold)", fontSize: 10 }}>
                        {getStatusLabel(req.status)}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                      <strong style={{ color: "var(--text-primary)" }}>{req.clientName}</strong> is requesting a {req.category} in {req.destination}
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm">Review Match</button>
                </motion.div>
              ))}
              {pendingRequests.length === 0 && (
                <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No pending actions required.</p>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
