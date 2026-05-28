import Intro from "@/app/components/Intro";
import Couple from "@/app/components/Couple";
import Gallery from "@/app/components/Gallery";
import Map from "@/app/components/Map";
import Directions from "@/app/components/Directions";
import Accounts from "@/app/components/Accounts";
import Share from "@/app/components/Share";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="max-w-[480px] mx-auto w-full">
      <Intro />
      <Couple />
      <Gallery />
      <Map />
      <Directions />
      <Accounts />
      <Share />
      <Footer />
    </main>
  );
}
