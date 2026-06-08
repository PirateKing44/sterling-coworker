"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Channel {
  id: string;
  name: string;
  memberCount: number;
}

export default function ChooseChannels() {
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/slack/channels")
      .then((res) => res.json())
      .then((data) => {
        setChannels(data.channels || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load channels");
        setLoading(false);
      });
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected(new Set());
    } else {
      setSelected(new Set(channels.map((c) => c.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleChannel = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContinue = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/onboard/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelIds: [...selected] }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save channels");
      }
      router.push("/onboard/complete");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-[var(--muted)]">Loading channels...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[var(--muted)]">Step 4 of 4</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">
        Which channels should Sterling join?
      </h1>
      <p className="text-[var(--muted)] mb-6">
        Sterling can read channel context to give better answers. You can remove
        it from any channel anytime.
      </p>

      {channels.length > 0 && (
        <button
          onClick={handleSelectAll}
          className="w-full px-5 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors mb-4"
        >
          {selectAll
            ? "Deselect all channels"
            : `Invite Sterling to all ${channels.length} public channels`}
        </button>
      )}

      {channels.length > 0 && (
        <div className="text-center text-sm text-[var(--muted)] mb-4">
          or select specific channels
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => toggleChannel(ch.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
              selected.has(ch.id)
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)]">#</span>
              <span className="font-medium text-sm">{ch.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--muted)]">
                {ch.memberCount} members
              </span>
              {selected.has(ch.id) && (
                <span className="text-[var(--accent)]">&#10003;</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {channels.length === 0 && !error && (
        <p className="text-[var(--muted)] text-sm text-center py-8">
          No public channels found in your workspace.
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      <button
        onClick={handleContinue}
        disabled={saving}
        className="w-full mt-8 px-6 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-lg transition-colors"
      >
        {saving ? "Saving..." : "Continue →"}
      </button>
    </div>
  );
}
