"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
};

function calcTimeLeft(): TimeLeft {
  const target = new Date(weddingData.wedding.date);
  target.setHours(0, 0, 0, 0);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0 && diff > -86400000) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false, isToday: true };
  }
  if (diff < 0) {
    return {
      days: Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24)),
      hours: 0, minutes: 0, seconds: 0,
      isPast: true, isToday: false,
    };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false, isToday: false,
  };
}

export default function DDay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const { wedding } = weddingData;

  return (
    <section className="py-24 px-8 bg-[#D7EAE2] text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="space-y-3">
          <p className="font-script text-3xl text-[#49311C]/70 italic">
            {timeLeft.isToday ? "Today is the day" : "Counting down"}
          </p>
          <p className="text-xs tracking-[0.3em] text-[#6aaa94] font-sans">
            {wedding.dateKorean}
          </p>
        </div>

        {timeLeft.isToday ? (
          <p className="text-2xl tracking-widest text-[#49311C]">오늘이에요 ♥</p>
        ) : timeLeft.isPast ? (
          <p className="text-2xl tracking-widest text-[#49311C]">
            결혼 <span className="font-script text-3xl">D+{timeLeft.days}</span>
          </p>
        ) : (
          <div className="flex items-end justify-center gap-2">
            <TimeUnit value={timeLeft.days} label="days" />
            <Colon />
            <TimeUnit value={timeLeft.hours} label="hrs" />
            <Colon />
            <TimeUnit value={timeLeft.minutes} label="min" />
            <Colon />
            <TimeUnit value={timeLeft.seconds} label="sec" />
          </div>
        )}

        {!timeLeft.isToday && !timeLeft.isPast && (
          <p className="text-xs text-[#6aaa94] font-sans font-light tracking-widest">
            결혼식까지 남은 시간
          </p>
        )}
      </motion.div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[52px]">
      <span className="font-script text-4xl text-[#49311C] tabular-nums font-light">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-[#6aaa94] font-sans tracking-widest uppercase">{label}</span>
    </div>
  );
}

function Colon() {
  return (
    <span className="text-[#9cc4b2] text-2xl pb-4 font-light">:</span>
  );
}
