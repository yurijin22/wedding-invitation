import Intro from "@/app/components/Intro";
import Greeting from "@/app/components/Greeting";
import DateSection from "@/app/components/DateSection";
import Gallery from "@/app/components/Gallery";
import Information from "@/app/components/Information";
import Location from "@/app/components/Location";
import HowToGet from "@/app/components/HowToGet";
import Accounts from "@/app/components/Accounts";
import Share from "@/app/components/Share";
import EnvelopeFooter from "@/app/components/EnvelopeFooter";
import FrameShell from "@/app/components/FrameShell";
import Petals from "@/app/components/Petals";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// 봉투 프레임 색 (Our Wedding Day 섹션 배경색과 동일)
const FRAME = "#2F1E11";

// public/gallery 폴더를 자동으로 읽어 이름순 정렬 → 파일만 바꿔도 갤러리 자동 반영(빌드 시)
// 각 이미지 URL 뒤에 내용 해시(?v=)를 붙여, 같은 파일명이라도 내용이 바뀌면 주소가 달라지게 함
// → 카톡 인앱 브라우저 등 강한 캐시 환경에서도 새 이미지를 강제로 받아옴
const galleryDir = path.join(process.cwd(), "public", "gallery");
const galleryImages = fs
  .readdirSync(galleryDir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((f) => {
    const hash = crypto
      .createHash("md5")
      .update(fs.readFileSync(path.join(galleryDir, f)))
      .digest("hex")
      .slice(0, 8);
    return `/gallery/${f}?v=${hash}`;
  });

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 390,
        margin: "0 auto",
        width: "100%",
        position: "relative",
        backgroundColor: FRAME,
        minHeight: "100vh",
      }}
    >
      {/* 봉투 프레임(스크롤하면 사라짐) + 내지 */}
      <FrameShell>
        <Intro />
        <Greeting />
        <DateSection />
        <Gallery images={galleryImages} />
        <Location />
        <HowToGet />
        <Information />
        <Accounts />
        <Share />
      </FrameShell>

      {/* 하단 흰 여백 — Share 아래 화이트를 확대해, 최하단에서 봉투 노치가 이 흰 영역 위에 떠 있게 */}
      <div style={{ height: 120, backgroundColor: "#fff" }} />

      {/* 고정 하단 봉투 — 노치가 0920 감싸다가 스크롤하면 내려와 최하단 흰 영역 위에 안착 */}
      <EnvelopeFooter />

      {/* 연핑크 장미 꽃잎 — 화면 위로 살랑살랑 (장식, 클릭 통과) */}
      <Petals />
    </main>
  );
}
