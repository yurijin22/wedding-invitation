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

// 봉투 프레임 색 (Our Wedding Day 섹션 배경색과 동일)
const FRAME = "#2F1E11";

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
