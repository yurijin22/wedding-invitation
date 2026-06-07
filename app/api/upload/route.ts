import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "wedding2026";

// Node 런타임 강제 (sharp는 Edge에서 동작 안 함)
export const runtime = "nodejs";
// 큰 원본 처리 여유
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // 비밀번호 확인
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  // 원본을 최대 1600px로 축소 + WebP 압축 → 로딩 속도 개선
  const input = Buffer.from(await file.arrayBuffer());
  const resized = await sharp(input)
    .rotate() // EXIF 회전 정보 반영
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const baseName = file.name.replace(/\.[^.]+$/, "");
  const blob = await put(`gallery/${Date.now()}-${baseName}.webp`, resized, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({ url: blob.url });
}
