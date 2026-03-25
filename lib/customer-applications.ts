import crypto from "node:crypto";
import { getAdminDb } from "./firebase-admin";
import { getCustomerByEmail } from "./customer-accounts";

export type ServiceArea =
  | "Web sitesi ve dijital görünüm"
  | "Mobil uygulama"
  | "Dijital tanıtım ve içerik"
  | "Özel çözüm talebi";

export type ApplicationStatus =
  | "Başvuru Alındı"
  | "İnceleniyor"
  | "Teklif Hazırlanıyor"
  | "Tamamlandı";

export type CustomerApplicationInput = {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceArea: ServiceArea;
  details: string;
  customerId?: string | null;
};

type CustomerApplicationRecord = {
  id: string;
  referenceNo: string;
  fullName: string;
  companyName: string;
  phone: string;
  normalizedPhone: string;
  email: string;
  customerId?: string | null;
  emailVerifiedAt: string;
  serviceArea: ServiceArea;
  details: string;
  status: ApplicationStatus;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerApplicationView = CustomerApplicationRecord & {
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  description: string;
  serviceType: ServiceArea;
};

type PendingCustomerApplicationRecord = {
  id: string;
  verificationId: string;
  tokenHash: string;
  verificationCodeHash: string;
  codeAttempts: number;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceArea: ServiceArea;
  details: string;
  createdAt: string;
  expiresAt: string;
  verifiedAt: string | null;
  referenceNo: string | null;
  applicationId: string | null;
};

const COLLECTION = "customer_applications";
const PENDING_COLLECTION = "customer_application_verifications";
const DEFAULT_NOTE =
  "Başvurunuz sisteme alındı. Uzman ekibimiz iş günü içinde sizinle iletişime geçecektir.";
const VERIFICATION_WINDOW_MS = 1000 * 60 * 30;

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function getComparablePhone(raw: string) {
  const digits = normalizePhone(raw);
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function normalizeReferenceNo(ref: string) {
  return ref.trim().toUpperCase();
}

function generateReferenceNo() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `VH-${year}-${suffix}`;
}

function createVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashVerificationToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;
  if (localPart.length <= 2) return `${localPart[0] ?? "*"}***@${domain}`;
  return `${localPart.slice(0, 2)}***@${domain}`;
}

function validateInput(input: CustomerApplicationInput) {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim());
  const phoneDigits = normalizePhone(input.phone);

  if (input.fullName.trim().length < 2) throw new Error("Lütfen geçerli bir ad soyad girin.");
  if (input.companyName.trim().length < 2) throw new Error("Lütfen geçerli bir firma adı girin.");
  if (!emailValid) throw new Error("Lütfen geçerli bir e-posta adresi girin.");
  if (phoneDigits.length < 10) throw new Error("Lütfen geçerli bir telefon numarası girin.");
  if (input.details.trim().length < 10) throw new Error("Lütfen ihtiyacınızı en az 10 karakter ile yazın.");
}

async function generateUniqueReferenceNo() {
  const db = getAdminDb();
  const col = db.collection(COLLECTION);
  let referenceNo = generateReferenceNo();

  for (let i = 0; i < 20; i++) {
    const existing = await col.where("referenceNo", "==", referenceNo).limit(1).get();
    if (existing.empty) break;
    referenceNo = generateReferenceNo();
  }

  return referenceNo;
}

async function persistCustomerApplication(
  input: CustomerApplicationInput,
  emailVerifiedAt: string
) {
  const db = getAdminDb();
  const record: CustomerApplicationRecord = {
    id: crypto.randomUUID(),
    referenceNo: await generateUniqueReferenceNo(),
    fullName: input.fullName.trim(),
    companyName: input.companyName.trim(),
    phone: input.phone.trim(),
    normalizedPhone: normalizePhone(input.phone),
    email: input.email.trim().toLowerCase(),
    customerId: input.customerId?.trim() || null,
    emailVerifiedAt,
    serviceArea: input.serviceArea,
    details: input.details.trim(),
    status: "Başvuru Alındı",
    note: DEFAULT_NOTE,
    createdAt: emailVerifiedAt,
    updatedAt: emailVerifiedAt,
  };

  await db.collection(COLLECTION).doc(record.id).set(record);

  return {
    id: record.id,
    referenceNo: record.referenceNo,
    submittedAt: record.createdAt,
    status: record.status,
    note: record.note,
  };
}

export async function createCustomerApplication(input: CustomerApplicationInput) {
  validateInput(input);
  const now = new Date().toISOString();
  return persistCustomerApplication(input, now);
}

