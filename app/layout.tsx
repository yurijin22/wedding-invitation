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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://yongwook-yuri.site"
  ),
  title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
  description: `${wedding.dateKorean} ${wedding.time} ${wedding.venue.name} ${wedding.venue.hall}`,
  openGraph: {
    title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
    description: `${wedding.dateKorean} ${wedding.time}\n${wedding.venue.name} ${wedding.venue.hall}`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${groom.name} ${bride.name} 청첩장`,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${groom.firstName} ♥ ${bride.firstName} 결혼합니다`,
    description: `${wedding.dateKorean} ${wedding.time}`,
    images: ["/og-image.jpg"],
  },
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
