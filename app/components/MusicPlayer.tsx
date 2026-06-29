"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 첫 사용자 상호작용(탭/스크롤) 시 자동 재생 시도 — 브라우저 자동재생 정책 대응
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const events = ["click", "touchstart", "scroll", "keydown"] as const;
    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      events.forEach((e) => window.removeEventListener(e, tryPlay));
    };
    events.forEach((e) => window.addEventListener(e, tryPlay, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, tryPlay));
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "음악 끄기" : "음악 켜기"}
        style={{
          position: "absolute", top: 10, right: 12, zIndex: 60,
          width: 40, height: 40, borderRadius: "50%",
          backgroundColor: "rgba(38,30,26,0.5)", backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={playing ? { scaleY: [0.35, 1, 0.35] } : { scaleY: 0.4 }}
            transition={playing ? { duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" } : { duration: 0.2 }}
            style={{ width: 3, height: 15, backgroundColor: "#fff", borderRadius: 2, transformOrigin: "center" }}
          />
        ))}
      </button>
    </>
  );
}
