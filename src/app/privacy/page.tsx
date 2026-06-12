import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Sterling",
  description: "How Sterling collects, uses, stores, and protects your data, including data from your connected Slack workspace.",
};

const UPDATED = "June 12, 2026";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
        <Link href="/" className="text-xl font-bold tracking-tight text-[var(--foreground)]">sterling</Link>
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">← Back to home</Link>
      </nav>

      <main className="w-full max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-3">Privacy Policy</h1>
        <p className="text-sm text-[var(--muted)] mb-12">Last updated: {UPDATED}</p>

        <div className="space-y-10 text-[var(--foreground)]">
          <section>
            <p className="text-[var(--muted)] leading-relaxed">
              Sterling (&ldquo;Sterling,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides a Slack-native AI
              assistant that connects to your business tools and performs work inside Slack. This
              Privacy Policy explains what we collect, how we use it, and the choices you have. It
              covers both our website and the Sterling application you install in Slack.
            </p>
          </section>

          <section id="slack-data">
            <h2 className="text-2xl font-bold mb-4">1. Sterling for Slack — data we process</h2>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              When you install Sterling in your Slack workspace, we process Slack data solely to
              provide the assistant&apos;s functionality:
            </p>
            <ul className="space-y-3 text-[var(--muted)] leading-relaxed">
              <li><strong className="text-[var(--foreground)]">Messages directed to Sterling</strong> — direct messages and channel mentions you send to the bot, plus the recent thread history needed to maintain conversational context.</li>
              <li><strong className="text-[var(--foreground)]">User profile basics</strong> — your Slack user ID and display/real name, used to address you and route approvals.</li>
              <li><strong className="text-[var(--foreground)]">Workspace metadata</strong> — your Slack team ID, team name, and the bot installation token Slack issues during authorization.</li>
              <li><strong className="text-[var(--foreground)]">Action &amp; approval records</strong> — a log of requested actions and human-in-the-loop approvals, with sensitive values redacted.</li>
              <li><strong className="text-[var(--foreground)]">Connected-app data</strong> — when you authorize integrations (e.g. Shopify, Klaviyo, Google Workspace), Sterling accesses only the data needed to perform the tasks you request, within the scopes you grant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Where your data is stored</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Workspace data is stored in Google Cloud Firestore (region <span className="font-mono text-[var(--foreground)]">us-east1</span>),
              logically isolated per workspace by Slack team ID so one workspace can never read
              another&apos;s data. Application secrets and connection tokens are held in Google Secret
              Manager, never in source code, and sensitive text is redacted before it is written to
              our audit logs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How we use your data</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              We use the data above only to generate responses, execute actions you approve, maintain
              conversation context, provide billing and usage accounting, and operate and secure the
              service. We do <strong className="text-[var(--foreground)]">not</strong> sell your data,
              and we do <strong className="text-[var(--foreground)]">not</strong> use the contents of
              your Slack messages or connected-app data to train third-party AI models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Sharing</h2>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              We do not sell or rent personal information. We share data only with:
            </p>
            <ul className="space-y-3 text-[var(--muted)] leading-relaxed">
              <li><strong className="text-[var(--foreground)]">Infrastructure &amp; AI subprocessors</strong> — Google Cloud (hosting/database), Google Gemini (model inference), Composio (integration execution), and Stripe (billing), each processing data only to provide their service to us.</li>
              <li><strong className="text-[var(--foreground)]">Legal authorities</strong> — when required by law or to protect rights and safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Retention &amp; deletion</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              When you remove Sterling from your Slack workspace, we revoke and delete the stored bot
              token and stop accessing your workspace. You may request deletion of your workspace data
              at any time by emailing us at the address below; we will delete it within 30 days, except
              where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Security</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              We apply encryption in transit, per-workspace isolation, secret management, redaction of
              sensitive values in logs, and human-approval gates on actions that change data. No method
              of transmission or storage is 100% secure, but we work to protect your information using
              industry-standard safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your rights</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Depending on your location, you may have the right to access, correct, export, or delete
              your personal information, and to object to or restrict certain processing. To exercise
              these rights, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Children&apos;s privacy</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Sterling is a business product and is not intended for individuals under 18. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to this policy</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              We may update this policy from time to time. We will post the updated version here and
              revise the &ldquo;Last updated&rdquo; date. Continued use of the service after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact us</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Questions about this Privacy Policy or your data? Email{" "}
              <a href="mailto:hello@sterlingcoworker.com" className="text-[var(--google-blue)] font-medium hover:underline">hello@sterlingcoworker.com</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="mt-auto w-full border-t border-[var(--border)] py-8 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-[var(--foreground)]">sterling</span>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
            <a href="mailto:hello@sterlingcoworker.com" className="hover:text-[var(--foreground)] transition-colors">Support</a>
          </div>
          <p className="text-sm text-[var(--muted)]">© 2026 Sterling AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
