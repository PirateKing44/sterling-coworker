import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { db } from "@/lib/firebase";
import { getOnboardingSession, clearOnboardingSession } from "@/lib/session";

export async function POST() {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  // Mark workspace as onboarded
  await db.collection("workspaces").doc(session.teamId).update({
    onboardingCompleted: true,
    updatedAt: new Date().toISOString(),
  });

  // Load profile for personalized welcome
  const profileSnap = await db
    .collection("workspaces")
    .doc(session.teamId)
    .collection("onboarding")
    .doc("profile")
    .get();

  const profile = profileSnap.data();
  const name = profile?.name || "there";

  // Load workspace to count channels
  const workspaceSnap = await db.collection("workspaces").doc(session.teamId).get();
  const workspace = workspaceSnap.data();
  const channelCount = workspace?.allowedChannels?.length || 0;

  // Send welcome DM in Slack
  try {
    const client = new WebClient(session.botToken);

    const dm = await client.conversations.open({ users: session.userId });
    const channelId = dm.channel?.id;

    if (channelId) {
      await client.chat.postMessage({
        channel: channelId,
        text: `Hi ${name}! I'm Sterling, your AI operating partner.`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Hi ${name}!* 👋 I'm Sterling, your AI operating partner.\n\nI've joined *${channelCount} channel${channelCount !== 1 ? "s" : ""}* in your workspace and I'm ready to help.`,
            },
          },
          { type: "divider" },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Here are three ways to work with me:*\n\n💬  *DM me* — Ask me anything: research, analysis, drafts, operations.\n\n📣  *@Sterling in a channel* — Mention me and I'll jump in with context.\n\n🔗  *Connect tools* — Say \"connect Shopify\" and I'll walk you through it.",
            },
          },
          { type: "divider" },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "Try it now — ask me something like \"What can you help me with?\"",
              },
            ],
          },
        ],
      });
    }
  } catch (err) {
    // Welcome DM is best-effort — don't fail onboarding if it errors
    console.error("Failed to send welcome DM:", err);
  }

  // Clear the onboarding session cookie
  await clearOnboardingSession();

  return NextResponse.json({ ok: true });
}
