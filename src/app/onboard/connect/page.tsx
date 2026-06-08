"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Tool {
  slug: string;
  name: string;
  category: string;
  icon: string;
}

const curatedTools: Tool[] = [
  // E-commerce & DTC
  { slug: "shopify", name: "Shopify", category: "E-commerce & DTC", icon: "🛍️" },
  { slug: "stripe", name: "Stripe", category: "E-commerce & DTC", icon: "💳" },
  { slug: "klaviyo", name: "Klaviyo", category: "E-commerce & DTC", icon: "📧" },
  { slug: "facebook", name: "Meta Ads", category: "E-commerce & DTC", icon: "📘" },
  // Marketing & Growth
  { slug: "googleads", name: "Google Ads", category: "Marketing & Growth", icon: "📊" },
  { slug: "googleanalytics", name: "Google Analytics", category: "Marketing & Growth", icon: "📈" },
  { slug: "mailchimp", name: "Mailchimp", category: "Marketing & Growth", icon: "🐒" },
  { slug: "hubspot", name: "HubSpot", category: "Marketing & Growth", icon: "🧡" },
  // Productivity
  { slug: "googlesheets", name: "Google Sheets", category: "Productivity", icon: "📗" },
  { slug: "gmail", name: "Gmail", category: "Productivity", icon: "✉️" },
  { slug: "googledrive", name: "Google Drive", category: "Productivity", icon: "📁" },
  { slug: "googlecalendar", name: "Google Calendar", category: "Productivity", icon: "📅" },
];

export default function ConnectTools() {
  const router = useRouter();
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleConnect = async (tool: Tool) => {
    setConnecting(tool.slug);
    setError("");
    try {
      const res = await fetch("/api/composio/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appSlug: tool.slug, appName: tool.name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to connect ${tool.name}`);
        setConnecting(null);
        return;
      }
      const { connectUrl } = await res.json();

      // Open OAuth in a popup
      const popup = window.open(connectUrl, `connect_${tool.slug}`, "width=600,height=700,popup=yes");

      // Poll for popup close (user completed or cancelled OAuth)
      const timer = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(timer);
          // Assume connected on popup close (callback records in Firestore)
          setConnected((prev) => new Set(prev).add(tool.slug));
          setConnecting(null);
        }
      }, 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to connect");
      setConnecting(null);
    }
  };

  const categories = [...new Set(curatedTools.map((t) => t.category))];

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-[var(--muted)]">Step 3 of 4</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">
        Give Sterling tools to work with
      </h1>
      <p className="text-[var(--muted)] mb-8">
        Connect the apps you already use. Sterling works best with access to
        your business data.
      </p>

      {error && (
        <div className="mb-6 px-4 py-2 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/30 text-[var(--accent-red)] text-sm">
          {error}
        </div>
      )}

      {connected.size > 0 && (
        <div className="mb-6 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm inline-block">
          {connected.size} tool{connected.size !== 1 ? "s" : ""} connected
        </div>
      )}

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-3">
              {cat}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {curatedTools
                .filter((t) => t.category === cat)
                .map((tool) => {
                  const isConnected = connected.has(tool.slug);
                  const isConnecting = connecting === tool.slug;

                  return (
                    <button
                      key={tool.slug}
                      onClick={() => !isConnected && handleConnect(tool)}
                      disabled={isConnected || isConnecting}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                        isConnected
                          ? "border-[var(--success)]/50 bg-[var(--success)]/5"
                          : isConnecting
                          ? "border-[var(--accent)]/50 bg-[var(--accent)]/5 animate-pulse"
                          : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--card)]/80"
                      }`}
                    >
                      <span className="text-2xl">{tool.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{tool.name}</div>
                      </div>
                      {isConnected && (
                        <span className="text-[var(--success)] text-lg">✓</span>
                      )}
                      {isConnecting && (
                        <span className="text-[var(--accent)] text-sm">connecting...</span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.push("/onboard/channels")}
          className="flex-1 px-6 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-lg transition-colors"
        >
          Continue →
        </button>
      </div>

      <button
        onClick={() => router.push("/onboard/channels")}
        className="w-full mt-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        Skip for now — you can connect tools later in Slack
      </button>
    </div>
  );
}
