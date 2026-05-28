export const weddingData = {
  groom: {
    name: "김용욱",
    lastName: "김",
    firstName: "용욱",
    englishName: "Yong Wook Kim",
    fatherName: "김서한",
    motherName: "변경희",
    account: {
      bank: "우리은행",
      number: "000-000-000000",  // 추후 입력
      holder: "김용욱",
    },
    fatherAccount: {
      bank: "우리은행",
      number: "000-000-000000",  // 추후 입력
      holder: "김서한",
    },
  },
  bride: {
    name: "진유리",
    lastName: "진",
    firstName: "유리",
    englishName: "Yu Ri Jin",
    fatherName: "진영남",
    motherName: "옹향연",
    account: {
      bank: "우리은행",
      number: "1002-147-864222",
      holder: "진유리",
    },
    fatherAccount: {
      bank: "농협은행",
      number: "000-0000-0000-00",  // 추후 입력
      holder: "진영남",
    },
  },
  wedding: {
    date: "2026-09-20",
    dateKorean: "2026년 9월 20일 일요일",
    time: "오후 12시 10분",
    venue: {
      name: "신도림 라마다",
      hall: "세인트 그레이스홀",
      address: "서울특별시 구로구 신도림동 420-10",
      addressDetail: "5층 세인트 그레이스홀",
      lat: 37.5091,
      lng: 126.8913,
      tel: "02-2162-2000",
    },
  },
  directions: {
    car: [
      "경인고속도로 이용 시 신도림IC 진출, 신도림역 방면으로 진입",
      "서부간선도로 이용 시 신도림 방면 출구 후 직진",
      "건물 주차장 이용 가능 (행사 당일 주차 여부 사전 확인 권장)",
    ],
    subway: [
      "1호선 · 2호선 신도림역 하차",
      "1번 출구에서 도보 약 5분 (350m)",
    ],
    bus: [
      "간선버스 640 · 670 — 신도림역 하차 후 도보 5분",
      "지선버스 6514 · 6516 — 신도림역 하차 후 도보 5분",
      "마을버스 구로01 — 신도림역 하차",
    ],
  },
  message: `마음이 먼저 닿는 순간들이 쌓여\n어느새 우리가 되었습니다.\n\n이 가을을 시작으로 모든 계절을 함께하며,\n앞으로의 나날들을 행복으로 채워가고자 합니다.\n\n보내주시는 따뜻한 마음만큼,\n서로를 더 깊이 사랑하며 살아가겠습니다.`,

  galleryImages: Array.from({ length: 30 }, (_, i) => `/gallery/photo-${i + 1}.jpg`),

  kakaoAppKey: "YOUR_KAKAO_APP_KEY",
  naverMapsClientId: "YOUR_NAVER_MAPS_CLIENT_ID",
};

export type WeddingData = typeof weddingData;
