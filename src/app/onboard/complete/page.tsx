"use client";

import { useState } from "react";

const features = [
  "Unlimited messages with Sterling",
  "All 900+ integrations via Composio",
  "Personalized business intelligence",
  "Channel monitoring & proactive insights",
  "Priority support",
];

export default function OnboardComplete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleActivate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create checkout session");
      }
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">✨</div>

      <h1 className="text-3xl font-bold mb-2">You&apos;re all set!</h1>
      <p className="text-[var(--muted)] mb-8 leading-relaxed max-w-md mx-auto">
        Sterling is configured and ready to go. Activate your subscription to
        bring Sterling to life in your Slack workspace.
      </p>

      <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-left mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg font-bold">Sterling Team</h3>
          <div>
            <span className="text-3xl font-bold">$50</span>
            <span className="text-[var(--muted)]">/mo</span>
          </div>
        </div>

        <ul className="space-y-2.5 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm">
              <span className="text-[var(--success)] font-bold">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleActivate}
          disabled={loading}
          className={`w-full px-6 py-4 rounded-full font-semibold text-lg transition-colors ${
            loading
              ? "bg-[var(--card-hover)] text-[var(--muted)] cursor-wait"
              : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
          }`}
        >
          {loading ? "Redirecting to checkout..." : "Activate Sterling →"}
        </button>

        {error && (
          <p className="mt-3 text-sm text-[var(--accent-red)]">{error}</p>
        )}
      </div>

      <p className="text-xs text-[var(--muted)]">
        Secure payment via Stripe. Cancel anytime.
      </p>
    </div>
  );
}
