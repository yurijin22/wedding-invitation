"use client";

import type { CSSProperties } from "react";

// 연핑크 장미 꽃잎 — 위치/크기/속도/흔들림 다양하게(고정값 → 하이드레이션 안전, 자연스러운 연속 낙하)
const PETALS = [
  { left: "4%", size: 16, dur: 13, delay: 0, sway: 30, tilt: -18 },
  { left: "13%", size: 11, dur: 16, delay: 4, sway: -24, tilt: 22 },
  { left: "22%", size: 18, dur: 11.5, delay: 8, sway: 36, tilt: 8 },
  { left: "31%", size: 10, dur: 17, delay: 2, sway: -20, tilt: -30 },
  { left: "40%", size: 14, dur: 14, delay: 6.5, sway: 28, tilt: 14 },
  { left: "49%", size: 12, dur: 12, delay: 10, sway: -32, tilt: -10 },
  { left: "58%", size: 17, dur: 15.5, delay: 1.5, sway: 34, tilt: 26 },
  { left: "66%", size: 11, dur: 13.5, delay: 7, sway: -26, tilt: -16 },
  { left: "74%", size: 15, dur: 11, delay: 3.5, sway: 30, tilt: 18 },
  { left: "82%", size: 10, dur: 16.5, delay: 9, sway: -22, tilt: -24 },
  { left: "90%", size: 13, dur: 14.5, delay: 5, sway: 32, tilt: 6 },
  { left: "96%", size: 12, dur: 12.5, delay: 11, sway: -28, tilt: -12 },
];

export default function Petals() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 45 }}>
      {/* 공용 그라데이션 정의 */}
      <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
        <defs>
          <linearGradient id="petalGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFF3F6" />
            <stop offset="55%" stopColor="#FBE0E6" />
            <stop offset="100%" stopColor="#F6D2DB" />
          </linearGradient>
        </defs>
      </svg>

      {PETALS.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 24 30"
          width={p.size}
          height={p.size * 1.25}
          style={{
            position: "absolute",
            top: "-6%",
            left: p.left,
            opacity: 0.6,
            overflow: "visible",
            willChange: "transform",
            animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
            ["--sway" as keyof CSSProperties]: `${p.sway}px`,
          } as CSSProperties}
        >
          {/* 살짝 휜 장미 꽃잎 모양 */}
          <path
            d="M12 0.5 C5.5 4 2.5 12 7 22 C9 26.5 11 28.5 12 29.5 C13 28.5 15.5 26 18 21.5 C22 13.5 18.5 4 12 0.5 Z"
            fill="url(#petalGrad)"
            transform={`rotate(${p.tilt} 12 15)`}
          />
        </svg>
      ))}
    </div>
  );
}
