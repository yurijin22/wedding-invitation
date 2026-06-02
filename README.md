# 김용욱 · 진유리 모바일 청첩장

**배포 URL:** https://wedding-invitation-0920.vercel.app  
**어드민:** https://wedding-invitation-0920.vercel.app/admin

---

## 로컬 개발 환경 실행

```bash
npm install
npx vercel env pull .env.local   # Vercel 환경변수 로컬 적용 (Blob 토큰 포함)
npm run dev                        # http://localhost:3000
```

## 배포 방법

```bash
git add -A
git commit -m "커밋 메시지"
git push origin main
npx vercel deploy --prod
```

> ⚠️ GitHub push만으로는 자동 배포 안 됨. `npx vercel deploy --prod` 별도 실행 필요.

---

## 섹션 구성

| 번호 | 컴포넌트 | 설명 |
|------|----------|------|
| 01 | `Intro.tsx` | 페이퍼 텍스처 배경, 영문 quote, 사진 2장, Save the Date |
| 02 | `Greeting.tsx` | 한글 인사말, 날짜, 신랑·신부 부모님 |
| 03 | `DateSection.tsx` | 다크 배경 캘린더 스트립, D-day, 구글캘린더 저장 |
| 04 | `Visual.tsx` | 커플 사진 풀블리드 (visual-bg.png + visual-photo.png) |
| 05 | `Gallery.tsx` | 3열 그리드, 9장씩 더보기, 라이트박스 |
| 06 | `Location.tsx` | 다크 배경, 지도 이미지, 네이버/카카오/T맵 길찾기 |
| 07 | `HowToGet.tsx` | 하늘색 배경, 자차/대중교통/도보 탭 |
| 08 | `Notice.tsx` | 피로연 안내 |
| 09 | `Accounts.tsx` | 신랑측/신부측 계좌번호 (부·모 포함) |
| 10 | `Share.tsx` | 카카오톡 공유, 링크 복사 |
| 11 | `Outro.tsx` | 페이퍼 텍스처 배경, 커플 사진, 정보 테이블 |

---

## 콘텐츠 수정 — `lib/wedding-data.ts`

```ts
// 계좌번호 입력
groom.account.number        // 신랑
groom.fatherAccount.number  // 신랑 아버지
groom.motherAccount.number  // 신랑 어머니
bride.fatherAccount.number  // 신부 아버지
bride.motherAccount.number  // 신부 어머니

// 카카오 공유 키
kakaoAppKey: "발급받은_JavaScript_키"
```

---

## 이미지 파일 (public/)

| 파일 | 용도 | 상태 |
|------|------|------|
| `intro-bg.png` | 인트로 배경 | ✅ |
| `outro-bg.png` | 아웃트로 배경 | ✅ |
| `visual-bg.png` | Visual 배경 블러 | ✅ |
| `visual-photo.png` | Visual 메인 사진 | ✅ |
| `locationmap.png` | 커스텀 지도 | ✅ |
| `navermap.png` / `kakaomap.png` / `tmap.png` | 길찾기 버튼 | ✅ |
| `arrow-bottom.png` | 갤러리 화살표 | ✅ |
| `howtoget-icon-*.png` | 교통수단 아이콘 | ✅ |
| `gallery/photo-1~12.jpg` | 임시 사진 → 어드민에서 교체 | 🔄 |

---

## 어드민 페이지 (갤러리 사진 관리)

**URL:** `https://wedding-invitation-0920.vercel.app/admin`  
**기본 비밀번호:** `wedding2026`

- 드래그&드롭으로 사진 업로드 → Vercel Blob 저장 → 갤러리 자동 반영
- 비밀번호 변경: Vercel 대시보드 → Settings → Environment Variables → `ADMIN_PASSWORD` 추가

---

## 남은 작업

- [ ] 계좌번호 실제값 입력 (`lib/wedding-data.ts`)
- [ ] 카카오 공유 App Key 발급
  1. `developers.kakao.com` → 앱 생성 → JavaScript 키 복사
  2. 플랫폼 등록: `https://wedding-invitation-0920.vercel.app`
  3. `lib/wedding-data.ts` → `kakaoAppKey` 업데이트 후 배포
- [ ] 갤러리 사진 어드민(`/admin`)에서 업로드
- [ ] 커스텀 도메인 연결 (선택)

---

## 폰트

| 변수 | 폰트 | 용도 |
|------|------|------|
| `font-script` / `var(--font-script)` | Cormorant Garamond | 섹션 제목 |
| `var(--font-serif)` | Instrument Serif | 날짜, 인용문 |
| `var(--font-italianno)` | Italianno | Together, Weather, Forever, Date |
| body 기본 | Pretendard | 본문 전체 |
