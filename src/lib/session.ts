import { cookies } from "next/headers";

export interface OnboardingSession {
  teamId: string;
  teamName: string;
  userId: string;
  botToken: string;
}

const COOKIE_NAME = "sterling_onboarding";

export async function setOnboardingSession(session: OnboardingSession) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function getOnboardingSession(): Promise<OnboardingSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  try {
    return JSON.parse(cookie.value) as OnboardingSession;
  } catch {
    return null;
  }
}

export async function clearOnboardingSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
