"use client";
import Image from "next/image";
import Link from "next/link";
// Removed unused icons

const footerLinks = {
  Services: [
    { label: "Private Chefs", href: "/chefs" },
    { label: "Luxury Villas", href: "/villas" },
    { label: "Yachts (Coming Soon)", href: "#" },
  ],
  Platform: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Start a Request", href: "/request" },
    { label: "Provider Onboarding", href: "/onboarding" },
  ],
  Info: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
      <div className="container-luxury" style={{ paddingTop: 64, paddingBottom: 64 }}>
        {/* Top Row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Image
              src="/logo2.png"
              alt="Luxury Access"
              width={160}
              height={44}
              style={{ objectFit: "contain", height: 40, width: "auto", marginBottom: 16 }}
            />
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Curated stays. Private dining. Seamless access.
              <br />
              Connecting discerning clients with the world&apos;s finest private chefs and luxury properties.
            </p>
            {/* Anti-leakage note */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                background: "var(--gold-muted)",
                border: "1px solid var(--gold-border)",
                fontSize: 11,
                color: "var(--gold)",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              🔒 Contact protected until payment
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 20 }}>{section}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        fontSize: 14,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 32, width: "100%" }} />

        {/* Bottom Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
            © {new Date().getFullYear()} Luxury Access. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: "Manrope", letterSpacing: "0.05em" }}>
            A curated, invite-only marketplace
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container-luxury > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
