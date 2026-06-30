import Intro from "@/app/components/Intro";
import Greeting from "@/app/components/Greeting";
import DateSection from "@/app/components/DateSection";
import Gallery from "@/app/components/Gallery";
import Notice from "@/app/components/Notice";
import Location from "@/app/components/Location";
import HowToGet from "@/app/components/HowToGet";
import Accounts from "@/app/components/Accounts";
import Share from "@/app/components/Share";
import Outro from "@/app/components/Outro";
import FrameShell from "@/app/components/FrameShell";
import MusicPlayer from "@/app/components/MusicPlayer";

// 봉투 프레임 색 (Our Wedding Day 섹션 배경색과 동일)
const FRAME = "#1D1000";

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
      {/* 음악 토글 — 화면 우상단 고정 */}
      <MusicPlayer />

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
        <Outro />
      </FrameShell>
    </main>
  );
}
