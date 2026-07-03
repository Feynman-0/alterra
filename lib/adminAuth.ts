import { createHash } from "node:crypto";

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  return Boolean(adminPassword) && password === adminPassword;
}

export const ADMIN_COOKIE = "alterra_admin_session";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function adminSessionToken(): string {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }

  return createHash("sha256").update(`alterra-admin::${adminPassword}`).digest("hex");
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  };
}
