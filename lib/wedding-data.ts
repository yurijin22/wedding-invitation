export const weddingData = {
  groom: {
    name: "김용욱",
    lastName: "김",
    firstName: "용욱",
    englishName: "Yongwook Kim",
    fatherName: "김서환",
    motherName: "변경희",
    account: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "김용욱",
    },
    fatherAccount: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "김서한 (부)",
    },
    motherAccount: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "변경희 (모)",
    },
  },
  bride: {
    name: "진유리",
    lastName: "진",
    firstName: "유리",
    englishName: "Yuri Jin",
    fatherName: "진영남",
    motherName: "옹향연",
    account: {
      bank: "우리은행",
      number: "1002-147-864222",
      holder: "진유리",
    },
    fatherAccount: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "진영남 (부)",
    },
    motherAccount: {
      bank: "카카오뱅크",
      number: "3333-00-0000000",
      holder: "옹향연 (모)",
    },
  },
  wedding: {
    date: "2026-09-20",
    dateKorean: "2026년 9월 20일 일요일",
    dateDisplay: "2026.09.20 Sunday 12:10",
    time: "오후 12시 10분",
    venue: {
      name: "신도림 라마다호텔",
      nameKorean: "서울 신도림 라마다호텔 5F 세인트 그레이스홀",
      nameEnglish: "RAMADA Seoul Sindorim 5F Saint Grace Hall",
      hall: "세인트 그레이스홀",
      address: "서울특별시 구로구 경인로 624",
      addressDetail: "5F 세인트 그레이스홀",
      lat: 37.5065595,
      lng: 126.8853578,
      tel: "02-2162-2000",
    },
  },
  notice: {
    date: "2026년 9월 12일 (토) 오후 3시",
    venue: "익산시 여산면 여산리 농협 임직원홀",
  },
  directions: {
    car: [
      "내비게이션 '라마다서울신도림호텔' 검색",
      "경인IC 진출 후 신도림 방면 경인로 직진",
      "호텔 후문 지하주차장 이용 (지하 7층, 800대 규모)",
      "무료 주차: 1시간 30분 (초과 시 15분당 1,000원의 유료 요금 부과)",
    ],
    subway: [
      "1호선 · 2호선 신도림역 하차, 도보 약 5분",
      "1번 출구 나와 횡단보도 건너 경인로 직진",
      "신도림 SK VIEW 건물 옆 라마다호텔 진입",
    ],
    walk: [
      "신도림역 1번 출구 나와 횡단보도 건너기",
      "경인로 방향으로 직진 약 5분",
      "라마다 신도림 호텔 입구 5층 세인트 그레이스홀",
    ],
  },
  message: `마음이 먼저 닿던 순간들이 모여\n어느새 우리가 되었습니다.\n\n이 가을을 시작으로,\n계절마다 깊어지는 마음을 나누며\n다정한 하루하루를 함께하려 합니다.\n\n용욱과 유리의 첫 시작을\n따뜻한 마음으로 축복해 주세요.\n서로를 더 깊이 사랑하며 살겠습니다.`,

  galleryImages: Array.from({ length: 30 }, (_, i) => `/gallery/photo-${i + 1}.jpg`),

  kakaoAppKey: "e281380de260b4977be903e769b659fd",
  naverMapsClientId: "YOUR_NAVER_MAPS_CLIENT_ID",
};

export type WeddingData = typeof weddingData;
