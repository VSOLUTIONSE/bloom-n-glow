import { NextResponse } from "next/server";
import { treatments } from "@/lib/data";

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

/*
  This route is called AFTER Paystack confirms payment via the client-side callback.
  It verifies the payment with Paystack's API, recalculates the total server-side,
  and forwards booking details to the Make webhook for email notifications.

  Security: The Paystack Verify API is called with the secret key to confirm the
  transaction was actually completed — the client-provided reference alone is not trusted.
  The total is recalculated from server-side treatment data, not the client's value.
*/

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, itemSlugs, startISO, endISO, notes, paymentReference } = body;

    if (!paymentReference || !itemSlugs?.length) {
      return NextResponse.json(
        { error: "Payment reference and items are required." },
        { status: 400 },
      );
    }

    // Step 1: Verify the payment with Paystack's API
    // This confirms the transaction actually completed, not just a fake reference.
    if (!SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment verification is not configured." },
        { status: 500 },
      );
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(paymentReference)}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      console.error("Paystack verification failed:", verifyData);
      return NextResponse.json(
        { error: "Payment verification failed. Please contact support." },
        { status: 402 },
      );
    }

    // Step 2: Recalculate total from server-side treatment data
    // Never trust the client-supplied totalPrice — compute it here.
    const expectedAmount = itemSlugs.reduce((sum: number, slug: string) => {
      const t = treatments.find((x: any) => x.slug === slug);
      return sum + (t?.price || 0);
    }, 0) * 100;

    // Step 3: Compare what was paid (from Paystack) with what we expect
    const paidAmount = verifyData.data.amount;
    if (paidAmount !== expectedAmount) {
      console.error("Amount mismatch:", { paidAmount, expectedAmount, paymentReference });
      return NextResponse.json(
        { error: "Payment amount mismatch. Please contact support." },
        { status: 402 },
      );
    }

    // Step 4: Forward to Make webhook for email notifications
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      return NextResponse.json(
        { error: "Booking service is not fully configured." },
        { status: 500 },
      );
    }

    const itemNames = itemSlugs.map((slug: string) => {
      const t = treatments.find((x: any) => x.slug === slug);
      return t?.name || slug;
    });

    const payload = {
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      items: itemNames,
      totalPrice: expectedAmount / 100,
      paymentReference,
      startISO,
      endISO,
      notes: notes ?? "",
      summary: `Bloom & Glow - ${itemNames.join(", ")} with ${name?.trim()}`,
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
        { error: "Booking confirmed but notification failed. We'll follow up manually." },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please contact support." },
      { status: 500 },
    );
  }
}
