"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.chefs"), href: "/chefs" },
    { label: t("nav.villas"), href: "/villas" },
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled ? "var(--bg-surface)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 64px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
        className="responsive-nav"
      >
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <Image
            src="/logo2.png"
            alt="Luxury Access"
            width={180}
            height={48}
            className="logo-dynamic"
            style={{ objectFit: "contain", height: 42, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="hide-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-caps"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="hide-mobile">
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Globe size={14} color="var(--text-muted)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: 11,
                fontFamily: "Manrope",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 600,
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="it">IT</option>
            </select>
          </div>
          <ThemeToggle />
          <Link href="/login" className="label-caps" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            {t("nav.login")}
          </Link>
          <Link href="/request" className="btn btn-primary" style={{ textDecoration: "none" }}>
            {t("nav.startRequest")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hide-desktop">
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Globe size={14} color="var(--text-muted)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: 11, outline: "none" }}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="it">IT</option>
            </select>
          </div>
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", padding: 8 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
          className="hide-desktop"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-caps"
              onClick={() => setMenuOpen(false)}
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="label-caps" onClick={() => setMenuOpen(false)} style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            {t("nav.login")}
          </Link>
          <Link href="/request" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", textAlign: "center" }}>
            {t("nav.startRequest")}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .responsive-nav { padding: 0 24px !important; }
        }
      `}</style>
    </header>
  );
}
