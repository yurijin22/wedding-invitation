"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

const TABS = [
  { key: "car", label: "자가용", icon: "🚗" },
  { key: "subway", label: "지하철", icon: "🚇" },
  { key: "bus", label: "버스", icon: "🚌" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function Directions() {
  const [active, setActive] = useState<TabKey>("car");
  const { directions } = weddingData;

  const content: Record<TabKey, string[]> = {
    car: directions.car,
    subway: directions.subway,
    bus: directions.bus,
  };

  return (
    <section className="py-24 px-8 bg-[#E9DDD0]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <p className="font-script text-3xl text-[#1E1208]/70 italic">How to get here</p>
          <p className="text-base tracking-widest text-[#1E1208]">오시는 방법</p>
          <div className="section-divider" />
        </div>

        {/* 탭 */}
        <div className="flex bg-[#F8F3EC] rounded-2xl p-1 shadow-[0_2px_12px_rgba(30,18,8,0.06)]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-sans tracking-wider transition-all duration-200
                ${active === tab.key
                  ? "bg-[#1E1208] text-white shadow-sm"
                  : "text-[#8B7060]"
                }
              `}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 내용 */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {content[active].map((line, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-5 h-5 rounded-full bg-[#C8B8A8] text-[#8B7060] flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 font-sans">
                  {i + 1}
                </span>
                <p className="text-sm text-[#3D2B1F] font-sans font-light leading-relaxed">
                  {line}
                </p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
