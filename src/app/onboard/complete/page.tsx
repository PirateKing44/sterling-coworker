"use client";

export default function OnboardComplete() {
  return (
    <div className="text-center">
      <div className="text-6xl mb-6">🚀</div>

      <h1 className="text-3xl font-bold mb-4">You're all set!</h1>
      <p className="text-[var(--muted)] mb-8 leading-relaxed max-w-md mx-auto">
        Sterling is now in your Slack workspace. Head over to Slack — you'll
        find a welcome message from Sterling with tips on how to get started.
      </p>

      <a
        href="https://slack.com/app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-lg transition-colors"
      >
        Open Slack
      </a>

      <div className="mt-12 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-left">
        <h3 className="font-semibold mb-3">Three ways to work with Sterling:</h3>
        <ul className="space-y-3 text-sm text-[var(--muted)]">
          <li className="flex gap-3">
            <span>💬</span>
            <span>
              <strong className="text-[var(--foreground)]">DM Sterling</strong>{" "}
              — message directly for research, analysis, drafts, and operations work.
            </span>
          </li>
          <li className="flex gap-3">
            <span>📣</span>
            <span>
              <strong className="text-[var(--foreground)]">@Sterling in a channel</strong>{" "}
              — mention Sterling in any channel and it will jump in with the full thread as context.
            </span>
          </li>
          <li className="flex gap-3">
            <span>🔗</span>
            <span>
              <strong className="text-[var(--foreground)]">Connect more tools</strong>{" "}
              — just tell Sterling "connect [app name]" and it will handle the rest.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
