"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const { notice, directions } = weddingData;

// 슬라이드 — 이미지/제목/설명. 추가하려면 여기 항목만 늘리면 됨(점 자동 생성).
const SLIDES = [
  {
    img: "/gallery/03.jpg",
    title: "Reception Party",
    body: `본식에 함께하기 어려운 분들을 위해\n작은 피로연 자리를 마련했습니다.\n\n${notice.date}\n${notice.venue}`,
  },
  {
    img: "/gallery/07.jpg",
    title: "Parking",
    body: `라마다 서울 신도림 호텔 주차장을 이용해 주세요.\n\n${directions.parkingNote}`,
  },
];

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
        <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#141414", textAlign: "center", lineHeight: "42px", margin: 0 }}>
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
            style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", justifyContent: "flex-start", minHeight: 190, padding: "0 24px" }}
          >
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 19, color: "#2F1E11", margin: 0 }}>
              {SLIDES[active].title}
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: "27px", color: "#6B6258", textAlign: "center", whiteSpace: "pre-line", margin: 0 }}>
              {SLIDES[active].body}
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
