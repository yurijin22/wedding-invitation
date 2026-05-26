"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { weddingData } from "@/lib/wedding-data";

export default function Gallery() {
  const { galleryImages } = weddingData;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxCurrent, setLightboxCurrent] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxCurrent(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <section className="py-24 bg-[#FAFAF7]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        {/* 섹션 헤더 */}
        <div className="text-center space-y-4 px-8">
          <p className="font-script text-3xl text-[#49311C]/70 italic">Our moments</p>
          <div className="section-divider" />
        </div>

        {/* 메인 슬라이더 */}
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation
          pagination={{ clickable: true }}
          loop={galleryImages.length > 1}
          className="w-full"
          style={{ paddingBottom: "36px" }}
        >
          {galleryImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative w-full cursor-zoom-in"
                style={{ aspectRatio: "3/4" }}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={src}
                  alt={`웨딩 사진 ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 썸네일 슬라이더 */}
        <div className="px-4">
          <Swiper
            modules={[FreeMode, Thumbs]}
            onSwiper={setThumbsSwiper}
            freeMode
            watchSlidesProgress
            slidesPerView={4.5}
            spaceBetween={6}
          >
            {galleryImages.map((src, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative cursor-pointer rounded-lg overflow-hidden opacity-50 transition-opacity [&.swiper-slide-thumb-active]:opacity-100"
                  style={{ aspectRatio: "1/1" }}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={src}
                    alt={`썸네일 ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 그리드 */}
        <div className="px-4 grid grid-cols-3 gap-1.5">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="relative cursor-pointer overflow-hidden rounded-lg"
              style={{ aspectRatio: "1/1" }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={src}
                alt={`갤러리 ${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* 닫기 */}
            <button
              className="absolute top-5 right-5 z-10 text-white/60 hover:text-white p-2 transition-colors"
              onClick={closeLightbox}
              aria-label="닫기"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {/* 라이트박스 스와이퍼 */}
            <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <Swiper
                modules={[Navigation]}
                navigation
                initialSlide={lightboxIndex}
                loop={galleryImages.length > 1}
                onSlideChange={(s) => setLightboxCurrent(s.realIndex)}
              >
                {galleryImages.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={src}
                        alt={`웨딩 사진 ${i + 1}`}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 카운터 */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs font-sans tracking-widest">
              {lightboxCurrent + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