export async function createCustomerApplicationVerification(input: CustomerApplicationInput) {
  validateInput(input);

  const token = createVerificationToken();
  const verificationCode = createVerificationCode();
  const verificationId = crypto.randomUUID();
  const tokenHash = hashVerificationToken(token);
  const verificationCodeHash = hashVerificationToken(verificationCode);
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + VERIFICATION_WINDOW_MS).toISOString();

  const record: PendingCustomerApplicationRecord = {
    id: verificationId,
    verificationId,
    tokenHash,
    verificationCodeHash,
    codeAttempts: 0,
    fullName: input.fullName.trim(),
    companyName: input.companyName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim().toLowerCase(),
    serviceArea: input.serviceArea,
    details: input.details.trim(),
    createdAt: nowIso,
    expiresAt,
    verifiedAt: null,
    referenceNo: null,
    applicationId: null,
  };

  const db = getAdminDb();
  await db.collection(PENDING_COLLECTION).doc(record.id).set(record);

  return {
    token,
    verificationCode,
    verificationId,
    email: record.email,
    maskedEmail: maskEmail(record.email),
    expiresAt,
  };
}

async function createApplicationFromPending(pending: PendingCustomerApplicationRecord, verifiedAt: string) {
  const created = await persistCustomerApplication(
    {
      fullName: pending.fullName,
      companyName: pending.companyName,
      phone: pending.phone,
      email: pending.email,
      serviceArea: pending.serviceArea,
      details: pending.details,
      customerId: (await getCustomerByEmail(pending.email))?.id ?? null,
    },
    verifiedAt
  );

  await getAdminDb()
    .collection(PENDING_COLLECTION)
    .doc(pending.id)
    .update({
      verifiedAt,
      referenceNo: created.referenceNo,
      applicationId: created.id,
    });

  return created;
}

function toConfirmedResponse(pending: PendingCustomerApplicationRecord) {
  return {
    referenceNo: pending.referenceNo ?? "",
    submittedAt: pending.verifiedAt ?? new Date().toISOString(),
    status: "Başvuru Alındı" as ApplicationStatus,
    note: DEFAULT_NOTE,
  };
}

export async function confirmCustomerApplicationWithCode(verificationId: string, code: string) {
  const normalizedVerificationId = verificationId.trim();
  const normalizedCode = code.trim();

  if (!normalizedVerificationId) {
    throw new Error("Doğrulama kimliği eksik.");
  }

  if (!/^\d{6}$/.test(normalizedCode)) {
    throw new Error("Doğrulama kodu 6 haneli olmalıdır.");
  }

  const db = getAdminDb();
  const docRef = db.collection(PENDING_COLLECTION).doc(normalizedVerificationId);
  const snap = await docRef.get();

  if (!snap.exists) {
    throw new Error("Doğrulama kaydı bulunamadı. Formu yeniden gönderin.");
  }

  const pending = snap.data() as PendingCustomerApplicationRecord;

  if (pending.verifiedAt && pending.referenceNo) {
    return toConfirmedResponse(pending);
  }

  if (new Date(pending.expiresAt).getTime() < Date.now()) {
    throw new Error("Doğrulama kodunun süresi doldu. Lütfen formu yeniden gönderin.");
  }

  const incomingHash = hashVerificationToken(normalizedCode);

  if (incomingHash !== pending.verificationCodeHash) {
    const nextAttempts = (pending.codeAttempts ?? 0) + 1;
    await docRef.update({ codeAttempts: nextAttempts });
    throw new Error("Doğrulama kodu hatalı.");
  }

  const verifiedAt = new Date().toISOString();
  return createApplicationFromPending(pending, verifiedAt);
}

export async function confirmCustomerApplicationVerification(token: string) {
  const normalizedToken = token.trim();

  if (normalizedToken.length < 32) {
    throw new Error("Doğrulama bağlantısı geçersiz görünüyor.");
  }

  const tokenHash = hashVerificationToken(normalizedToken);
  const db = getAdminDb();
  const snap = await db
    .collection(PENDING_COLLECTION)
    .where("tokenHash", "==", tokenHash)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error("Doğrulama bağlantısı bulunamadı veya geçersiz.");
  }

  const pending = snap.docs[0]!.data() as PendingCustomerApplicationRecord;

  if (pending.verifiedAt && pending.referenceNo) {
    return toConfirmedResponse(pending);
  }

  if (new Date(pending.expiresAt).getTime() < Date.now()) {
    throw new Error("Doğrulama bağlantısının süresi dolmuş. Lütfen formu yeniden gönderin.");
  }

  const verifiedAt = new Date().toISOString();
  return createApplicationFromPending(pending, verifiedAt);
}

export async function queryCustomerApplication(referenceNo: string, phone: string) {
  const normalizedRef = normalizeReferenceNo(referenceNo);
  const comparablePhone = getComparablePhone(phone);

  if (!normalizedRef) throw new Error("Takip numarası zorunludur.");
  if (comparablePhone.length < 10) throw new Error("Telefon numarası en az 10 haneli olmalıdır.");

  const db = getAdminDb();
  const col = db.collection(COLLECTION);
  const snap = await col.where("referenceNo", "==", normalizedRef).limit(1).get();

  if (snap.empty) return null;

  const doc = snap.docs[0]!.data() as CustomerApplicationRecord;

  if (getComparablePhone(doc.normalizedPhone) !== comparablePhone) return null;

  return {
    referenceNo: doc.referenceNo,
    status: doc.status,
    note: doc.note,
    updatedAt: doc.updatedAt,
    submittedAt: doc.createdAt,
    serviceArea: doc.serviceArea,
  };
}

