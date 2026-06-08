import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">sterling</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--google-blue)]/10 text-[var(--google-blue)] font-medium">
            Gemini Edition
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm text-[var(--muted)]">
          <a href="#compare" className="hover:text-[var(--foreground)] transition-colors">Why Sterling</a>
          <a href="#roles" className="hover:text-[var(--foreground)] transition-colors">Roles</a>
          <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a>
        </div>
        <Link
          href="/onboard"
          className="px-5 py-2.5 rounded-full bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-white font-medium text-sm transition-colors"
        >
          Hire Sterling
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center text-center max-w-4xl mt-28 px-6 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] mb-8">
          Not just another AI tool. A dedicated hire.
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-[var(--foreground)]">
          The AI Employee Built to
          <br />
          <span className="gradient-text-google">Actually Do the Work</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mb-10 leading-relaxed">
          Sterling operates on its own secure, cloud-based server inside your Slack.
          It connects to your business stack, writes and executes code, and automates
          marketing pulses on autopilot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/onboard"
            className="px-8 py-4 rounded-full bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-white font-semibold text-lg transition-colors"
          >
            Claim 10,000 Free Credits
          </Link>
          <a
            href="#compare"
            className="px-8 py-4 rounded-full border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-semibold text-lg transition-colors"
          >
            See How It Compares
          </a>
        </div>

        <div className="flex items-center gap-6 mt-4 text-sm text-[var(--muted)]">
          <span className="font-semibold">FLAT $50/MO</span>
          <span className="text-[var(--border)]">|</span>
          <span>NO PER-SEAT CHARGES</span>
          <span className="text-[var(--border)]">|</span>
          <span>SOC-2 LEVEL SECURITY</span>
        </div>

        {/* Google / Gemini badge */}
        <div className="flex items-center gap-3 mt-8 px-5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--border)]">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--google-blue)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--google-red)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--google-yellow)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--google-green)]"></span>
          </div>
          <span className="text-sm font-medium text-[var(--muted)]">
            Powered by <strong className="text-[var(--google-blue)]">Google</strong> <strong>Gemini</strong> · <strong className="text-[var(--accent-red)]">XPRIZE</strong> Entry
          </span>
        </div>
      </main>

      {/* Slack Demo Card */}
      <section className="w-full max-w-3xl mx-auto mt-16 px-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-[var(--border)] text-sm text-[var(--muted)] flex items-center gap-2">
            <span className="font-semibold text-[var(--foreground)]">Slack Workspace</span>
            <span className="text-[var(--border)]">//</span>
            <span>#executive-pulse</span>
          </div>

          {/* User message */}
          <div className="px-6 py-4 flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--google-green)]/15 text-[var(--google-green)] flex items-center justify-center text-xs font-bold flex-shrink-0">OP</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">Operator (Founder / VP)</span>
                <span className="text-xs text-[var(--muted)]">10:42 AM</span>
              </div>
              <p className="text-sm text-[var(--foreground)]">
                @Sterling run our weekly Shopify & Klaviyo audit, compare ad ROAS, and draft the weekly recovery campaign.
              </p>
            </div>
          </div>

          {/* Sterling response */}
          <div className="px-6 py-4 flex gap-3 bg-[var(--google-blue)]/[0.02]">
            <div className="w-9 h-9 rounded-lg bg-[var(--google-blue)]/15 text-[var(--google-blue)] flex items-center justify-center text-xs font-bold flex-shrink-0">ST</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">Sterling</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--google-blue)]/10 text-[var(--google-blue)] font-medium">AI Employee</span>
                <span className="text-xs text-[var(--muted)]">10:42 AM</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-3">Connected. Querying your databases and modeling results...</p>

              {/* Metrics */}
              <div className="rounded-xl border border-[var(--border)] bg-white p-4 mb-3">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">Shopify & Klaviyo Sales Pulse · May 25 – May 31</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[var(--muted)]">Net Shopify Sales</p>
                    <p className="text-xl font-bold text-[var(--foreground)]">$42,390</p>
                    <p className="text-xs text-[var(--google-green)] font-medium">▲ +8.4% vs last week</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Klaviyo List Growth</p>
                    <p className="text-xl font-bold text-[var(--foreground)]">+1,240</p>
                    <p className="text-xs text-[var(--google-green)] font-medium">▲ +12.1% net additions</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Meta Ads ROAS</p>
                    <p className="text-xl font-bold text-[var(--foreground)]">3.4x</p>
                    <p className="text-xs text-[var(--muted)]">Holding steady</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[var(--foreground)] mb-3">
                💡 <strong>Insight</strong>: Cart abandonment rates peaked on Wednesday evening.
                Email open rates hold steady at <strong>22.4%</strong>. I am now drafting the
                cart-abandonment promotional newsletter inside Klaviyo as requested.
              </p>

              {/* Approval Card */}
              <div className="rounded-xl border-2 border-[var(--google-yellow)]/50 bg-[var(--google-yellow)]/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--google-yellow)]/20 text-[var(--google-yellow)] font-semibold uppercase tracking-wider">Gating active</span>
                  <span className="text-xs font-semibold text-[var(--foreground)]">Human Approval Required</span>
                </div>
                <p className="text-xs text-[var(--muted)] mb-1 font-mono">API Destination: klaviyo.create_campaign_draft</p>
                <p className="text-sm font-medium mb-1">Subject Line: Don't leave your cart behind! Enjoy 10% off.</p>
                <p className="text-xs text-[var(--muted)] mb-3">Target Segment: Shopify Abandoned Carts (&gt;24 Hours)</p>
                <p className="text-xs text-[var(--muted)] italic mb-3">
                  "Hey, we noticed you left some items in your cart. We saved them for you!
                  Use coupon code BACK10 for 10% off before they disappear..."
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-[var(--google-green)] text-white text-xs font-semibold">Approve & Create Draft</button>
                  <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--muted)]">Edit Copy</button>
                  <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--accent-red)]">Discard</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="compare" className="w-full max-w-4xl mx-auto mt-24 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          How Sterling Compares to
          <br />
          <span className="gradient-text-google">Standard AI Assistants</span>
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">The Shift from Advice to Execution</p>

        <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="text-left px-5 py-4 font-semibold text-[var(--muted)]">Tool / Platform</th>
                <th className="text-left px-5 py-4 font-semibold text-[var(--muted)]">What Standard AI Does</th>
                <th className="text-left px-5 py-4 font-semibold text-[var(--google-blue)]">What Sterling Does Instead</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  tool: "ChatGPT / Copilot",
                  standard: "Tells you how to audit your ad spend or summarize files.",
                  sterling: "Connects directly to your platforms, extracts raw metrics, compiles calculations, and formats a visual report in Slack.",
                },
                {
                  tool: "Zapier",
                  standard: "Executes highly rigid, static rules that you must manually configure and pay per-task fees for.",
                  sterling: "Utilizes Gemini reasoning to determine the exact APIs needed, and builds/executes dynamic workflows based on plain text.",
                },
                {
                  tool: "Claude Code / Code Assistants",
                  standard: "Writes block code and leaves you to figure out how to compile, host, or connect it.",
                  sterling: "Operates on its own server, executes sandboxed code routines, and delivers actual ready-to-use artifacts directly to your team.",
                },
              ].map((row) => (
                <tr key={row.tool} className="border-t border-[var(--border)]">
                  <td className="px-5 py-4 font-semibold text-[var(--foreground)] whitespace-nowrap">{row.tool}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">{row.standard}</td>
                  <td className="px-5 py-4 text-[var(--foreground)]">{row.sterling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="w-full max-w-4xl mx-auto mt-24 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          One AI Employee. Multiple Specialized Roles.
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">Targeted Business Execution</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "For Founders & CEOs",
              color: "var(--google-blue)",
              items: [
                "Live Business Pulse: Daily aggregated metrics of store sales, CAC, ROAS, and recurring revenue directly in Slack.",
                "Board Updates: Compiles metrics, expenses, and pipeline data into polished board summary emails on schedule.",
                "Lead Enrichment: Extracts, cleans, and logs sales leads from online sources straight to your CRM.",
              ],
            },
            {
              title: "For Marketing & Growth",
              color: "var(--google-green)",
              items: [
                "Ad Audits: Connects to Meta, Google Ads, and Klaviyo to pull performance data and flag anomalies.",
                "Copywriting: Drafts email campaigns, landing page copy, and social posts in your brand voice.",
                "PDF Reports: Generates visual marketing reports with charts and recommendations.",
              ],
            },
            {
              title: "For Operations & Finance",
              color: "var(--google-yellow)",
              items: [
                "Auto Cross-Sync: Reconciles data across Shopify, QuickBooks, and your CRM automatically.",
                "Task Coordination: Extracts action items from Slack threads and tracks completion.",
                "Invoice Audit: Reviews expense data and flags discrepancies for review.",
              ],
            },
          ].map((role) => (
            <div key={role.title} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-4" style={{ color: role.color }}>{role.title}</h3>
              <ul className="space-y-3">
                {role.items.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                    <strong className="text-[var(--foreground)]">{item.split(":")[0]}:</strong>
                    {item.split(":").slice(1).join(":")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integrations badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-[var(--muted)]">Connected Integrations</p>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            Connects seamlessly to <strong>3,000+</strong> API endpoints using{" "}
            <strong className="text-[var(--google-blue)]">Composio</strong> to execute complex multi-app tasks.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full max-w-lg mx-auto mt-24 px-6 mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          Simple Workspace Pricing
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">
          Start with 10,000 free testing credits. Pay only when you are ready to scale.
        </p>

        <div className="rounded-2xl border-2 border-[var(--google-blue)]/30 bg-white p-8 text-center shadow-sm">
          <div className="inline-flex px-3 py-1 rounded-full bg-[var(--google-green)]/10 text-[var(--google-green)] text-xs font-semibold uppercase tracking-wider mb-4">
            Active Beta
          </div>
          <p className="text-sm text-[var(--muted)] mb-2">Team Workspace Access</p>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-5xl font-bold text-[var(--foreground)]">$50</span>
            <span className="text-[var(--muted)]">/ month</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">
            Complete flat workspace pricing. Free 14-day trial with <strong>10,000 shared credits</strong> included.
          </p>

          <ul className="space-y-3 text-sm text-left mb-8">
            {[
              "20,000 Monthly Workspace Credits",
              "Unlimited Workspace Seats (add your entire team)",
              "Unlimited Composio Integrations",
              "Unused credits roll over dynamically",
              "Additional credits at $10 per 5,000 bundle",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--google-green)] mt-0.5">✓</span>
                <span className="text-[var(--foreground)]"><strong>{item}</strong></span>
              </li>
            ))}
          </ul>

          <Link
            href="/onboard"
            className="block w-full px-6 py-4 rounded-full bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-white font-semibold text-lg transition-colors"
          >
            Claim 10,000 Free Credits Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border)] py-8 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--foreground)]">sterling</span>
            <span className="text-[var(--border)]">|</span>
            <span className="text-sm">
              <strong className="text-[var(--google-blue)]">Gemini</strong>{" "}
              <strong className="text-[var(--accent-red)]">XPRIZE</strong> Entry
            </span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            © 2026 Sterling AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
