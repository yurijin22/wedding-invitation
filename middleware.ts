import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 옛 링크(*.vercel.app) 차단 — 청첩장은 커스텀 도메인(yongwook-yuri.site)에서만 노출.
// vercel.app 으로 들어오면 청첩장을 보여주지 않고 404 처리한다.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    return new NextResponse(
      "<!doctype html><html lang='ko'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>페이지를 찾을 수 없습니다</title></head><body style='margin:0;height:100vh;display:flex;align-items:center;justify-content:center;font-family:-apple-system,system-ui,sans-serif;color:#888;background:#F4F1EC'><p style='font-size:15px'>페이지를 찾을 수 없습니다.</p></body></html>",
      { status: 404, headers: { "content-type": "text/html; charset=utf-8" } }
    );
  }
  return NextResponse.next();
}

export const config = {
  // 정적 에셋 제외한 모든 경로에서 호스트 검사
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
