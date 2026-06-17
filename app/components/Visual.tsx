"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IS: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: 16,
  lineHeight: "26px",
  letterSpacing: "0.01em",
  color: "#FFFFFF",
  display: "inline-block",
  transform: "scaleX(0.92)",
  transformOrigin: "left center",
};

const IT: React.CSSProperties = {
  fontFamily: "var(--font-italianno)",
  fontSize: 22,
  lineHeight: "26px",
  letterSpacing: "0.01em",
  color: "#FFFFFF",
};

export default function Visual() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  // 스크롤이 사진을 통과하는 동안 줌 — 잘림 최소화한 적당한 강도(1.0 → 1.1)
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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

      {/* 메인 사진 — 등장 페이드 + 스크롤 연동 은은한 줌(ken-burns) */}
      <motion.div
        ref={photoRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 10, margin: "60px 24px 0 24px", overflow: "hidden" }}
      >
        <motion.div style={{ scale: photoScale }}>
          <Image
            src="/visual-photo.png"
            alt=""
            width={342}
            height={500}
            sizes="342px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>
      </motion.div>

      {/* 하단 텍스트 — 사진 아래에 2줄로 이어서 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", zIndex: 10, margin: 0, paddingBottom: 60, marginTop: 20, lineHeight: "26px", textAlign: "center" }}
      >
        <span style={IS}>We Decide on </span>
        <span style={IT}>Together</span>
        <br />
        <span style={IS}>from this </span>
        <span style={IT}>Weather </span>
        <span style={IS}>to </span>
        <span style={IT}>Forever</span>
      </motion.p>
    </section>
  );
}
