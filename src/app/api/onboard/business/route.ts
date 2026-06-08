import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getOnboardingSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await getOnboardingSession();
  if (!session) {
    return NextResponse.json({ error: "No onboarding session" }, { status: 401 });
  }

  const body = await request.json();
  const { company, industry, size, focusAreas } = body;

  if (!company?.trim() || !industry || !size) {
    return NextResponse.json(
      { error: "Company, industry, and size required" },
      { status: 400 }
    );
  }

  const ref = db
    .collection("workspaces")
    .doc(session.teamId)
    .collection("onboarding")
    .doc("business");

  await ref.set(
    {
      companyName: company.trim(),
      industry,
      teamSize: size,
      focusAreas: focusAreas || [],
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  // Also update workspace doc with business info for personalization
  await db.collection("workspaces").doc(session.teamId).update({
    companyName: company.trim(),
    industry,
    teamSize: size,
    focusAreas: focusAreas || [],
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
