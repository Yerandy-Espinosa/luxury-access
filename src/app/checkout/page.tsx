"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import { Lock, Shield, CreditCard, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { mockRequests, providers } from "@/lib/mock-data";
import { formatCurrency, formatDate, calculateNights, platformFee } from "@/lib/utils";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paying, setPaying] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const requestId = searchParams.get("request") ?? "req-001";
  const responseId = searchParams.get("response") ?? "resp-001";
  const request = mockRequests.find(r => r.id === requestId) ?? mockRequests[0];
  const response = request.responses?.find(r => r.id === responseId) ?? request.responses?.[0];
  const provider = providers.find(p => p.id === response?.providerId);

  const amount = response?.proposedPrice ?? 3200;
  const fee = platformFee(amount);
  const total = amount + fee;
  const nights = calculateNights(request.dateFrom, request.dateTo);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => router.push("/payment-success"), 2200);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container-luxury" style={{ maxWidth: 1100 }}>
          <div style={{ marginBottom: 40 }}>
            <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 12 }}>Secure Checkout</p>
            <h1 style={{ fontFamily: "Noto Serif", fontSize: 36 }}>Complete Your Booking</h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 48 }}>
            {/* Left: Payment form */}
            <div>
              {/* Provider summary */}
              <div className="card" style={{ padding: 28, marginBottom: 28 }}>
                <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 20 }}>You&apos;re booking</h2>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div className="img-placeholder" style={{ width: 70, height: 70, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                    {provider?.imageUrl ? (
                      <Image src={provider.imageUrl} alt={provider.name} fill style={{ objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 24 }}>{request.category === "chef" ? "👨‍🍳" : "🏛️"}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Noto Serif", fontSize: 18, marginBottom: 4 }}>{provider?.name ?? "Selected Provider"}</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{request.destination} · {formatDate(request.dateFrom)} → {formatDate(request.dateTo)}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{request.guests} guests · {nights} nights</div>
                  </div>
                </div>
              </div>

              {/* Anti-leakage callout */}
              <div style={{ padding: 20, background: "var(--gold-muted)", border: "1px solid var(--gold-border)", marginBottom: 28, display: "flex", gap: 14 }}>
                <Lock size={18} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Contact Released After Payment</p>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Upon successful payment, {provider?.name ?? "the provider"}&apos;s phone number, email, and WhatsApp will be released to you immediately. They will also receive your contact details.
                  </p>
                </div>
              </div>

              {/* Simulated payment form */}
              <div className="card" style={{ padding: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <CreditCard size={18} color="var(--gold)" />
                  <h2 style={{ fontFamily: "Noto Serif", fontSize: 20 }}>Payment Details</h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 10, fontSize: 10 }}>Card Number</label>
                    <input className="input-box" defaultValue="4242 4242 4242 4242" style={{ fontFamily: "monospace", letterSpacing: "0.1em" }} readOnly />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 10, fontSize: 10 }}>Expiry</label>
                      <input className="input-box" defaultValue="12 / 28" readOnly />
                    </div>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 10, fontSize: 10 }}>CVC</label>
                      <input className="input-box" defaultValue="•••" type="password" readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 10, fontSize: 10 }}>Cardholder Name</label>
                    <input className="input-box" defaultValue="Alexandra M." readOnly />
                  </div>
                </div>

                <div style={{ marginTop: 28, padding: 16, background: "var(--bg-surface-high)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                  <Shield size={16} color="var(--text-muted)" />
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Payments processed securely via Stripe. Luxury Access never stores your card details.</p>
                </div>
              </div>

              <label style={{ display: "flex", gap: 12, marginTop: 20, cursor: "pointer", alignItems: "flex-start" }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: "var(--gold)", width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  I agree to the <span style={{ color: "var(--gold)" }}>Terms of Service</span> and confirm that contact details will be released to both parties upon payment confirmation.
                </span>
              </label>
            </div>

            {/* Right: Order summary */}
            <div>
              <div className="card-elevated" style={{ padding: 32, position: "sticky", top: 96 }}>
                <h2 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 24 }}>Order Summary</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  {[
                    { label: "Service fee", value: formatCurrency(amount) },
                    { label: `Platform fee (10%)`, value: formatCurrency(fee) },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: "Manrope" }}>{row.label}</span>
                      <span style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="divider" style={{ width: "100%", marginBottom: 20 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                  <span style={{ fontFamily: "Noto Serif", fontSize: 18 }}>Total</span>
                  <span style={{ fontFamily: "Noto Serif", fontSize: 28, color: "var(--gold)", fontWeight: 300 }}>{formatCurrency(total)}</span>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePay}
                  disabled={!agreed || paying}
                  style={{ width: "100%", opacity: agreed && !paying ? 1 : 0.5, cursor: agreed && !paying ? "pointer" : "not-allowed", position: "relative" }}
                >
                  {paying ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 16, height: 16, border: "2px solid #1a1a1a", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Processing…
                    </span>
                  ) : (
                    <><Lock size={14} /> Pay {formatCurrency(total)}</>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 12 }}>
                  Contact details released instantly after payment
                </p>

                {/* What happens next */}
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                  <p className="label-caps" style={{ color: "var(--text-muted)", marginBottom: 16, fontSize: 10 }}>What happens next</p>
                  {[
                    "Payment confirmed instantly",
                    "Contact details released to both parties",
                    "Provider reaches out to finalize details",
                    "Your experience begins",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--gold-muted)", border: "1px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--gold)", fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<div style={{ background: "var(--bg)", minHeight: "100vh" }} />}><CheckoutContent /></Suspense>;
}
