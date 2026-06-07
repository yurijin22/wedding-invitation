import { put, list, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "wedding2026";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "special/" });
    const result: Record<string, string> = {};
    for (const b of blobs) {
      const key = b.pathname.replace("special/", "").replace(/\.[^.]+$/, "");
      // 재업로드 시 URL이 같아 캐시가 남는 문제 방지: 업로드 시각을 버전으로 부착
      const version = new Date(b.uploadedAt).getTime();
      result[key] = `${b.url}?v=${version}`;
    }
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("special GET error:", e);
    return NextResponse.json({}, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const key = form.get("key") as string;

    if (!file || !key) {
      return NextResponse.json({ error: "Missing file or key" }, { status: 400 });
    }

    // 기존 파일 삭제 후 재업로드
    const { blobs } = await list({ prefix: `special/${key}` });
    for (const b of blobs) {
      await del(b.url);
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const blob = await put(`special/${key}.${ext}`, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });

    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("special POST error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
