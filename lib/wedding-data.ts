export const weddingData = {
  groom: {
    name: "김지훈",
    lastName: "김",
    firstName: "지훈",
    englishName: "Jihun Kim",
    fatherName: "김철수",
    motherName: "이영희",
    account: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "김지훈",
    },
    fatherAccount: {
      bank: "신한은행",
      number: "110-000-000000",
      holder: "김철수",
    },
  },
  bride: {
    name: "이수연",
    lastName: "이",
    firstName: "수연",
    englishName: "Suyeon Lee",
    fatherName: "이민준",
    motherName: "박지영",
    account: {
      bank: "토스뱅크",
      number: "1000-0000-0000",
      holder: "이수연",
    },
    fatherAccount: {
      bank: "국민은행",
      number: "000000-00-000000",
      holder: "이민준",
    },
  },
  wedding: {
    date: "2026-09-19",
    dateKorean: "2026년 9월 19일 토요일",
    time: "오후 2시",
    venue: {
      name: "더 그랜드 볼룸",
      hall: "로즈홀",
      address: "서울특별시 강남구 테헤란로 00길 00",
      addressDetail: "지하 1층 로즈홀",
      lat: 37.5012743,
      lng: 127.039585,
      tel: "02-0000-0000",
    },
  },
  directions: {
    car: [
      "강남구청 방면 테헤란로 진입 후 우회전",
      "건물 지하 주차장 이용 (3시간 무료)",
    ],
    subway: [
      "2호선 선릉역 2번 출구 도보 5분",
      "분당선 선릉역 5번 출구 도보 3분",
    ],
    bus: [
      "간선버스 146, 341, 360 — 선릉역 하차",
      "지선버스 4412 — 선릉역 하차 도보 5분",
    ],
  },
  message: `두 사람이 함께하는 새로운 시작을\n소중한 분들과 함께 나누고 싶습니다.\n\n바쁘신 중에도 부디 참석하시어\n저희의 기쁨을 함께해 주시면\n더없는 영광이겠습니다.`,

  galleryImages: Array.from({ length: 12 }, (_, i) => `/gallery/photo-${i + 1}.jpg`),

  kakaoAppKey: "YOUR_KAKAO_APP_KEY",
  naverMapsClientId: "YOUR_NAVER_MAPS_CLIENT_ID",
};

export type WeddingData = typeof weddingData;
