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

      new window.naver.maps.Marker({
        position,
        map,
        icon: {
          content: `<div style="
            background:#141414;color:#fff;padding:6px 14px;
            border-radius:20px;font-size:12px;font-family:'Noto Sans KR',sans-serif;
            white-space:nowrap;box-shadow:0 4px 12px rgba(20,20,20,0.25);letter-spacing:0.05em;
          ">${venue.name}</div>`,
          anchor: { x: 0, y: 0 },
        },
      });
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
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-110px" }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="bg-white"
    >
      {/* 지도 영역 */}
      <div
        ref={mapRef}
        className="w-full bg-[#E8E4DE]"
        style={{ height: "280px" }}
      >
        {weddingData.naverMapsClientId === "YOUR_NAVER_MAPS_CLIENT_ID" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xs text-[#AAAAAA] font-sans text-center leading-relaxed">
              지도 영역
              <br />
              <span className="text-[10px]">naverMapsClientId 설정 후 활성화</span>
            </p>
          </div>
        )}
      </div>

      {/* 다크 정보 패널 */}
      <div className="bg-[#261E1A] px-6 pt-7 pb-6 space-y-4">
        <div className="space-y-1">
          <p className="text-[22px] text-white font-sans font-light tracking-wide">
            {venue.name}
          </p>
          <p className="text-[12px] text-white/50 font-sans">{venue.hall}</p>
          <p className="text-[12px] text-white/50 font-sans">{venue.address}</p>
        </div>

        {/* 길찾기 버튼 */}
        <div className="flex gap-2.5 pt-1">
          <button
            onClick={openNaverMap}
            className="flex-1 py-3 rounded-xl bg-[#03C75A] text-white text-[12px] font-sans tracking-wider active:opacity-90 transition-opacity"
          >
            네이버 지도
          </button>
          <button
            onClick={openKakaoMap}
            className="flex-1 py-3 rounded-xl bg-[#FEE500] text-[#3C1E1E] text-[12px] font-sans tracking-wider active:opacity-90 transition-opacity"
          >
            카카오맵
          </button>
        </div>

        <div className="text-center pt-1">
          <a
            href={`tel:${venue.tel}`}
            className="text-[11px] text-white/30 font-sans"
          >
            {venue.tel}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
