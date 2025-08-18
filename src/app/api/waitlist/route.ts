export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/** 1. Define schema with Zod for safety */
const WaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().max(80).optional(),
  role: z
    .enum([
      "",
      "Student",
      "Parent",
      "Teacher",
      "School Admin",
      "Content Creator",
      "NGO / Sponsor",
      "Other",
    ])
    .optional(),
  interests: z.array(z.string()).max(12).optional(),
  earlyAccess: z.boolean().default(false),
  botField: z.string().optional(), // honeypot
});

/** 2. POST handler */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = WaitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check: if filled, treat as spam but pretend success
    if (data.botField && data.botField.trim().length > 0) {
      return NextResponse.json({ ok: true, message: "Thanks!" }, { status: 200 });
    }

    const payload = {
      email: data.email,
      name: data.name || "",
      role: data.role || "",
      interests: data.interests || [],
      earlyAccess: data.earlyAccess,
      submittedAt: new Date().toISOString(),
    };

    /** 3. Store or forward payload */
    // Example: forward to a webhook (Google Sheet, Airtable, etc.)
    if (process.env.WAITLIST_WEBHOOK_URL) {
      await fetch(process.env.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // For now, just log to server console
      console.log("[WAITLIST] New submission:", payload);
    }

    return NextResponse.json({ ok: true, message: "Thanks! You’re on the list." });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

/** 4. Optionally block GET requests */
export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed" }, { status: 405 });
}
