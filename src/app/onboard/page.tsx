import Link from "next/link";

export default function OnboardStart() {
  const slackInstallUrl = process.env.NEXT_PUBLIC_SLACK_INSTALL_URL || "#";

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Let's get Sterling into your Slack</h1>
      <p className="text-[var(--muted)] mb-10 leading-relaxed">
        Sterling works as an AI coworker inside your Slack workspace. Connect
        your Slack to get started — it takes about 2 minutes.
      </p>

      <a
        href={slackInstallUrl}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" fill="#E01E5A"/>
        </svg>
        Continue with Slack
      </a>

      <p className="text-sm text-[var(--muted)] mt-6">
        We'll ask for permission to send messages and read channels.
        <br />
        You can remove Sterling anytime from Slack settings.
      </p>

      {/* Temporary: skip Slack OAuth for testing */}
      <Link
        href="/onboard/about-you"
        className="block mt-8 text-sm text-[var(--accent)] hover:underline"
      >
        Skip for now (testing) →
      </Link>
    </div>
  );
}
