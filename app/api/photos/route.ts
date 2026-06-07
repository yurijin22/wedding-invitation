import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { loadOrder, applyOrder } from "@/lib/gallery-order";

export const runtime = "nodejs";

export async function GET() {
  const { blobs } = await list({ prefix: "gallery/" });
  const urls = blobs
    .sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
    .map((b) => b.url);

  const order = await loadOrder();
  const ordered = applyOrder(urls, order);

  return NextResponse.json({ urls: ordered }, { headers: { "Cache-Control": "no-store" } });
}
