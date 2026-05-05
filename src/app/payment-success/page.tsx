"use client";
import Link from "next/link";
import Image from "next/image";
import { Check, Phone, Mail, MessageCircle, ArrowRight, Lock } from "lucide-react";
import { providers, providerContacts, sampleRequest } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const provider = providers[0]; // Chef Mateo
const contact = providerContacts[provider.id];

const timeline = [
  { label: "Request created", time: "May 28, 2024 · 10:30 AM", done: true },
  { label: "Provider accepted", time: "May 28, 2024 · 3:45 PM", done: true },
  { label: "Provider selected by client", time: "Jun 1, 2024 · 2:10 PM", done: true },
  { label: "Payment completed", time: "Jun 1, 2024 · 2:14 PM", done: true },
  { label: "Contact released", time: "Jun 1, 2024 · 2:14 PM", done: true },
];

export default function PaymentSuccessPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="container-luxury" style={{ padding: "16px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <Image src="/logo2.png" alt="Luxury Access" width={140} height={38} style={{ objectFit: "contain", height: 34, width: "auto" }} />
          </Link>
          <span className="badge badge-success"><Check size={11} /> Payment Confirmed</span>
        </div>
      </div>

      <div className="container-luxury" style={{ padding: "64px", maxWidth: 960 }}>
        {/* Success hero */}
        <div
          style={{
            textAlign: "center", padding: "48px 32px 40px",
            background: "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(74,124,89,0.08) 0%, transparent 70%)",
            border: "1px solid rgba(74,124,89,0.2)", marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: "50%", background: "rgba(74,124,89,0.15)",
              border: "1px solid rgba(74,124,89,0.4)", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 20px", animation: "pulseGold 2s ease-in-out infinite",
            }}
          >
            <Check size={28} color="var(--success)" />
          </div>
          <h1 style={{ fontFamily: "Noto Serif", fontSize: 36, marginBottom: 12 }}>Booking Confirmed</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            Payment processed successfully. Contact details have been released to both parties.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 40 }}>
          {/* Released Contact Card */}
          <div>
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Lock size={13} color="#1a1a1a" style={{ transform: "rotate(0deg)" }} />
              </div>
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 20 }}>Contact Released</h2>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
                <div className="img-placeholder" style={{ width: 56, height: 56, flexShrink: 0, position: "relative", overflow: "hidden", borderRadius: "50%" }}>
                  {provider.imageUrl ? (
                    <Image src={provider.imageUrl} alt={provider.name} fill style={{ objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 22 }}>👨‍🍳</span>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: "Noto Serif", fontSize: 18, marginBottom: 2 }}>{provider.name}</div>
                  <div style={{ fontSize: 12, color: "var(--gold)", fontStyle: "italic" }}>{provider.cuisineStyle}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: <Phone size={15} />, label: "Phone", value: contact.phone },
                  { icon: <Mail size={15} />, label: "Email", value: contact.email },
                  { icon: <MessageCircle size={15} />, label: "WhatsApp", value: contact.whatsapp },
                ].map(row => (
                  <div
                    key={row.label}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--bg-surface-high)", border: "1px solid var(--gold-border)" }}
                  >
                    <span style={{ color: "var(--gold)" }}>{row.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9, marginBottom: 2 }}>{row.label}</div>
                      <div style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope" }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 16 }}>Booking Summary</h2>
            <div className="card" style={{ padding: 28 }}>
              {[
                { label: "Service", value: "Private Chef · Mediterranean" },
                { label: "Destination", value: sampleRequest.destination },
                { label: "Arrival", value: formatDate(sampleRequest.dateFrom) },
                { label: "Departure", value: formatDate(sampleRequest.dateTo) },
                { label: "Guests", value: `${sampleRequest.guests} guests` },
                { label: "Occasion", value: sampleRequest.occasion ?? "—" },
                { label: "Amount Paid", value: "$3,520" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span className="label-caps" style={{ color: "var(--text-muted)", fontSize: 10 }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: "var(--text-primary)", fontFamily: "Manrope" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Timeline */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 24 }}>Event Log</h2>
          <div className="card" style={{ padding: 28 }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < timeline.length - 1 ? 24 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(74,124,89,0.15)", border: "1px solid rgba(74,124,89,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={13} color="var(--success)" />
                  </div>
                  {i < timeline.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? 0 : 0 }}>
                  <div style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope", fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: "none" }}>
            Back to Home <ArrowRight size={14} />
          </Link>
          <Link href="/my-requests" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            View All Requests
          </Link>
        </div>
      </div>
    </div>
  );
}
