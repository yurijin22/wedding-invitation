"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

type Person = {
  label: string;
  name: string;
  bank: string;
  number: string;
};

function AccountRow({ person }: { person: Person }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.number);
    } catch {
      const el = document.createElement("textarea");
      el.value = person.number;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-[#E8E4E0]">
      <button
        className="w-full flex items-center px-6 py-[18px]"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[12px] text-[#8C8C8C] font-sans w-24 text-left leading-none">
          {person.label}
        </span>
        <span className="flex-1" />
        <span className="text-[14px] text-[#141414] font-sans mr-3 leading-none">
          {person.name}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          className="text-[#AAAAAA] flex-shrink-0"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mx-6 mb-5 bg-[#F5F3F0] rounded-2xl px-4 py-4 space-y-2.5">
              <p className="text-[10.5px] text-[#8C8C8C] font-sans text-center tracking-wider">
                {person.bank}
              </p>
              <p className="text-[15px] text-[#141414] font-sans text-center tracking-widest">
                {person.number}
              </p>
              <button
                onClick={copy}
                className="w-full py-2.5 bg-[#141414] text-white text-[12px] font-sans rounded-xl tracking-wider transition-opacity active:opacity-80"
              >
                {copied ? "복사됨 ✓" : "계좌번호 복사"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accounts() {
  const { groom, bride } = weddingData;

  const people: Person[] = [
    { label: "신랑", name: groom.account.holder, bank: groom.account.bank, number: groom.account.number },
    { label: "신랑 아버지", name: groom.fatherAccount.holder, bank: groom.fatherAccount.bank, number: groom.fatherAccount.number },
    { label: "신부", name: bride.account.holder, bank: bride.account.bank, number: bride.account.number },
    { label: "신부 아버지", name: bride.fatherAccount.holder, bank: bride.fatherAccount.bank, number: bride.fatherAccount.number },
  ];

  return (
    <section className="py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto"
      >
        <div className="text-center mb-10 px-8">
          <p className="font-script text-[30px] text-[#141414] italic mb-3">Monetary gift</p>
          <div className="w-8 h-px bg-[#D4CFC9] mx-auto mb-4" />
          <p className="text-[11.5px] text-[#8C8C8C] font-sans leading-relaxed">
            마음을 전하고 싶으신 분들을 위해
            <br />
            계좌번호를 안내해드립니다
          </p>
        </div>

        <div>
          {people.map((person, i) => (
            <AccountRow key={i} person={person} />
          ))}
          <div className="border-t border-[#E8E4E0]" />
        </div>
      </motion.div>
    </section>
  );
}
