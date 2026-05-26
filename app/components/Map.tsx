"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (el: HTMLElement, opts: object) => NaverMap;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (opts: object) => unknown;
        InfoWindow: new (opts: object) => NaverInfoWindow;
      };
    };
  }
}

interface NaverMap {
  getCenter(): unknown;
}

interface NaverInfoWindow {
  open(map: NaverMap, marker: unknown): void;
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { wedding } = weddingData;
  const { venue } = wedding;

  useEffect(() => {
    const loadMap = () => {
      if (!mapRef.current || !window.naver?.maps) return;

      const position = new window.naver.maps.LatLng(venue.lat, venue.lng);
      const map = new window.naver.maps.Map(mapRef.current, {
        center: position,
        zoom: 16,
        zoomControl: false,
        mapDataControl: false,
        scaleControl: false,
      });

      const marker = new window.naver.maps.Marker({
        position,
        map,
        icon: {
          content: `<div style="
            background:#49311C;color:#fff;padding:6px 14px;
            border-radius:20px;font-size:12px;font-family:'Noto Sans KR',sans-serif;
            white-space:nowrap;box-shadow:0 4px 12px rgba(73,49,28,0.3);letter-spacing:0.05em;
          ">${venue.name}</div>`,
          anchor: { x: 0, y: 0 },
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px 14px;font-size:13px;font-family:'Noto Sans KR',sans-serif;line-height:1.6;">
          <strong style="color:#49311C">${venue.name}</strong><br/>
          <span style="color:#b08a68;font-size:12px;">${venue.address}</span>
        </div>`,
      });

      infoWindow.open(map, marker);
    };

    if (window.naver?.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${weddingData.naverMapsClientId}`;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [venue]);

  const openNaverMap = () => {
    window.open(
      `naver://map/place?lat=${venue.lat}&lng=${venue.lng}&name=${encodeURIComponent(venue.name)}&zoom=16`,
      "_blank"
    );
    setTimeout(() => {
      window.open(`https://map.naver.com/v5/search/${encodeURIComponent(venue.name)}`, "_blank");
    }, 500);
  };

  const openKakaoMap = () => {
    window.open(`kakaomap://look?p=${venue.lat},${venue.lng}`, "_blank");
    setTimeout(() => {
      window.open(
        `https://map.kakao.com/link/map/${encodeURIComponent(venue.name)},${venue.lat},${venue.lng}`,
        "_blank"
      );
    }, 500);
  };

  return (
    <section className="py-24 bg-[#FAFAF7]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4 px-8">
          <p className="font-script text-3xl text-[#49311C]/70 italic">Find us here</p>
          <p className="text-base tracking-widest text-[#49311C]">{venue.name}</p>
          <div className="section-divider" />
          <p className="text-sm text-[#b08a68] font-sans font-light leading-relaxed">
            {venue.address}
            <br />
            <span className="text-xs text-[#b08a68]/70">{venue.addressDetail}</span>
          </p>
        </div>

        {/* 지도 */}
        <div
          ref={mapRef}
          className="w-full bg-[#D7EAE2]/50"
          style={{ height: "280px" }}
        >
          {weddingData.naverMapsClientId === "YOUR_NAVER_MAPS_CLIENT_ID" && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#D7EAE2]/30">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C10.48 2 6 6.48 6 12c0 8 10 18 10 18s10-10 10-18c0-5.52-4.48-10-10-10zm0 13.5A3.5 3.5 0 1 1 16 8.5a3.5 3.5 0 0 1 0 7z" fill="#9cc4b2"/>
              </svg>
              <p className="text-sm text-[#9cc4b2] font-sans text-center leading-relaxed">
                네이버 지도 API 키를 설정해주세요<br/>
                <span className="text-xs text-[#b08a68]/60">lib/wedding-data.ts → naverMapsClientId</span>
              </p>
            </div>
          )}
        </div>

        {/* 길찾기 버튼 */}
        <div className="flex gap-3 px-8 max-w-sm mx-auto">
          <button
            onClick={openNaverMap}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#03C75A] text-white text-xs font-sans tracking-wider hover:brightness-95 transition-all active:scale-[0.98]"
          >
            네이버 지도
          </button>
          <button
            onClick={openKakaoMap}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FEE500] text-[#3C1E1E] text-xs font-sans tracking-wider hover:brightness-95 transition-all active:scale-[0.98]"
          >
            카카오맵
          </button>
        </div>

        <div className="text-center">
          <a
            href={`tel:${venue.tel}`}
            className="text-xs text-[#b08a68] font-sans underline underline-offset-4"
          >
            {venue.tel}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
