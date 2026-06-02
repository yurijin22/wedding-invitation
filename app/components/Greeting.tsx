"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function Greeting() {
  const { groom, bride } = weddingData;

  return (
    <section style={{ backgroundColor: "#FFFFFF", paddingTop: 80, paddingBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* 본문 3단락 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            마음이 먼저 닿던 순간들이 모여<br />어느새 우리가 되었습니다.
          </p>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            이 가을을 시작으로,<br />계절마다 깊어지는 마음을 나누며<br />다정한 하루하루를 함께하려 합니다.
          </p>
          <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center", margin: 0 }}>
            용욱과 유리의 첫 시작을<br />따뜻한 마음으로 축복해 주세요.<br />서로를 더 깊이 사랑하며 살겠습니다.
          </p>
        </div>

        {/* 날짜 — 한글과 간격 48px, 부모님과 간격 56px */}
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: "26px", letterSpacing: "0.1em", color: "#5F9DDF", textAlign: "center", margin: "48px 0 56px" }}>
          2026.09.20 Sunday 12:10
        </p>

        {/* 신랑·신부 2컬럼 */}
        <div style={{ display: "flex", paddingLeft: 27, paddingRight: 27 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "#9BA2A8", textAlign: "center", margin: 0 }}>
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
            <p style={{ fontSize: 20, fontWeight: 500, lineHeight: "26px", color: "#111111", margin: 0 }}>
              {groom.name}
            </p>
          </div>
          <div style={{ width: 1, backgroundColor: "#DDDDDD", alignSelf: "stretch", flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 400, lineHeight: "18px", color: "#9BA2A8", textAlign: "center", margin: 0 }}>
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
            <p style={{ fontSize: 20, fontWeight: 500, lineHeight: "26px", color: "#111111", margin: 0 }}>
              {bride.name}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
