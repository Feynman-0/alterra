import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, adminSessionToken, isAdminAuthConfigured, isAdminPassword } from "@/lib/adminAuth";

export async function POST(req: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin password is not configured. Set ADMIN_PASSWORD in Vercel." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || !isAdminPassword(body.password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  (await cookies()).set(ADMIN_COOKIE, adminSessionToken(), adminCookieOptions());
  return NextResponse.json({ ok: true });
}
