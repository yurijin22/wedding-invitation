"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // Our Wedding Day 섹션 배경색과 동일
const NOTCH = 46; // 상단 중앙 반원 노치 반지름 (0920을 감싸도록 크게)
const NOTCH_Y = 0; // 노치 중심 y (봉투 top 기준)

const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";

const DEFAULT_START_H = 204; // 측정 전 기본 봉투 높이
const MIN_H = 56; // 스크롤 후 최소 높이

// 처음엔 크게(봉투가 편지/문안을 덮음) → 스크롤하면 작아져 문안이 드러남.
// 노치는 0920(#intro-0920) 실제 위치에 맞춰 봉투 높이를 기기별로 자동 계산.
export default function EnvelopeFooter() {
  const [startH, setStartH] = useState(DEFAULT_START_H);
  const [dbg, setDbg] = useState("");
  const [debugOn, setDebugOn] = useState(false);
  // 높이는 startH(측정값)로 '고정' — 스크롤 중 layout이 매 프레임 안 바뀜.
  const height = useMotionValue(DEFAULT_START_H);
  // 스크롤 시 줄어드는 효과는 transform(y)로 — GPU 합성이라 버벅임 없음.
  const y = useMotionValue(0);
  const quoteOpacity = useMotionValue(1);
  // 화면 하단 기준점 — transform 안 받는 고정 요소(봉투 자신은 transform 때문에 측정 오염됨).
  const vpRef = useRef<HTMLDivElement>(null);
  const startHRef = useRef(DEFAULT_START_H); // 스크롤 핸들러에서 최신 startH 참조용

  useEffect(() => {
    setDebugOn(new URLSearchParams(window.location.search).has("debug"));
  }, []);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = document.getElementById("intro-0920");
      if (!el) {
        setDbg("0920 요소 못 찾음!");
        return;
      }
      const rect = el.getBoundingClientRect();
      // ⭐ innerHeight는 모바일 툴바 때문에 실제 고정-뷰포트와 다름.
      // 봉투 자신(bottom:0 고정)의 viewport상 하단 = 진짜 뷰포트 높이(realVH). 이게 정확.
      const realVH = vpRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;
      // 0920 중심의 '스크롤0 기준' 뷰포트 위치 = 현재 뷰포트 위치 + 현재 스크롤량.
      // 이렇게 해야 어느 스크롤에서 재측정해도 동일한 base 높이가 나옴(스크롤 무관).
      const center0 = rect.top + rect.height / 2 + window.scrollY;
      const target = realVH - center0 + NOTCH_Y; // 봉투 base 높이(스크롤0에서 노치가 0920 중앙)
      const clamped = Math.max(MIN_H + 24, Math.min(target, realVH * 0.85));
      setStartH((prev) => (Math.abs(prev - clamped) > 0.5 ? clamped : prev));
      if (window.location.search.includes("debug")) {
        setDbg(
          `realVH=${Math.round(realVH)} ih=${Math.round(window.innerHeight)} ` +
            `bot=${Math.round(rect.bottom)} sY=${Math.round(window.scrollY)} ` +
            `tgt=${Math.round(target)} sH=${Math.round(clamped)} H=${Math.round(height.get())}`
        );
      }
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
    // 초기 안정화 후 RO 중단 — 스크롤 중 하단 이미지 로드로 인한 재측정(버벅임) 방지.
    const roStop = window.setTimeout(() => ro?.disconnect(), 3500);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    // ⚠️ 스크롤 재측정은 매 프레임 setState를 유발해 노치가 버벅임 → 제거.
    // 봉투 높이는 문서 좌표 기반이라 스크롤과 무관. 툴바 변화는 resize로 감지.
    // resize는 디바운스 — 스크롤 중 iOS 툴바 높이 변화로 노치가 튀는 것 방지.
    // visualViewport는 일부러 구독 안 함(툴바 슬라이드마다 재계산 → 버벅임의 원인).
    // 툴바 슬라이드(높이만 변화)는 무시하고, 가로폭 변화(회전 등)만 재측정 → 상단 복귀 시 스냅 방지.
    let rt = 0;
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      window.clearTimeout(rt);
      rt = window.setTimeout(measure, 250);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.clearTimeout(rt);
      window.clearTimeout(roStop);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, []);

  // 높이는 측정값으로 고정(스크롤 무관) — 매 프레임 reflow 방지.
  useEffect(() => {
    startHRef.current = startH;
    height.set(startH);
  }, [startH, height]);

  // 스크롤 시 봉투를 아래로 미끄러뜨려 사라지게(노치도 함께 내려감).
  // framer useScroll 대신 '네이티브 스크롤' 사용 — 일부 인앱브라우저에서 useScroll이
  // 스크롤을 못 잡아 봉투가 안 내려가고 모든 섹션 바닥에 떠 있던 문제 해결.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const sY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      // 완전히 사라지지 않게 — 봉투 높이의 절반까지만 내려감(절반은 하단에 남음).
      const maxSlide = startHRef.current * 0.5;
      y.set(Math.min(sY, maxSlide));
      quoteOpacity.set(Math.max(0, 1 - sY / 130));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [y, quoteOpacity]);

  return (
    <>
    {debugOn && (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, background: "rgba(190,0,0,0.92)", color: "#fff", fontSize: 10, lineHeight: "14px", padding: "5px 6px", fontFamily: "monospace", wordBreak: "break-all" }}>
        DEBUG {dbg}
      </div>
    )}
    {/* 화면 하단 기준점 (transform 없음) — realVH 측정용 */}
    <div ref={vpRef} style={{ position: "fixed", bottom: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />
    <motion.div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        x: "-50%",
        y,
        width: "100%",
        maxWidth: 390,
        height,
        willChange: "transform",
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
        {QUOTE}
      </motion.p>
    </motion.div>
    </>
  );
}
