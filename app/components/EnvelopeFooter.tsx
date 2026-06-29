"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // Our Wedding Day 섹션 배경색과 동일
const NOTCH = 36; // 상단 중앙 반원 노치 반지름
const NOTCH_Y = -4; // 노치 중심 y (음수일수록 얕음)

const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";

const DEFAULT_START_H = 204; // 측정 전 기본 봉투 높이
const MIN_H = 56; // 스크롤 후 최소 높이

// 처음엔 크게(봉투가 편지/문안을 덮음) → 스크롤하면 작아져 문안이 드러남.
// 노치는 0920(#intro-0920) 실제 위치에 맞춰 봉투 높이를 기기별로 자동 계산.
export default function EnvelopeFooter() {
  const { scrollY } = useScroll();
  const [startH, setStartH] = useState(DEFAULT_START_H);

  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("intro-0920");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 0920 블록 바로 아래에 노치가 오도록(09·20 둘 다 노치 위에 보이게)
      const anchor = rect.bottom + window.scrollY + 6;
      const vh = window.innerHeight;
      // 노치 중심(vh - startH + NOTCH_Y) = anchor (스크롤0 기준 뷰포트 위치)
      const target = vh - anchor + NOTCH_Y;
      const clamped = Math.max(MIN_H + 24, Math.min(target, vh * 0.72));
      setStartH(clamped);
    };
    measure();
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 600); // 폰트/이미지 로드 후 보정
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const height = useTransform(scrollY, [0, startH - MIN_H], [startH, MIN_H], { clamp: true });
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
