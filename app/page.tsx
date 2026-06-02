import Intro from "@/app/components/Intro";
import Greeting from "@/app/components/Greeting";
import DateSection from "@/app/components/DateSection";
import Visual from "@/app/components/Visual";
import Gallery from "@/app/components/Gallery";
import Notice from "@/app/components/Notice";
import Location from "@/app/components/Location";
import HowToGet from "@/app/components/HowToGet";
import Accounts from "@/app/components/Accounts";
import Share from "@/app/components/Share";
import Outro from "@/app/components/Outro";

export default function Home() {
  return (
    <main className="max-w-[390px] mx-auto w-full">
      <Intro />
      <Greeting />
      <DateSection />
      <Visual />
      <Gallery />
      <Location />
      <HowToGet />
      <Notice />
      <Accounts />
      <Share />
      <Outro />
    </main>
  );
}
