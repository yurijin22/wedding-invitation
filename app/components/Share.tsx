"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (opts: object) => void;
      };
    };
  }
}

export default function Share() {
  const [copied, setCopied] = useState(false);
  const { groom, bride, wedding } = weddingData;

  const shareKakao = () => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao?.init(weddingData.kakaoAppKey);
    }
    if (weddingData.kakaoAppKey === "YOUR_KAKAO_APP_KEY") {
      alert("Kakao App Key를 설정해주세요 (lib/wedding-data.ts)");
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
        description: `${wedding.dateKorean} ${wedding.time}\n${wedding.venue.name} ${wedding.venue.hall}`,
        imageUrl: `${window.location.origin}/og-image.jpg`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
        },
      ],
    });
  };

  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const el = document.createElement("textarea");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
          text: `${wedding.dateKorean} ${wedding.time} ${wedding.venue.name}`,
          url: window.location.href,
        });
      } catch { /* 사용자 취소 */ }
    } else {
      copyURL();
    }
  };

  return (
    <section className="py-24 px-8 bg-[#49311C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto space-y-10 text-center"
      >
        <div className="space-y-4">
          <p className="font-script text-4xl text-white/70 italic">Share the joy</p>
          <div className="w-8 h-px bg-[#D7EAE2]/40 mx-auto" />
          <p className="text-xs tracking-[0.3em] text-white/40 font-sans">
            소중한 분들에게 청첩장을 전해주세요
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={shareKakao}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#FEE500] text-[#3C1E1E] font-sans text-sm tracking-wider hover:brightness-95 transition-all active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M9 1.5C5.02 1.5 1.8 4.1 1.8 7.3c0 2.01 1.28 3.78 3.21 4.81l-.82 3.01 3.47-2.29c.43.06.87.1 1.34.1 3.98 0 7.2-2.6 7.2-5.8S12.98 1.5 9 1.5z" />
            </svg>
            카카오톡으로 공유하기
          </button>

          <button
            onClick={shareWebAPI}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-[#D7EAE2]/30 text-[#D7EAE2] font-sans text-sm tracking-wider hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            {copied ? (
              "복사되었습니다 ✓"
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.5 9.5a3.33 3.33 0 0 0 4.715.041l2-2a3.333 3.333 0 0 0-4.715-4.715l-1.148 1.143M9.5 6.5a3.333 3.333 0 0 0-4.715-.041L2.785 8.459a3.333 3.333 0 0 0 4.715 4.715L8.643 12.03" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                링크 복사하기
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
