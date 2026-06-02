"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function Greeting() {
  const { groom, bride } = weddingData;

  return (
    <section style={{ backgroundColor: "#FFFFFF", height: 590, display: "flex", alignItems: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%", display: "flex", flexDirection: "column", gap: 48 }}
      >
        {/* 본문 3단락 + 날짜 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            마음이 먼저 닿던 순간들이 모여<br />어느새 우리가 되었습니다.
          </p>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            이 가을을 시작으로,<br />계절마다 깊어지는 마음을 나누며<br />다정한 하루하루를 함께하려 합니다.
          </p>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            용욱과 유리의 첫 시작을<br />따뜻한 마음으로 축복해 주세요.<br />서로를 더 깊이 사랑하며 살겠습니다.
          </p>
          {/* 날짜: Instrument Serif, 18px, 행간 26px, 자간 10%, #5F9DDF */}
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: "26px", letterSpacing: "0.1em", color: "#5F9DDF", textAlign: "center", margin: 0 }}>
            2026.09.20 Sunday 12:10
          </p>
        </div>

        {/* 신랑·신부 2컬럼 */}
        <div style={{ display: "flex", paddingLeft: 27, paddingRight: 27 }}>
          {/* 신랑측 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {/* 부모님 라벨: Pretendard Regular, 14px, 행간 18px, #9BA2A8 */}
            <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "#9BA2A8", textAlign: "center", margin: 0 }}>
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
            {/* 신랑 이름: Pretendard Medium, 18px, 행간 26px, #111111 */}
            <p style={{ fontSize: 18, fontWeight: 500, lineHeight: "26px", color: "#111111", margin: 0 }}>
              {groom.name}
            </p>
          </div>

          {/* 세로 구분선 */}
          <div style={{ width: 1, backgroundColor: "#DDDDDD", alignSelf: "stretch", flexShrink: 0 }} />

          {/* 신부측 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "#9BA2A8", textAlign: "center", margin: 0 }}>
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
            <p style={{ fontSize: 18, fontWeight: 500, lineHeight: "26px", color: "#111111", margin: 0 }}>
              {bride.name}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
