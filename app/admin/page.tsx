"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const PW_KEY = "admin_pw";

const SPECIAL_SLOTS = [
  { key: "intro-1", label: "인트로 사진 1", size: "120×120" },
  { key: "intro-2", label: "인트로 사진 2", size: "120×120" },
  { key: "outro",   label: "아웃트로 사진", size: "155×155" },
];

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [special, setSpecial] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved) { setPw(saved); setAuthed(true); }
  }, []);

  const login = () => {
    setPw(pwInput);
    sessionStorage.setItem(PW_KEY, pwInput);
    setAuthed(true);
  };

  const fetchPhotos = useCallback(async () => {
    const res = await fetch("/api/photos");
    const data = await res.json();
    setPhotos(data.urls ?? []);
  }, []);

  const fetchSpecial = useCallback(async () => {
    const res = await fetch("/api/special");
    const data = await res.json();
    setSpecial(data);
  }, []);

  useEffect(() => {
    if (authed) { fetchPhotos(); fetchSpecial(); }
  }, [authed, fetchPhotos, fetchSpecial]);

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": pw },
        body: form,
      });
    }
    await fetchPhotos();
    setUploading(false);
  };

  const uploadSpecial = async (key: string, file: File) => {
    setUploadingKey(key);
    const form = new FormData();
    form.append("file", file);
    form.append("key", key);
    await fetch("/api/special", {
      method: "POST",
      headers: { "x-admin-password": pw },
      body: form,
    });
    await fetchSpecial();
    setUploadingKey(null);
  };

  const deletePhoto = async (url: string) => {
    if (!confirm("삭제할까요?")) return;
    setDeleting(url);
    await fetch("/api/delete", {
      method: "POST",
      headers: { "x-admin-password": pw, "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    await fetchPhotos();
    setDeleting(null);
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F4F1EC" }}>
        <div style={{ backgroundColor: "#fff", padding: 40, borderRadius: 16, width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: "var(--font-script)", fontStyle: "italic", fontSize: 24, textAlign: "center", color: "#261E1A", margin: 0 }}>
            관리자 로그인
          </p>
          <input type="password" placeholder="비밀번호" value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ height: 46, borderRadius: 10, border: "1px solid #E0DDD8", padding: "0 16px", fontSize: 15, outline: "none" }}
          />
          <button onClick={login}
            style={{ height: 46, backgroundColor: "#261E1A", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, cursor: "pointer" }}>
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4F1EC", padding: "40px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>

        {/* ── 특별 사진 ── */}
        <div>
          <p style={{ fontSize: 18, fontWeight: 500, color: "#261E1A", marginBottom: 16 }}>특별 사진</p>
          <div style={{ display: "flex", gap: 12 }}>
            {SPECIAL_SLOTS.map(slot => (
              <div key={slot.key} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                {/* 사진 영역 */}
                <div style={{ cursor: "pointer", width: "100%" }}
                  onClick={() => document.getElementById(`special-${slot.key}`)?.click()}>
                  <input id={`special-${slot.key}`} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => e.target.files?.[0] && uploadSpecial(slot.key, e.target.files[0])} />
                  <div style={{
                    width: "100%", aspectRatio: "1", backgroundColor: "#E4E4E4", borderRadius: 10,
                    overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {uploadingKey === slot.key ? (
                      <p style={{ fontSize: 12, color: "#8C8C8C", margin: 0 }}>업로드 중...</p>
                    ) : special[slot.key] ? (
                      <Image src={special[slot.key]} alt={slot.label} fill style={{ objectFit: "cover" }} sizes="180px" />
                    ) : (
                      <p style={{ fontSize: 22, margin: 0 }}>+</p>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#8C8C8C", textAlign: "center", margin: 0 }}>{slot.label}<br />{slot.size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 갤러리 사진 ── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#261E1A", margin: 0 }}>갤러리 사진</p>
            <span style={{ fontSize: 13, color: "#8C8C8C" }}>{photos.length}장</span>
          </div>

          {/* 업로드 영역 */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
            style={{
              border: `2px dashed ${dragOver ? "#361D17" : "#D4CFC9"}`,
              borderRadius: 16, padding: 32, textAlign: "center",
              backgroundColor: dragOver ? "#EDE9E4" : "#fff",
              cursor: "pointer", marginBottom: 16, transition: "all 0.2s",
            }}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input id="file-input" type="file" multiple accept="image/*" style={{ display: "none" }}
              onChange={e => e.target.files && uploadFiles(e.target.files)} />
            {uploading ? (
              <p style={{ fontSize: 15, color: "#361D17", margin: 0 }}>업로드 중...</p>
            ) : (
              <>
                <p style={{ fontSize: 24, margin: "0 0 6px" }}>📷</p>
                <p style={{ fontSize: 14, color: "#261E1A", margin: "0 0 4px", fontWeight: 500 }}>드래그하거나 클릭해서 업로드</p>
                <p style={{ fontSize: 12, color: "#8C8C8C", margin: 0 }}>JPG, PNG, WebP 지원 · 여러 장 한번에 가능</p>
              </>
            )}
          </div>

          {/* 사진 그리드 */}
          {photos.length === 0 ? (
            <p style={{ textAlign: "center", color: "#8C8C8C", fontSize: 14 }}>업로드된 사진이 없습니다</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {photos.map((url, i) => (
                <div key={url} style={{ position: "relative", aspectRatio: "1", backgroundColor: "#D4CFC9", borderRadius: 8, overflow: "hidden" }}>
                  <Image src={url} alt={`photo-${i}`} fill style={{ objectFit: "cover" }} sizes="180px" />
                  <button onClick={() => deletePhoto(url)} disabled={deleting === url}
                    style={{ position: "absolute", top: 4, right: 4, width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(38,30,26,0.7)", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ×
                  </button>
                  <span style={{ position: "absolute", bottom: 4, left: 6, fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
