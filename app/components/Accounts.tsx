"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

type Account = {
  label: string;
  bank: string;
  number: string;
  holder: string;
};

function AccountItem({ account }: { account: Account }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
    } catch {
      const el = document.createElement("textarea");
      el.value = account.number;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-[#D7EAE2] last:border-0">
      <div className="space-y-0.5">
        <p className="text-[11px] text-[#b08a68] font-sans tracking-wider">{account.bank}</p>
        <p className="text-sm text-[#49311C] tracking-wider font-sans">{account.number}</p>
        <p className="text-[11px] text-[#9cc4b2] font-sans">{account.holder}</p>
      </div>
      <button
        onClick={copy}
        className={`
          flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all duration-200
          ${copied
            ? "bg-[#D7EAE2] text-[#6aaa94]"
            : "border border-[#D7EAE2] text-[#9cc4b2] hover:bg-[#D7EAE2] hover:text-[#49311C]"
          }
        `}
      >
        {copied ? "복사됨 ✓" : "복사"}
      </button>
    </div>
  );
}

function AccordionGroup({ title, accounts }: { title: string; accounts: Account[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(73,49,28,0.05)]">
      <button
        className="w-full flex items-center justify-between px-6 py-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm tracking-wider text-[#49311C]">{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#9cc4b2]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 5.5L8 10.5L13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
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
            <div className="px-6 pb-4">
              {accounts.map((acc, i) => (
                <AccountItem key={i} account={acc} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accounts() {
  const { groom, bride } = weddingData;

  const groups = [
    {
      title: `신랑측 — ${groom.lastName}씨 가족`,
      accounts: [
        { label: "신랑", ...groom.account },
        { label: "신랑 아버지", ...groom.fatherAccount },
      ],
    },
    {
      title: `신부측 — ${bride.lastName}씨 가족`,
      accounts: [
        { label: "신부", ...bride.account },
        { label: "신부 아버지", ...bride.fatherAccount },
      ],
    },
  ];

  return (
    <section className="py-24 px-8 bg-[#F4F0E8]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <p className="font-script text-3xl text-[#49311C]/70 italic">With heart</p>
          <p className="text-base tracking-widest text-[#49311C]">마음 전하기</p>
          <div className="section-divider" />
        </div>

        <div className="space-y-3">
          {groups.map((g, i) => (
            <AccordionGroup key={i} title={g.title} accounts={g.accounts} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
