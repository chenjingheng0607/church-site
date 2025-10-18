"use client";

import { useEffect, useState } from "react";
import { CirclePlus } from 'lucide-react';

type Prayer = { id: string; name: string | null; message: string; color?: string | null; created_at: string };

export default function PrayerBoard() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState<string>("#FEF9C2");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/prayers")
      .then((r) => r.json())
      .then((d) => {
        if (!isMounted) return;
        setPrayers(Array.isArray(d?.prayers) ? d.prayers : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load prayers.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const displayName = (name?: string | null) => (name && name.trim().length > 0 ? name : "Anonymous");

  const timeAgo = (iso: string) => {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const s = Math.max(1, Math.floor((now - then) / 1000));
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo}mo ago`;
    const y = Math.floor(mo / 12);
    return `${y}y ago`;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || undefined, message: message.trim(), color })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to add prayer");
      if (data?.prayer) {
        setPrayers((prev) => [data.prayer as Prayer, ...prev]);
        setMessage("");
        setShowModal(false);
        // keep name as typed; empty name is treated as Anonymous on render
      }
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to add prayer");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="prayer-board-title" className="relative w-full py-32 bg-cover bg-center" style={{ backgroundImage: "url('/prayer.jpg')" }}>
      <div className="w-[80%] mx-auto">
        <header className="text-left mb-12 pl-4">
          <h2 id="prayer-board-title" className="text-4xl font-bold mb-4 text-[#FF7800]">Prayer Board</h2>
          <p className="text-xl text-white max-w-3xl">Share your prayers anonymously and join others in lifting them up. This is a space to encourage one another, believe together, and be reminded that you are not alone.</p>
        </header>

        

        {loading ? (
          <div className="px-4 text-gray-600">Loading prayers…</div>
        ) : error ? (
          <div className="px-4 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="relative p-5 min-h-[160px] grid place-items-center text-gray-600 hover:text-black hover:border-gray-400 transition-colors"
              aria-label="Add prayer"
            >
              <CirclePlus className="h-20 w-20 text-white" aria-hidden="true" />
            </button>
            {prayers.map((p, idx) => (
              <article
                key={p.id}
                aria-label={`Prayer from ${displayName(p.name)}`}
                className="relative shadow-lg rounded-md p-5 min-h-[160px] transform hover:-translate-y-0.5 transition-transform"
                style={{ rotate: idx % 2 === 0 ? "-1.25deg" : "1.25deg", backgroundColor: p.color || "#FEF9C2" }}
              >
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" aria-hidden="true"></span>
                  <span className="font-medium">{displayName(p.name)}</span>
                  <span className="text-gray-500">• {timeAgo(p.created_at)}</span>
                </div>
                <p className="text-gray-800 leading-relaxed">{p.message}</p>
              </article>
            ))}
            {prayers.length === 0 && (
              <div className="col-span-full px-4 text-gray-600">No prayers yet.</div>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)}></div>
            <div className="relative z-10 w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-4">Add Prayer Request</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Name (optional, leave blank for Anonymous)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <textarea
                  required
                  placeholder="Write your prayer…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <div>
                  <p className="text-sm font-medium mb-2">Choose note color</p>
                  <div className="flex items-center gap-3">
                    {["#DBEAFE", "#DBFCE7", "#F3E8FF", "#FEF9C2"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        aria-label={`Pick color ${c}`}
                        className={`h-7 w-7 rounded-md border ${color === c ? "ring-2 ring-black" : ""}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-md px-4 py-2 text-sm border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="rounded-md bg-black text-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
                  >
                    {submitting ? "Adding…" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


