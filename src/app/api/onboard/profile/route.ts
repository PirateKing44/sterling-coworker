import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getOnboardingSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  const body = await request.json();
  const { name, role, source } = body;

  if (!name?.trim() || !role) {
    return NextResponse.json({ error: "Name and role required" }, { status: 400 });
  }

  const ref = db
    .collection("workspaces")
    .doc(session.teamId)
    .collection("onboarding")
    .doc("profile");

  await ref.set(
    {
      userId: session.userId,
      name: name.trim(),
      role,
      discoverySource: source || null,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  // Also store as user profile for personalization
  const userRef = db
    .collection("workspaces")
    .doc(session.teamId)
    .collection("users")
    .doc(session.userId);

  await userRef.set(
    {
      displayName: name.trim(),
      role,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return NextResponse.json({ ok: true });
}
