"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function Intro() {
  const { groom, bride, wedding, message } = weddingData;

  return (
    <section
      style={{
        backgroundColor: "#EDEAE3",
        backgroundImage: "url('/paper_texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        padding: "70px 30px 80px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 2 }}
      >
        {/* 헤더 */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, letterSpacing: "0.04em", color: "#6F665C", margin: 0 }}>
          WE INVITE YOU TO
        </p>
        <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, letterSpacing: "-0.01em", color: "#1D1000", margin: "6px 0 22px" }}>
          Our Wedding Day
        </p>

        {/* 액자 (프레임+사진, 크롭) — public/frameC.png */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/frameC.png" alt="" style={{ width: 240, height: "auto", display: "block", marginBottom: 30 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />

        {/* 장소 — 0920 위로 */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "0.05em", color: "#1D1000", margin: 0 }}>
          RAMADA SEOUL
        </p>
        <p style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif", fontSize: 12.5, lineHeight: "20px", letterSpacing: "0.01em", color: "#8B8178", margin: "8px 0 40px" }}>
          {wedding.venue.name}<br />{wedding.venue.addressDetail}
        </p>

        {/* 09 / 20 (Romans Story) */}
        <div id="intro-0920" style={{ lineHeight: 0.96, marginBottom: 52 }}>
          <div style={{ fontFamily: '"Romans Story", var(--font-serif)', fontSize: 26, color: "#1D1000", WebkitTextStroke: "0.5px #1D1000" }}>09</div>
          <div style={{ fontFamily: '"Romans Story", var(--font-serif)', fontSize: 26, color: "#1D1000", WebkitTextStroke: "0.5px #1D1000" }}>20</div>
        </div>

        {/* 일시 */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "0.05em", color: "#4D4740", margin: "0 0 50px" }}>
          SUNDAY, 12:10 PM
        </p>

        {/* 두번째 섹션 문구 (마음이~) */}
        <p style={{ fontSize: 14.5, fontWeight: 300, lineHeight: "26px", color: "#4D4740", whiteSpace: "pre-line", margin: 0 }}>
          {message}
        </p>

        {/* 혼주 + 신랑·신부 */}
        <div style={{ display: "flex", width: "100%", maxWidth: 320, marginTop: 56, marginBottom: 40 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 400, lineHeight: "18px", color: "#9A8E84", margin: 0 }}>
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
            <p style={{ fontSize: 19, fontWeight: 500, lineHeight: "26px", color: "#1D1000", margin: 0 }}>
              {groom.name}
            </p>
          </div>
          <div style={{ width: 1, backgroundColor: "rgba(29,16,0,0.15)", alignSelf: "stretch", flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 400, lineHeight: "18px", color: "#9A8E84", margin: 0 }}>
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
            <p style={{ fontSize: 19, fontWeight: 500, lineHeight: "26px", color: "#1D1000", margin: 0 }}>
              {bride.name}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
