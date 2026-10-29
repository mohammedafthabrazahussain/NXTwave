import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nxtwave_growth_2025";
const COOKIE_NAME = "campus_pulse_admin_session";

// In-memory / HMAC-style token validation
function getExpectedToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || "default_campus_pulse_secret_key_2025";
  return Buffer.from(`${ADMIN_USERNAME}:${secret}`).toString("base64");
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return (
    user.trim() === ADMIN_USERNAME &&
    pass.trim() === ADMIN_PASSWORD
  );
}

export function isAuthenticatedAdmin(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return token === getExpectedToken();
  } catch {
    return false;
  }
}

export function setAdminCookie(response: NextResponse): void {
  const token = getExpectedToken();
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days session
  });
}

export function clearAdminCookie(response: NextResponse): void {
  response.cookies.delete(COOKIE_NAME);
}

export function checkAdminRequestAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token === getExpectedToken();
}
