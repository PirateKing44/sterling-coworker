"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
  "CEO / Founder",
  "Director / VP",
  "Manager",
  "Marketing / Growth",
  "Operations",
  "Sales",
  "Engineering",
  "Customer Support",
  "Finance",
  "Other",
];

const sources = [
  "Google search",
  "LinkedIn",
  "Twitter / X",
  "Friend or colleague",
  "Podcast",
  "Newsletter",
  "Product Hunt",
  "Other",
];

export default function AboutYou() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [source, setSource] = useState("");

  const canContinue = name.trim() && role;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[var(--muted)]">Step 1 of 4</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Tell us about you</h1>
      <p className="text-[var(--muted)] mb-8">
        A couple quick questions so Sterling can hit the ground running.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Allen Brouwer"
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your role</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-colors ${
                  role === r
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            How did you find us?
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          >
            <option value="">Select an option</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => {
          // TODO: save to Firestore
          router.push("/onboard/about-business");
        }}
        disabled={!canContinue}
        className={`w-full mt-8 px-6 py-4 rounded-full font-semibold text-lg transition-colors ${
          canContinue
            ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            : "bg-[var(--card)] text-[var(--muted)] cursor-not-allowed"
        }`}
      >
        Continue →
      </button>
    </div>
  );
}
