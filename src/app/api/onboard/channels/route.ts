import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { db } from "@/lib/firebase";
import { getOnboardingSession } from "@/lib/session";

/**
 * Saves selected channels and joins them via Slack API.
 */
export async function POST(request: NextRequest) {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  const { channelIds } = await request.json();
  if (!Array.isArray(channelIds)) {
    return NextResponse.json({ error: "channelIds must be an array" }, { status: 400 });
  }

  // Save selected channels to workspace doc
  await db.collection("workspaces").doc(session.teamId).update({
    allowedChannels: channelIds,
    updatedAt: new Date().toISOString(),
  });

  // Join each selected channel
  const client = new WebClient(session.botToken);
  const joinResults: { id: string; ok: boolean; error?: string }[] = [];

  for (const channelId of channelIds) {
    try {
      await client.conversations.join({ channel: channelId });
      joinResults.push({ id: channelId, ok: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown error";
      joinResults.push({ id: channelId, ok: false, error: msg });
    }
  }

  return NextResponse.json({ ok: true, joined: joinResults });
}
