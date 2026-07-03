import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_PASSWORD, adminCookieOptions, adminSessionToken } from "@/lib/adminAuth";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  (await cookies()).set(ADMIN_COOKIE, adminSessionToken(), adminCookieOptions());
  return NextResponse.json({ ok: true });
}
