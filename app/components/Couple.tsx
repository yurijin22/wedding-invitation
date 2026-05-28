"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Couple() {
  const { groom, bride, message } = weddingData;

  return (
    <section className="py-24 px-8 text-center bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="max-w-sm mx-auto space-y-12"
      >
        {/* 초대 문구 */}
        <motion.p
          variants={fadeUp}
          className="text-[14px] leading-[2.2] text-[#262626] whitespace-pre-line font-sans font-light tracking-wide"
        >
          {message}
        </motion.p>

        {/* 날짜 */}
        <motion.p
          variants={fadeUp}
          className="text-[13px] text-[#262626]/45 font-sans tracking-widest"
        >
          September 20, 2026
        </motion.p>

        {/* 부모님 & 이름 2컬럼 */}
        <motion.div variants={fadeUp} className="flex items-stretch justify-center gap-0">
          {/* 신랑측 */}
          <div className="flex-1 space-y-1.5 text-left">
            <p className="text-[10.5px] font-sans leading-snug" style={{ color: "#36AE96" }}>
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
            <p className="text-[15px] text-[#1A1A1A] font-sans">{groom.name}</p>
          </div>

          {/* 세로 구분선 */}
          <div className="w-px bg-[#D4CFC9] mx-6 self-stretch" />

          {/* 신부측 */}
          <div className="flex-1 space-y-1.5 text-right">
            <p className="text-[10.5px] font-sans leading-snug" style={{ color: "#36AE96" }}>
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
            <p className="text-[15px] text-[#1A1A1A] font-sans">{bride.name}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
