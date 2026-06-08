"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Placeholder channels — in production these come from Slack API
const mockChannels = [
  { id: "C001", name: "general", memberCount: 12 },
  { id: "C002", name: "marketing", memberCount: 8 },
  { id: "C003", name: "sales", memberCount: 6 },
  { id: "C004", name: "product", memberCount: 5 },
  { id: "C005", name: "engineering", memberCount: 9 },
  { id: "C006", name: "customer-support", memberCount: 4 },
  { id: "C007", name: "leadership", memberCount: 3 },
  { id: "C008", name: "random", memberCount: 12 },
];

export default function ChooseChannels() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected(new Set());
    } else {
      setSelected(new Set(mockChannels.map((c) => c.id)));
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

      <button
        onClick={handleSelectAll}
        className="w-full px-5 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors mb-4"
      >
        {selectAll
          ? "Deselect all channels"
          : `Invite Sterling to all ${mockChannels.length} public channels`}
      </button>

      <div className="text-center text-sm text-[var(--muted)] mb-4">
        or select specific channels
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {mockChannels.map((ch) => (
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
                <span className="text-[var(--accent)]">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          // TODO: join selected channels via Slack API
          router.push("/onboard/complete");
        }}
        className="w-full mt-8 px-6 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-lg transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}
