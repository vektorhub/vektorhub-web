import {
  isWhatsAppMessagingConfigured,
  processIncomingWhatsAppReply,
} from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createTwimlMessage(message: string) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(
    message,
  )}</Message></Response>`;
}

function createTwimlResponse(message: string, status = 200) {
  return new Response(createTwimlMessage(message), {
    status,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(request: Request) {
  try {
    if (!isWhatsAppMessagingConfigured()) {
      return createTwimlResponse(
        "WhatsApp bilgilendirme sistemi şu anda kullanıma hazır değil.",
        503,
      );
    }

    const formData = await request.formData();
    const from = String(formData.get("From") ?? "");
    const body = String(formData.get("Body") ?? "");
    const accountSid = String(formData.get("AccountSid") ?? "");
    const profileName = String(formData.get("ProfileName") ?? "");
    const expectedAccountSid = process.env.TWILIO_ACCOUNT_SID?.trim() ?? "";

    if (!from.startsWith("whatsapp:")) {
      return createTwimlResponse(
        "Yalnızca WhatsApp mesajları bu kanal üzerinden işlenebilir.",
        400,
      );
    }

    if (expectedAccountSid && accountSid && expectedAccountSid !== accountSid) {
      return createTwimlResponse("İstek doğrulanamadı.", 403);
    }

    const result = await processIncomingWhatsAppReply({
      fromPhone: from.replace(/^whatsapp:/, ""),
      body,
      profileName: profileName || null,
    });

    return createTwimlResponse(result.message);
  } catch (error) {
    console.error("Twilio WhatsApp gelen mesaj webhook hatasi:", error);
    return createTwimlResponse(
      "Mesajınız alındı. Kısa süre içinde yeniden deneyebilirsiniz.",
      500,
    );
  }
}
