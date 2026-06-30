"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // 봉투 브라운
const NOTCH = 46; // 0920을 감싸는 반원 노치 반지름
const NOTCH_Y = 0; // 노치 중심 = 봉투 top (= 0920 중앙)
const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";

// 봉투를 0920 위치(top)에 직접 고정 + bottom:0 → 높이 자동. 노치는 툴바와 무관하게 0920에 정렬.
// 스크롤하면 transform(y)으로 절반까지만 내려감(절반은 하단에 남음).
export default function EnvelopeFooter() {
  const [topPx, setTopPx] = useState<number | null>(null);
  const [dbg, setDbg] = useState("");
  const [debugOn, setDebugOn] = useState(false);
  const y = useMotionValue(0); // 슬라이드(transform) — 합성, layout 변화 없음
  const quoteOpacity = useMotionValue(1);
  const vpRef = useRef<HTMLDivElement>(null); // transform 없는 화면하단 기준점
  const maxSlideRef = useRef(120); // 내려갈 수 있는 최대(=봉투높이의 절반)

  useEffect(() => {
    setDebugOn(new URLSearchParams(window.location.search).has("debug"));
  }, []);

  // 0920 위치 측정 → 봉투 top. 스크롤 무관(문서 좌표). 폰트/이미지/회전 시에만 갱신.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = document.getElementById("intro-0920");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const realVH = vpRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;
      // 0920 중심의 문서 위치(= 스크롤0에서의 뷰포트 위치). 툴바 변해도 불변 → 상단 복귀 시 항상 정렬.
      const center0 = rect.top + rect.height / 2 + window.scrollY;
      maxSlideRef.current = Math.max(40, (realVH - center0) * 0.5); // 절반 남김
      setTopPx((prev) => (prev === null || Math.abs(prev - center0) > 0.5 ? center0 : prev));
      if (window.location.search.includes("debug")) {
        setDbg(`vh=${Math.round(realVH)} top=${Math.round(center0)} maxSlide=${Math.round(maxSlideRef.current)}`);
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    schedule();
    const timers = [200, 600, 1200, 2500].map((ms) => window.setTimeout(measure, ms));
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule);
      ro.observe(document.body);
    }
    const roStop = window.setTimeout(() => ro?.disconnect(), 3500);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    // 툴바 슬라이드(높이만 변화)는 무시, 가로폭 변화(회전)만 재측정 → 상단 복귀 스냅 방지.
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

  // 스크롤 → 봉투를 아래로 슬라이드(절반까지). 네이티브 스크롤 + rAF + transform → 부드러움.
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const sY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      y.set(Math.min(sY, maxSlideRef.current));
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
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, background: "rgba(190,0,0,0.92)", color: "#fff", fontSize: 10, lineHeight: "14px", padding: "5px 6px", fontFamily: "monospace" }}>
          DEBUG {dbg}
        </div>
      )}
      {/* transform 없는 화면 하단 기준점 — realVH 측정용 */}
      <div ref={vpRef} style={{ position: "fixed", bottom: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />

      <motion.div
        style={{
          position: "fixed",
          top: topPx ?? 0,
          bottom: 0,
          left: "50%",
          x: "-50%",
          y,
          width: "100%",
          maxWidth: 390,
          willChange: "transform",
          zIndex: 50,
          visibility: topPx === null ? "hidden" : "visible",
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
