"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const FRAME = "#2F1E11"; // 봉투 프레임색
const FRAME_MARGIN = 14; // 좌우 프레임 두께

// 봉투 프레임 — 상단 헤더 + 좌우 브라운 테두리. 스크롤하면 좌우 테두리가 옆으로 미끄러져
// 사라지며 내지가 드러남. margin(레이아웃) 대신 고정 요소 + transform/opacity(합성)라 버벅임 없음.
export default function FrameShell({ children }: { children: ReactNode }) {
  const headerOpacity = useMotionValue(1);
  const leftX = useMotionValue(0);
  const rightX = useMotionValue(0);
  const sideOpacity = useMotionValue(1);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const sY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
      const p = Math.min(sY / 160, 1); // 0→1, 160px 동안 프레임이 열림
      leftX.set(-FRAME_MARGIN * p);
      rightX.set(FRAME_MARGIN * p);
      sideOpacity.set(1 - p);
      headerOpacity.set(Math.max(0, 1 - sY / 120));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headerOpacity, leftX, rightX, sideOpacity]);

  return (
    <>
      {/* 상단 브라운 헤더 — 스크롤하면 페이드아웃 */}
      <motion.div style={{ opacity: headerOpacity, paddingTop: 17, paddingBottom: 15, textAlign: "center", lineHeight: "24px" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "#E9E3D7" }}>Save the </span>
        <span style={{ fontFamily: "var(--font-italianno)", fontSize: 23, color: "#E9E3D7" }}>Date</span>
      </motion.div>

      {/* 내지 — 풀블리드(좌우 테두리는 아래 고정 바가 덮음) */}
      <div style={{ overflow: "hidden", backgroundColor: "#fff" }}>{children}</div>

      {/* 좌우 브라운 프레임 — 스크롤하면 옆으로 미끄러지며 사라짐 → 내지 드러남 */}
      <div style={{ position: "fixed", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, pointerEvents: "none", zIndex: 40 }}>
        <motion.div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: FRAME_MARGIN, backgroundColor: FRAME, x: leftX, opacity: sideOpacity }} />
        <motion.div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: FRAME_MARGIN, backgroundColor: FRAME, x: rightX, opacity: sideOpacity }} />
      </div>
    </>
  );
}
