import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      return NextResponse.json(
        { error: "Booking service is not configured on the server." },
        { status: 500 },
      );
    }

    const payload = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      treatment: body.treatment,
      startISO: body.startISO,
      endISO: body.endISO,
      notes: body.notes ?? "",
      summary: `Bloom & Glow - ${body.treatment} with ${body.name}`,
    };

    const res = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      console.error("Make webhook error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to send booking to Make. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
// i want to add payment feature to this app, modify the booking flow to only complete after a bookin payment has been completed, i will provide you with a list of spa services and amount to add to the present app, also update the 