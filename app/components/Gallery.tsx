"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { weddingData } from "@/lib/wedding-data";

export default function Gallery() {
  const { galleryImages: localImages } = weddingData;
  const [blobImages, setBlobImages] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Blob에서 사진 불러오기 (있으면 Blob 우선, 없으면 로컬)
  useEffect(() => {
    fetch("/api/photos")
      .then(r => r.json())
      .then(d => { if (d.urls?.length > 0) setBlobImages(d.urls); })
      .catch(() => {});
  }, []);

  // 라이트박스 열릴 때 배경 스크롤 잠금
  useEffect(() => {
    if (lightboxIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [lightboxIndex]);

  const galleryImages = blobImages.length > 0 ? blobImages : localImages;
  const displayed = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;
  const rows: string[][] = [];
  for (let i = 0; i < displayed.length; i += 3) rows.push(displayed.slice(i, i + 3));

  const openLightbox = (idx: number) => {
    setActiveIndex(idx);
    setLightboxIndex(idx);
  };

  return (
    <section style={{ backgroundColor: "#fff", padding: "4px 4px 0 4px" }}>
      <div ref={topRef} style={{ position: "relative" }}>
        {/* 사진 그리드 */}
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            {row.map((src, ci) => {
              const idx = ri * 3 + ci;
              return (
                <button
                  key={ci}
                  onClick={() => openLightbox(idx)}
                  style={{ flex: 1, height: 128, position: "relative", overflow: "hidden", backgroundColor: "#D4CFC9", border: "none", padding: 0, cursor: "pointer" }}
                >
                  <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="125px"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </button>
              );
            })}
          </div>
        ))}

        {/* 하단 페이드 + more photos — 9장씩 추가 */}
        {hasMore && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 152,
              background: "linear-gradient(to bottom, transparent, white 70%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 40,
            }}
          >
            <button
              onClick={() => setVisibleCount(c => Math.min(c + 9, galleryImages.length))}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-script"
                style={{ fontSize: 18, fontWeight: 500, color: "#111", fontStyle: "italic", lineHeight: "26px", letterSpacing: "0.4px" }}
              >
                more photos
              </span>
              <img src="/arrow-bottom.png" alt="더보기" width={30} height={30} style={{ objectFit: "contain" }} />
            </button>
          </div>
        )}
      </div>

      {/* 다 펼쳐진 후 — 처음으로 돌아가기 */}
      {!hasMore && visibleCount > 12 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 0 40px" }}>
          <button
            onClick={() => {
              setVisibleCount(12);
              setTimeout(() => {
                topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
          >
              <img src="/arrow-bottom.png" alt="위로" width={30} height={30} style={{ objectFit: "contain", transform: "rotate(180deg)" }} />
            <span
              className="font-script"
              style={{ fontSize: 18, fontWeight: 500, color: "#111", fontStyle: "italic", lineHeight: "26px", letterSpacing: "0.4px" }}
            >
              go back
            </span>
          </button>
        </div>
      )}
      {!hasMore && visibleCount <= 12 && <div style={{ height: 12 }} />}

      {/* 라이트박스 — 가로 스와이프 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, backgroundColor: "rgba(26,20,16,0.96)" }}
          >
            <Swiper
              modules={[Keyboard]}
              initialSlide={lightboxIndex}
              keyboard={{ enabled: true }}
              spaceBetween={0}
              onSwiper={(s) => { swiperRef.current = s; }}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              style={{ width: "100%", height: "100%" }}
            >
              {galleryImages.map((src, i) => (
                <SwiperSlide key={i}>
                  {/* 빈 영역(이미지 바깥) 탭 → 닫기 */}
                  <div
                    style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={() => setLightboxIndex(null)}
                  >
                    <div
                      style={{ position: "relative", width: "100%", height: "100%" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image src={src} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" priority={i === lightboxIndex} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 닫기 */}
            <button
              onClick={() => setLightboxIndex(null)}
              style={{ position: "absolute", top: 20, right: 20, zIndex: 10, color: "rgba(255,255,255,0.7)", fontSize: 30, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
            >×</button>

            {/* 좌우 화살표 (데스크탑 보조) */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 32, background: "none", border: "none", cursor: "pointer", padding: 12 }}
            >‹</button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              style={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 32, background: "none", border: "none", cursor: "pointer", padding: 12 }}
            >›</button>

            {/* 카운터 */}
            <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.05em" }}>
              {activeIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
