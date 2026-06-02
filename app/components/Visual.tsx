"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// 피그마 폰트 세그먼트
// "We Decide on " → Instrument Serif Regular 24px
// "Together"      → Italianno Regular 32px
// "from this "    → Instrument Serif Regular 24px
// "Weather "      → Italianno Regular 32px
// "to "           → Instrument Serif Regular 24px
// "Forever"       → Italianno Regular 32px
//
// 레이아웃 (685px 섹션, 상하 60px 패딩)
//   top 60  : 상단 텍스트 (h=36)
//   gap 24  : 텍스트 → 사진
//   top 120 : 사진 (310×435)
//   gap 34  : 사진 → 텍스트
//   top 589 : 하단 텍스트 (h=36)
//   bottom 60

const IS: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: 24,
  lineHeight: "36px",
  letterSpacing: "0.4px",
  color: "#FFFFFF",
  display: "inline-block",
  transform: "scaleX(0.92)",
  transformOrigin: "left center",
};

const IT: React.CSSProperties = {
  fontFamily: "var(--font-italianno)",
  fontSize: 32,
  lineHeight: "36px",
  letterSpacing: "0.4px",
  color: "#FFFFFF",
};

export default function Visual() {
  return (
    <section style={{ position: "relative", height: 685, overflow: "hidden" }}>
      {/* 배경 이미지 — 원본 밝기 그대로 */}
      <Image
        src="/visual-bg.png"
        alt=""
        fill
        priority
        style={{ objectFit: "cover" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* 상단 텍스트: top=60, left=41 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: 60,
          left: 41,
          margin: 0,
          zIndex: 10,
          lineHeight: "36px",
        }}
      >
        <span style={IS}>We Decide on </span>
        <span style={IT}>Together</span>
      </motion.p>

      {/* 메인 사진: top=120, left=40, 310×435 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          left: 24,
          top: 120,
          width: 342,
          height: 445,
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <Image
          src="/visual-photo.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          sizes="342px"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </motion.div>

      {/* 하단 텍스트: top=589, left=79 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: "absolute",
          top: 589,
          right: 24,
          margin: 0,
          zIndex: 10,
          lineHeight: "36px",
          textAlign: "right",
        }}
      >
        <span style={IS}>from this </span>
        <span style={IT}>Weather </span>
        <span style={IS}>to </span>
        <span style={IT}>Forever</span>
      </motion.p>
    </section>
  );
}
