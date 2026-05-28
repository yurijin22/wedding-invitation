import { weddingData } from "@/lib/wedding-data";

export default function Footer() {
  const { groom, bride, wedding } = weddingData;

  return (
    <footer className="py-12 px-8 bg-[#261E1A] border-t border-white/10 text-center space-y-2">
      <p className="font-script text-2xl text-[#96C5BC]/70 italic">
        {groom.englishName.split(" ")[0]} &amp; {bride.englishName.split(" ")[0]}
      </p>
      <p className="text-[11px] text-white/20 font-sans tracking-widest">{wedding.dateKorean}</p>
    </footer>
  );
}
