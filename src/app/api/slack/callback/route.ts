import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { db } from "@/lib/firebase";
import { setOnboardingSession } from "@/lib/session";

/**
 * Slack OAuth V2 callback.
 * Exchanges the temporary code for a bot token, stores workspace in Firestore,
 * and sets the onboarding session cookie.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL("/onboard?error=slack_denied", request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/onboard?error=missing_code", request.url)
    );
  }

  try {
    const client = new WebClient();
    const result = await client.oauth.v2.access({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/slack/callback`,
    });

    if (!result.ok || !result.access_token) {
      throw new Error(`Slack OAuth failed: ${result.error}`);
    }

    const teamId = result.team?.id;
    const teamName = result.team?.name || "Unknown";
    const botUserId = result.bot_user_id;
    const botToken = result.access_token;
    const authedUserId = result.authed_user?.id;

    if (!teamId || !authedUserId) {
      throw new Error("Missing team or user ID from Slack OAuth response");
    }

    // Store workspace in Firestore (same schema as the backend)
    const workspaceRef = db.collection("workspaces").doc(teamId);
    const existing = await workspaceRef.get();

    if (!existing.exists) {
      await workspaceRef.set({
        teamId,
        teamName,
        botUserId,
        botToken,
        installStatus: "active",
        defaultPersona: "sterling_operating_partner",
        planTier: "trial",
        allowedChannels: [],
        trustedAdmins: [authedUserId],
        adminUsers: [authedUserId],
        registeredAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        plan: "trial",
        onboardingCompleted: false,
        creditBalance: 20000,
      });
    } else {
      // Update token and admin list
      await workspaceRef.update({
        botToken,
        botUserId,
        updatedAt: new Date().toISOString(),
      });
    }

    // Set onboarding session cookie
    await setOnboardingSession({
      teamId,
      teamName,
      userId: authedUserId,
      botToken,
    });

    return NextResponse.redirect(
      new URL("/onboard/about-you", request.url)
    );
  } catch (err) {
    console.error("Slack OAuth error:", err);
    return NextResponse.redirect(
      new URL("/onboard?error=oauth_failed", request.url)
    );
  }
}
