import { NextResponse } from "next/server";
import { treatments } from "@/lib/data";

/*
  END-TO-END PAYMENT FLOW:

  Step 1 (Client): User clicks "Pay & Confirm" on the booking form.
                    Booking form sends { email, itemSlugs } to THIS route.

  Step 2 (Server - this file): Validates the items exist in our treatment data
                    and calculates the total PRICE server-side.
                    Generates a unique reference.
                    Returns { reference, amount } — NO secret key used here.
                    The amount is in kobo (Paystack's unit: 1 NGN = 100 kobo).
                    The secret key stays on the server, never exposed to the browser.

  Step 3 (Client): Booking form receives { reference, amount }.
                    Opens Paystack payment popup with:
                    - Public key (safe to expose client-side — it's a public key)
                    - Email, amount, reference from the server
                    - Paystack handles the card processing

  Step 4 (Client): User pays. Paystack calls callback with response.reference.
                    booking-form.tsx sends booking data + payment reference to /api/booking.

  Step 5 (Server): /api/booking forwards to Make webhook which sends confirmation emails.
*/

export async function POST(request: Request) {
  try {
    const { email, itemSlugs } = await request.json();

    if (!email || !itemSlugs?.length) {
      return NextResponse.json(
        { error: "Email and itemSlugs are required." },
        { status: 400 },
      );
    }

    // Security: total is computed from SERVER-SIDE treatment data.
    // The client never sends a price, so users can't tamper with pricing.
    const total = itemSlugs.reduce((sum: number, slug: string) => {
      const t = treatments.find((x) => x.slug === slug);
      return sum + (t?.price || 0);
    }, 0);

    if (total === 0) {
      return NextResponse.json(
        { error: "No valid treatments found." },
        { status: 400 },
      );
    }

    // Generate a unique reference for tracking
    const ref = `BLOOM_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Return amount in kobo (Paystack's unit)
    return NextResponse.json({
      reference: ref,
      amount: total * 100,
    });
  } catch (error) {
    console.error("Paystack initialize API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
