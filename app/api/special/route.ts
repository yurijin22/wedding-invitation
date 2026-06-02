import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "wedding2026";

// 특별 사진 목록 조회
export async function GET() {
  const { blobs } = await list({ prefix: "special/" });
  const result: Record<string, string> = {};
  for (const b of blobs) {
    const key = b.pathname.replace("special/", "").replace(/\.[^.]+$/, "");
    result[key] = b.url;
  }
  return NextResponse.json(result);
}

// 특별 사진 업로드
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File;
  const key = form.get("key") as string; // intro-1, intro-2, outro

  if (!file || !key) return NextResponse.json({ error: "Missing file or key" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const blob = await put(`special/${key}.${ext}`, file, {
    access: "public",
    allowOverwrite: true,
  });

  return NextResponse.json({ url: blob.url });
}
