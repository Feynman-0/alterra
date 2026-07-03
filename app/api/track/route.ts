import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/store";

const VID_COOKIE = "alterra_vid";
const VID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Records one page view. Fired by <PageTracker> on every route change. */
export async function POST(req: Request) {
  let body: { path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
  const existingVid = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${VID_COOKIE}=`))
    ?.split("=")[1];
  const vid = existingVid || randomUUID();

  recordVisit({ path, ts: Date.now(), vid });

  const res = NextResponse.json({ ok: true });
  if (!existingVid) {
    res.cookies.set(VID_COOKIE, vid, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: VID_MAX_AGE,
    });
  }
  return res;
}
