import { sendAdminPushNotification } from "./admin-push";
import { getApplicationById } from "./customer-applications";
import { createMessage } from "./customer-applications-extended";
import { getAdminDb } from "./firebase-admin";

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

type ApplicationLookupRecord = {
  id: string;
  referenceNo: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  serviceArea: string;
  createdAt: string;
  updatedAt: string;
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
const APPLICATIONS_COLLECTION = "customer_applications";
const STATUS_WHATSAPP_ALLOWLIST = new Set([
  "\u0130nceleniyor",
  "Teklif Haz\u0131rlan\u0131yor",
  "Tamamland\u0131",
  "\u0130ptal Edildi",
]);
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

function getDirectSupportWhatsAppLine() {
  return (
    process.env.CUSTOMER_WHATSAPP_DIRECT_LINE?.trim() ??
    process.env.CUSTOMER_SUPPORT_WHATSAPP?.trim() ??
    ""
  );
}

function getPreferenceDocId(normalizedPhone: string) {
  return normalizedPhone.replace(/^\+/, "");
}

function getNowIso() {
  return new Date().toISOString();
}

function getFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? "Müşteri";
}

function getDirectSupportFooter() {
  const directLine = getDirectSupportWhatsAppLine();
  if (!directLine) {
    return [] as string[];
  }

  return [
    "",
    "Bu hat otomatik bilgilendirme hattıdır.",
    `Doğrudan yazışma için işletme hattımız: ${directLine}`,
  ];
}

