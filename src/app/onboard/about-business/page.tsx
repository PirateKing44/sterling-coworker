"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const industries = [
  "E-commerce / DTC",
  "SaaS / Software",
  "Agency / Freelance",
  "Professional Services",
  "Real Estate",
  "Healthcare / Wellness",
  "Finance / Fintech",
  "Education",
  "Media / Content",
  "Manufacturing",
  "Other",
];

const sizes = [
  "Just me",
  "2-10",
  "11-50",
  "51-200",
  "200+",
];

const focusAreas = [
  "Marketing & Growth",
  "Sales & CRM",
  "Operations & Project Mgmt",
  "Customer Support",
  "Finance & Accounting",
  "HR & Recruiting",
  "Product & Engineering",
  "Content & Social Media",
];

export default function AboutBusiness() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleFocus = (area: string) => {
    setFocus((prev) =>
      prev.includes(area) ? prev.filter((f) => f !== area) : [...prev, area]
    );
  };

  const canContinue = company.trim() && industry && size && !saving;

  const handleContinue = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/onboard/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim(), industry, size, focusAreas: focus }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save business info");
      }
      router.push("/onboard/connect");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[var(--muted)]">Step 2 of 4</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Tell us about your business</h1>
      <p className="text-[var(--muted)] mb-8">
        This helps Sterling prioritize the right tools and workflows for you.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Sterling AI"
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          >
            <option value="">Select an option</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team size</label>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                  size === s
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            What do you want Sterling to help with? (select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {focusAreas.map((area) => (
              <button
                key={area}
                onClick={() => toggleFocus(area)}
                className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-colors ${
                  focus.includes(area)
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`w-full mt-8 px-6 py-4 rounded-full font-semibold text-lg transition-colors ${
          canContinue
            ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            : "bg-[var(--card)] text-[var(--muted)] cursor-not-allowed"
        }`}
      >
        {saving ? "Saving..." : "Continue →"}
      </button>
    </div>
  );
}
