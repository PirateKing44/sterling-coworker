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

  const { appSlug } = await request.json();
  if (!appSlug) {
    return NextResponse.json({ error: "appSlug required" }, { status: 400 });
  }

  try {
    // Generate a connection link via Composio REST API
    const entityId = `${session.teamId}_${session.userId}`;
    const redirectUrl = `${MAIN_APP_URL}/api/composio/callback?user_id=${session.userId}&team_id=${session.teamId}&app=${appSlug}`;

    const response = await fetch(`${COMPOSIO_BASE}/connectedAccounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPOSIO_API_KEY,
      },
      body: JSON.stringify({
        integrationId: appSlug,
        entityId,
        redirectUri: "https://backend.composio.dev/api/v3/toolkits/auth/callback",
        data: {
          redirect_url: redirectUrl,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Composio connect link error:", errText);
      return NextResponse.json(
        { error: "Failed to generate connect link" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const connectUrl = data.redirectUrl || data.connectionUrl || data.url;

    if (!connectUrl) {
      console.error("No connect URL in Composio response:", data);
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
