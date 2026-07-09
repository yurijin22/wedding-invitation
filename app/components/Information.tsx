"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 슬라이드 — 이미지/제목/설명. 추가하려면 여기 항목만 늘리면 됨(점 자동 생성).
const SLIDES = [
  {
    img: "/gallery/03.jpg",
    title: "연회장",
    body: "식사는 4층 딜라이트 연회장\n(에스컬레이터 이용)\n\n예식 시간 30분 전부터 2시간 이용 가능합니다.",
  },
  {
    img: "/gallery/08.jpg",
    title: "주차",
    body: "무료 주차 1시간 30분\n(초과 시 15분당 1,000원)\n\n만차 시 인근 디큐브시티·테크노마트\n주차장을 이용해 주세요",
  },
  {
    img: "/gallery/06.jpg",
    title: "셔틀버스",
    body: "신도림역 1번 출구 앞 탑승\n(홈플러스 건너편)\n\n예식 당일 수시로 셔틀버스를 운행합니다.",
  },
];

// 괄호 (…) 안의 값은 그레이로 렌더
function renderBody(text: string) {
  return text.split(/(\([^)]*\))/g).map((part, i) =>
    /^\([^)]*\)$/.test(part) ? (
      <span key={i} style={{ color: "#9A8E84" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Information() {
  const [active, setActive] = useState(0);
  const carRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const c = carRef.current;
    if (!c) return;
    const center = c.scrollLeft + c.clientWidth / 2;
    const slides = Array.from(c.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((el, i) => {
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(elCenter - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const goTo = (i: number) => {
    const c = carRef.current;
    if (!c) return;
    const el = c.children[i] as HTMLElement | undefined;
    if (el) c.scrollTo({ left: el.offsetLeft - (c.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: "#fff", paddingTop: 100, paddingBottom: 100 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", gap: 36 }}
      >
        {/* 타이틀 — 다른 섹션과 동일한 필기체 스타일 */}
        <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#141414", textAlign: "center", lineHeight: "42px", margin: "0 0 20px" }}>
          Information
        </p>

        {/* 이미지 캐러셀 (가로 스냅) */}
        <div ref={carRef} className="info-carousel" onScroll={onScroll}>
          {SLIDES.map((s, i) => (
            <div key={i} className="info-slide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt={s.title}
                style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", display: "block", backgroundColor: "#E5E5E5" }}
              />
            </div>
          ))}
        </div>

        {/* 활성 슬라이드의 제목 + 설명 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", justifyContent: "flex-start", minHeight: 200, padding: "0 24px" }}
          >
            <p style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.02em", color: "#2F1E11", margin: 0 }}>
              {SLIDES[active].title}
            </p>
            <p style={{ fontSize: 15, fontWeight: 400, lineHeight: "27px", color: "#4A423B", textAlign: "center", whiteSpace: "pre-line", margin: 0 }}>
              {renderBody(SLIDES[active].body)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 점 페이지네이션 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${i + 1}번째 안내`}
              style={{
                width: 7, height: 7, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
                backgroundColor: i === active ? "#2F1E11" : "#D8D2C8", transition: "background-color 0.2s",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
