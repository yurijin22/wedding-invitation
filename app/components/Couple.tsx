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
    <section className="py-24 px-8 text-center bg-[#F2EBE0]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="max-w-sm mx-auto space-y-12"
      >
        {/* 헤더 */}
        <motion.div variants={fadeUp} className="space-y-4">
          <p className="font-script text-4xl text-[#1E1208]/80 tracking-wide">
            We&apos;re getting married
          </p>
          <div className="section-divider" />
        </motion.div>

        {/* 초대 문구 */}
        <motion.p
          variants={fadeUp}
          className="text-[14px] leading-[2.2] text-[#3D2B1F]/80 whitespace-pre-line font-light tracking-wide"
        >
          {message}
        </motion.p>

        {/* 민트 배경 카드 */}
        <motion.div
          variants={fadeUp}
          className="bg-[#C8B8A8]/40 rounded-2xl px-6 py-8 space-y-6"
        >
          <PersonInfo
            side="신랑"
            father={groom.fatherName}
            mother={groom.motherName}
            name={groom.name}
            englishFirst={groom.englishName.split(" ")[0]}
          />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#A89888]/50" />
            <span className="font-script text-xl text-[#8B7060]">&amp;</span>
            <div className="flex-1 h-px bg-[#A89888]/50" />
          </div>
          <PersonInfo
            side="신부"
            father={bride.fatherName}
            mother={bride.motherName}
            name={bride.name}
            englishFirst={bride.englishName.split(" ")[0]}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PersonInfo({
  side,
  father,
  mother,
  name,
  englishFirst,
}: {
  side: string;
  father: string;
  mother: string;
  name: string;
  englishFirst: string;
}) {
  return (
    <div className="space-y-1.5 text-center">
      <p className="font-script text-2xl text-[#1E1208]/60 italic">{englishFirst}</p>
      <p className="text-xl tracking-widest text-[#1E1208]">{name}</p>
      <p className="text-[12px] text-[#8B7060] font-sans font-light tracking-wide">
        {father} · {mother}의 {side === "신부" ? "딸" : "아들"}
      </p>
    </div>
  );
}
