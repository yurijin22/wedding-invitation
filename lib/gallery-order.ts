import { list } from "@vercel/blob";

export const ORDER_PATH = "config/gallery-order.json";

// 저장된 갤러리 순서(URL 배열) 반환 — 없으면 빈 배열
export async function loadOrder(): Promise<string[]> {
  const { blobs } = await list({ prefix: ORDER_PATH });
  if (blobs.length === 0) return [];
  const res = await fetch(`${blobs[0].url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// 저장된 순서대로 정렬, 순서에 없는(새로 올라온) 사진은 뒤에 붙임
export function applyOrder(urls: string[], order: string[]): string[] {
  if (order.length === 0) return urls;
  const set = new Set(urls);
  const ordered = order.filter((u) => set.has(u));
  const orderedSet = new Set(ordered);
  const rest = urls.filter((u) => !orderedSet.has(u));
  return [...ordered, ...rest];
}
