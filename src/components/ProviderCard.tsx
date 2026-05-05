"use client";
import Link from "next/link";
import Image from "next/image";
import { Lock, MapPin, Users, Star } from "lucide-react";
import type { Provider } from "@/lib/types";
import { formatCurrency, getStatusLabel, getAvailabilityColor } from "@/lib/utils";

interface ProviderCardProps {
  provider: Provider;
  compact?: boolean;
}

export default function ProviderCard({ provider, compact = false }: ProviderCardProps) {
  const availColor = getAvailabilityColor(provider.availability);

  return (
    <Link href={`/providers/${provider.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        className="card"
        style={{
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s ease",
          height: "100%",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--gold)";
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "var(--shadow)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          className="img-placeholder provider-card-img"
          style={{ height: compact ? 200 : 260, position: "relative" }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
              zIndex: 1,
            }}
          />

          {/* Category label */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              padding: "4px 12px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--gold-border)",
              color: "var(--gold)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {provider.category === "chef" ? "Private Chef" : "Villa"}
          </div>

          {/* Lock Badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(196,162,101,0.4)",
              color: "#E6C181",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            <Lock size={10} />
            Contact Protected
          </div>

          {/* Availability dot */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              color: "#FAF7F2",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: availColor, flexShrink: 0 }} />
            {getStatusLabel(provider.availability)}
          </div>

          {/* Background Image / Placeholder */}
          <div className="img-inner" style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            {provider.imageUrl ? (
              <Image src={provider.imageUrl} alt={provider.name} fill style={{ objectFit: "cover", objectPosition: "center 25%" }} />
            ) : (
              <>
                <span style={{ fontSize: 40, opacity: 0.3 }}>{provider.category === "chef" ? "👨‍🍳" : "🏛️"}</span>
                <span style={{ fontSize: 11, opacity: 0.4, fontFamily: "Manrope", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  {provider.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: compact ? "20px 20px 20px" : "24px 24px 24px" }}>
          {/* Name + rating */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <h3
              style={{
                fontFamily: "Noto Serif, serif",
                fontSize: compact ? 17 : 19,
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.3,
              }}
            >
              {provider.name}
            </h3>
            {provider.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <Star size={12} fill="var(--gold)" color="var(--gold)" />
                <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600, fontFamily: "Manrope" }}>
                  {provider.rating}
                </span>
              </div>
            )}
          </div>

          {/* Tagline */}
          {!compact && (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
              {provider.tagline}
            </p>
          )}

          {/* Destinations */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <MapPin size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Manrope" }}>
              {provider.destinations.slice(0, 3).join(" · ")}
              {provider.destinations.length > 3 && " +more"}
            </span>
          </div>

          {/* Capacity */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <Users size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "Manrope" }}>
              Up to {provider.capacity} guests
              {provider.category === "villa" && provider.bedrooms && ` · ${provider.bedrooms} bedrooms`}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {provider.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="label-caps"
                style={{
                  padding: "3px 8px",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  fontSize: 10,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer: Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "Manrope", display: "block", marginBottom: 2 }}>From</span>
              <span style={{ fontSize: 18, fontFamily: "Noto Serif", color: "var(--gold)", fontWeight: 400 }}>
                {formatCurrency(provider.priceFrom)}
              </span>
            </div>
            <span className="btn btn-ghost btn-sm">Request</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
