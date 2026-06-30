"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PHOTOS = ["/1.png", "/1-1.png", "/1-2.png"];

export default function Greeting() {
  return (
    <section style={{ backgroundColor: "#FBF9F4", padding: "90px 24px 96px" }}>
      {/* 비주얼 3단 — 하나씩 순차 페이드인(stagger) */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.45 } } }}
        style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 236, margin: "0 auto" }}
      >
        {PHOTOS.map((src) => (
          <motion.div
            key={src}
            variants={{
              hidden: { opacity: 0, x: -48 },
              show: { opacity: 1, x: 0, transition: { duration: 1.25, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden", backgroundColor: "#E5E5E5" }}
          >
            <Image src={src} alt="" fill sizes="342px" style={{ objectFit: "cover" }} />
          </motion.div>
        ))}
      </motion.div>

      {/* 하단 필기체 — 살짝 기울임 */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        style={{ fontFamily: "'England Signature', var(--font-italianno)", fontSize: 33, lineHeight: "26px", color: "#2F1E11", textAlign: "center", margin: "30px 0 0", transform: "translateX(18px) rotate(-3deg)" }}
      >
        We decide on together<br />from this season to forever
      </motion.p>
    </section>
  );
}
