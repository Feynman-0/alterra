import { createHash } from "node:crypto";

/**
 * Admin panel password — intentionally stored in code, per request.
 * Change this before launch, and again any time someone with repo access
 * shouldn't keep admin access.
 */
export const ADMIN_PASSWORD = "Alterra-Granite2026!";

export const ADMIN_COOKIE = "alterra_admin_session";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/** Deterministic session token — no external secret store needed for a single hardcoded password. */
export function adminSessionToken(): string {
  return createHash("sha256").update(`alterra-admin::${ADMIN_PASSWORD}`).digest("hex");
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
