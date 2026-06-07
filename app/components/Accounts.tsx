"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

type Account = { holder: string; bank: string; number: string };

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch { const el = document.createElement("textarea"); el.value = text; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setDone(true); setTimeout(() => setDone(false), 2000);
  };
  return (
    <button onClick={copy} style={{
      width: 46, height: 39,
      backgroundColor: "#361D17", color: "#fff",
      fontSize: 14, fontWeight: 400,
      border: "none", borderRadius: 6,
      cursor: "pointer", flexShrink: 0,
      paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4,
    }}>
      {done ? "✓" : "복사"}
    </button>
  );
}

// 이름(80px) + [은행명/계좌번호(160px)] + 복사버튼(46px), gap=16
function AccountRow({ account }: { account: Account }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: 39 }}>
      {/* 이름 */}
      <p style={{ width: 80, fontSize: 14, fontWeight: 400, color: "#141414", margin: 0, flexShrink: 0 }}>
        {account.holder}
      </p>
      {/* 은행 + 계좌번호 */}
      <div style={{ width: 160, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", margin: 0 }}>{account.bank}</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: "#141414", margin: 0, letterSpacing: "0.004em" }}>{account.number}</p>
      </div>
      <CopyBtn text={account.number} />
    </div>
  );
}

function Group({ title, accounts }: { title: string; accounts: Account[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* 그룹 헤더: h=56, pad t=18 b=18 */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", cursor: "pointer",
          paddingTop: 18, paddingBottom: 18, paddingLeft: 0, paddingRight: 0,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 400, color: "#111111" }}>{title}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          width="20" height="20" viewBox="0 0 20 20" fill="none"
        >
          <path d="M4 8L10 13L16 8" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      {/* 카드: bg=#E4E4E4, radius=10, pad l=16 r=16 t=20 b=20, gap=20 */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              backgroundColor: "#E4E4E4", borderRadius: 10,
              paddingLeft: 16, paddingRight: 16, paddingTop: 20, paddingBottom: 20,
            }}>
              {accounts.map((acc, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: 1, backgroundColor: "#D9D9D9", marginTop: 20, marginBottom: 20 }} />}
                  <AccountRow account={acc} />
                </div>
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
    { title: "신랑측에게", accounts: [groom.account, groom.fatherAccount, groom.motherAccount] },
    { title: "신부측에게", accounts: [bride.account, bride.fatherAccount, bride.motherAccount] },
  ];

  return (
    <section style={{ backgroundColor: "#EFEFEF", paddingTop: 90, paddingBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-110px" }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: 44 }}
      >
        {/* 헤더 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontWeight: 500, fontSize: 30, color: "#141414", lineHeight: "42px", margin: 0 }}>
            With Thanks
          </p>
          <p style={{ fontSize: 14, fontWeight: 300, color: "#8C8C8C", lineHeight: "22px", margin: 0 }}>
            귀한 마음으로 축복해 주시는 것만으로도<br />저희에게는 큰 선물입니다.
          </p>
        </div>

        {/* 그룹들: 좌우 24px 패딩 */}
        <div style={{ paddingLeft: 24, paddingRight: 24, display: "flex", flexDirection: "column", gap: 8 }}>
          {groups.map((g, i) => <Group key={i} title={g.title} accounts={g.accounts} />)}
        </div>
      </motion.div>
    </section>
  );
}
