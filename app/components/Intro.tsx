"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Intro() {
  const [specialPhotos, setSpecialPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/special").then(r => r.json()).then(setSpecialPhotos).catch(() => {});
  }, []);

  const photo1 = specialPhotos["intro-1"] ?? "/gallery/photo-1.jpg";
  const photo2 = specialPhotos["intro-2"] ?? "/gallery/photo-2.jpg";

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
        {/* 1. 인용 텍스트 — 줄바꿈 고정 */}
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(9px, 3vw, 12.5px)",
            lineHeight: "20px",
            letterSpacing: "0.01em",
            color: "#111111",
            textAlign: "center",
            margin: 0,
          }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>The year&apos;s loveliest smile falls softly upon September 20,</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>blessing the moment we become one forever,</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>with love blooming through the years to come,</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>walking hand in hand through the seasons ahead.</span>
        </p>

        {/* 2. 사진 2장: 각 120×120, gap 8px, 중앙정렬 */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 120, height: 120, position: "relative", overflow: "hidden", backgroundColor: "#D9D9D9", flexShrink: 0 }}>
            <Image src={photo1} alt="" fill sizes="120px" style={{ objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div style={{ width: 120, height: 120, position: "relative", overflow: "hidden", backgroundColor: "#D9D9D9", flexShrink: 0 }}>
            <Image src={photo2} alt="" fill sizes="120px" style={{ objectFit: "cover" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
