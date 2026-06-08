import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { getOnboardingSession } from "@/lib/session";

/**
 * Lists public channels from the user's Slack workspace.
 */
export async function GET() {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  try {
    const client = new WebClient(session.botToken);
    const result = await client.conversations.list({
      types: "public_channel",
      exclude_archived: true,
      limit: 200,
    });

    const channels = (result.channels || [])
      .filter((ch) => ch.id && ch.name)
      .map((ch) => ({
        id: ch.id!,
        name: ch.name!,
        memberCount: ch.num_members || 0,
      }))
      .sort((a, b) => b.memberCount - a.memberCount);

    return NextResponse.json({ channels });
  } catch (err) {
    console.error("Slack channels list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 502 }
    );
  }
}
