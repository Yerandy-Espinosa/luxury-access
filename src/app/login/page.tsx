"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Shield, ChefHat, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const { t } = useLanguage();

  const roles = [
    {
      id: "client",
      title: t("login.clientTitle"),
      description: t("login.clientDesc"),
      icon: User,
      href: "/",
      color: "var(--text-primary)"
    },
    {
      id: "provider",
      title: t("login.providerTitle"),
      description: t("login.providerDesc"),
      icon: ChefHat,
      href: "/provider-dashboard",
      color: "var(--gold)"
    },
    {
      id: "admin",
      title: t("login.adminTitle"),
      description: t("login.adminDesc"),
      icon: Shield,
      href: "/admin",
      color: "var(--text-secondary)"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-main)" }}>
      {/* Header */}
      <header style={{ padding: "32px 64px", display: "flex", justifyContent: "center" }}>
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="Luxury Access"
            width={180}
            height={48}
            className="logo-dynamic"
            style={{ objectFit: "contain", height: 42, width: "auto" }}
          />
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 800 }}
        >
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "Noto Serif, serif",
                fontSize: 42,
                fontWeight: 300,
                color: "var(--text-primary)",
                marginBottom: 16
              }}
            >
              {t("login.welcome")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: "var(--text-secondary)", fontSize: 16, fontFamily: "Manrope", maxWidth: 400, margin: "0 auto" }}
            >
              {t("login.selectPortal")}
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={role.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <motion.div
                      whileHover={{ y: -6, borderColor: "var(--gold)" }}
                      style={{
                        padding: 32,
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <div style={{ marginBottom: 24, padding: 12, background: "var(--bg-main)", border: "1px solid var(--border)", display: "inline-flex" }}>
                        <Icon size={24} color={role.color} />
                      </div>
                      <h3 style={{ fontFamily: "Noto Serif, serif", fontSize: 20, color: "var(--text-primary)", marginBottom: 8 }}>
                        {role.title}
                      </h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6, marginBottom: 32 }}>
                        {role.description}
                      </p>
                      
                      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, color: "var(--gold)", fontSize: 13, fontWeight: 600, fontFamily: "Manrope", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {t("login.accessPortal")} <ArrowRight size={14} />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
