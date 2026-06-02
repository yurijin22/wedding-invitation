"use client";

import { useEffect, useRef } from "react";

const LEAVES = [
  { x: 8,  delay: 0,   dur: 9,  size: 16, rotate: 20,  drift: 30,  color: "#C8854A" },
  { x: 25, delay: 2,   dur: 11, size: 12, rotate: -40, drift: -25, color: "#B5722E" },
  { x: 45, delay: 0.5, dur: 8,  size: 18, rotate: 60,  drift: 20,  color: "#D4A55A" },
  { x: 62, delay: 3,   dur: 10, size: 14, rotate: -20, drift: -30, color: "#A06030" },
  { x: 78, delay: 1,   dur: 12, size: 16, rotate: 45,  drift: 25,  color: "#CC9040" },
  { x: 90, delay: 4,   dur: 9,  size: 13, rotate: -60, drift: -20, color: "#C8854A" },
  { x: 15, delay: 5,   dur: 11, size: 15, rotate: 30,  drift: 35,  color: "#B5722E" },
  { x: 55, delay: 2.5, dur: 10, size: 17, rotate: -35, drift: -15, color: "#D4A55A" },
];

const LEAF_PATH = "M10 1 C13 4 17 6 16 10 C15 14 11 17 8 15 C4 13 2 9 4 6 C6 3 8 -1 10 1Z";

export default function FallingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const style = document.createElement("style");
    style.textContent = LEAVES.map((l, i) => `
      @keyframes fall-${i} {
        0%   { transform: translateY(-40px) translateX(0px) rotate(${l.rotate}deg); opacity: 0; }
        8%   { opacity: 0.32; }
        85%  { opacity: 0.32; }
        100% { transform: translateY(760px) translateX(${l.drift}px) rotate(${l.rotate + 200}deg); opacity: 0; }
      }
      .leaf-${i} {
        animation: fall-${i} ${l.dur}s ${l.delay}s ease-in infinite;
        left: ${l.x}%;
        width: ${l.size}px;
        height: ${l.size}px;
      }
    `).join("");
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className={`leaf-${i}`}
          style={{ position: "absolute", top: 0, opacity: 0 }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 20 20"
            fill={leaf.color}
          >
            <path d={LEAF_PATH} />
          </svg>
        </div>
      ))}
    </div>
  );
}
