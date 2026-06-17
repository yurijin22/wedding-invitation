"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { weddingData } from "@/lib/wedding-data";

export default function Gallery() {
  const { galleryImages: localImages } = weddingData;
  const [blobImages, setBlobImages] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<SwiperClass | null>(null);

  // 메인 사진 스크롤 줌 (Visual과 동일 효과)
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start end", "end start"] });
  const mainScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Blob에서 사진 불러오기 (있으면 Blob 우선, 없으면 로컬)
  useEffect(() => {
    fetch("/api/photos")
      .then(r => r.json())
      .then(d => { if (d.urls?.length > 0) setBlobImages(d.urls); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // 라이트박스 열릴 때 배경 스크롤 잠금
  useEffect(() => {
    if (lightboxIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [lightboxIndex]);

  // 로딩 전엔 로컬 이미지를 띄우지 않음 → 그레이 스켈레톤만
  const galleryImages = blobImages.length > 0 ? blobImages : (loaded ? localImages : []);
  const showSkeleton = !loaded && galleryImages.length === 0;

  return (
    <section style={{ backgroundColor: "#F7F3EA", padding: "0 16px" }}>
      {/* 섹션 타이틀 — 다른 섹션과 동일 스타일 */}
      <motion.p
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#111", textAlign: "center", lineHeight: "42px", margin: 0, paddingTop: 76, paddingBottom: 44 }}
      >
        Gallery
      </motion.p>

      {showSkeleton ? (
        <div style={{ paddingBottom: 76 }}>
          <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundColor: "#E5E5E5", borderRadius: 4 }} />
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ width: 60, height: 60, backgroundColor: "#E5E5E5", borderRadius: 4, flexShrink: 0 }} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ paddingBottom: 76 }}>
          {/* 메인 이미지 — 스크롤 줌 + 스와이프 + 탭하면 전체화면 */}
          <motion.div ref={mainRef} style={{ scale: mainScale, borderRadius: 4, overflow: "hidden" }}>
            <Swiper
              modules={[Thumbs, Keyboard]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : undefined }}
              keyboard={{ enabled: true }}
              spaceBetween={8}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            >
              {galleryImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <div
                    onClick={() => setLightboxIndex(i)}
                    style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", backgroundColor: "#E5E5E5", cursor: "pointer" }}
                  >
                    <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="390px" quality={70}
                      priority={i === 0}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* 썸네일 스트립 — 가로 스크롤, 탭하면 메인 전환 */}
          <Swiper
            modules={[Thumbs, FreeMode]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            freeMode
            slidesPerView="auto"
            spaceBetween={6}
            style={{ marginTop: 6 }}
          >
            {galleryImages.map((src, i) => (
              <SwiperSlide key={i} style={{ width: 60 }}>
                <div
                  style={{
                    position: "relative", width: 60, height: 60, borderRadius: 4, overflow: "hidden",
                    backgroundColor: "#E5E5E5", cursor: "pointer",
                    opacity: i === activeIndex ? 1 : 0.45,
                    outline: i === activeIndex ? "2px solid #1D1000" : "none",
                    outlineOffset: -2, transition: "opacity 0.2s",
                  }}
                >
                  <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="60px" quality={40} loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 인덱스 카운터 */}
          <p style={{ textAlign: "center", fontSize: 12, color: "#9BA2A8", letterSpacing: "0.05em", margin: "14px 0 0" }}>
            {activeIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}

      {/* 라이트박스 — 전체화면 가로 스와이프 */}
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
              onSwiper={(s) => { lightboxRef.current = s; }}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              style={{ width: "100%", height: "100%" }}
            >
              {galleryImages.map((src, i) => (
                <SwiperSlide key={i}>
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

            <button
              onClick={() => setLightboxIndex(null)}
              style={{ position: "absolute", top: 20, right: 20, zIndex: 10, color: "rgba(255,255,255,0.7)", fontSize: 30, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}
            >×</button>
            <button
              onClick={() => lightboxRef.current?.slidePrev()}
              style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 32, background: "none", border: "none", cursor: "pointer", padding: 12 }}
            >‹</button>
            <button
              onClick={() => lightboxRef.current?.slideNext()}
              style={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 32, background: "none", border: "none", cursor: "pointer", padding: 12 }}
            >›</button>
            <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", zIndex: 10, color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.05em" }}>
              {activeIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
