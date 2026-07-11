import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "../config.server";

const bookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
  treatment: z.string().min(1),
  startISO: z.string(),
  endISO: z.string(),
  notes: z.string().optional(),
});

export const sendBookingToMake = createServerFn({ method: "POST" })
  .inputValidator(bookingSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();

    if (!config.makeWebhookUrl) {
      throw new Error("Make webhook is not configured on the server.");
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      treatment: data.treatment,
      startISO: data.startISO,
      endISO: data.endISO,
      notes: data.notes ?? "",
      summary: `Exquisite Medspa — ${data.treatment} with ${data.name}`,
    };

    const res = await fetch(config.makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      console.error("Make webhook error:", res.status, text);
      throw new Error("Failed to send booking to Make. Please try again.");
    }

    return { success: true };
  });
