"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const BG = "#361D17";

const BUTTONS = [
  { src: "/navermap.png", fn: "naver" },
  { src: "/kakaomap.png", fn: "kakao" },
  { src: "/tmap.png",     fn: "tmap"  },
];

export default function Location() {
  const { wedding } = weddingData;
  const { venue } = wedding;

  const open = (type: string) => {
    if (type === "naver") {
      window.open(`naver://map/place?lat=${venue.lat}&lng=${venue.lng}&name=${encodeURIComponent(venue.name)}`, "_blank");
      setTimeout(() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(venue.name)}`, "_blank"), 500);
    } else if (type === "kakao") {
      window.open(`kakaomap://look?p=${venue.lat},${venue.lng}`, "_blank");
      setTimeout(() => window.open(`https://map.kakao.com/link/map/${encodeURIComponent(venue.name)},${venue.lat},${venue.lng}`, "_blank"), 500);
    } else {
      window.open(`tmap://route?goalname=${encodeURIComponent(venue.name)}&goalx=${venue.lng}&goaly=${venue.lat}`, "_blank");
      setTimeout(() => window.open(`https://tmap.life/${venue.lat},${venue.lng}`, "_blank"), 500);
    }
  };

  return (
    <section style={{ backgroundColor: BG, paddingLeft: 24, paddingRight: 24, paddingTop: 60, paddingBottom: 60 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", flexDirection: "column", gap: 29 }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#fff", textAlign: "center", lineHeight: "42px", margin: 0 }}>
            Location
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* 한글 venue명 — 18px Light */}
            <p style={{ fontSize: 18, fontWeight: 300, color: "#fff", lineHeight: 1.5, margin: 0 }}>
              {venue.nameKorean}
            </p>
            {/* 영문 venue명 */}
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#9EC5EE", letterSpacing: "0.04em", display: "inline-block", transform: "scaleX(0.92)", transformOrigin: "left center", margin: 0 }}>
              {venue.nameEnglish}
            </p>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)" }} />
            {/* 주소 / 전화 — gap 16px */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{venue.address}</p>
              <a href={`tel:${venue.tel}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", flexShrink: 0 }}>{venue.tel}</a>
            </div>
          </div>
        </div>

        {/* 지도 이미지 */}
        <div style={{ position: "relative", width: "100%", height: 245, borderRadius: 8, overflow: "hidden", backgroundColor: "#3A2E2A" }}>
          <Image src="/locationmap.png" alt="지도" fill style={{ objectFit: "cover" }} sizes="342px"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>

        {/* 버튼 3개 — img 태그로 직접 로드 */}
        <div style={{ display: "flex", gap: 8 }}>
          {BUTTONS.map(({ src, fn }) => (
            <button
              key={fn}
              onClick={() => open(fn)}
              style={{ flex: 1, height: 46, backgroundColor: "transparent", border: "none", borderRadius: 8, cursor: "pointer", padding: 0, overflow: "hidden" }}
            >
              <img src={src} alt={fn} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
