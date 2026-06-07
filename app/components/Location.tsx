"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";
import "leaflet/dist/leaflet.css";

const BG = "#1D1000";

const BUTTONS = [
  { src: "/navermap.png", fn: "naver" },
  { src: "/kakaomap.png", fn: "kakao" },
  { src: "/tmap.png",     fn: "tmap"  },
];

export default function Location() {
  const { wedding } = weddingData;
  const { venue } = wedding;
  const mapRef = useRef<HTMLDivElement>(null);

  // Leaflet 지도 (CARTO Voyager 타일) — 키/계정 불필요, 외부 SDK 차단 영향 없음
  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;
    import("leaflet").then((mod) => {
      const L = mod.default;
      const el = mapRef.current;
      if (cancelled || !el || el.dataset.init) return;
      el.dataset.init = "1";
      map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
        .setView([venue.lat, venue.lng], 16);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);
      const icon = L.divIcon({
        className: "",
        html: `<div style="transform:translate(-50%,-50%);background:#1D1000;color:#fff;padding:6px 12px;border-radius:16px;font-size:12px;font-weight:600;white-space:nowrap;font-family:'Noto Sans KR',sans-serif;box-shadow:0 3px 10px rgba(0,0,0,0.3);">${venue.name}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      L.marker([venue.lat, venue.lng], { icon }).addTo(map);
      setTimeout(() => map && map.invalidateSize(), 300);
    });
    return () => {
      cancelled = true;
      if (map) map.remove();
      if (mapRef.current) delete mapRef.current.dataset.init;
    };
  }, [venue.lat, venue.lng, venue.name]);

  const openNav = (appUrl: string, webUrl: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // 데스크탑(앱 없음)에선 앱스킴이 "유효하지 않은 주소" 에러 → 웹 지도로 바로 이동
    if (!isMobile) { window.open(webUrl, "_blank"); return; }
    // 모바일: 앱 실행 시도 → 안 열리면 웹으로 폴백
    const t = Date.now();
    window.location.href = appUrl;
    setTimeout(() => {
      if (Date.now() - t < 1600) window.open(webUrl, "_blank");
    }, 1200);
  };

  const open = (type: string) => {
    const name = encodeURIComponent("라마다서울신도림호텔");
    const lat = venue.lat;
    const lng = venue.lng;
    const appname = typeof window !== "undefined" ? window.location.hostname : "wedding";

    if (type === "naver") {
      openNav(
        `nmap://place?lat=${lat}&lng=${lng}&name=${name}&appname=${appname}`,
        `https://map.naver.com/p/search/${name}`
      );
    } else if (type === "kakao") {
      openNav(
        `kakaomap://look?p=${lat},${lng}`,
        `https://map.kakao.com/link/map/${name},${lat},${lng}`
      );
    } else {
      // TMAP은 웹 지도가 없어 데스크탑에선 네이버 웹으로 위치만 표시
      openNav(
        `tmap://route?goalname=${name}&goalx=${lng}&goaly=${lat}`,
        `https://map.naver.com/p/search/${name}`
      );
    }
  };

  return (
    <section style={{ backgroundColor: BG, paddingLeft: 24, paddingRight: 24, paddingTop: 90, paddingBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: 52 }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#fff", textAlign: "center", lineHeight: "42px", margin: 0 }}>
            Location
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* 한글 venue명 — 18px Light */}
            <p style={{ fontSize: 18, fontWeight: 300, color: "#fff", lineHeight: 1.5, margin: 0, textAlign: "center" }}>
              {venue.nameKorean}
            </p>
            {/* 영문 venue명 */}
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#9EC5EE", letterSpacing: "0.04em", display: "block", textAlign: "center", transform: "scaleX(0.92)", transformOrigin: "center center", margin: 0 }}>
              {venue.nameEnglish}
            </p>
            <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", margin: "14px 0" }} />
            {/* 주소 / 전화 — gap 16px */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{venue.address}</p>
              <a href={`tel:${venue.tel}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", flexShrink: 0 }}>{venue.tel}</a>
            </div>
          </div>
        </div>

        {/* 지도 (Leaflet + CARTO 타일) */}
        <div ref={mapRef} style={{ width: "100%", height: 245, borderRadius: 8, overflow: "hidden", backgroundColor: "#E5E5E5", zIndex: 0 }} />

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
