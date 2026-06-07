"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BG = "#1D1000";
const ACCENT = "#9EC5EE";
const DAY_COLOR = "#867774";
const DAYS = ["Thu","Fri","Sat","Sun","Mon","Tue","Wed"];
const NUMS = [17, 18, 19, 20, 21, 22, 23];

function calcDDay() {
  const target = new Date("2026-09-20");
  target.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

export default function DateSection() {
  const [dday, setDday] = useState<number | null>(null);
  useEffect(() => { setDday(calcDDay()); }, []);

  const ddStr =
    dday === null ? "D-00" :
    dday === 0 ? "D-Day" :
    dday > 0 ? `D-${String(dday).padStart(2, "0")}` :
    `D+${Math.abs(dday)}`;

  return (
    <section style={{ backgroundColor: BG, paddingTop: 90, paddingBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Our Wedding Day — Cormorant Garamond SemiBold Italic */}
        <p
          style={{
            fontFamily: "var(--font-script)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 30,
            lineHeight: "42px",
            letterSpacing: "0.4px",
            color: ACCENT,
            textAlign: "center",
            marginBottom: 52,
            marginTop: 0,
          }}
        >
          Our Wedding Day
        </p>

        {/* 캘린더 스트립 — 7컬럼 균등 분할 */}
        <div style={{ display: "flex" }}>
          {DAYS.map((day, i) => {
            const num = NUMS[i];
            const isSun = day === "Sun";
            return (
              <div
                key={day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {/* 요일 레이블 */}
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontWeight: isSun ? 600 : 500,
                    fontSize: isSun ? 20 : 17,
                    lineHeight: "20px",
                    letterSpacing: "0.35px",
                    color: isSun ? ACCENT : DAY_COLOR,
                  }}
                >
                  {day}
                </span>

                {/* 날짜 영역 — 모든 컬럼 height 72px 고정, 세로 중앙정렬 */}
                <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {isSun ? (
                    /* 하트 */
                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="80" height="72" viewBox="0 0 65 58" fill="none">
                        <path
                          d="M32.5 55C32.5 55 3 37.5 3 20C3 10.611 10.611 3 20 3C24.694 3 28.694 5.506 31 9.217C32 10.833 32.5 12 32.5 12C32.5 12 33 10.833 34 9.217C36.306 5.506 40.306 3 45 3C54.389 3 62 10.611 62 20C62 37.5 32.5 55 32.5 55Z"
                          fill={ACCENT}
                        />
                      </svg>
                      {/* 9.20 — 하트 중앙 */}
                      <span style={{
                        position: "absolute",
                        fontFamily: "var(--font-script)",
                        fontWeight: 700,
                        fontSize: 28,
                        lineHeight: "32px",
                        color: BG,
                        marginTop: -6,
                      }}>
                        9.20
                      </span>
                    </div>
                  ) : (
                    /* 일반 날짜 숫자 */
                    <span style={{
                      fontFamily: "var(--font-script)",
                      fontWeight: 700,
                      fontSize: 24,
                      lineHeight: "24px",
                      letterSpacing: "0.35px",
                      color: "#FFFFFF",
                    }}>
                      {num}
                    </span>
                  )}
                </div>

                {/* D-00 — Sun 컬럼만 하트 아래 표시 */}
                {isSun && (
                  <span style={{
                    fontFamily: "var(--font-script)",
                    fontWeight: 700,
                    fontSize: 24,
                    lineHeight: "16px",
                    letterSpacing: "0.6px",
                    color: ACCENT,
                  }}>
                    {ddStr}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 캘린더 저장 버튼 */}
        <button
          style={{
            width: "100%",
            marginTop: 60,
            height: 54,
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 12,
            color: "#fff",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.8px",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("김용욱 진유리 결혼식")}&dates=20260920T031000Z/20260920T051000Z&location=${encodeURIComponent("서울특별시 구로구 경인로 624")}`;
            window.open(url, "_blank");
          }}
        >
          캘린더에 저장하기
        </button>
      </motion.div>
    </section>
  );
}
