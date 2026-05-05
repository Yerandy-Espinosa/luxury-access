"use client";
import { useState } from "react";
import { Search, Waves, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/lib/mock-data";
import { useLanguage } from "@/contexts/LanguageContext";

const villas = providers.filter(p => p.category === "villa");
const allDestinations = [...new Set(villas.flatMap(v => v.destinations))].sort();

export default function VillasPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [dest, setDest] = useState("all");
  const [beachfrontOnly, setBeachfrontOnly] = useState(false);

  const filtered = villas.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchDest = dest === "all" || v.destinations.includes(dest);
    const matchBeach = !beachfrontOnly || v.beachfront;
    return matchSearch && matchDest && matchBeach;
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="container-luxury">
          <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>{t("villas.label")}</p>
          <h1 className="headline-xl" style={{ fontFamily: "Noto Serif", marginBottom: 16, maxWidth: 600 }}>
            {t("villas.title")}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, lineHeight: 1.7 }}>
            {t("villas.desc")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="container-luxury" style={{ padding: "20px 0", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input-box"
              placeholder={t("villas.search")}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 38 }}
            />
          </div>
          <select
            className="input-box"
            value={dest}
            onChange={e => setDest(e.target.value)}
            style={{ flex: "1 1 200px", maxWidth: 220 }}
          >
            <option value="all">{t("villas.allDestinations")}</option>
            {allDestinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <label
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--text-secondary)", fontSize: 13, fontFamily: "Manrope", whiteSpace: "nowrap" }}
          >
            <input
              type="checkbox"
              checked={beachfrontOnly}
              onChange={e => setBeachfrontOnly(e.target.checked)}
              style={{ accentColor: "var(--gold)", width: 16, height: 16 }}
            />
            <Waves size={13} /> {t("villas.beachfront")}
          </label>
          <div className="label-caps" style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            {filtered.length} {filtered.length === 1 ? t("villas.count") : t("villas.countPlural")}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 0" }}>
        <div className="container-luxury">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>{t("villas.noMatch")}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 28 }}>
              {filtered.map(p => <ProviderCard key={p.id} provider={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