export async function listCustomerApplicationsByEmail(email: string, limit = 100) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return [];
  }

  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .where("email", "==", normalizedEmail)
    .limit(limit)
    .get();

  const items = snap.docs.map((d) => d.data() as CustomerApplicationRecord);
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function listCustomerApplicationsForCustomer(
  customerId: string,
  email: string,
  limit = 100
) {
  const db = getAdminDb();
  const normalizedEmail = email.trim().toLowerCase();
  const items = new Map<string, CustomerApplicationRecord>();

  if (customerId.trim()) {
    const byCustomerId = await db
      .collection(COLLECTION)
      .where("customerId", "==", customerId.trim())
      .limit(limit)
      .get();

    for (const doc of byCustomerId.docs) {
      const record = doc.data() as CustomerApplicationRecord;
      items.set(record.id, record);
    }
  }

  if (normalizedEmail) {
    const byEmail = await db
      .collection(COLLECTION)
      .where("email", "==", normalizedEmail)
      .limit(limit)
      .get();

    for (const doc of byEmail.docs) {
      const record = doc.data() as CustomerApplicationRecord;
      items.set(record.id, record);
    }
  }

  return [...items.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function listAllApplications(limit = 100) {
  const db = getAdminDb();
  const snap = await db
    .collection(COLLECTION)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snap.docs.map((d) => d.data() as CustomerApplicationRecord);
}

export async function getApplicationById(id: string) {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTION).doc(id).get();

  if (!snap.exists) {
    return null;
  }

  return snap.data() as CustomerApplicationRecord;
}

export function toCustomerApplicationView(
  record: CustomerApplicationRecord
): CustomerApplicationView {
  return {
    ...record,
    referenceNumber: record.referenceNo,
    customerName: record.fullName,
    customerEmail: record.email,
    description: record.details,
    serviceType: record.serviceArea,
  };
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  note: string
) {
  const db = getAdminDb();
  await db.collection(COLLECTION).doc(id).update({
    status,
    note,
    updatedAt: new Date().toISOString(),
  });
}

export async function withdrawCustomerApplication(
  id: string,
  customerId: string,
  customerEmail: string,
  reason?: string
) {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION).doc(id);
  const snap = await docRef.get();

  if (!snap.exists) {
    throw new Error("Talep bulunamadÄ±.");
  }

  const record = snap.data() as CustomerApplicationRecord;
  const ownsById = !!record.customerId && record.customerId === customerId;
  const ownsByEmail = record.email.trim().toLowerCase() === customerEmail.trim().toLowerCase();

  if (!ownsById && !ownsByEmail) {
    throw new Error("Bu kayÄ±t Ã¼zerinde iÅŸlem yapma yetkiniz yok.");
  }

  if (String(record.status) !== "BaÅŸvuru AlÄ±ndÄ±") {
    throw new Error("Bu kayÄ±t doÄŸrudan geri Ã§ekilemez.");
  }

  const updatedAt = new Date().toISOString();
  const note =
    reason?.trim()
      ? `Müşteri tarafından geri çekildi. Not: ${reason.trim()}`
      : "MÃ¼ÅŸteri tarafÄ±ndan geri Ã§ekildi.";

  await docRef.update({
    status: "Ä°ptal Edildi",
    note,
    updatedAt,
  });

  await docRef.collection("activity_log").add({
    type: "customer_withdraw",
    actor: customerEmail,
    details: {
      reason: reason?.trim() ?? "",
    },
    createdAt: updatedAt,
  });

  return {
    id: record.id,
    status: "Ä°ptal Edildi",
    note,
    updatedAt,
  };
}

async function deleteSubcollectionDocs(applicationId: string, subcollection: string) {
  const db = getAdminDb();
  const colRef = db.collection(COLLECTION).doc(applicationId).collection(subcollection);

  // Delete in chunks to avoid oversized batch operations.
  while (true) {
    const snap = await colRef.limit(200).get();
    if (snap.empty) {
      break;
    }

    const batch = db.batch();
    for (const doc of snap.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();
  }
}

export async function deleteApplicationWithChildren(id: string) {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION).doc(id);
  const snap = await docRef.get();

  if (!snap.exists) {
    return null;
  }

  const record = snap.data() as CustomerApplicationRecord;

  await deleteSubcollectionDocs(id, "messages");
  await deleteSubcollectionDocs(id, "documents");
  await deleteSubcollectionDocs(id, "requests");
  await deleteSubcollectionDocs(id, "activity_log");

  await docRef.delete();

  return {
    id: record.id,
    referenceNo: record.referenceNo,
    fullName: record.fullName,
    email: record.email,
    serviceArea: record.serviceArea,
  };
}
