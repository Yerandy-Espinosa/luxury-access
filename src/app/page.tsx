"use client";
import Link from "next/link";
import Image from "next/image";
import { Lock, ArrowRight, Shield, Zap, Globe, ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/lib/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const howItWorks = [
    { step: "01", title: t("home.steps.1.title"), desc: t("home.steps.1.desc") },
    { step: "02", title: t("home.steps.2.title"), desc: t("home.steps.2.desc") },
    { step: "03", title: t("home.steps.3.title"), desc: t("home.steps.3.desc") },
    { step: "04", title: t("home.steps.4.title"), desc: t("home.steps.4.desc") },
    { step: "05", title: t("home.steps.5.title"), desc: t("home.steps.5.desc") },
  ];

  const trustPoints = [
    { icon: <Shield size={24} />, title: "Curated Providers", desc: "Every provider is personally vetted, invited, and approved by our team. No public sign-ups." },
    { icon: <Lock size={24} />, title: "Anti-Leakage Protection", desc: "Phone, email, WhatsApp, and social handles remain hidden until payment is confirmed." },
    { icon: <Zap size={24} />, title: "Fast Response", desc: "Most providers respond within 2–6 hours. Your experience begins before you even arrive." },
    { icon: <Globe size={24} />, title: "Global Destinations", desc: "Bahamas, Maldives, Mediterranean, Caribbean, Dubai — where you are, we are." },
  ];

  const categories = [
    {
      id: "chef",
      label: "Private Chefs",
      desc: "Award-winning culinary talent brought directly to your table — from Michelin-trained masters to regional specialists.",
      href: "/chefs",
      image: "/service_chefs.png",
      detail: "Mediterranean · French · Japanese · Latin",
    },
    {
      id: "villa",
      label: "Luxury Villas",
      desc: "Architectural masterpieces and hidden retreats curated for absolute privacy and world-class comfort.",
      href: "/villas",
      image: "/service_villas.png",
      detail: "Beachfront · Full Staff · Ultra-Luxury",
    },
    {
      id: "soon",
      label: "Yachts",
      desc: "Private yacht charters and maritime experiences. Coming soon to the platform.",
      href: "#",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
      detail: t("home.comingSoon"),
      soon: true,
    },
  ];

  const featured = providers.slice(0, 3);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--gold-muted) 1px, transparent 1px),
              linear-gradient(90deg, var(--gold-muted) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--bg) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,162,101,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container-luxury" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "80px 64px" }}>
          <div
            className="label-caps animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--gold)",
              marginBottom: 32,
              padding: "8px 20px",
              border: "1px solid var(--gold-border)",
              background: "var(--gold-muted)",
            }}
          >
            <Lock size={12} /> {t("home.inviteOnly")}
          </div>

          <h1
            className="display animate-slide-up"
            style={{
              fontFamily: "Noto Serif, serif",
              color: "var(--text-primary)",
              maxWidth: 900,
              margin: "0 auto 24px",
              animationDelay: "0.1s",
              opacity: 0,
            }}
          >
            {t("home.heroTitle1")}{" "}
            <span className="text-gold-gradient">{t("home.heroTitle2")}</span>
            <br />{t("home.heroTitle3")}
          </h1>

          <p
            className="animate-slide-up"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "var(--text-secondary)",
              maxWidth: 640,
              margin: "0 auto 48px",
              lineHeight: 1.7,
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {t("home.heroSubtitle")}
          </p>

          <div
            className="animate-slide-up"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <Link href="/request" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
              {t("nav.startRequest")} <ArrowRight size={16} />
            </Link>
            <Link href="/chefs" className="btn btn-ghost btn-lg" style={{ textDecoration: "none" }}>
              {t("home.exploreProviders")}
            </Link>
          </div>

          <div
            style={{
              marginTop: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "var(--text-muted)",
              fontSize: 11,
              fontFamily: "Manrope",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>{t("home.discover")}</span>
            <ChevronDown size={16} style={{ animation: "slideUp 1.5s ease-in-out infinite alternate" }} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid var(--border)",
            background: "var(--bg-surface)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="container-luxury"
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 64px",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            {[
              { value: "500+", label: t("home.stats.providers") },
              { value: "45", label: t("home.stats.destinations") },
              { value: "< 2hr", label: t("home.stats.response") },
              { value: "100%", label: t("home.stats.protected") },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Noto Serif", fontSize: 22, color: "var(--gold)", fontWeight: 300 }}>
                  {stat.value}
                </div>
                <div className="label-caps" style={{ color: "var(--text-muted)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section style={{ padding: "128px 0" }}>
        <div className="container-luxury">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>{t("home.bespoke")}</p>
            <h2 className="headline-xl" style={{ fontFamily: "Noto Serif", marginBottom: 16 }}>
              {t("home.curated")}
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto", fontSize: 16 }}>
              {t("home.marketplace")}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    padding: 0,
                    cursor: cat.soon ? "default" : "pointer",
                    opacity: cat.soon ? 0.6 : 1,
                    transition: "all 0.3s ease",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={e => {
                    if (!cat.soon) {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: 240 }}>
                    <Image src={cat.image} alt={cat.label} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 40, flex: 1 }}>
                    <div className="label-caps" style={{ color: "var(--gold)", marginBottom: 12 }}>{cat.detail}</div>
                    <h3 style={{ fontFamily: "Noto Serif", fontSize: 24, marginBottom: 16, color: "var(--text-primary)" }}>
                      {cat.label}
                    </h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                      {cat.desc}
                    </p>
                    {!cat.soon && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold)", fontSize: 13, fontWeight: 600 }}>
                        <span>{t("home.explore")} {cat.label}</span>
                        <ArrowRight size={14} />
                      </div>
                    )}
                    {cat.soon && (
                      <span className="badge badge-muted">{t("home.comingSoon")}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "128px 0", background: "var(--bg-surface)" }}>
        <div className="container-luxury">
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>{t("home.process")}</p>
            <h2 className="headline-xl" style={{ fontFamily: "Noto Serif", marginBottom: 16 }}>
              {t("home.howItWorksTitle")}
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto" }}>
              {t("home.howItWorksSub")}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}>
            {howItWorks.map((item, i) => (
              <div
                key={item.step}
                style={{
                  padding: "40px 32px",
                  borderRight: i < howItWorks.length - 1 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "Noto Serif",
                    fontSize: 56,
                    fontWeight: 300,
                    color: "var(--gold)",
                    fontStyle: "italic",
                    lineHeight: 1,
                    marginBottom: 20,
                    opacity: 0.6,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontFamily: "Noto Serif",
                    fontSize: 18,
                    fontWeight: 400,
                    marginBottom: 12,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}>
                  {item.desc}
                </p>
                {i === howItWorks.length - 1 && (
                  <div className="contact-locked" style={{ marginTop: 16, fontSize: 11 }}>
                    <Lock size={11} /> {t("home.contactLocked")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ────────────────────────────────── */}
      <section style={{ padding: "128px 0" }}>
        <div className="container-luxury">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>{t("home.featured")}</p>
              <h2 className="headline-xl" style={{ fontFamily: "Noto Serif" }}>
                {t("home.meetNetwork")}
              </h2>
            </div>
            <Link href="/chefs" className="btn btn-ghost" style={{ textDecoration: "none" }}>
              {t("home.viewAll")} <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {featured.map(p => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              padding: "20px 28px",
              background: "var(--gold-muted)",
              border: "1px solid var(--gold-border)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Lock size={20} color="var(--gold)" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                {t("home.protection.title")}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {t("home.protection.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ─────────────────────────────────────────────── */}
      <section style={{ padding: "128px 0", background: "var(--bg-surface)" }}>
        <div className="container-luxury">
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>{t("home.trust")}</p>
            <h2 className="headline-xl" style={{ fontFamily: "Noto Serif" }}>
              {t("home.builtFor")}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
            {trustPoints.map((point) => (
              <div key={point.title} style={{ padding: "40px 32px" }}>
                <div style={{ color: "var(--gold)", marginBottom: 20 }}>{point.icon}</div>
                <h3 style={{ fontFamily: "Noto Serif", fontSize: 20, marginBottom: 12, color: "var(--text-primary)" }}>
                  {point.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 0",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, var(--gold-muted) 0%, transparent 70%)",
          }}
        />
        <div className="container-luxury" style={{ position: "relative", zIndex: 1 }}>
          <Image
            src="/logo1.png"
            alt="Luxury Access mark"
            width={72}
            height={72}
            className="logo-dynamic"
            style={{ objectFit: "contain", marginBottom: 32, opacity: 0.7 }}
          />
          <h2
            className="headline-xl"
            style={{ fontFamily: "Noto Serif", marginBottom: 20 }}
          >
            {t("home.ready")}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            {t("home.submit")}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/request" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
              {t("nav.startRequest")} <ArrowRight size={16} />
            </Link>
            <Link href="/#how-it-works" className="btn btn-ghost btn-lg" style={{ textDecoration: "none" }}>
              {t("nav.howItWorks")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
