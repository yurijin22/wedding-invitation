import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  const { blobs } = await list({ prefix: "gallery/" });
  const urls = blobs
    .sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())
    .map((b) => b.url);
  return NextResponse.json({ urls });
}
