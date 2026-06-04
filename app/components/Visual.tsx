"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const IS: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: 28,
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
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* 배경 이미지 — Next.js Image로 WebP 자동 변환 + 최적화 */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/visual-bg.png"
          alt=""
          fill
          priority
          sizes="390px"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* 상단 텍스트 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ position: "relative", zIndex: 10, margin: 0, paddingTop: 60, paddingLeft: 28, lineHeight: "36px" }}
      >
        <span style={IS}>We Decide on </span>
        <span style={IT}>Together</span>
      </motion.p>

      {/* 메인 사진 — Next.js Image, 자연 비율 유지 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 10, margin: "24px 24px 0 24px" }}
      >
        <Image
          src="/visual-photo.png"
          alt=""
          width={342}
          height={500}
          sizes="342px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </motion.div>

      {/* 하단 텍스트 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", zIndex: 10, margin: 0, paddingBottom: 60, paddingRight: 24, marginTop: 24, lineHeight: "36px", textAlign: "right" }}
      >
        <span style={IS}>from this </span>
        <span style={IT}>Weather </span>
        <span style={IS}>to </span>
        <span style={IT}>Forever</span>
      </motion.p>
    </section>
  );
}
