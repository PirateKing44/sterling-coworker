import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Sterling",
  description: "The terms that govern your use of Sterling, the Slack-native AI assistant.",
};

const UPDATED = "June 12, 2026";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
        <Link href="/" className="text-xl font-bold tracking-tight text-[var(--foreground)]">sterling</Link>
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">← Back to home</Link>
      </nav>

      <main className="w-full max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-3">Terms of Service</h1>
        <p className="text-sm text-[var(--muted)] mb-12">Last updated: {UPDATED}</p>

        <div className="space-y-10 text-[var(--foreground)]">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of terms</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              By installing or using Sterling (the &ldquo;Service&rdquo;), you agree to these Terms of
              Service. If you are using Sterling on behalf of an organization, you represent that you
              are authorized to bind that organization to these terms. If you do not agree, do not use
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. The Service</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Sterling is a Slack-native AI assistant that connects to your business tools and performs
              work inside Slack — including audits, reports, drafting, lead enrichment, and automations —
              subject to human approval for actions that change data.
            </p>
          </section>

          <section id="slack-app">
            <h2 className="text-2xl font-bold mb-4">3. Installation &amp; authorized use in Slack</h2>
            <ul className="space-y-3 text-[var(--muted)] leading-relaxed">
              <li><strong className="text-[var(--foreground)]">Authorized installation.</strong> Only a Slack workspace administrator, or a member authorized by one, may install Sterling and grant it access to workspace data.</li>
              <li><strong className="text-[var(--foreground)]">Human-in-the-loop.</strong> Write-capable or external actions are surfaced for explicit human approval inside Slack before execution. You are responsible for reviewing and approving actions taken on your behalf.</li>
              <li><strong className="text-[var(--foreground)]">Connected integrations.</strong> When you connect third-party services, Sterling acts only within the scopes you authorize. Your use of those services remains subject to their own terms.</li>
              <li><strong className="text-[var(--foreground)]">Acceptable use.</strong> Do not use Sterling to violate Slack&apos;s or any integration&apos;s terms, infringe others&apos; rights, or process unlawful content. You may remove the app at any time, which revokes its access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. AI-generated output</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Sterling uses generative AI. Output may be inaccurate or incomplete and is not
              professional, legal, financial, or other expert advice. You are responsible for reviewing
              and verifying important results before relying on or acting on them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Plans, billing &amp; credits</h2>
            <ul className="space-y-3 text-[var(--muted)] leading-relaxed">
              <li>Paid plans are billed on a prepaid credit basis as described at checkout (starting at $50/month for a monthly credit allotment).</li>
              <li>Credits are consumed as the assistant processes requests; you may purchase top-ups.</li>
              <li>You can pause or cancel at any time from your dashboard. Fees already incurred are non-refundable except where required by law or stated at purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your responsibilities</h2>
            <ul className="space-y-3 text-[var(--muted)] leading-relaxed">
              <li>Provide accurate account information and keep credentials secure.</li>
              <li>Use the Service lawfully and only with data you are permitted to process.</li>
              <li>Do not attempt to disrupt, reverse-engineer, or gain unauthorized access to the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Intellectual property</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              The Service, including its software and branding, is owned by Sterling AI. You retain
              ownership of your data and the content you submit. You grant us a limited license to
              process that content solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Disclaimer of warranties</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
              warranties of any kind, express or implied. We do not guarantee specific results, accuracy,
              or uninterrupted operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Limitation of liability</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              To the maximum extent permitted by law, Sterling AI will not be liable for indirect,
              incidental, or consequential damages, or loss of profits, data, or business. Our total
              liability for any claim is limited to the amount you paid for the Service in the three
              months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              You may stop using and remove the Service at any time. We may suspend or terminate access
              for breach of these terms or to protect the Service. Upon termination, your right to use
              the Service ends; data handling follows our{" "}
              <Link href="/privacy" className="text-[var(--google-blue)] font-medium hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Changes to these terms</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              We may update these terms from time to time. Material changes will be posted here with an
              updated date. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Questions about these terms? Email{" "}
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
