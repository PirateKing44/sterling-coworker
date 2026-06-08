import { NextRequest, NextResponse } from "next/server";
import { getOnboardingSession } from "@/lib/session";

const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY;
const COMPOSIO_BASE = "https://backend.composio.dev/api/v3";
// Use main app's callback so connections are recorded in shared Firestore
const MAIN_APP_URL = process.env.STERLING_APP_URL || "https://sterling-agent-497252720926.us-east1.run.app";

/**
 * Generates a Composio OAuth connect link for a given app.
 * The user clicks this link to authorize their account.
 */
export async function POST(request: NextRequest) {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  if (!COMPOSIO_API_KEY) {
    return NextResponse.json({ error: "Composio not configured" }, { status: 500 });
  }

  const { appSlug, appName } = await request.json();
  if (!appSlug) {
    return NextResponse.json({ error: "appSlug required" }, { status: 400 });
  }

  try {
    // Mirror the working backend flow (server/src/services/composioRest.ts):
    // POST /connected_accounts/link with { auth_config_id, user_id, callback_url }.
    // Connections are keyed by the Slack userId so the agent (which executes as
    // that same userId) can use them. The callback points at the main app's
    // /api/composio/callback so the connection is recorded in shared Firestore.
    const slug = appSlug.toLowerCase().trim().replace(/\s+/g, "_");
    const callbackUrl = `${MAIN_APP_URL}/api/composio/callback?user_id=${encodeURIComponent(
      session.userId
    )}&team_id=${encodeURIComponent(session.teamId)}`;

    const response = await fetch(`${COMPOSIO_BASE}/connected_accounts/link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPOSIO_API_KEY,
      },
      body: JSON.stringify({
        auth_config_id: slug,
        user_id: session.userId,
        callback_url: callbackUrl,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Composio connect link error:", JSON.stringify(data));
      // Distinguish "this app isn't set up in Composio yet" from a real failure.
      const notConfigured =
        data?.error?.slug === "Auth_Config_NotFound" ||
        data?.error?.message?.includes("Default auth config not found");
      if (notConfigured) {
        return NextResponse.json(
          { error: `${appName || appSlug} isn't available to connect yet` },
          { status: 502 }
        );
      }
      return NextResponse.json(
        { error: "Failed to generate connect link" },
        { status: 502 }
      );
    }

    const connectUrl = data.redirect_url;

    if (!connectUrl) {
      console.error("No connect URL in Composio response:", JSON.stringify(data));
      return NextResponse.json(
        { error: "No connect URL returned" },
        { status: 502 }
      );
    }

    return NextResponse.json({ connectUrl });
  } catch (err) {
    console.error("Composio link error:", err);
    return NextResponse.json(
      { error: "Internal error generating connect link" },
      { status: 500 }
    );
  }
}
