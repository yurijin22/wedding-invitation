import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { loadOrder, ORDER_PATH } from "@/lib/gallery-order";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "wedding2026";

export const runtime = "nodejs";

// 저장된 순서(URL 배열) 반환 — 없으면 빈 배열
export async function GET() {
  try {
    const order = await loadOrder();
    return NextResponse.json({ order }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ order: [] });
  }
}

// 순서 저장
export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { order } = await req.json();
  if (!Array.isArray(order)) {
    return NextResponse.json({ error: "order must be an array" }, { status: 400 });
  }

  await put(ORDER_PATH, JSON.stringify(order), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
