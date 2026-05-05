"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Star, MapPin, Check, ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockRequests, providers } from "@/lib/mock-data";
import { formatCurrency, formatDate, getStatusLabel, getStatusBadgeClass } from "@/lib/utils";
import { notFound, useRouter } from "next/navigation";

const STATUS_STEPS = [
  { key: "submitted", label: "Request Submitted" },
  { key: "matching", label: "Matching Providers" },
  { key: "awaiting_provider_responses", label: "Awaiting Responses" },
  { key: "options_ready", label: "Options Ready" },
  { key: "selected", label: "Provider Selected" },
  { key: "awaiting_payment", label: "Awaiting Payment" },
  { key: "paid", label: "Paid" },
  { key: "contact_released", label: "Contact Released" },
];

const STATUS_ORDER = STATUS_STEPS.map(s => s.key);

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const request = mockRequests.find(r => r.id === id);
  if (!request) notFound();

  const [selectedResponseId, setSelectedResponseId] = useState<string | null>(null);
  const currentStep = STATUS_ORDER.indexOf(request.status);

  const responses = request.responses ?? [];
  const selectedProvider = selectedResponseId
    ? providers.find(p => p.id === responses.find(r => r.id === selectedResponseId)?.providerId)
    : null;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
          <div className="container-luxury" style={{ padding: "16px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/my-requests" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              <ArrowLeft size={14} /> My Requests
            </Link>
            <span className={`badge ${getStatusBadgeClass(request.status)}`}>{getStatusLabel(request.status)}</span>
          </div>
        </div>

        <div className="container-luxury" style={{ padding: "48px 64px" }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: "Noto Serif", fontSize: 34, marginBottom: 8 }}>
              {request.category === "chef" ? "Private Chef" : "Luxury Villa"} · {request.destination}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              {formatDate(request.dateFrom)} → {formatDate(request.dateTo)} · {request.guests} guests · Ref: {request.id.toUpperCase()}
            </p>
          </div>

          {/* Status Timeline */}
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 24 }}>Request Status</h2>
            <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
              {STATUS_STEPS.map((s, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={s.key} style={{ display: "flex", alignItems: "center", flex: i < STATUS_STEPS.length - 1 ? 1 : 0, minWidth: 0 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: done ? (active ? "var(--gold)" : "var(--success)") : "var(--bg-surface-high)",
                        border: `1px solid ${done ? (active ? "var(--gold)" : "var(--success)") : "var(--border)"}`,
                        color: done ? (active ? "#1a1a1a" : "white") : "var(--text-muted)",
                        fontSize: 11, fontWeight: 700, flexShrink: 0,
                      }}>
                        {done && !active ? <Check size={12} /> : i + 1}
                      </div>
                      <span style={{ fontSize: 9, fontFamily: "Manrope", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: active ? "var(--gold)" : done ? "var(--text-secondary)" : "var(--text-muted)", textAlign: "center", lineHeight: 1.2 }}>
                        {s.label}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div style={{ height: 1, flex: 1, background: i < currentStep ? "var(--gold)" : "var(--border)", margin: "0 4px", marginBottom: 20 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48 }}>
            {/* Left: Provider Options */}
            <div>
              {request.status === "options_ready" && responses.length > 0 && (
                <div>
                  <h2 style={{ fontFamily: "Noto Serif", fontSize: 24, marginBottom: 8 }}>Providers Who Accepted</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 28 }}>
                    {responses.length} provider{responses.length > 1 ? "s" : ""} responded to your request. Select one to proceed.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {responses.map(resp => {
                      const prov = providers.find(p => p.id === resp.providerId);
                      if (!prov) return null;
                      const isSelected = selectedResponseId === resp.id;
                      return (
                        <div
                          key={resp.id}
                          onClick={() => setSelectedResponseId(resp.id)}
                          style={{
                            padding: 28, border: `1px solid ${isSelected ? "var(--gold)" : "var(--border)"}`,
                            background: isSelected ? "var(--gold-muted)" : "var(--bg-surface)",
                            cursor: "pointer", transition: "all 0.25s",
                          }}
                        >
                          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                            <div className="img-placeholder" style={{ width: 80, height: 80, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                              {prov.imageUrl ? (
                                <Image src={prov.imageUrl} alt={prov.name} fill style={{ objectFit: "cover" }} />
                              ) : (
                                <span style={{ fontSize: 28 }}>👨‍🍳</span>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
                                <h3 style={{ fontFamily: "Noto Serif", fontSize: 18 }}>{prov.name}</h3>
                                {prov.rating && (
                                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Star size={12} fill="var(--gold)" color="var(--gold)" />
                                    <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600, fontFamily: "Manrope" }}>{prov.rating}</span>
                                  </div>
                                )}
                                <span className="badge badge-success">Accepted</span>
                              </div>
                              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, fontStyle: "italic" }}>{prov.tagline}</p>

                              {/* Contact still locked */}
                              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gold)", fontFamily: "Manrope", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                                <Lock size={11} /> Contact protected until payment
                              </div>

                              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, borderLeft: "2px solid var(--gold-border)", paddingLeft: 12 }}>
                                {resp.message}
                              </p>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontFamily: "Noto Serif", fontSize: 26, color: "var(--gold)", fontWeight: 300 }}>
                                {formatCurrency(resp.proposedPrice)}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "Manrope" }}>proposed fee</div>
                              <div style={{ marginTop: 12 }}>
                                {isSelected ? (
                                  <span className="badge badge-gold"><Check size={11} /> Selected</span>
                                ) : (
                                  <button className="btn btn-ghost btn-sm">Select</button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedResponseId && (
                    <div style={{ marginTop: 32 }}>
                      <Link
                        href={`/checkout?request=${request.id}&response=${selectedResponseId}`}
                        className="btn btn-primary btn-lg"
                        style={{ textDecoration: "none" }}
                      >
                        Proceed to Payment <ArrowRight size={16} />
                      </Link>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
                        Provider contact details will be released immediately after payment.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {request.status === "awaiting_provider_responses" && (
                <div style={{ padding: "48px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
                  <h2 style={{ fontFamily: "Noto Serif", fontSize: 24, marginBottom: 12 }}>Waiting for Provider Responses</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    Matching providers have been notified. Most respond within 2–6 hours.
                  </p>
                </div>
              )}

              {request.status === "paid" && (
                <div style={{ padding: 32, background: "rgba(74,124,89,0.08)", border: "1px solid rgba(74,124,89,0.3)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <Check size={20} color="var(--success)" />
                    <h2 style={{ fontFamily: "Noto Serif", fontSize: 22, color: "var(--success)" }}>Payment Confirmed</h2>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>
                    Contact details have been released. Check your email for provider information.
                  </p>
                  <Link href="/payment-success" className="btn btn-primary" style={{ textDecoration: "none" }}>
                    View Contact Details
                  </Link>
                </div>
              )}
            </div>

            {/* Right: Request Summary */}
            <div>
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontFamily: "Noto Serif", fontSize: 18, marginBottom: 20 }}>Request Summary</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Service", value: request.category === "chef" ? "Private Chef" : "Luxury Villa" },
                    { label: "Destination", value: request.destination },
                    { label: "Dates", value: `${formatDate(request.dateFrom)} → ${formatDate(request.dateTo)}` },
                    { label: "Guests", value: `${request.guests}` },
                    ...(request.cuisinePreference ? [{ label: "Cuisine", value: request.cuisinePreference }] : []),
                    ...(request.dietaryRestrictions ? [{ label: "Dietary", value: request.dietaryRestrictions }] : []),
                    { label: "Budget", value: request.budget },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
                      <span className="label-caps" style={{ color: "var(--text-muted)", fontSize: 10 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: "var(--text-primary)", fontFamily: "Manrope", textAlign: "right", textTransform: "capitalize" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                {request.notes && (
                  <div style={{ marginTop: 16, padding: 14, background: "var(--bg-surface-high)", borderLeft: "2px solid var(--gold-border)" }}>
                    <p className="label-caps" style={{ color: "var(--text-muted)", marginBottom: 6, fontSize: 10 }}>Notes</p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{request.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
