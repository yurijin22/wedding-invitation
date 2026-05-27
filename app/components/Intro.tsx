"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function Intro() {
  const { groom, bride, wedding } = weddingData;

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gallery/photo-1.jpg')" }}
      />
      {/* 다크 초콜릿 오버레이 */}
      <div className="absolute inset-0 bg-[#1E1208]/60" />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center text-white px-8 flex flex-col items-center gap-8">
        {/* 영문 날짜 — 상단 */}
        <motion.p
          className="font-script text-base tracking-[0.15em] text-white/60"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          September 19, 2026
        </motion.p>

        {/* 중앙 이름 블록 */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* 필기체 영문 이름 */}
          <p className="font-script text-5xl font-light tracking-wide leading-tight">
            {groom.englishName.split(" ")[0]}
          </p>

          {/* 민트 구분 */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-[#C8B8A8]/40" />
            <span className="text-[#C8B8A8] font-script text-lg">&amp;</span>
            <div className="flex-1 h-px bg-[#C8B8A8]/40" />
          </div>

          <p className="font-script text-5xl font-light tracking-wide leading-tight">
            {bride.englishName.split(" ")[0]}
          </p>
        </motion.div>

        {/* 한글 이름 + 장소 */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <p className="text-sm tracking-[0.35em] text-white/70 font-sans font-light">
            {groom.firstName} &nbsp;·&nbsp; {bride.firstName}
          </p>
          <p className="text-xs tracking-widest text-white/40 font-sans">
            {wedding.venue.name}
          </p>
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#C8B8A8]/60"
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.2" />
            <motion.rect
              x="9" y="5" width="2" height="6" rx="1" fill="currentColor"
              animate={{ y: [0, 6, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
