"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 낙엽 SVG 모양 3가지
const LEAF_PATHS = [
  // 타원형 잎
  "M10 2 C14 0 20 4 18 10 C16 16 10 18 6 14 C2 10 4 4 10 2Z",
  // 단풍잎 스타일
  "M10 1 C11 5 15 5 16 8 C14 9 15 13 12 13 C11 11 9 11 8 13 C5 13 6 9 4 8 C5 5 9 5 10 1Z",
  // 은행잎 스타일
  "M10 2 C6 4 2 8 4 12 C6 16 10 17 10 17 C10 17 14 16 16 12 C18 8 14 4 10 2Z",
];

const LEAF_COLORS = [
  "#C8854A", // 웜 앰버
  "#B5722E", // 러스트
  "#D4A55A", // 골든
  "#A06030", // 다크 브라운
  "#CC9040", // 오렌지 골드
];

type Leaf = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  pathIndex: number;
  colorIndex: number;
  drift: number;
  rotation: number;
};

function createLeaf(id: number): Leaf {
  return {
    id,
    x: Math.random() * 100,           // 0~100% 가로 위치
    size: 14 + Math.random() * 10,    // 14~24px
    duration: 7 + Math.random() * 6,  // 7~13초
    delay: Math.random() * 5,         // 0~5초 딜레이
    pathIndex: Math.floor(Math.random() * LEAF_PATHS.length),
    colorIndex: Math.floor(Math.random() * LEAF_COLORS.length),
    drift: (Math.random() - 0.5) * 60, // 좌우 드리프트 -30~30px
    rotation: Math.random() * 360,
  };
}

export default function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // 초기 낙엽 6장
    setLeaves(Array.from({ length: 6 }, (_, i) => createLeaf(i)));

    // 2~4초마다 새 낙엽 추가 (최대 8장 유지)
    const interval = setInterval(() => {
      setLeaves(prev => {
        const next = prev.filter(l => l.id > prev[0]?.id - 12);
        return [...next, createLeaf(Date.now())];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      {leaves.map(leaf => (
        <motion.div
          key={leaf.id}
          initial={{
            x: `${leaf.x}vw`,
            y: -40,
            rotate: leaf.rotation,
            opacity: 0,
          }}
          animate={{
            x: [`${leaf.x}vw`, `calc(${leaf.x}vw + ${leaf.drift}px)`],
            y: "780px",
            rotate: leaf.rotation + (Math.random() > 0.5 ? 180 : -180),
            opacity: [0, 0.35, 0.35, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            ease: "linear",
            opacity: { times: [0, 0.1, 0.85, 1] },
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: leaf.size,
            height: leaf.size,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 20 20"
            fill={LEAF_COLORS[leaf.colorIndex]}
          >
            <path d={LEAF_PATHS[leaf.pathIndex]} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
