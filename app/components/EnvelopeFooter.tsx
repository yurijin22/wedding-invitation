"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // Our Wedding Day 섹션 배경색과 동일
const NOTCH = 36; // 상단 중앙 반원 노치 반지름
const NOTCH_Y = -4; // 노치 중심 y (음수일수록 얕음)

const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";

const START_H = 204; // 처음 봉투 높이 (노치가 0920에 오도록)
const MIN_H = 56; // 스크롤 후 최소 높이

// 처음엔 크게(봉투가 편지/문안을 덮음) → 스크롤하면 작아져 문안이 드러남. 노치+0920은 봉투 상단
export default function EnvelopeFooter() {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, START_H - MIN_H], [START_H, MIN_H], { clamp: true });
  const quoteOpacity = useTransform(scrollY, [0, 130], [1, 0], { clamp: true });

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        x: "-50%",
        width: "100%",
        maxWidth: 390,
        height,
        zIndex: 50,
      }}
    >
      {/* 음악 버튼 — 봉투(노치 영역) 우측 상단 */}
      <MusicPlayer />

      {/* 브라운 봉투 — 상단 중앙 반원 노치(mask) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: FRAME,
          WebkitMaskImage: `radial-gradient(${NOTCH}px at 50% ${NOTCH_Y}px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
          maskImage: `radial-gradient(${NOTCH}px at 50% ${NOTCH_Y}px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
        }}
      />

      {/* 영어 인용문 — 하단 화이트, 스크롤하면 페이드아웃 */}
      <motion.p
        style={{
          position: "absolute",
          bottom: 22,
          left: 26,
          right: 26,
          textAlign: "center",
          margin: 0,
          fontFamily: "var(--font-serif)",
          fontSize: 11,
          lineHeight: "17px",
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.82)",
          opacity: quoteOpacity,
        }}
      >
        {QUOTE}
      </motion.p>
    </motion.div>
  );
}
