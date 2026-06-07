"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

declare global {
  interface Window {
    Kakao: { isInitialized: () => boolean; init: (key: string) => void; Share: { sendDefault: (opts: object) => void } };
  }
}

export default function Share() {
  const [copied, setCopied] = useState(false);
  const { groom, bride, wedding } = weddingData;

  const shareKakao = () => {
    if (weddingData.kakaoAppKey === "YOUR_KAKAO_APP_KEY") { alert("Kakao App Key를 설정해주세요"); return; }
    if (!window.Kakao?.isInitialized()) window.Kakao?.init(weddingData.kakaoAppKey);
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
        description: `${wedding.dateKorean} ${wedding.time}\n${wedding.venue.name} ${wedding.venue.hall}`,
        imageUrl: `${window.location.origin}/og-image.jpg`,
        link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
      },
      buttons: [{ title: "청첩장 보기", link: { mobileWebUrl: window.location.href, webUrl: window.location.href } }],
    });
  };

  const copyURL = async () => {
    try { await navigator.clipboard.writeText(window.location.href); }
    catch { const el = document.createElement("textarea"); el.value = window.location.href; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{ backgroundColor: "#fff", paddingLeft: 24, paddingRight: 24, paddingTop: 90, paddingBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: 44 }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#141414", lineHeight: "42px", margin: 0 }}>Share the Joy</p>
          <p style={{ fontSize: 14, fontWeight: 300, color: "#8C8C8C", lineHeight: "22px" }}>소중한 분들에게 청첩장을 전해주세요</p>
        </div>

        {/* 버튼 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button onClick={shareKakao}
            style={{ height: 58, backgroundColor: "#FEE500", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 400, letterSpacing: "0.05em", color: "#381C1C", cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" }}>
            카카오톡 공유하기
          </button>
          <button onClick={copyURL}
            style={{ height: 58, backgroundColor: "transparent", border: "1px solid #361D17", borderRadius: 12, fontSize: 16, fontWeight: 400, letterSpacing: "0.05em", color: "#361D17", cursor: "pointer" }}>
            {copied ? "복사되었습니다 ✓" : "링크 복사하기"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
