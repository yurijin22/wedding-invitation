"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Intro() {
  const [specialPhotos, setSpecialPhotos] = useState<Record<string, string>>({});
  const [specialLoaded, setSpecialLoaded] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    fetch("/api/special").then(r => r.json()).then(setSpecialPhotos).catch(() => {}).finally(() => setSpecialLoaded(true));
  }, []);

  // 인용 문구: 3줄을 유지하면서 폭에 들어가는 "최대 폰트"를 자동 계산
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const fit = () => {
      const MAX = 13; // 원래 크기
      el.style.fontSize = `${MAX}px`;
      let maxW = 0;
      el.querySelectorAll("span").forEach((s) => {
        maxW = Math.max(maxW, (s as HTMLElement).scrollWidth);
      });
      if (maxW > 0) {
        const px = Math.min(MAX, (el.clientWidth / maxW) * MAX);
        el.style.fontSize = `${px}px`;
      }
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // 로딩 중엔 null → 그레이 박스만, 로딩 후 특별사진(없으면 기본 이미지)
  const photo1 = specialPhotos["intro-1"] ?? (specialLoaded ? "/gallery/photo-1.jpg" : null);
  const photo2 = specialPhotos["intro-2"] ?? (specialLoaded ? "/gallery/photo-2.jpg" : null);

  return (
    <section
      style={{
        width: "100%",
        height: 728,
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/intro-bg.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
      }}
    >
      {/* 콘텐츠 블록: 하단 60px 여백, 좌우 16px 패딩 */}
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* 1. 인용 텍스트 — 3줄 고정 (폭에 맞춰 폰트 자동 맞춤) */}
        <p
          ref={quoteRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 12,
            lineHeight: "1.45",
            letterSpacing: "0",
            color: "#111111",
            textAlign: "center",
            margin: 0,
          }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>The year&apos;s loveliest smile falls softly upon September 20, blessing the moment</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>we become one forever, with love blooming through the years to come,</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>walking hand in hand through the seasons ahead.</span>
        </p>

        {/* 2. 사진 2장: 각 120×120, gap 8px, 중앙정렬 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 120, height: 120, position: "relative", overflow: "hidden", backgroundColor: "#E5E5E5", flexShrink: 0 }}>
            {photo1 && <Image src={photo1} alt="" fill sizes="120px" style={{ objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
          </div>
          <div style={{ width: 120, height: 120, position: "relative", overflow: "hidden", backgroundColor: "#E5E5E5", flexShrink: 0 }}>
            {photo2 && <Image src={photo2} alt="" fill sizes="120px" style={{ objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
          </div>
        </div>

        {/* 3. " Save the Date " — 이미지와 간격 32px (gap 24 + marginTop 8) */}
        <p style={{ textAlign: "center", lineHeight: "20px", letterSpacing: "0.01em", color: "#111111", margin: "8px 0 0" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}>&ldquo; Save the </span>
          <span style={{ fontFamily: "var(--font-italianno)", fontSize: 24 }}>Date</span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}> &rdquo;</span>
        </p>
      </div>
    </section>
  );
}
