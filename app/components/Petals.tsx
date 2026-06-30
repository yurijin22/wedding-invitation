"use client";

import type { CSSProperties } from "react";

// 연핑크 장미 꽃잎 — 위치/크기/속도/흔들림을 다양하게(고정값 → 하이드레이션 안전, 자연스러운 연속 낙하)
const PETALS = [
  { left: "4%", size: 13, dur: 12, delay: 0, sway: 28 },
  { left: "13%", size: 9, dur: 15, delay: 4, sway: -22 },
  { left: "22%", size: 15, dur: 10.5, delay: 8, sway: 34 },
  { left: "31%", size: 8, dur: 16, delay: 2, sway: -18 },
  { left: "40%", size: 12, dur: 13, delay: 6.5, sway: 26 },
  { left: "49%", size: 10, dur: 11, delay: 10, sway: -30 },
  { left: "58%", size: 14, dur: 14.5, delay: 1.5, sway: 32 },
  { left: "66%", size: 9, dur: 12.5, delay: 7, sway: -24 },
  { left: "74%", size: 13, dur: 10, delay: 3.5, sway: 28 },
  { left: "82%", size: 8, dur: 15.5, delay: 9, sway: -20 },
  { left: "90%", size: 11, dur: 13.5, delay: 5, sway: 30 },
  { left: "96%", size: 10, dur: 11.5, delay: 11, sway: -26 },
];

export default function Petals() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 45 }}>
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-6%",
            left: p.left,
            width: p.size,
            height: p.size,
            background: "linear-gradient(135deg, #F9D2D9 0%, #EFAEBA 100%)",
            borderRadius: "100% 0 100% 0",
            opacity: 0.8,
            willChange: "transform",
            animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
            ["--sway" as keyof CSSProperties]: `${p.sway}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
