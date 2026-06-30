"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 봉투 프레임 — 상단 헤더 + 좌우 여백/라운드. 스크롤하면 프레임이 사라짐(풀블리드).
export default function FrameShell({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  // ⚠️ margin(레이아웃 속성)을 스크롤마다 애니메이션하면 페이지 전체가 재배치돼 버벅임.
  // → 프레임 여백은 고정. 헤더 페이드만 opacity(합성)로 유지.
  const FRAME_MARGIN = 14;
  const headerOpacity = useTransform(scrollY, [0, 120], [1, 0], { clamp: true });

  return (
    <>
      {/* 상단 브라운 헤더 — 스크롤하면 페이드아웃 */}
      <motion.div style={{ opacity: headerOpacity, paddingTop: 17, paddingBottom: 15, textAlign: "center", lineHeight: "24px" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "#E9E3D7" }}>Save the </span>
        <span style={{ fontFamily: "var(--font-italianno)", fontSize: 23, color: "#E9E3D7" }}>Date</span>
      </motion.div>

      {/* 내지 — 스크롤하면 좌우 여백 0으로 (프레임 사라짐). 상단 라운드 0(각짐) */}
      <div
        style={{
          marginLeft: FRAME_MARGIN,
          marginRight: FRAME_MARGIN,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {children}
      </div>
    </>
  );
}
