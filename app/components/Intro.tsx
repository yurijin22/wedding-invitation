"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const ENVELOPE = "#1D1000"; // 봉투 브라운
const NOTCH = 46; // 0920을 감싸는 반원 노치 반지름
const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";

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
        paddingTop: "clamp(40px, 7dvh, 72px)",
      }}
    >
      {/* ── 크림 영역: 헤더 ~ 0920 ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 30px", position: "relative", zIndex: 1 }}
      >
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, letterSpacing: "0.04em", color: "#6F665C", margin: 0 }}>
          WE INVITE YOU TO
        </p>
        <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, letterSpacing: "-0.01em", color: "#1D1000", margin: "4px 0 10px" }}>
          Our Wedding Day
        </p>

        {/* 액자 (프레임+사진, 크롭) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/frameC.png" alt="" style={{ width: "clamp(180px, 32dvh, 240px)", height: "auto", display: "block", marginBottom: "clamp(12px, 2.2dvh, 22px)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />

        <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "0.05em", color: "#1D1000", margin: 0 }}>
          RAMADA SEOUL
        </p>
        <p style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif", fontSize: 12.5, lineHeight: "20px", letterSpacing: "0.01em", color: "#8B8178", margin: "6px 0 clamp(20px, 4dvh, 40px)" }}>
          {wedding.venue.name}<br />{wedding.venue.addressDetail}
        </p>

        {/* 09 / 20 — 아래 브라운 밴드의 노치가 이 숫자를 감쌈 */}
        <div id="intro-0920" style={{ lineHeight: 0.96, marginBottom: 0 }}>
          <div style={{ fontFamily: '"Romans Story", var(--font-serif)', fontSize: 26, color: "#1D1000", WebkitTextStroke: "0.5px #1D1000" }}>09</div>
          <div style={{ fontFamily: '"Romans Story", var(--font-serif)', fontSize: 26, color: "#1D1000", WebkitTextStroke: "0.5px #1D1000" }}>20</div>
        </div>
      </motion.div>

      {/* ── 브라운 봉투 밴드 (흐름 속 요소) ──
          0920 위로 겹쳐 상단 반원 노치가 숫자를 감쌈. 페이지와 함께 자연 스크롤 → 버벅임 없음. */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: -32,
          backgroundColor: ENVELOPE,
          WebkitMaskImage: `radial-gradient(${NOTCH}px at 50% 0px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
          maskImage: `radial-gradient(${NOTCH}px at 50% 0px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
          padding: "64px 30px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, letterSpacing: "0.05em", color: "#E9E3D7", margin: "0 0 26px" }}>
          SUNDAY, 12:10 PM
        </p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 12, lineHeight: "19px", letterSpacing: "0.02em", color: "rgba(255,255,255,0.82)", maxWidth: 300, margin: 0 }}>
          {QUOTE}
        </p>
      </div>

      {/* ── 크림 영역: 인사말 + 혼주 ── */}
      <div style={{ padding: "54px 30px 80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ fontSize: 14.5, fontWeight: 300, lineHeight: "26px", color: "#4D4740", whiteSpace: "pre-line", margin: 0 }}>
          {message}
        </p>

        <div style={{ display: "flex", width: "100%", maxWidth: 320, marginTop: 56 }}>
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
      </div>
    </section>
  );
}
