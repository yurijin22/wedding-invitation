"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

const FRAME = "#2F1E11"; // 봉투 브라운
const NOTCH = 46; // 0920을 감싸는 반원 노치 반지름
const NOTCH_Y = 0; // 노치 중심 = 봉투 top (= 0920 중앙)
const QUOTE =
  "The year's loveliest smile falls softly upon September 20, blessing the moment we become one forever, with love blooming through the years to come, walking hand in hand through the seasons ahead.";
const QUOTE_SHORT = "You are invited to our loveliest day"; // 스크롤 시 한 줄로 교체

// 봉투를 0920 위치(top)에 직접 고정 + bottom:0 → 높이 자동. 노치는 툴바와 무관하게 0920에 정렬.
// 스크롤하면 transform(y)으로 절반까지만 내려감(절반은 하단에 남음).
export default function EnvelopeFooter() {
  const [topPx, setTopPx] = useState<number | null>(null);
  // CSS 스크롤 기반 애니메이션 지원 여부 — 지원하면 GPU 합성으로 부드럽게(JS 미사용), 아니면 JS 폴백
  const [cssScroll, setCssScroll] = useState(false);
  const y = useMotionValue(0); // 슬라이드(transform) — JS 폴백용
  const quoteOpacity = useMotionValue(0.82); // 긴 문구
  const quoteScale = useMotionValue(1); // 긴 문구가 줄어드는 효과
  const lineOpacity = useMotionValue(0); // 한 줄 문구(스크롤 시)
  const vpRef = useRef<HTMLDivElement>(null); // transform 없는 화면하단 기준점
  const envRef = useRef<HTMLDivElement>(null); // 봉투 컨테이너(CSS 변수 주입용)
  const maxSlideRef = useRef(120); // 내려갈 수 있는 최대(=봉투높이의 절반)

  useEffect(() => {
    setCssScroll(
      typeof CSS !== "undefined" && !!CSS.supports && CSS.supports("animation-timeline: scroll()")
    );
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
      const maxSlide = Math.max(40, (realVH - center0) * 0.5); // 절반 남김
      maxSlideRef.current = maxSlide;
      // CSS 스크롤 애니메이션용 변수(슬라이드 거리 = 스크롤 범위 = maxSlide)
      envRef.current?.style.setProperty("--sd-slide", `${maxSlide}px`);
      envRef.current?.style.setProperty("--sd-range", `${maxSlide}px`);
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

  // JS 폴백 — CSS 스크롤 애니메이션 미지원 브라우저에서만 동작.
  useEffect(() => {
    if (cssScroll) return; // 지원 브라우저는 CSS가 처리(부드러움)
    let raf = 0;
    const apply = () => {
      raf = 0;
      const sY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      y.set(Math.min(sY, maxSlideRef.current));
      // 긴 문구가 같은 자리에서 줄어들며(scale↓) 페이드 → 한 줄 문구로 응축
      const p = Math.max(0, Math.min(1, sY / 70));
      quoteOpacity.set(0.82 * (1 - p));
      quoteScale.set(1 - p * 0.14);
      lineOpacity.set(Math.max(0, Math.min(1, (sY - 40) / 60)) * 0.9);
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
  }, [cssScroll, y, quoteOpacity, quoteScale, lineOpacity]);

  return (
    <>
      {/* transform 없는 화면 하단 기준점 — realVH 측정용 */}
      <div ref={vpRef} style={{ position: "fixed", bottom: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />

      <motion.div
        ref={envRef}
        className={cssScroll ? "sd-envelope" : undefined}
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

        {/* 긴 영어 인용문 — 노치 아래. 스크롤하면 같은 자리에서 줄어들며 페이드아웃 */}
        <motion.p
          className={cssScroll ? "sd-quote" : undefined}
          style={{
            position: "absolute",
            top: 82,
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
            scale: quoteScale,
            transformOrigin: "center top",
          }}
        >
          {QUOTE}
        </motion.p>

        {/* 스크롤 시 같은 자리에 응축되어 나타나는 한 줄 문구 */}
        <motion.p
          className={cssScroll ? "sd-line" : undefined}
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
