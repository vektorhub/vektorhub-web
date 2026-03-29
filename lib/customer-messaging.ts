import { getAdminDb } from "./firebase-admin";
import { getApplicationById } from "./customer-applications";

type CustomerContactPreferenceRecord = {
  id: string;
  phone: string;
  normalizedPhone: string;
  whatsappOptOut: boolean;
  whatsappOptOutAt: string | null;
  lastInboundText: string;
  lastInboundAt: string | null;
  lastInboundChannel: "whatsapp";
  updatedAt: string;
  profileName: string | null;
};

export type CustomerMessagingOverview = {
  whatsappConfigured: boolean;
  whatsappOptOut: boolean;
  whatsappStatusLabel: string;
  whatsappOptOutAt: string | null;
  lastInboundText: string;
  lastInboundAt: string | null;
  profileName: string | null;
};

const CONTACT_PREFERENCES_COLLECTION = "customer_contact_preferences";
const OPT_OUT_COMMANDS = new Set(["RET", "STOP", "IPTAL", "İPTAL"]);
const OPT_IN_COMMANDS = new Set(["BASLAT", "BAŞLAT", "START"]);

function getTwilioConfig() {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID?.trim() ?? "",
    authToken: process.env.TWILIO_AUTH_TOKEN?.trim() ?? "",
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM?.trim() ?? "",
    initialTemplateSid:
      process.env.TWILIO_WHATSAPP_TEMPLATE_SID_BASVURU_ALINDI?.trim() ?? "",
  };
}

function getPreferenceDocId(normalizedPhone: string) {
  return normalizedPhone.replace(/^\+/, "");
}

function getNowIso() {
  return new Date().toISOString();
}

export function isWhatsAppMessagingConfigured() {
  const config = getTwilioConfig();
  return Boolean(config.accountSid && config.authToken && config.whatsappFrom);
}

export function normalizeMessagingPhone(phone: string) {
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

function buildStatusUpdateMessage(input: {
  fullName: string;
  referenceNo: string;
  status: string;
  note: string;
}) {
  const firstName = input.fullName.trim().split(/\s+/)[0] ?? "Merhaba";

  return [
    `Merhaba ${firstName}, VektörHUB talebiniz güncellendi.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Yeni durum: ${input.status}`,
    "",
    input.note.trim(),
    "",
    "Bildirim almak istemiyorsanız RET, yeniden açmak için BAŞLAT yazabilirsiniz.",
  ].join("\n");
}

function getNormalizedReplyCommand(body: string) {
  const firstToken =
    body
      .trim()
      .toLocaleUpperCase("tr-TR")
      .normalize("NFC")
      .split(/\s+/)[0]
      ?.replace(/[^\p{L}]/gu, "") ?? "";

  return firstToken;
}

async function getCustomerContactPreferenceByPhone(phone: string) {
  const normalizedPhone = normalizeMessagingPhone(phone);
  if (!normalizedPhone) {
    return null;
  }

  const db = getAdminDb();
  const snap = await db
    .collection(CONTACT_PREFERENCES_COLLECTION)
    .doc(getPreferenceDocId(normalizedPhone))
    .get();

  if (!snap.exists) {
    return null;
  }

  return snap.data() as CustomerContactPreferenceRecord;
}

async function upsertCustomerContactPreference(input: {
  phone: string;
  whatsappOptOut?: boolean;
  lastInboundText?: string;
  lastInboundAt?: string | null;
  profileName?: string | null;
}) {
  const normalizedPhone = normalizeMessagingPhone(input.phone);
  if (!normalizedPhone) {
    return null;
  }

  const db = getAdminDb();
  const nowIso = getNowIso();
  const docRef = db
    .collection(CONTACT_PREFERENCES_COLLECTION)
    .doc(getPreferenceDocId(normalizedPhone));
  const existing = await docRef.get();
  const existingData = existing.exists
    ? (existing.data() as CustomerContactPreferenceRecord)
    : null;

  const nextOptOut =
    input.whatsappOptOut ?? existingData?.whatsappOptOut ?? false;

  const nextRecord: CustomerContactPreferenceRecord = {
    id: existingData?.id ?? getPreferenceDocId(normalizedPhone),
    phone: input.phone.trim() || existingData?.phone || normalizedPhone,
    normalizedPhone,
    whatsappOptOut: nextOptOut,
    whatsappOptOutAt: nextOptOut
      ? input.lastInboundAt ?? nowIso
      : null,
    lastInboundText:
      input.lastInboundText ?? existingData?.lastInboundText ?? "",
    lastInboundAt: input.lastInboundAt ?? existingData?.lastInboundAt ?? null,
    lastInboundChannel: "whatsapp",
    updatedAt: nowIso,
    profileName:
      input.profileName === undefined
        ? (existingData?.profileName ?? null)
        : (input.profileName ?? null),
  };

  await docRef.set(nextRecord, { merge: true });
  return nextRecord;
}

function stringifyTemplateVariables(variables: Record<string, string>) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [key, value.trim()]),
    ),
  );
}

