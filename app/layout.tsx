import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Serif, Italianno, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { weddingData } from "@/lib/wedding-data";

const cormorant = Cormorant_Garamond({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const { groom, bride, wedding } = weddingData;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://yongwook-yuri.site";
const OG_TITLE = `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`;
const OG_DESC = `${wedding.dateKorean} ${wedding.time} · ${wedding.venue.name} ${wedding.venue.hall}`;
const OG_IMAGE = `${SITE}/og-image.jpg?v=2`;

// og 태그는 metadata가 아니라 <head> 최상단에 직접 배치(아래) — 카톡 스크래퍼가 head 앞부분만
// 읽어도 og:image를 바로 찾도록. metadata엔 title/description만 둠(중복·후순위 방지).
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: OG_TITLE,
  description: OG_DESC,
};

// 브라우저 UI(상단 상태바/하단 툴바)를 봉투 브라운으로 — 스크롤 시 하단 이음새가 흰색으로 비치는 것 완화
export const viewport: Viewport = {
  themeColor: "#2F1E11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${instrumentSerif.variable} ${italianno.variable} ${notoSansKR.variable}`}
    >
      <head>
        {/* ⭐ OG/카톡 썸네일 — head 최상단(preload 링크들보다 앞)에 둬서 스크래퍼가 즉시 찾음 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE} />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2F1E11" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
