"use client";

import { useState, useEffect } from "react";
import { X, Save, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Provider, ProviderCategory, ProviderStatus } from "@/lib/types";

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: Provider) => void;
  provider?: Provider | null;
  category: ProviderCategory;
}

export default function ProviderModal({ isOpen, onClose, onSave, provider, category }: ProviderModalProps) {
  const [formData, setFormData] = useState<Partial<Provider>>({
    name: "",
    tagline: "",
    description: "",
    destinations: [],
    tags: [],
    capacity: 0,
    priceFrom: 0,
    priceCurrency: "USD",
    availability: "available",
    status: "approved",
    imageUrl: "",
    galleryImages: [],
    category: category,
  });

  useEffect(() => {
    if (provider) {
      setFormData(provider);
    } else {
      setFormData({
        name: "",
        tagline: "",
        description: "",
        destinations: [],
        tags: [],
        capacity: 0,
        priceFrom: 0,
        priceCurrency: "USD",
        availability: "available",
        status: "approved",
        imageUrl: "",
        galleryImages: [],
        category: category,
      });
    }
  }, [provider, category]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleArrayChange = (name: "destinations" | "tags", value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value.split(",").map(s => s.trim()).filter(s => s !== ""),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: provider?.id || `new-${Date.now()}`,
      category,
    } as Provider);
  };

  return (
    <div 
      style={{ 
        position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", 
        justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" 
      }} 
      className="animate-fade-in"
    >
      <div 
        style={{ 
          background: "var(--bg-surface)", border: "1px solid var(--gold-border)", 
          width: "100%", maxWidth: 800, maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow)" 
        }} 
        className="animate-scale-in"
      >
        <div style={{ position: "sticky", top: 0, background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
          <h2 style={{ fontFamily: "Noto Serif, serif", fontSize: 24, color: "var(--text-primary)" }}>
            {provider ? "Edit" : "Add New"} {category === "chef" ? "Chef" : "Villa"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }} className="hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 32 }} className="space-y-6">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hide-mobile-grid">
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-box"
                placeholder="e.g. Chef Mateo Laurent"
              />
            </div>
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Tagline</label>
              <input
                required
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="input-box"
                placeholder="Short luxury description"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Description</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-box"
              style={{ minHeight: 120 }}
              placeholder="Full biography or property details"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hide-mobile-grid">
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Destinations (comma separated)</label>
              <input
                required
                value={formData.destinations?.join(", ")}
                onChange={e => handleArrayChange("destinations", e.target.value)}
                className="input-box"
                placeholder="Bahamas, Miami, Dubai"
              />
            </div>
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Tags (comma separated)</label>
              <input
                required
                value={formData.tags?.join(", ")}
                onChange={e => handleArrayChange("tags", e.target.value)}
                className="input-box"
                placeholder="Michelin, Seafood, Beachfront"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="hide-mobile-grid">
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Starting Price</label>
              <input
                required
                type="number"
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Capacity</label>
              <input
                required
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="input-box"
              />
            </div>
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-box"
              >
                <option value="approved">Approved</option>
                <option value="under_review">Under Review</option>
                <option value="invited">Invited</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Main Image URL</label>
            <div style={{ display: "flex", gap: 16 }}>
              <input
                required
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-box"
                style={{ flex: 1 }}
                placeholder="https://images.unsplash.com/..."
              />
              {formData.imageUrl && (
                <div style={{ width: 48, height: 48, border: "1px solid var(--border)", overflow: "hidden", background: "var(--bg-surface)", flexShrink: 0 }}>
                  <img src={formData.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>

          {category === "chef" ? (
            <div className="space-y-2">
              <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Cuisine Style</label>
              <input
                name="cuisineStyle"
                value={formData.cuisineStyle || ""}
                onChange={handleChange}
                className="input-box"
                placeholder="e.g. French Mediterranean"
              />
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="hide-mobile-grid">
              <div className="space-y-2">
                <label className="label-caps" style={{ color: "var(--text-muted)", fontSize: 9 }}>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms || 0}
                  onChange={handleChange}
                  className="input-box"
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 32 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input
                    type="checkbox"
                    checked={formData.beachfront || false}
                    onChange={e => setFormData(prev => ({ ...prev, beachfront: e.target.checked }))}
                    style={{ width: 16, height: 16, accentColor: "var(--gold)" }}
                  />
                  Beachfront
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input
                    type="checkbox"
                    checked={formData.staffIncluded || false}
                    onChange={e => setFormData(prev => ({ ...prev, staffIncluded: e.target.checked }))}
                    style={{ width: 16, height: 16, accentColor: "var(--gold)" }}
                  />
                  Staff Included
                </label>
              </div>
            </div>
          )}

          <div style={{ paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 16 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
