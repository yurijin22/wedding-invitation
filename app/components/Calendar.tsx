"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const DAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar() {
  const { wedding } = weddingData;
  const target = new Date(wedding.date);
  const year = target.getFullYear();
  const month = target.getMonth();
  const weddingDay = target.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <section className="py-24 px-8 bg-[#F2EBE0]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <p className="font-script text-3xl text-[#1E1208]/70 italic">Save the date</p>
          <div className="section-divider" />
          <p className="text-xs tracking-[0.3em] text-[#8B7060] font-sans">
            {year} . {String(month + 1).padStart(2, "0")}
          </p>
        </div>

        <div className="bg-[#F8F3EC] rounded-2xl p-5 shadow-[0_2px_20px_rgba(30,18,8,0.06)]">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 mb-3">
            {DAYS_KO.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[11px] font-sans font-light py-1 tracking-widest
                  ${i === 0 ? "text-[#c8826a]" : i === 6 ? "text-[#6a94b8]" : "text-[#8B7060]/60"}`}
              >
                {d}
              </div>
            ))}
          </div>

          {rows.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7">
              {row.map((day, di) => (
                <div key={di} className="aspect-square flex items-center justify-center">
                  {day && (
                    <span
                      className={`
                        w-8 h-8 flex items-center justify-center rounded-full text-sm font-sans
                        transition-colors
                        ${day === weddingDay
                          ? "bg-[#1E1208] text-white font-medium"
                          : di === 0
                          ? "text-[#c8826a]"
                          : di === 6
                          ? "text-[#6a94b8]"
                          : "text-[#1E1208]/70"
                        }
                      `}
                    >
                      {day}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm tracking-widest text-[#1E1208]">{wedding.time}</p>
          <p className="text-xs text-[#8B7060] font-sans font-light">
            {wedding.venue.name} · {wedding.venue.hall}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
