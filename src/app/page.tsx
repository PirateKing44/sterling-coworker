import Link from "next/link";
import { ShieldCheck, Zap, Server, Activity } from "lucide-react";

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
          <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a>
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
          Sterling operates on its own secure server built on Google Cloud, right inside your Slack.
          It connects to your business stack, writes and executes code, and automates
          marketing pulses on autopilot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/onboard"
            className="px-8 py-4 rounded-full bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-white font-semibold text-lg transition-colors"
          >
            Hire My AI Employee Now
          </Link>
          <a
            href="#compare"
            className="px-8 py-4 rounded-full border border-[var(--border)] hover:bg-[var(--card)] text-[var(--foreground)] font-semibold text-lg transition-colors"
          >
            See How It Compares
          </a>
        </div>

        <div className="flex items-center gap-6 mt-4 text-sm text-[var(--muted)]">
          <span className="font-semibold">STARTING AT $50/MO</span>
          <span className="text-[var(--border)]">|</span>
          <span>NO PER-SEAT CHARGES</span>
          <span className="text-[var(--border)]">|</span>
          <span>HUMAN-APPROVED ACTIONS</span>
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

      {/* Testimonials */}
      <section className="w-full max-w-4xl mx-auto mt-20 px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
          What early users are saying
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[var(--foreground)]">
          Business owners are going <span className="gradient-text-google">AI-native in week one</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Sterling pulled our Shopify and Klaviyo numbers, built the report, and drafted the recovery campaign before my coffee was cold. It actually does the work — I'm genuinely excited every morning.",
              name: "Marcus Bell",
              role: "Founder, DTC Skincare Brand",
              initials: "MB",
              color: "var(--google-blue)",
            },
            {
              quote:
                "I'm not technical at all. We set Sterling up inside Slack in an afternoon — no IT team, no servers. It just worked. Easiest tool we've ever rolled out.",
              name: "Priya Nair",
              role: "Operations Lead, Coaching Agency",
              initials: "PN",
              color: "var(--google-green)",
            },
            {
              quote:
                "By the end of the first week my whole team was AI-native — everyone was tagging Sterling for audits, drafts, and reports. It changed how we work that fast.",
              name: "Derek Olsen",
              role: "Broker / Owner, Real Estate Group",
              initials: "DO",
              color: "var(--google-yellow)",
            },
          ].map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col">
              <p className="text-sm text-[var(--foreground)] leading-relaxed mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: `color-mix(in srgb, ${t.color} 15%, transparent)`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--muted)] mt-6">Illustrative feedback from early beta users.</p>
      </section>

      {/* Slack Demo Card */}
      <section className="w-full max-w-3xl mx-auto mt-20 px-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-[var(--border)] text-sm text-[var(--muted)] flex items-center gap-2">
            <span className="font-semibold text-[var(--foreground)]">Slack Workspace</span>
            <span className="text-[var(--border)]">{"//"}</span>
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
                <p className="text-sm font-medium mb-1">Subject Line: Don&apos;t leave your cart behind! Enjoy 10% off.</p>
                <p className="text-xs text-[var(--muted)] mb-3">Target Segment: Shopify Abandoned Carts (&gt;24 Hours)</p>
                <p className="text-xs text-[var(--muted)] italic mb-3">
                  &ldquo;Hey, we noticed you left some items in your cart. We saved them for you!
                  Use coupon code BACK10 for 10% off before they disappear...&rdquo;
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
      <section id="compare" className="w-full max-w-5xl mx-auto mt-24 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          How Sterling Compares to
          <br />
          <span className="gradient-text-google">Standard AI Assistants</span>
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">The Shift from Advice to Execution</p>

        <div className="rounded-2xl border border-[var(--border)] overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="text-left px-5 py-4 font-semibold text-[var(--muted)] w-[28%]">Capability</th>
                <th className="text-center px-4 py-4 font-bold text-[var(--google-blue)] bg-[var(--google-blue)]/[0.06]">Sterling</th>
                <th className="text-center px-4 py-4 font-semibold text-[var(--muted)]">Claude.ai</th>
                <th className="text-center px-4 py-4 font-semibold text-[var(--muted)]">OpenClaw</th>
                <th className="text-center px-4 py-4 font-semibold text-[var(--muted)]">ChatGPT</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Lives & works inside your Slack",
                  sterling: "yes",
                  claude: "no",
                  openclaw: "no",
                  chatgpt: "no",
                },
                {
                  feature: "Actually executes tasks (not just answers)",
                  sterling: "yes",
                  claude: "no",
                  openclaw: "partial",
                  chatgpt: "no",
                },
                {
                  feature: "Connects to your business apps (Shopify, Klaviyo, CRMs)",
                  sterling: "yes",
                  claude: "partial",
                  openclaw: "partial",
                  chatgpt: "partial",
                },
                {
                  feature: "Runs & hosts its own code and automations",
                  sterling: "yes",
                  claude: "no",
                  openclaw: "no",
                  chatgpt: "no",
                },
                {
                  feature: "Human-approval gates on write actions",
                  sterling: "yes",
                  claude: "no",
                  openclaw: "no",
                  chatgpt: "no",
                },
                {
                  feature: "Runs scheduled work on autopilot",
                  sterling: "yes",
                  claude: "no",
                  openclaw: "partial",
                  chatgpt: "no",
                },
                {
                  feature: "Built for non-technical business owners",
                  sterling: "yes",
                  claude: "partial",
                  openclaw: "no",
                  chatgpt: "partial",
                },
                {
                  feature: "Flat, predictable pricing",
                  sterling: "yes",
                  claude: "partial",
                  openclaw: "partial",
                  chatgpt: "partial",
                },
              ].map((row) => (
                <tr key={row.feature} className="border-t border-[var(--border)]">
                  <td className="px-5 py-4 font-semibold text-[var(--foreground)]">{row.feature}</td>
                  <Cell value={row.sterling} highlight />
                  <Cell value={row.claude} />
                  <Cell value={row.openclaw} />
                  <Cell value={row.chatgpt} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xs text-[var(--muted)] mt-4">
          Comparison reflects typical out-of-the-box capabilities. Competitor products evolve — check their sites for current features.
        </p>
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
            Connects seamlessly to <strong>3,000+</strong> apps & API endpoints to execute complex multi-app tasks.
          </p>
        </div>
      </section>

      {/* Infrastructure / Trust band */}
      <section className="w-full max-w-4xl mx-auto mt-24 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          Enterprise-grade infrastructure,
          <br />
          <span className="gradient-text-google">built on Google</span>
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">
          Sterling runs on Google Cloud Run, Firestore, and Google Gemini — secure, battle-tested, fast, and reliable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              color: "var(--google-blue)",
              title: "Secure",
              body: "Runs in an isolated Google Cloud environment. Every write action is human-approval-gated and all input is treated as untrusted.",
            },
            {
              icon: Server,
              color: "var(--google-green)",
              title: "Battle-tested",
              body: "Built on the same Google Cloud foundation that powers global-scale products used by billions every day.",
            },
            {
              icon: Zap,
              color: "var(--google-yellow)",
              title: "Fast",
              body: "Direct Gemini reasoning returns real results in seconds — connecting, computing, and reporting, not just chatting.",
            },
            {
              icon: Activity,
              color: "var(--accent-red)",
              title: "Reliable",
              body: "Auto-scaling Cloud Run and managed Firestore mean no servers to babysit and consistent, dependable uptime.",
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `color-mix(in srgb, ${pillar.color} 15%, transparent)`, color: pillar.color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base mb-2 text-[var(--foreground)]">{pillar.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full max-w-lg mx-auto mt-24 px-6 mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          Simple Workspace Pricing
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">
          Starting at only <strong className="text-[var(--foreground)]">$50/month</strong>. Pay only when you are ready to scale.
        </p>

        <div className="rounded-2xl border-2 border-[var(--google-blue)]/30 bg-white p-8 text-center shadow-sm">
          <div className="inline-flex px-3 py-1 rounded-full bg-[var(--google-green)]/10 text-[var(--google-green)] text-xs font-semibold uppercase tracking-wider mb-4">
            Active Beta
          </div>
          <p className="text-sm text-[var(--muted)] mb-2">Team Workspace Access</p>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">Starting at only</p>
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
              "Unlimited App Integrations",
              "Unused credits roll over dynamically",
              "Additional credits at $10 per 5,000 bundle",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--google-green)] mt-0.5">✓</span>
                <span className="text-[var(--foreground)]"><strong>{item}</strong></span>
              </li>
            ))}
          </ul>

          {/* What 20k credits gets you */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-left mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
              What 20,000 credits gets a typical business owner each month
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                "Dozens of weekly multi-app audits & visual reports",
                "Hundreds of drafted emails, ads & campaign copy",
                "A daily automated business-pulse digest in Slack",
                "Routine lead enrichment & CRM logging on autopilot",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--foreground)]">
                  <span className="text-[var(--google-blue)] mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--muted)] mt-3 italic">Typical usage — actual mileage varies with task complexity.</p>
          </div>

          {/* Out of credits / pause */}
          <div className="rounded-xl border border-[var(--google-green)]/30 bg-[var(--google-green)]/[0.04] p-5 text-left mb-8">
            <p className="text-sm font-semibold text-[var(--foreground)] mb-2">Never any surprises</p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              If you run low, Sterling pauses write-actions and tells you right in Slack — no surprise charges.
              Top up anytime with <strong className="text-[var(--foreground)]">$10 / 5,000-credit</strong> bundles,
              or <strong className="text-[var(--foreground)]">pause or cancel your account anytime</strong> from your
              dashboard. No contracts, no lock-in.
            </p>
          </div>

          <Link
            href="/onboard"
            className="block w-full px-6 py-4 rounded-full bg-[var(--foreground)] hover:bg-[var(--foreground)]/90 text-white font-semibold text-lg transition-colors"
          >
            Hire My AI Employee Now
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full max-w-3xl mx-auto px-6 mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[var(--foreground)]">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-[var(--muted)] mb-10">Everything you need to feel confident hiring Sterling</p>

        <div className="space-y-3">
          {[
            {
              q: "Is Sterling secure?",
              a: "Yes. Sterling runs on Google Cloud's isolated infrastructure, so your workspace operates in its own secure environment. Every write-action (sending an email, creating a campaign, updating a record) is gated behind explicit human approval inside Slack, and all incoming content is treated as untrusted by design. We never log your secrets.",
            },
            {
              q: "How robust and reliable is it? What is it built on?",
              a: "Sterling is built on Google Cloud Run, Firestore, and Google Gemini — the same battle-tested foundation that powers global-scale Google products. It auto-scales with your usage, there are no servers for you to manage, and Gemini reasoning returns results in seconds, not minutes.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. There are no contracts and no lock-in. You can pause or cancel your account at any time from your dashboard, and unused credits roll over while your workspace is active.",
            },
            {
              q: "What does it connect to / hook up with?",
              a: "Sterling lives in your Slack and connects to 3,000+ apps and API endpoints — including Shopify, Klaviyo, Meta & Google Ads, QuickBooks, popular CRMs, and Google Workspace (Gmail, Calendar, Drive). If your tools have an API, Sterling can likely work with them.",
            },
            {
              q: "How do I get help or support?",
              a: "You can reach our team directly from your dashboard or by emailing support. During the beta we work closely with every workspace to make sure Sterling is delivering value from week one.",
            },
            {
              q: "What can Sterling actually do?",
              a: "Sterling executes real work: it audits ad spend and store performance, builds visual reports, drafts emails and campaigns in your brand voice, enriches and logs leads to your CRM, reconciles data across tools, and runs scheduled tasks on autopilot — all from a simple Slack message.",
            },
            {
              q: "Is it good for ecommerce?",
              a: "Yes — ecommerce is a core use case. Sterling connects to Shopify, Klaviyo, and your ad platforms to run weekly audits, compare ROAS, recover abandoned carts, and draft promotional campaigns for your approval.",
            },
            {
              q: "Is it good for real estate professionals?",
              a: "Yes. Sterling enriches and logs leads to your CRM, drafts listing and follow-up emails, compiles market and pipeline summaries, and keeps your team coordinated — so agents spend more time with clients and less on admin.",
            },
            {
              q: "Is it good for coaches and consultants?",
              a: "Definitely. Sterling drafts client communications and content in your voice, organizes notes and action items from Slack, schedules recurring check-ins, and keeps your CRM and calendar in sync automatically.",
            },
            {
              q: "Is it good for virtual assistants?",
              a: "Yes — VAs love Sterling because it handles the repetitive execution. It drafts emails, builds reports, moves data between tools, and runs routine tasks on a schedule, freeing you to focus on higher-value work for your clients.",
            },
            {
              q: "Do I need to know how to code?",
              a: "No. Sterling is built for non-technical business owners. You ask in plain English inside Slack, and Sterling figures out the APIs, writes and runs the code, and delivers the finished result — no setup, no servers, no engineering.",
            },
            {
              q: "What happens if I run out of credits?",
              a: "Sterling simply pauses write-actions and lets you know in Slack — there are never surprise charges. You can top up instantly with $10 / 5,000-credit bundles, or wait for your monthly credits to refresh.",
            },
            {
              q: "How fast can my team get started?",
              a: "Most teams are up and running in an afternoon — add Sterling to Slack, connect your apps, and start delegating. Many workspaces report their whole team is 'AI-native' within the first week.",
            },
          ].map((item) => (
            <details key={item.q} className="group rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 font-semibold text-[var(--foreground)] text-sm sm:text-base">
                <span>{item.q}</span>
                <span className="text-[var(--muted)] transition-transform group-open:rotate-45 text-xl leading-none flex-shrink-0">+</span>
              </summary>
              <div className="px-5 pb-5 -mt-1 text-sm text-[var(--muted)] leading-relaxed">{item.a}</div>
            </details>
          ))}
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

function Cell({ value, highlight = false }: { value: string; highlight?: boolean }) {
  const base = "text-center px-4 py-4 align-middle" + (highlight ? " bg-[var(--google-blue)]/[0.04]" : "");
  if (value === "yes") {
    return (
      <td className={base}>
        <span className="text-[var(--google-green)] font-bold text-base">✓</span>
      </td>
    );
  }
  if (value === "no") {
    return (
      <td className={base}>
        <span className="text-[var(--muted)]/50 text-base">✕</span>
      </td>
    );
  }
  return (
    <td className={base}>
      <span className="text-xs text-[var(--muted)]">Limited</span>
    </td>
  );
}
