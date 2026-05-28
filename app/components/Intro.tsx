"use client";

import Image from "next/image";

const QUOTE = `The year's last, loveliest smile falls softly upon this day, as every season we have walked through together gathers in quiet light, blessing the moment we choose to begin again as one,\nwith hearts full of gratitude, tenderness, and a love that will continue\nto bloom through all the years to come.`;

export default function Intro() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "707px",
        backgroundImage: "url('/intro_bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 하단 quote + 사진 두 장 */}
      <div className="absolute left-[18px] right-[18px]" style={{ top: "450px" }}>
        {/* quote */}
        <p
          className="font-script text-[#1A1A1A]/60 leading-relaxed"
          style={{ fontSize: "10px", whiteSpace: "pre-line" }}
        >
          {QUOTE}
        </p>

        {/* 커플 사진 두 장 */}
        <div className="flex gap-[14px] mt-[18px]" style={{ paddingLeft: "47px" }}>
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ width: 122, height: 122, backgroundColor: "#D9D9D9" }}
          >
            <Image
              src="/gallery/photo-1.jpg"
              alt=""
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div
            className="relative overflow-hidden flex-shrink-0"
            style={{ width: 122, height: 122, backgroundColor: "#D9D9D9" }}
          >
            <Image
              src="/gallery/photo-2.jpg"
              alt=""
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
