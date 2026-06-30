"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

type TabKey = "car" | "subway" | "bus";

interface TabDef { key: TabKey; label: string; active?: string; inactive?: string; bus?: boolean }

const TABS: TabDef[] = [
  { key: "car",    label: "자차",   active: "/howtoget-icon-car-active.png",     inactive: "/howtoget-icon-car-inactive.png" },
  { key: "subway", label: "지하철", active: "/howtoget-icon-public-active.png",  inactive: "/howtoget-icon-public-inactive.png" },
  { key: "bus",    label: "버스",   bus: true },
];

// 버스 아이콘 (PNG가 없어 인라인 SVG — fg=아이콘색, bg=탭 배경색으로 창문/디테일 컷아웃)
function BusIcon({ fg, bg }: { fg: string; bg: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" style={{ flexShrink: 0 }} aria-hidden>
      <rect x="4" y="3.5" width="16" height="13" rx="2.5" fill={fg} />
      <rect x="6" y="6.4" width="12" height="3.4" rx="0.8" fill={bg} />
      <rect x="4.8" y="12.1" width="14.4" height="1" rx="0.5" fill={bg} opacity={0.5} />
      <circle cx="8" cy="17.4" r="1.7" fill={fg} />
      <circle cx="16" cy="17.4" r="1.7" fill={fg} />
    </svg>
  );
}

export default function HowToGet() {
  const [active, setActive] = useState<TabKey>("car");
  const { directions } = weddingData;

  return (
    <section style={{ backgroundColor: "#F7F3EA", paddingLeft: 24, paddingRight: 24, paddingTop: 90, paddingBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
                  backgroundColor: isActive ? "#2F1E11" : "#fff",
                  color: isActive ? "#fff" : "#361D17",
                  fontSize: 14, fontWeight: isActive ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                {tab.bus ? (
                  <BusIcon fg={isActive ? "#fff" : "#361D17"} bg={isActive ? "#2F1E11" : "#fff"} />
                ) : (
                  <img
                    src={isActive ? tab.active : tab.inactive}
                    alt={tab.label}
                    width={20} height={20}
                    style={{ objectFit: "contain", flexShrink: 0 }}
                  />
                )}
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
            style={{ display: "flex", flexDirection: "column", gap: 20, listStyle: "none", margin: 0, padding: "0 0 0 12px" }}
          >
            {directions[active].map((line, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#2F1E11", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <p style={{ fontSize: 14.5, fontWeight: 300, color: "#4D4740", lineHeight: "170%", margin: 0, wordBreak: "keep-all" }}>
                  {line}
                </p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* 탑승 가능 버스 — 버스 탭에서만 단계 안내 아래 표시 */}
        {active === "bus" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, backgroundColor: "rgba(255,255,255,0.65)", borderRadius: 12, padding: "16px 18px" }}>
            <p style={{ fontSize: 12.5, fontWeight: 600, color: "#4D4740", margin: 0, letterSpacing: "0.02em" }}>탑승 가능 버스</p>
            {directions.busRoutes.map(r => (
              <div key={r.type} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", backgroundColor: r.color, borderRadius: 6, padding: "2px 8px", flexShrink: 0, whiteSpace: "nowrap" }}>
                  {r.type}
                </span>
                <p style={{ fontSize: 13.5, fontWeight: 300, color: "#4D4740", lineHeight: "160%", margin: 0, wordBreak: "keep-all" }}>
                  {r.routes}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 주차 안내 — 자차 탭에서만 별도 표시 */}
        {active === "car" && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", backgroundColor: "rgba(255,255,255,0.65)", borderRadius: 12, padding: "14px 16px" }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: "#2F1E11", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              P
            </span>
            <p style={{ fontSize: 13.5, fontWeight: 300, color: "#4D4740", lineHeight: "165%", margin: 0, wordBreak: "keep-all" }}>
              {directions.parkingNote}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
