import { getApplicationById } from "./customer-applications";

function getTwilioConfig() {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID?.trim() ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN?.trim() ?? "",
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM?.trim() ?? "",
  };
}

export function isWhatsAppMessagingConfigured() {
  const config = getTwilioConfig();
  return Boolean(config.accountSid && config.authToken && config.whatsappFrom);
}

function normalizeTurkishPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (!digits) {
    return null;
  }

  if (digits.startsWith("90") && digits.length >= 12) {
    return `+${digits}`;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `+90${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+90${digits}`;
  }

  if (phone.trim().startsWith("+")) {
    return phone.trim();
  }

  return null;
}

function buildInitialApplicationMessage(input: {
  fullName: string;
  referenceNo: string;
  serviceArea: string;
}) {
  const firstName = input.fullName.trim().split(/\s+/)[0] ?? "Merhaba";

  return [
    `Merhaba ${firstName}, VektörHUB başvurunuz alındı.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Hizmet alanı: ${input.serviceArea}`,
    "",
    "Süreçle ilgili önemli güncellemeleri bu numara üzerinden paylaşacağız.",
    "Bildirim almak istemiyorsanız RET yazabilirsiniz.",
  ].join("\n");
}

export async function sendWhatsAppMessage(input: {
  toPhone: string;
  body: string;
}) {
  const config = getTwilioConfig();
  if (!isWhatsAppMessagingConfigured()) {
    throw new Error("Twilio WhatsApp ayarları eksik.");
  }

  const normalizedPhone = normalizeTurkishPhone(input.toPhone);
  if (!normalizedPhone) {
    throw new Error("Geçerli bir telefon numarası bulunamadı.");
  }

  const credentials = Buffer.from(
    `${config.accountSid}:${config.authToken}`,
  ).toString("base64");

  const payload = new URLSearchParams({
    From: config.whatsappFrom,
    To: `whatsapp:${normalizedPhone}`,
    Body: input.body,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Twilio WhatsApp gönderimi başarısız: ${text}`);
  }
}

export async function sendInitialApplicationWhatsApp(applicationId: string) {
  if (!isWhatsAppMessagingConfigured()) {
    return;
  }

  const application = await getApplicationById(applicationId);
  if (!application) {
    return;
  }

  const message = buildInitialApplicationMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    serviceArea: application.serviceArea,
  });

  await sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}
