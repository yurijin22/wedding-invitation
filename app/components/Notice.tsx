"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function Notice() {
  const { notice } = weddingData;

  return (
    <section style={{ backgroundColor: "#fff", paddingTop: 80, paddingBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: 48 }}
      >
        {/* 본문 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#111", textAlign: "center", lineHeight: "42px", margin: 0 }}>
            Notice
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontSize: 16, lineHeight: "30px", color: "#111111", textAlign: "center" }}>
              본식에 함께하기 어려운 분들을 위해<br />
              <strong style={{ fontWeight: 600 }}>작은 피로연 자리</strong>를 마련했습니다.
            </p>
            <p style={{ fontSize: 16, lineHeight: "30px", fontWeight: 300, color: "#111111", textAlign: "center" }}>
              편안한 걸음으로 함께해 주시면<br />더없이 감사한 마음으로 맞이하겠습니다.
            </p>
          </div>
        </div>

        {/* 날짜/장소 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#8C8C8C", minWidth: 25, textAlign: "center" }}>일시</span>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#5F9DDF", lineHeight: "18px" }}>{notice.date}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#8C8C8C", minWidth: 25, textAlign: "center" }}>장소</span>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#5F9DDF", lineHeight: "18px" }}>{notice.venue}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
