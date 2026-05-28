"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

export default function Gallery() {
  const { galleryImages } = weddingData;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);

  // 피그마 구조: 상단 가로 스트립 사진 + 다크 섹션 + Our Moments + 사진 그리드
  return (
    <>
      {/* 상단 풀블리드 가로 사진 스트립 */}
      <div className="w-full relative overflow-hidden" style={{ height: 220, backgroundColor: "#D4CFC9" }}>
        <Image
          src={galleryImages[2] ?? ""}
          alt=""
          fill
          className="object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* 44px 흰 gap */}
      <div className="h-[44px] bg-white" />

      {/* 다크 갤러리 섹션 */}
      <section className="bg-[#261E1A] relative overflow-hidden">
        {/* Our Moments 타이틀 */}
        <div className="pt-[80px] pl-[36px]">
          <p
            className="font-script text-[#96C5BC] leading-[1.05]"
            style={{ fontSize: 72 }}
          >
            Our
            <br />
            Moments
          </p>
        </div>

        {/* 풀블리드 대형 사진 */}
        <div
          className="w-full relative mt-6 overflow-hidden"
          style={{ height: 480, backgroundColor: "#3A2E2A" }}
        >
          <Image
            src={galleryImages[3] ?? ""}
            alt=""
            fill
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* 사진 그리드 */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {galleryImages.slice(4, 13).map((src, i) => (
            <button
              key={i}
              className="relative aspect-square overflow-hidden"
              style={{ backgroundColor: "#3A2E2A" }}
              onClick={() => setLightboxIndex(i + 4)}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </button>
          ))}
        </div>

        {/* 더보기 */}
        {galleryImages.length > 13 && (
          <div className="text-center py-6">
            <p className="text-[11px] text-white/30 font-sans tracking-widest">
              {galleryImages.length}장의 사진
            </p>
          </div>
        )}
      </section>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(38,30,26,0.95)" }}
            onClick={close}
          >
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={galleryImages[lightboxIndex]}
                alt=""
                fill
                className="object-contain"
              />
              <button
                onClick={close}
                className="absolute top-5 right-5 text-white/60 text-2xl font-light"
              >
                ×
              </button>
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-6">
                <button
                  className="text-white/40 text-sm font-sans"
                  onClick={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
                >
                  ← prev
                </button>
                <span className="text-white/30 text-xs font-sans self-center">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
                <button
                  className="text-white/40 text-sm font-sans"
                  onClick={() =>
                    setLightboxIndex((i) =>
                      Math.min(galleryImages.length - 1, (i ?? 0) + 1)
                    )
                  }
                >
                  next →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
