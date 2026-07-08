import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "node:crypto";

export const SESSION_COOKIE = "wb_admin";
const SESSION_DAYS = 7;

export function getAuthSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ||
    // Fallback voor lokale ontwikkeling; zet AUTH_SECRET in productie.
    `dev-secret-${process.env.ADMIN_PASSWORD || "onveilig"}`;
  return new TextEncoder().encode(secret);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(password).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function createSessionToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getAuthSecret());
}

export async function setSessionCookie() {
  const token = await createSessionToken();
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