export async function isWhatsAppOptedOut(phone: string) {
  const preference = await getCustomerContactPreferenceByPhone(phone);
  return preference?.whatsappOptOut ?? false;
}

export async function getCustomerMessagingOverviewByPhone(
  phone: string,
): Promise<CustomerMessagingOverview> {
  const preference = await getCustomerContactPreferenceByPhone(phone);
  const optedOut = preference?.whatsappOptOut ?? false;

  return {
    whatsappConfigured: isWhatsAppMessagingConfigured(),
    whatsappOptOut: optedOut,
    whatsappStatusLabel: !isWhatsAppMessagingConfigured()
      ? "WhatsApp kapalı"
      : optedOut
        ? "Müşteri durdurdu"
        : "Aktif",
    whatsappOptOutAt: preference?.whatsappOptOutAt ?? null,
    lastInboundText: preference?.lastInboundText ?? "",
    lastInboundAt: preference?.lastInboundAt ?? null,
    profileName: preference?.profileName ?? null,
  };
}

export async function processIncomingWhatsAppReply(input: {
  fromPhone: string;
  body: string;
  profileName?: string | null;
}) {
  const normalizedPhone = normalizeMessagingPhone(input.fromPhone);
  if (!normalizedPhone) {
    return {
      handled: false,
      message:
        "Numaranız doğrulanamadı. Destek almak için VektörHUB ekibiyle iletişime geçebilirsiniz.",
    };
  }

  const nowIso = getNowIso();
  const command = getNormalizedReplyCommand(input.body);

  if (OPT_OUT_COMMANDS.has(command)) {
    await upsertCustomerContactPreference({
      phone: normalizedPhone,
      whatsappOptOut: true,
      lastInboundText: input.body.trim(),
      lastInboundAt: nowIso,
      profileName: input.profileName ?? null,
    });

    return {
      handled: true,
      message:
        "Talebiniz alındı. Bu numara için WhatsApp bilgilendirmeleri durduruldu. Yeniden başlatmak için BAŞLAT yazabilirsiniz.",
    };
  }

  if (OPT_IN_COMMANDS.has(command)) {
    await upsertCustomerContactPreference({
      phone: normalizedPhone,
      whatsappOptOut: false,
      lastInboundText: input.body.trim(),
      lastInboundAt: nowIso,
      profileName: input.profileName ?? null,
    });

    return {
      handled: true,
      message:
        "WhatsApp bilgilendirmeleri yeniden açıldı. Süreç güncellemelerini bu numaradan almaya devam edeceksiniz.",
    };
  }

  await upsertCustomerContactPreference({
    phone: normalizedPhone,
    lastInboundText: input.body.trim(),
    lastInboundAt: nowIso,
    profileName: input.profileName ?? null,
  });

  return {
    handled: false,
    message:
      "Mesajınız kaydedildi. Bildirimleri kapatmak için RET, yeniden açmak için BAŞLAT yazabilirsiniz.",
    };
}

export async function sendWhatsAppMessage(input: {
  toPhone: string;
  body: string;
  contentSid?: string;
  contentVariables?: Record<string, string>;
}) {
  const config = getTwilioConfig();
  if (!isWhatsAppMessagingConfigured()) {
    throw new Error("Twilio WhatsApp ayarları eksik.");
  }

  const normalizedPhone = normalizeMessagingPhone(input.toPhone);
  if (!normalizedPhone) {
    throw new Error("Geçerli bir telefon numarası bulunamadı.");
  }

  if (await isWhatsAppOptedOut(normalizedPhone)) {
    return {
      skipped: true,
      reason: "opted_out",
      to: normalizedPhone,
    };
  }

  const credentials = Buffer.from(
    `${config.accountSid}:${config.authToken}`,
  ).toString("base64");

  const payload = new URLSearchParams({
    From: config.whatsappFrom,
    To: `whatsapp:${normalizedPhone}`,
  });

  if (input.contentSid) {
    payload.set("ContentSid", input.contentSid);
    payload.set(
      "ContentVariables",
      stringifyTemplateVariables(input.contentVariables ?? {}),
    );
  } else {
    payload.set("Body", input.body);
  }

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

  const result = (await response.json()) as {
    sid?: string;
    status?: string;
  };

  return {
    skipped: false,
    reason: null,
    to: normalizedPhone,
    messageSid: result.sid ?? null,
    status: result.status ?? null,
  };
}

export async function sendInitialApplicationWhatsApp(applicationId: string) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(applicationId);
  if (!application) {
    return null;
  }

  const message = buildInitialApplicationMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    serviceArea: application.serviceArea,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
    contentSid: getTwilioConfig().initialTemplateSid || undefined,
    contentVariables: getTwilioConfig().initialTemplateSid
      ? {
          "1": application.fullName.trim().split(/\s+/)[0] ?? "Müşteri",
          "2": application.referenceNo,
          "3": application.serviceArea,
        }
      : undefined,
  });
}

export async function sendApplicationStatusWhatsApp(input: {
  applicationId: string;
  status: string;
  note: string;
}) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(input.applicationId);
  if (!application) {
    return null;
  }

  const message = buildStatusUpdateMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    status: input.status,
    note: input.note,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}
