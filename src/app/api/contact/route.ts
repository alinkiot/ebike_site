import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Log to console — replace with email service (Resend, SendGrid, etc.) as needed
  console.log("[Contact Form]", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}
