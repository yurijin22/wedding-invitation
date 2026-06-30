"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const BG = "#2F1E11";

const BUTTONS = [
  { src: "/navermap.png", fn: "naver" },
  { src: "/kakaomap.png", fn: "kakao" },
  { src: "/tmap.png",     fn: "tmap"  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global { interface Window { kakao: any } }

export default function Location() {
  const { wedding } = weddingData;
  const { venue } = wedding;
  const mapRef = useRef<HTMLDivElement>(null);

  // 카카오맵 SDK — 동적 로드 후 지도 + 마커 + venue명 오버레이
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const draw = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(venue.lat, venue.lng);
        const map = new window.kakao.maps.Map(el, { center, level: 3 });
        map.setZoomable(false); // 스크롤 줌 비활성 (페이지 스크롤 방해 방지)

        new window.kakao.maps.Marker({ position: center, map });

        const overlay = new window.kakao.maps.CustomOverlay({
          position: center,
          yAnchor: 2.2,
          content: `<div style="background:#2F1E11;color:#fff;padding:6px 12px;border-radius:16px;font-size:12px;font-weight:600;white-space:nowrap;font-family:'Noto Sans KR',sans-serif;box-shadow:0 3px 10px rgba(0,0,0,0.3);">${venue.name}</div>`,
        });
        overlay.setMap(map);
      });
    };

    if (window.kakao?.maps) {
      draw();
      return;
    }

    const existing = document.getElementById("kakao-maps-sdk") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", draw);
      return () => existing.removeEventListener("load", draw);
    }

    const script = document.createElement("script");
    script.id = "kakao-maps-sdk";
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${weddingData.kakaoAppKey}&autoload=false`;
    script.addEventListener("load", draw);
    document.head.appendChild(script);
  }, [venue.lat, venue.lng, venue.name]);

  const openNav = (appUrl: string, webUrl: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // 데스크탑(앱 없음)에선 앱스킴이 "유효하지 않은 주소" 에러 → 웹 지도로 바로 이동
    if (!isMobile) { window.open(webUrl, "_blank"); return; }

    // 모바일: 앱 스킴을 iframe으로 조용히 시도 → 앱 미설치여도 에러창("링크 없음") 없이 웹으로 폴백
    let appOpened = false;
    const onHide = () => { appOpened = true; };
    document.addEventListener("visibilitychange", onHide);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      iframe.remove();
      // 앱이 열려 화면이 백그라운드로 가지 않았다면(=미설치) 웹 지도로 이동
      if (!appOpened && !document.hidden) window.location.href = webUrl;
    }, 1500);
  };

  const open = (type: string) => {
    const name = encodeURIComponent("라마다 서울 신도림 호텔");
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
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#E9E3D7", letterSpacing: "0.04em", display: "block", textAlign: "center", transform: "scaleX(0.92)", transformOrigin: "center center", margin: 0 }}>
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

        {/* 지도 + 길찾기 버튼 — 가깝게(간격 12) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* 지도 (카카오맵 SDK) */}
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
        </div>
      </motion.div>
    </section>
  );
}
