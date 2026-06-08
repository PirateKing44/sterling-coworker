import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Nav */}
      <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-5 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="text-xl font-bold tracking-tight">sterling</div>
        <Link
          href="/onboard"
          className="px-5 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium text-sm transition-colors"
        >
          Get Started for Free
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center text-center max-w-3xl mt-32">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] mb-8">
          Now in early access
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Not a tool.
          <br />
          <span className="bg-gradient-to-r from-[var(--accent)] to-[#a78bfa] bg-clip-text text-transparent">
            A coworker.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted)] max-w-xl mb-10 leading-relaxed">
          Sterling is the AI operating partner that connects to your business
          tools and gets real work done — right inside Slack.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/onboard"
            className="px-8 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-lg transition-colors"
          >
            Get Started for Free
          </Link>
        </div>

        <div className="flex items-center gap-8 mt-10 text-sm text-[var(--muted)]">
          <span>No credit card required</span>
          <span>·</span>
          <span>10,000 free credits</span>
          <span>·</span>
          <span>900+ integrations</span>
        </div>
      </main>

      {/* Value props */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-24 mb-20 px-4">
        {[
          {
            title: "Talk, don't configure",
            desc: "DM Sterling in Slack like a coworker. Ask for reports, summaries, follow-ups — no dashboards needed.",
          },
          {
            title: "Connect your stack",
            desc: "Shopify, Klaviyo, Google Ads, HubSpot, Gmail, and 900+ more. One-click OAuth connection.",
          },
          {
            title: "Safe by default",
            desc: "Read-only actions happen instantly. Write actions require your approval before execution.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
          >
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
