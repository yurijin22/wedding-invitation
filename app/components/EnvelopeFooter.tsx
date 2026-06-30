"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // Our Wedding Day 섹션 배경색과 동일
const NOTCH = 36; // 상단 중앙 반원 노치 반지름
const NOTCH_Y = -4; // 노치 중심 y (음수일수록 얕음)

// 봉투가 짧은 기기에서도 노치와 겹치지 않도록 2줄로 압축
const QUOTE_LINE1 = "Upon the loveliest day of the year,";
const QUOTE_LINE2 = "we two become one — forever, hand in hand.";

const DEFAULT_START_H = 204; // 측정 전 기본 봉투 높이
const MIN_H = 56; // 스크롤 후 최소 높이

// 처음엔 크게(봉투가 편지/문안을 덮음) → 스크롤하면 작아져 문안이 드러남.
// 노치는 0920(#intro-0920) 실제 위치에 맞춰 봉투 높이를 기기별로 자동 계산.
export default function EnvelopeFooter() {
  const { scrollY } = useScroll();
  const [startH, setStartH] = useState(DEFAULT_START_H);
  // 높이를 직접 제어 — startH(측정값) 변경 시 스크롤 없이도 즉시 반영
  const height = useMotionValue(DEFAULT_START_H);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = document.getElementById("intro-0920");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 0920 블록 바로 아래에 노치가 오도록(09·20 둘 다 노치 위에 보이게).
      // rect.top + scrollY = 문서상 절대위치(스크롤 무관) → 어느 스크롤에서 재든 동일.
      const anchor = rect.bottom + window.scrollY + 6;
      const vh = window.innerHeight; // 고정 footer(bottom:0)와 같은 레이아웃 뷰포트 기준
      const target = vh - anchor + NOTCH_Y;
      const clamped = Math.max(MIN_H + 24, Math.min(target, vh * 0.85));
      setStartH((prev) => (Math.abs(prev - clamped) > 0.5 ? clamped : prev));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    schedule();
    // 폰트/이미지/툴바 등 레이아웃 변화를 모두 추적해 노치 위치를 다시 맞춤
    const timers = [200, 600, 1200, 2500].map((ms) => window.setTimeout(measure, ms));
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule);
      ro.observe(document.body); // 이미지/폰트 로드로 본문 높이 바뀌면 재측정
    }
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    window.addEventListener("resize", schedule);
    window.addEventListener("load", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      ro?.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", measure);
      window.removeEventListener("scroll", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, []);

  // height = clamp(startH - scrollY, MIN_H, startH) — 스크롤하면 줄어듦.
  // startH가 바뀌면(측정 반영) update()를 즉시 호출해 정지 상태에서도 갱신.
  useEffect(() => {
    const update = () => height.set(Math.max(MIN_H, Math.min(startH, startH - scrollY.get())));
    update();
    const unsub = scrollY.on("change", update);
    return unsub;
  }, [startH, height, scrollY]);

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

      {/* 영어 인용문 — 하단 화이트, 스크롤하면 페이드아웃. 노치와 안 겹치게 2줄 */}
      <motion.p
        style={{
          position: "absolute",
          bottom: 9,
          left: 24,
          right: 24,
          textAlign: "center",
          margin: 0,
          fontFamily: "var(--font-serif)",
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.82)",
          opacity: quoteOpacity,
        }}
      >
        {QUOTE_LINE1}<br />{QUOTE_LINE2}
      </motion.p>
    </motion.div>
  );
}
