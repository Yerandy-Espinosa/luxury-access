"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, MapPin, Users, Star, Clock, CheckCircle, Bed, Waves, ChefHat } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { providers } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel, getAvailabilityColor } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const provider = providers.find(p => p.id === id);
  if (!provider) notFound();

  const availColor = getAvailabilityColor(provider.availability);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
          <div className="container-luxury" style={{ padding: "16px 64px" }}>
            <Link href={provider.category === "chef" ? "/chefs" : "/villas"}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              <ArrowLeft size={14} /> Back
            </Link>
          </div>
        </div>

        <div style={{ height: 500, position: "relative", overflow: "hidden", background: "var(--bg-surface)" }}>
          {provider.imageUrl ? (
            <Image
              src={provider.imageUrl}
              alt={provider.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, opacity: 0.15 }}>
              {provider.category === "chef" ? "👨‍🍳" : "🏛️"}
            </div>
          )}
          
          {/* Gradients for depth and readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, transparent 40%, var(--bg) 100%)", zIndex: 1 }} />
          
          <div style={{ position: "absolute", top: 32, left: 64, zIndex: 2, padding: "6px 14px", background: "rgba(0,0,0,0.6)", border: "1px solid var(--gold-border)", color: "var(--gold)", backdropFilter: "blur(4px)" }} className="label-caps">
            {provider.category === "chef" ? "Private Chef" : "Luxury Villa"}
          </div>
          <div style={{ position: "absolute", bottom: 32, left: 64, zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: availColor }} />
            <span style={{ color: "#FAF7F2", fontSize: 13, fontFamily: "Manrope", fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{getStatusLabel(provider.availability)}</span>
          </div>
        </div>

        <div className="container-luxury" style={{ padding: "0 64px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 64, marginTop: 48 }}>
            <div>
              <h1 style={{ fontFamily: "Noto Serif", fontSize: 40, fontWeight: 400, marginBottom: 12 }}>{provider.name}</h1>
              <p style={{ color: "var(--gold)", fontSize: 16, fontStyle: "italic", fontFamily: "Noto Serif", marginBottom: 32 }}>{provider.tagline}</p>

              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPin size={15} color="var(--gold)" />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{provider.destinations.slice(0,3).join(", ")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Users size={15} color="var(--gold)" />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Up to {provider.capacity} guests</span>
                </div>
                {provider.rating && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Star size={15} fill="var(--gold)" color="var(--gold)" />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{provider.rating} · {provider.completedServices} services</span>
                  </div>
                )}
                {provider.responseTime && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Clock size={15} color="var(--gold)" />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Responds {provider.responseTime}</span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "Noto Serif", fontSize: 22, marginBottom: 16 }}>About</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: 15 }}>{provider.description}</p>
              </div>

              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "Noto Serif", fontSize: 22, marginBottom: 20 }}>Specialties</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {provider.tags.map(tag => (
                    <span key={tag} className="label-caps" style={{ padding: "6px 14px", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 10 }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: "Noto Serif", fontSize: 22, marginBottom: 20 }}>Gallery</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                  {provider.galleryImages && provider.galleryImages.length > 0 ? (
                    provider.galleryImages.map((img, i) => (
                      <div key={i} style={{ height: 200, position: "relative", overflow: "hidden", background: "var(--bg-surface)" }}>
                        <Image
                          src={img}
                          alt={`${provider.name} gallery ${i + 1}`}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                        />
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map(i => (
                      <div key={i} className="img-placeholder" style={{ height: 140, fontSize: 28 }}>
                        {provider.category === "chef" ? "🍽️" : "🌊"}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <div style={{ position: "sticky", top: 96, alignSelf: "flex-start" }}>
              <div className="card-elevated" style={{ padding: 32 }}>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Manrope" }}>Starting from</span>
                  <div style={{ fontFamily: "Noto Serif", fontSize: 34, color: "var(--gold)", fontWeight: 300 }}>{formatCurrency(provider.priceFrom)}</div>
                </div>
                <div className="divider" style={{ margin: "20px 0", width: "100%" }} />
                <div style={{ background: "var(--gold-muted)", border: "1px solid var(--gold-border)", padding: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Lock size={13} color="var(--gold)" />
                    <span className="label-caps" style={{ color: "var(--gold)", fontSize: 10 }}>Contact Protected</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Phone, email, WhatsApp, and social handles are hidden until after confirmed payment.
                  </p>
                </div>
                <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Phone","Email","WhatsApp","Instagram"].map(type => (
                    <div key={type} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Manrope" }}>{type}</span>
                      <span className="masked-text" style={{ fontSize: 13 }}>●●●●●●●●</span>
                    </div>
                  ))}
                </div>
                <Link href="/request" className="btn btn-primary" style={{ textDecoration: "none", width: "100%", display: "flex", justifyContent: "center" }}>
                  Request This Provider
                </Link>
                <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 12 }}>No payment to submit a request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
