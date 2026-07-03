import { createHash } from "node:crypto";

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }

  return password;
}

export const ADMIN_COOKIE = "alterra_admin_session";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function adminSessionToken(): string {
  return createHash("sha256").update(`alterra-admin::${getAdminPassword()}`).digest("hex");
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
