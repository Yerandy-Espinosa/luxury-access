"use client";
import { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/lib/mock-data";

const chefs = providers.filter(p => p.category === "chef");
const allDestinations = [...new Set(chefs.flatMap(c => c.destinations))].sort();

export default function ChefsPage() {
  const [search, setSearch] = useState("");
  const [dest, setDest] = useState("all");

  const filtered = chefs.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      c.cuisineStyle?.toLowerCase().includes(search.toLowerCase());
    const matchDest = dest === "all" || c.destinations.includes(dest);
    return matchSearch && matchDest;
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 64,
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-surface)",
        }}
      >
        <div className="container-luxury">
          <p className="label-caps" style={{ color: "var(--gold)", marginBottom: 16 }}>Private Chefs</p>
          <h1 className="headline-xl" style={{ fontFamily: "Noto Serif", marginBottom: 16, maxWidth: 600 }}>
            World-Class Culinary Talent
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, lineHeight: 1.7 }}>
            Michelin-trained and award-winning private chefs available for bespoke dining experiences at your villa, estate, or yacht — anywhere in the world.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div
          className="container-luxury"
          style={{ padding: "20px 64px", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
        >
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input-box"
              placeholder="Search by name, cuisine, tag..."
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
            <option value="all">All Destinations</option>
            {allDestinations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <div className="label-caps" style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            {filtered.length} chef{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px 0" }}>
        <div className="container-luxury">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>No chefs match your filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
              {filtered.map(p => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