function buildInitialApplicationMessage(input: {
  fullName: string;
  referenceNo: string;
  serviceArea: string;
}) {
  return [
    `Merhaba ${getFirstName(input.fullName)}, VektörHUB başvurunuz alındı.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Hizmet alanı: ${input.serviceArea}`,
    "",
    "Süreçle ilgili önemli güncellemeleri bu numara üzerinden paylaşacağız.",
    "Bildirim almak istemiyorsanız RET yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ].join("\n");
}

function buildStatusUpdateMessage(input: {
  fullName: string;
  referenceNo: string;
  status: string;
  note: string;
}) {
  return [
    `Merhaba ${getFirstName(input.fullName)}, VektörHUB talebiniz güncellendi.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Yeni durum: ${input.status}`,
    "",
    input.note.trim(),
    "",
    "Bildirim almak istemiyorsanız RET, yeniden açmak için BAŞLAT yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ].join("\n");
}

function buildAdminMessageNotification(input: {
  fullName: string;
  referenceNo: string;
  previewText: string;
}) {
  return [
    `Merhaba ${getFirstName(input.fullName)}, VektörHUB ekibinden yeni bir mesajınız var.`,
    `Takip numaranız: ${input.referenceNo}`,
    "",
    `Özet: ${input.previewText}`,
    "",
    "Detayları müşteri panelinizden takip edebilirsiniz.",
    "Bildirim almak istemiyorsanız RET yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ].join("\n");
}

function buildQuotePublishedMessage(input: {
  fullName: string;
  referenceNo: string;
  title: string;
  totalAmount: number;
}) {
  return [
    `Merhaba ${getFirstName(input.fullName)}, teklifiniz hazır.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Teklif başlığı: ${input.title}`,
    `Toplam tutar: ${input.totalAmount.toLocaleString("tr-TR")} TL`,
    "",
    "Detayları müşteri panelinizden inceleyebilirsiniz.",
    "Bildirim almak istemiyorsanız RET yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ].join("\n");
}

function buildPaymentCreatedMessage(input: {
  fullName: string;
  referenceNo: string;
  title: string;
  amount: number;
  dueDate: string | null;
}) {
  return [
    `Merhaba ${getFirstName(input.fullName)}, ödemeniz için yeni bir kayıt oluşturuldu.`,
    `Takip numaranız: ${input.referenceNo}`,
    `Ödeme başlığı: ${input.title}`,
    `Tutar: ${input.amount.toLocaleString("tr-TR")} TL`,
    input.dueDate ? `Son ödeme tarihi: ${input.dueDate}` : "",
    "",
    "Ödeme detaylarını müşteri panelinizden görüntüleyebilirsiniz.",
    "Bildirim almak istemiyorsanız RET yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPaymentReviewedMessage(input: {
  fullName: string;
  referenceNo: string;
  title: string;
  status: "confirmed" | "rejected";
  adminNote?: string;
}) {
  const intro =
    input.status === "confirmed"
      ? `Merhaba ${getFirstName(input.fullName)}, \u00f6demeniz onayland\u0131.`
      : `Merhaba ${getFirstName(input.fullName)}, \u00f6deme bildiriminiz yeniden i\u015flem gerektiriyor.`;
  const statusLabel =
    input.status === "confirmed"
      ? "\u00d6deme durumu: Onayland\u0131"
      : "\u00d6deme durumu: Yeniden i\u015flem gerekli";

  return [
    intro,
    `Takip numaran\u0131z: ${input.referenceNo}`,
    `\u00d6deme ba\u015fl\u0131\u011f\u0131: ${input.title}`,
    statusLabel,
    input.adminNote?.trim() ? "" : null,
    input.adminNote?.trim() || null,
    "",
    "Bildirim almak istemiyorsan\u0131z RET yazabilirsiniz.",
    ...getDirectSupportFooter(),
  ]
    .filter(Boolean)
    .join("\n");
}

function shouldSendStatusWhatsApp(status: string) {
  return STATUS_WHATSAPP_ALLOWLIST.has(status.trim());
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

function stringifyTemplateVariables(variables: Record<string, string>) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [key, value.trim()]),
    ),
  );
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
    whatsappOptOutAt: nextOptOut ? input.lastInboundAt ?? nowIso : null,
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

async function findLatestApplicationByPhone(phone: string) {
  const normalizedPhone = normalizeMessagingPhone(phone);
  if (!normalizedPhone) {
    return null;
  }

  const db = getAdminDb();
  const comparablePhone = normalizedPhone.replace(/^\+/, "");
  const snapshot = await db
    .collection(APPLICATIONS_COLLECTION)
    .where("normalizedPhone", "==", comparablePhone)
    .limit(10)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const items = snapshot.docs
    .map((doc) => doc.data() as ApplicationLookupRecord)
    .sort((a, b) => {
      const aTime = new Date(a.updatedAt ?? a.createdAt).getTime();
      const bTime = new Date(b.updatedAt ?? b.createdAt).getTime();
      return bTime - aTime;
    });

  return items[0] ?? null;
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
  const text = input.body.trim();
  const command = getNormalizedReplyCommand(text);

  if (OPT_OUT_COMMANDS.has(command)) {
    await upsertCustomerContactPreference({
      phone: normalizedPhone,
      whatsappOptOut: true,
      lastInboundText: text,
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
      lastInboundText: text,
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
    lastInboundText: text,
    lastInboundAt: nowIso,
    profileName: input.profileName ?? null,
  });

  const application = await findLatestApplicationByPhone(normalizedPhone);
  if (application && text) {
    const senderName =
      input.profileName?.trim() || application.fullName || "WhatsApp Müşterisi";

    await createMessage(application.id, "customer", senderName, text);
    await sendAdminPushNotification({
      title: "Yeni WhatsApp mesajı",
      body: `${senderName} WhatsApp üzerinden yeni bir mesaj gönderdi.`,
      data: {
        type: "customer_message",
        applicationId: application.id,
        senderName,
        screen: "application_messages",
      },
    });
  }

  return {
    handled: false,
    message: [
      "Mesajınız kaydedildi ve ekibimize iletildi.",
      "Bildirimleri kapatmak için RET, yeniden açmak için BAŞLAT yazabilirsiniz.",
      ...getDirectSupportFooter(),
    ].join("\n"),
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
          "1": getFirstName(application.fullName),
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

  if (!shouldSendStatusWhatsApp(input.status)) {
    return {
      skipped: true,
      reason: "status_not_notifiable",
      status: input.status,
    };
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

export async function sendAdminMessageWhatsApp(input: {
  applicationId: string;
  messageText: string;
}) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(input.applicationId);
  if (!application) {
    return null;
  }

  const previewText =
    input.messageText.trim().length > 96
      ? `${input.messageText.trim().slice(0, 96).trim()}...`
      : input.messageText.trim();

  const message = buildAdminMessageNotification({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    previewText,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}

export async function sendQuotePublishedWhatsApp(input: {
  applicationId: string;
  title: string;
  totalAmount: number;
}) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(input.applicationId);
  if (!application) {
    return null;
  }

  const message = buildQuotePublishedMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    title: input.title,
    totalAmount: input.totalAmount,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}

export async function sendPaymentCreatedWhatsApp(input: {
  applicationId: string;
  title: string;
  amount: number;
  dueDate: string | null;
}) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(input.applicationId);
  if (!application) {
    return null;
  }

  const message = buildPaymentCreatedMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    title: input.title,
    amount: input.amount,
    dueDate: input.dueDate,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}

export async function sendPaymentReviewedWhatsApp(input: {
  applicationId: string;
  title: string;
  status: "confirmed" | "rejected";
  adminNote?: string;
}) {
  if (!isWhatsAppMessagingConfigured()) {
    return null;
  }

  const application = await getApplicationById(input.applicationId);
  if (!application) {
    return null;
  }

  const message = buildPaymentReviewedMessage({
    fullName: application.fullName,
    referenceNo: application.referenceNo,
    title: input.title,
    status: input.status,
    adminNote: input.adminNote,
  });

  return sendWhatsAppMessage({
    toPhone: application.phone,
    body: message,
  });
}
