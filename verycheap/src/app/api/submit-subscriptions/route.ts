import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email: string | undefined = body?.email?.toString()?.trim();
    const subscriptions: string | undefined = body?.subscriptions?.toString()?.trim();

    if (!subscriptions) {
      return NextResponse.json({ error: "Missing subscriptions" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: "Server misconfigured: DISCORD_WEBHOOK_URL not set" }, { status: 500 });
    }

    const contentLines = [
      "New subscription request:",
      email ? `Email (optional): ${email}` : "Email (optional): not provided",
      "Subscriptions:",
      subscriptions,
    ];

    const payload = {
      content: contentLines.join("\n"),
    };

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: `Discord webhook failed: ${text}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


