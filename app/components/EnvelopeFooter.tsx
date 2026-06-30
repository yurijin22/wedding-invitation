"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#1D1000"; // 봉투 브라운
const NOTCH = 46; // 0920을 감싸는 반원 노치 반지름
const NOTCH_Y = 0; // 노치 중심 = 봉투 top (= 0920 중앙)
const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";
const QUOTE_SHORT = "You are invited to our loveliest day"; // 스크롤 시 한 줄로 교체

// 봉투를 0920 위치(top)에 직접 고정 + bottom:0 → 높이 자동. 노치는 툴바와 무관하게 0920에 정렬.
// 스크롤하면 transform(y)으로 절반까지만 내려감(절반은 하단에 남음).
export default function EnvelopeFooter() {
  const [topPx, setTopPx] = useState<number | null>(null);
  const y = useMotionValue(0); // 슬라이드(transform) — 합성, layout 변화 없음
  const quoteOpacity = useMotionValue(1); // 긴 문구(상단)
  const lineOpacity = useMotionValue(0); // 한 줄 문구(스크롤 시)
  const vpRef = useRef<HTMLDivElement>(null); // transform 없는 화면하단 기준점
  const maxSlideRef = useRef(120); // 내려갈 수 있는 최대(=봉투높이의 절반)

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
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    schedule();
    // 폰트가 늦게 로드되는 인앱브라우저(카카오 등) 대응 — 여러 시점 + 폰트 로드 후 재측정
    const timers = [200, 600, 1200, 2500, 4000, 6000].map((ms) => window.setTimeout(measure, ms));
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      // 본문 높이 변화(폰트/이미지 로드)마다 재측정. 계속 살려둠 — 0920 위 변화만 반영되고
      // 아래 이미지 로드는 0920 위치 불변이라 버벅임 없음. (스크롤로는 본문 높이가 안 변함)
      ro = new ResizeObserver(schedule);
      ro.observe(document.body);
    }
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
      // 긴 문구 → 한 줄 문구 크로스페이드
      quoteOpacity.set(Math.max(0, 1 - sY / 70));
      lineOpacity.set(Math.max(0, Math.min(1, (sY - 40) / 60)));
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
  }, [y, quoteOpacity, lineOpacity]);

  return (
    <>
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

        {/* 하단 솔리드 브라운 — 마스크 없음. 노치 아래는 무조건 꽉 찬 갈색(흰 라인/아티팩트 방지),
            화면 밖까지 연장(툴바 변화 대응) */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 0,
            right: 0,
            bottom: -240,
            backgroundColor: FRAME,
          }}
        />
        {/* 상단 노치 영역만 마스크 — 반원 노치가 0920을 감쌈 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 96,
            backgroundColor: FRAME,
            WebkitMaskImage: `radial-gradient(${NOTCH}px at 50% ${NOTCH_Y}px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
            maskImage: `radial-gradient(${NOTCH}px at 50% ${NOTCH_Y}px, transparent ${NOTCH - 1}px, #000 ${NOTCH}px)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
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

        {/* 스크롤 시 나타나는 한 줄 문구 — 노치 바로 아래(남는 영역) */}
        <motion.p
          style={{
            position: "absolute",
            top: 58,
            left: 24,
            right: 24,
            textAlign: "center",
            margin: 0,
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 14,
            letterSpacing: "0.03em",
            color: "rgba(255,255,255,0.9)",
            opacity: lineOpacity,
          }}
        >
          {QUOTE_SHORT}
        </motion.p>
      </motion.div>
    </>
  );
}
