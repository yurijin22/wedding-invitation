"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

export default function Gallery() {
  const { galleryImages } = weddingData;
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const displayed = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;
  const rows: string[][] = [];
  for (let i = 0; i < displayed.length; i += 3) rows.push(displayed.slice(i, i + 3));

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
                  onClick={() => setLightboxIndex(idx)}
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
              paddingBottom: 12,
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

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, backgroundColor: "rgba(26,20,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setLightboxIndex(null)}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }} onClick={e => e.stopPropagation()}>
              <Image src={galleryImages[lightboxIndex]} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button onClick={() => setLightboxIndex(null)} style={{ position: "absolute", top: 20, right: 20, color: "rgba(255,255,255,0.6)", fontSize: 28, background: "none", border: "none", cursor: "pointer" }}>×</button>
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 32 }}>
                <button style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, background: "none", border: "none", cursor: "pointer" }} onClick={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}>← prev</button>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, alignSelf: "center" }}>{lightboxIndex + 1} / {galleryImages.length}</span>
                <button style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, background: "none", border: "none", cursor: "pointer" }} onClick={() => setLightboxIndex(i => Math.min(galleryImages.length - 1, (i ?? 0) + 1))}>next →</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
