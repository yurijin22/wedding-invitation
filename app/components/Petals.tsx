"use client";

import type { CSSProperties } from "react";

// 실제 장미 꽃잎 PNG(투명) — public/flower/01~14.png. 위치/크기/속도/흔들림 다양하게.
const PETALS = [
  { img: "01.png", left: "2%", size: 34, dur: 14, delay: 0, sway: 30 },
  { img: "02.png", left: "11%", size: 24, dur: 17, delay: 5, sway: -26 },
  { img: "03.png", left: "20%", size: 38, dur: 12, delay: 9, sway: 36 },
  { img: "04.png", left: "29%", size: 22, dur: 18, delay: 2.5, sway: -22 },
  { img: "05.png", left: "37%", size: 30, dur: 15, delay: 7, sway: 28 },
  { img: "06.png", left: "45%", size: 26, dur: 13, delay: 11, sway: -32 },
  { img: "07.png", left: "53%", size: 36, dur: 16.5, delay: 1.5, sway: 34 },
  { img: "08.png", left: "61%", size: 23, dur: 14.5, delay: 8, sway: -24 },
  { img: "09.png", left: "69%", size: 32, dur: 12.5, delay: 4, sway: 30 },
  { img: "10.png", left: "77%", size: 25, dur: 17.5, delay: 10, sway: -28 },
  { img: "11.png", left: "85%", size: 34, dur: 13.5, delay: 6, sway: 32 },
  { img: "12.png", left: "92%", size: 22, dur: 16, delay: 12.5, sway: -20 },
  { img: "13.png", left: "7%", size: 28, dur: 15.5, delay: 13, sway: 24 },
  { img: "14.png", left: "97%", size: 27, dur: 14, delay: 3.5, sway: -30 },
];

export default function Petals() {
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 45 }}>
      {PETALS.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`/flower/${p.img}`}
          alt=""
          style={{
            position: "absolute",
            top: "-8%",
            left: p.left,
            width: p.size,
            height: "auto",
            opacity: 0.9,
            willChange: "transform",
            animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
            ["--sway" as keyof CSSProperties]: `${p.sway}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
