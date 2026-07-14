import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentReference, totalPrice, name, email, phone, items, startISO, endISO, notes } = body;

    if (!paymentReference) {
      return NextResponse.json(
        { error: "Payment reference is required." },
        { status: 400 },
      );
    }

    // 1. Verify payment with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(paymentReference)}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!verifyRes.ok) {
      console.error("Paystack verify error:", verifyRes.status);
      return NextResponse.json(
        { error: "Payment verification failed. Please contact support." },
        { status: 500 },
      );
    }

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      console.error("Paystack verification failed:", verifyData);
      return NextResponse.json(
        { error: "Payment was not completed successfully." },
        { status: 400 },
      );
    }

    // 2. Verify amount matches
    const paidAmount = verifyData.data.amount / 100; // Paystack returns amount in kobo
    if (paidAmount !== totalPrice) {
      console.error("Amount mismatch:", { paidAmount, expected: totalPrice });
      return NextResponse.json(
        { error: "Payment amount does not match the cart total." },
        { status: 400 },
      );
    }

    // 3. Forward to Make webhook
    if (MAKE_WEBHOOK_URL) {
      const payload = {
        name,
        email,
        phone,
        items: Array.isArray(items) ? items.join(", ") : items,
        startISO,
        endISO,
        notes: notes ?? "",
        paymentReference,
        amount: totalPrice,
        paymentStatus: "verified",
        summary: `Bloom & Glow - ${Array.isArray(items) ? items.join(", ") : items} - ${name}`,
      };

      const webhookRes = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        const text = await webhookRes.text().catch(() => "Unknown error");
        console.error("Make webhook error:", webhookRes.status, text);
      }
    }

    return NextResponse.json({ success: true, reference: paymentReference });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
