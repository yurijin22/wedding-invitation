import Intro from "@/app/components/Intro";
import Greeting from "@/app/components/Greeting";
import DateSection from "@/app/components/DateSection";
import Gallery from "@/app/components/Gallery";
import Notice from "@/app/components/Notice";
import Location from "@/app/components/Location";
import HowToGet from "@/app/components/HowToGet";
import Accounts from "@/app/components/Accounts";
import Share from "@/app/components/Share";
import EnvelopeFooter from "@/app/components/EnvelopeFooter";
import FrameShell from "@/app/components/FrameShell";

// 봉투 프레임 색 (Our Wedding Day 섹션 배경색과 동일)
const FRAME = "#2F1E11";
const BAR_H = 100; // 스크롤 후 하단에 남는 봉투(절반) 높이만큼 여백 확보

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
        <Gallery />
        <Location />
        <HowToGet />
        <Notice />
        <Accounts />
        <Share />
      </FrameShell>

      {/* 하단 여백 — 줄어든 고정 바에 마지막 섹션이 가리지 않도록 */}
      <div style={{ height: BAR_H + 14 }} />

      {/* 고정 하단 봉투 — 처음 크게 → 스크롤 시 작아짐 */}
      <EnvelopeFooter />
    </main>
  );
}
