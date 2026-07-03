import { NextResponse } from "next/server";
import { recordEnquiry } from "@/lib/store";

/**
 * Lead capture endpoint for the contact form and discovery-call scheduler.
 *
 * Every enquiry is logged to the server console (visible in Vercel/Railway
 * logs). To also receive enquiries by email, set two environment variables:
 *   RESEND_API_KEY      — API key from resend.com
 *   ENQUIRY_FORWARD_TO  — inbox that should receive the enquiries
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  // honeypot: the hidden "website" field is only ever filled by bots.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A name and valid email are required." },
      { status: 400 }
    );
  }

  const type = data.type === "booking" ? "booking" : "contact";
  const record = { receivedAt: new Date().toISOString(), ...data, type };
  console.log("[alterra:enquiry]", JSON.stringify(record));
  recordEnquiry(record as { receivedAt: string; type: string });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_FORWARD_TO;
  if (key && to) {
    const subject =
      type === "booking"
        ? `Discovery call request — ${name} (${data.dateLabel ?? data.date} ${data.time ?? ""})`
        : `Website enquiry — ${name}`;
    const lines = Object.entries(record)
      .filter(([k]) => k !== "website")
      .map(([k, v]) => `${k}: ${String(v)}`)
      .join("\n");
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Alterra Website <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          text: lines,
        }),
      });
    } catch (err) {
      // the lead is already logged — email forwarding is best-effort
      console.error("[alterra:enquiry] email forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
