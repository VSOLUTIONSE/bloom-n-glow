import { NextResponse } from "next/server";
import { treatments } from "@/lib/data";

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "";

export async function POST(request: Request) {
  try {
    const { email, itemSlugs } = await request.json();

    if (!email || !itemSlugs?.length) {
      return NextResponse.json(
        { error: "Email and itemSlugs are required." },
        { status: 400 },
      );
    }

    if (!SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payment system is not configured." },
        { status: 500 },
      );
    }

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

    const ref = `BLOOM_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: total * 100,
        reference: ref,
        currency: "NGN",
      }),
    });

    const data = await res.json();

    if (!data.status) {
      console.error("Paystack initialize error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to initialize payment." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      accessCode: data.data.access_code,
      reference: data.data.reference,
      amount: total,
    });
  } catch (error) {
    console.error("Paystack initialize API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
