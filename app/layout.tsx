import type { Metadata } from "next";
import { Cormorant_Garamond, Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { weddingData } from "@/lib/wedding-data";

const cormorant = Cormorant_Garamond({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const { groom, bride, wedding } = weddingData;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${cormorant.variable} ${nanumMyeongjo.variable} ${notoSansKR.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#FAFAF7] text-[#49311C] antialiased">
        {children}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${weddingData.kakaoAppKey}`}
          strategy="lazyOnload"
        />
        <Script id="kakao-init" strategy="lazyOnload">
          {`
            if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
              Kakao.init('${weddingData.kakaoAppKey}');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
