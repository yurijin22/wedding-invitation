"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { weddingData } from "@/lib/wedding-data";

// Instrument Serif — scaleX(0.92) 공통 적용
const IS: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  display: "inline-block",
  transform: "scaleX(0.92)",
  transformOrigin: "left center",
};

export default function Outro() {
  const { groom, bride } = weddingData;
  const [outroPhoto, setOutroPhoto] = useState("/gallery/photo-1.jpg");

  useEffect(() => {
    fetch("/api/special").then(r => r.json()).then((d: Record<string,string>) => {
      if (d["outro"]) setOutroPhoto(d["outro"]);
    }).catch(() => {});
  }, []);

  return (
    <section style={{ position: "relative", height: 488, overflow: "hidden" }}>
      {/* 배경 */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src="/outro-bg.png" alt="" fill style={{ objectFit: "cover" }} sizes="390px" />
      </div>

      {/* " Save the Date " — Instrument Serif + Italianno 혼합 */}
      <p style={{
        position: "absolute", top: 84, left: 16, right: 16,
        textAlign: "center", lineHeight: "20px", letterSpacing: "0.01em",
        color: "#000", zIndex: 10, margin: 0,
      }}>
        <span style={{ ...IS, fontSize: 24 }}>&ldquo; Save the </span>
        <span style={{ fontFamily: "var(--font-italianno)", fontSize: 30 }}>Date</span>
        <span style={{ ...IS, fontSize: 24 }}> &rdquo;</span>
      </p>

      {/* 커플 사진 */}
      <div style={{
        position: "absolute", left: 116, top: 162,
        width: 155, height: 155, overflow: "hidden", backgroundColor: "#E5E5E5",
        border: "6px solid rgba(255,255,255,0.9)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)", zIndex: 10,
      }}>
        <Image src={outroPhoto} alt="couple" fill style={{ objectFit: "cover" }} sizes="155px"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      {/* 정보 테이블 */}
      <div style={{
        position: "absolute", bottom: 49, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", zIndex: 10,
      }}>
        {[
          { label: "Broom&Bride", value: `${groom.englishName}\n${bride.englishName}` },
          { label: "Date", value: "2026.09.20\nSun. 12:10" },
          { label: "Location", value: "RAMADA Seoul Simdorim\n5F Saint Grace Hall" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 7, width: 100 }}>
            <p style={{ ...IS, fontSize: 14, color: "#141414", textAlign: "center", lineHeight: "20px", margin: 0 }}>
              {label}
            </p>
            <p style={{ ...IS, fontSize: 12, color: "#141414", textAlign: "center", lineHeight: "16px", margin: 0, letterSpacing: "0.02em", whiteSpace: "pre-line" }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
