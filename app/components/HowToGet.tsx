"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

type TabKey = "car" | "subway" | "walk";

const TABS: { key: TabKey; label: string; active: string; inactive: string }[] = [
  { key: "car",    label: "자차",   active: "/howtoget-icon-car-active.png",     inactive: "/howtoget-icon-car-inactive.png" },
  { key: "subway", label: "대중교통", active: "/howtoget-icon-public-active.png",  inactive: "/howtoget-icon-public-inactive.png" },
  { key: "walk",   label: "도보",   active: "/howtoget-icon-walking-active.png",  inactive: "/howtoget-icon-walking-inactive.png" },
];

export default function HowToGet() {
  const [active, setActive] = useState<TabKey>("car");
  const { directions } = weddingData;

  return (
    <section style={{ backgroundColor: "#E8F4FF", paddingLeft: 24, paddingRight: 24, paddingTop: 60, paddingBottom: 60 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", flexDirection: "column", gap: 28 }}
      >
        {/* 탭 컨테이너 */}
        <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 4, display: "flex", gap: 4 }}>
          {TABS.map(tab => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                style={{
                  flex: 1, height: 52,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  borderRadius: 12, border: "none", cursor: "pointer",
                  backgroundColor: isActive ? "#5F9DDF" : "#fff",
                  color: isActive ? "#fff" : "#361D17",
                  fontSize: 14, fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                <img
                  src={isActive ? tab.active : tab.inactive}
                  alt={tab.label}
                  width={20} height={20}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 내용 */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", margin: 0, padding: "0 0 0 12px" }}
          >
            {directions[active].map((line, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#A0CEFF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <p style={{ fontSize: 12.5, fontWeight: 300, color: "#4D4740", lineHeight: "170%", margin: 0 }}>
                  {line}
                </p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
