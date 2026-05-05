"use client";
import Link from "next/link";
import { Clock, CheckCircle, Circle, Lock, ArrowRight, ChefHat, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockRequests } from "@/lib/mock-data";
import { getStatusLabel, getStatusBadgeClass, formatDate } from "@/lib/utils";

export default function MyRequestsPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="container-luxury">
          <div style={{ marginBottom: 48 }}>
            <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 12 }}>Client Portal</p>
            <h1 style={{ fontFamily: "Noto Serif", fontSize: 36, marginBottom: 8 }}>Your Requests</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Track the status of your service requests and manage bookings.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mockRequests.map(req => (
              <Link key={req.id} href={`/my-requests/${req.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 24, cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)"; }}
                >
                  <div style={{ width: 44, height: 44, background: "var(--gold-muted)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                    {req.category === "chef" ? <ChefHat size={20} /> : <Home size={20} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Noto Serif", fontSize: 17, color: "var(--text-primary)" }}>
                        {req.category === "chef" ? "Private Chef" : "Luxury Villa"} · {req.destination}
                      </span>
                      <span className={`badge ${getStatusBadgeClass(req.status)}`}>{getStatusLabel(req.status)}</span>
                    </div>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "Manrope" }}>
                        {formatDate(req.dateFrom)} → {formatDate(req.dateTo)}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "Manrope" }}>
                        {req.guests} guests
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "Manrope" }}>
                        Submitted {formatDate(req.createdAt)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/request" className="btn btn-ghost" style={{ textDecoration: "none" }}>
              + New Request
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
