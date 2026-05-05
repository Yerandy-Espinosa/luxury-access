"use client";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "Editorial Light" : "Luxury Dark"}`}
      style={{
        background: "var(--bg-surface-high)",
        border: "1px solid var(--gold-border)",
        color: "var(--gold)",
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.25s ease",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--gold-muted)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-surface-high)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold-border)";
      }}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
