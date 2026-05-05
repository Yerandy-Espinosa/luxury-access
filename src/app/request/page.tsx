"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChefHat, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const STEPS = ["Service", "Destination & Dates", "Details", "Notes", "Review"];

type Category = "chef" | "villa" | null;

interface FormData {
  category: Category;
  destination: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  // Chef
  meals: string[];
  cuisinePreference: string;
  dietaryRestrictions: string;
  occasion: string;
  // Villa
  bedrooms: number;
  beachfront: boolean;
  staffPreference: boolean;
  luxuryTier: string;
  // Common
  budget: string;
  notes: string;
}

const DESTINATIONS = ["Bahamas","Turks and Caicos","Maldives","Morocco","Chile","Miami","Dubai","Caribbean","Mediterranean","Singapore","Greece"];
const BUDGETS = [
  { value: "moderate", label: "Moderate — Up to $5,000" },
  { value: "premium", label: "Premium — $5,000 – $15,000" },
  { value: "ultra-luxury", label: "Ultra Luxury — $15,000 – $50,000" },
  { value: "no-limit", label: "No Limit — Best available" },
];

export default function RequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    category: null, destination: "", dateFrom: "", dateTo: "", guests: 2,
    meals: [], cuisinePreference: "", dietaryRestrictions: "", occasion: "",
    bedrooms: 2, beachfront: false, staffPreference: false, luxuryTier: "",
    budget: "", notes: "",
  });

  const update = (key: keyof FormData, value: unknown) => setForm(f => ({ ...f, [key]: value }));
  const toggleMeal = (m: string) => {
    setForm(f => ({ ...f, meals: f.meals.includes(m) ? f.meals.filter(x => x !== m) : [...f.meals, m] }));
  };

  const canNext = () => {
    if (step === 0) return !!form.category;
    if (step === 1) return form.destination && form.dateFrom && form.dateTo;
    if (step === 2) return form.guests >= 1 && (form.category === "chef" ? form.meals.length > 0 : form.bedrooms >= 1);
    if (step === 3) return form.budget !== "";
    return true;
  };

  const handleSubmit = () => {
    router.push("/my-requests/req-001");
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        {/* Progress bar */}
        <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
          <div className="container-luxury" style={{ padding: "24px 64px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div className={`step-dot ${i < step ? "step-dot-done" : i === step ? "step-dot-active" : "step-dot-inactive"}`}>
                      {i < step ? <Check size={12} /> : i + 1}
                    </div>
                    <span className="label-caps" style={{ fontSize: 9, color: i === step ? "var(--gold)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-line ${i < step ? "step-line-done" : ""}`} style={{ margin: "0 8px", marginBottom: 20 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-luxury" style={{ padding: "64px", maxWidth: 860, margin: "0 auto" }}>
          {/* Step 0: Category */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h1 style={{ fontFamily: "Noto Serif", fontSize: 36, marginBottom: 8 }}>Start Your Request</h1>
              <p style={{ color: "var(--text-secondary)", marginBottom: 48 }}>What kind of experience are you looking for?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { id: "chef" as const, icon: <ChefHat size={32} />, label: "Private Chef", desc: "Bespoke dining experiences at your location" },
                  { id: "villa" as const, icon: <Home size={32} />, label: "Luxury Villa", desc: "Exclusive private estates and retreats" },
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => update("category", opt.id)}
                    style={{
                      padding: 40, cursor: "pointer", border: `1px solid ${form.category === opt.id ? "var(--gold)" : "var(--border)"}`,
                      background: form.category === opt.id ? "var(--gold-muted)" : "var(--bg-surface)",
                      transition: "all 0.25s ease", textAlign: "center",
                    }}
                  >
                    <div style={{ color: "var(--gold)", marginBottom: 16 }}>{opt.icon}</div>
                    <h3 style={{ fontFamily: "Noto Serif", fontSize: 22, marginBottom: 8 }}>{opt.label}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Destination & Dates */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 32, marginBottom: 8 }}>Destination & Dates</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 40 }}>Where and when is your experience?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Destination *</label>
                  <select className="input-box" value={form.destination} onChange={e => update("destination", e.target.value)}>
                    <option value="">Select destination</option>
                    {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Arrival Date *</label>
                    <input type="date" className="input-box" value={form.dateFrom} onChange={e => update("dateFrom", e.target.value)} />
                  </div>
                  <div>
                    <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Departure Date *</label>
                    <input type="date" className="input-box" value={form.dateTo} onChange={e => update("dateTo", e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 32, marginBottom: 8 }}>Service Details</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 40 }}>Help providers understand exactly what you need.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <div>
                  <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Number of Guests *</label>
                  <input type="number" className="input-box" min={1} max={50} value={form.guests} onChange={e => update("guests", +e.target.value)} style={{ maxWidth: 200 }} />
                </div>

                {form.category === "chef" && (
                  <>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Meals Needed *</label>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {["Breakfast","Lunch","Dinner","Brunch","Cocktail Reception"].map(m => (
                          <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" }}>
                            <input type="checkbox" checked={form.meals.includes(m)} onChange={() => toggleMeal(m)} style={{ accentColor: "var(--gold)" }} />
                            {m}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Cuisine Preference</label>
                      <input className="input-box" placeholder="e.g. Mediterranean, Japanese, Latin…" value={form.cuisinePreference} onChange={e => update("cuisinePreference", e.target.value)} />
                    </div>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Dietary Restrictions</label>
                      <input className="input-box" placeholder="e.g. Gluten-free, nut allergy, vegan…" value={form.dietaryRestrictions} onChange={e => update("dietaryRestrictions", e.target.value)} />
                    </div>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Occasion</label>
                      <input className="input-box" placeholder="e.g. Anniversary, birthday, business dinner…" value={form.occasion} onChange={e => update("occasion", e.target.value)} />
                    </div>
                  </>
                )}

                {form.category === "villa" && (
                  <>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Bedrooms Needed *</label>
                      <input type="number" className="input-box" min={1} max={20} value={form.bedrooms} onChange={e => update("bedrooms", +e.target.value)} style={{ maxWidth: 200 }} />
                    </div>
                    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" }}>
                        <input type="checkbox" checked={form.beachfront} onChange={e => update("beachfront", e.target.checked)} style={{ accentColor: "var(--gold)" }} />
                        Beachfront preferred
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "var(--text-secondary)" }}>
                        <input type="checkbox" checked={form.staffPreference} onChange={e => update("staffPreference", e.target.checked)} style={{ accentColor: "var(--gold)" }} />
                        Full staff preferred
                      </label>
                    </div>
                    <div>
                      <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Luxury Tier</label>
                      <select className="input-box" value={form.luxuryTier} onChange={e => update("luxuryTier", e.target.value)}>
                        <option value="">Any tier</option>
                        <option value="luxury">Luxury</option>
                        <option value="ultra-luxury">Ultra-Luxury</option>
                        <option value="ultra-premium">Ultra-Premium</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Budget & Notes */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 32, marginBottom: 8 }}>Budget & Notes</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 40 }}>Final details for your request.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <div>
                  <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Budget Range *</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {BUDGETS.map(b => (
                      <label key={b.value} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "14px 16px", border: `1px solid ${form.budget === b.value ? "var(--gold)" : "var(--border)"}`, background: form.budget === b.value ? "var(--gold-muted)" : "transparent" }}>
                        <input type="radio" name="budget" value={b.value} checked={form.budget === b.value} onChange={() => update("budget", b.value)} style={{ accentColor: "var(--gold)" }} />
                        <span style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope" }}>{b.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-caps" style={{ color: "var(--text-muted)", display: "block", marginBottom: 12 }}>Additional Notes</label>
                  <textarea className="input-box" rows={4} placeholder="Any special requests, vision, or context for providers…" value={form.notes} onChange={e => update("notes", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 style={{ fontFamily: "Noto Serif", fontSize: 32, marginBottom: 8 }}>Review Your Request</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 40 }}>Confirm everything looks right before submitting.</p>
              <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Service", value: form.category === "chef" ? "Private Chef" : "Luxury Villa" },
                  { label: "Destination", value: form.destination },
                  { label: "Dates", value: `${form.dateFrom} → ${form.dateTo}` },
                  { label: "Guests", value: `${form.guests} guests` },
                  ...(form.category === "chef" ? [
                    { label: "Meals", value: form.meals.join(", ") || "Not specified" },
                    { label: "Cuisine", value: form.cuisinePreference || "Any" },
                    { label: "Dietary", value: form.dietaryRestrictions || "None" },
                    { label: "Occasion", value: form.occasion || "Not specified" },
                  ] : [
                    { label: "Bedrooms", value: `${form.bedrooms}` },
                    { label: "Beachfront", value: form.beachfront ? "Preferred" : "Not required" },
                    { label: "Full Staff", value: form.staffPreference ? "Preferred" : "Not required" },
                  ]),
                  { label: "Budget", value: BUDGETS.find(b => b.value === form.budget)?.label ?? form.budget },
                  { label: "Notes", value: form.notes || "None" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 24, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 16 }}>
                    <span className="label-caps" style={{ color: "var(--text-muted)", fontSize: 10 }}>{row.label}</span>
                    <span style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "Manrope", textAlign: "right", maxWidth: "70%" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, padding: 20, background: "var(--gold-muted)", border: "1px solid var(--gold-border)", fontSize: 13, color: "var(--text-secondary)" }}>
                After submission, matching providers will be notified. You&apos;ll hear back within hours. No payment is taken at this stage.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            {step > 0 ? (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
                <ArrowLeft size={14} /> Back
              </button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)} style={{ opacity: canNext() ? 1 : 0.5 }}>
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Request <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
