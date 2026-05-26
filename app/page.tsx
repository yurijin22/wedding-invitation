import Intro from "@/app/components/Intro";
import Couple from "@/app/components/Couple";
import DDay from "@/app/components/DDay";
import Calendar from "@/app/components/Calendar";
import Gallery from "@/app/components/Gallery";
import Accounts from "@/app/components/Accounts";
import Map from "@/app/components/Map";
import Directions from "@/app/components/Directions";
import Share from "@/app/components/Share";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="max-w-[480px] mx-auto w-full">
      <Intro />
      <Couple />
      <DDay />
      <Calendar />
      <Gallery />
      <Accounts />
      <Map />
      <Directions />
      <Share />
      <Footer />
    </main>
  );
}
