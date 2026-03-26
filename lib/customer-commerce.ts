import { getAdminDb } from "./firebase-admin";
import { logAction } from "./customer-applications-extended";

export type QuoteLineItem = {
  label: string;
  amount: number;
};

export type CustomerQuote = {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  items: QuoteLineItem[];
  currency: "TRY";
  totalAmount: number;
  status: "draft" | "published" | "accepted" | "rejected";
  publishedAt: string | null;
  customerRespondedAt: string | null;
  customerNote: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentAccountConfig = {
  accountName: string;
  iban: string;
  bankName: string;
  branchName: string;
  paymentNote: string;
};

export type CustomerPayment = {
  id: string;
  applicationId: string;
  quoteId: string | null;
  title: string;
  description: string;
  amount: number;
  currency: "TRY";
  status: "pending" | "notice_sent" | "confirmed" | "rejected";
  dueDate: string | null;
  iban: PaymentAccountConfig;
  customerReference: string;
  customerNote: string;
  proofDocumentId: string | null;
  proofFileName: string;
  adminNote: string;
  noticeSubmittedAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type CreateQuoteInput = {
  title: string;
  description: string;
  items: QuoteLineItem[];
};

type CreatePaymentInput = {
  title: string;
  description: string;
  amount: number;
  dueDate?: string | null;
  quoteId?: string | null;
};

const QUOTES_COLLECTION = "quotes";
const PAYMENTS_COLLECTION = "payments";

export function getPaymentAccountConfig(): PaymentAccountConfig {
  return {
    accountName: process.env.PAYMENT_ACCOUNT_NAME?.trim() || "İSHAK KAYIŞ",
    iban: process.env.PAYMENT_IBAN?.trim() || "TR 6000 0670 1000 0000 1409 5349",
    bankName: process.env.PAYMENT_BANK_NAME?.trim() || "Türkiye İş Bankası",
    branchName: process.env.PAYMENT_BRANCH_NAME?.trim() || "Dijital Tahsilat",
    paymentNote:
      process.env.PAYMENT_NOTE?.trim() ||
      "Ödeme açıklamasında talep numaranızı belirtin ve dekontunuzu sisteme yükleyin.",
  };
}

function getApplicationRef(applicationId: string) {
  return getAdminDb().collection("customer_applications").doc(applicationId);
}

function normalizeItems(items: QuoteLineItem[]) {
  return items
    .map((item) => ({
      label: item.label.trim(),
      amount: Number(item.amount),
    }))
    .filter((item) => item.label.length > 0 && Number.isFinite(item.amount) && item.amount > 0);
}

export async function listQuotes(applicationId: string): Promise<CustomerQuote[]> {
  const snap = await getApplicationRef(applicationId)
    .collection(QUOTES_COLLECTION)
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((doc) => doc.data() as CustomerQuote);
}

export async function createQuote(
  applicationId: string,
  input: CreateQuoteInput,
  actor: string
): Promise<CustomerQuote> {
  const title = input.title.trim();
  const description = input.description.trim();
  const items = normalizeItems(input.items);

  if (title.length < 3) throw new Error("Teklif ba?l??? en az 3 karakter olmal?d?r.");
  if (description.length < 10) throw new Error("Teklif a??klamas? en az 10 karakter olmal?d?r.");
  if (!items.length) throw new Error("Teklif i?in en az bir kalem girilmelidir.");

  const ref = getApplicationRef(applicationId).collection(QUOTES_COLLECTION).doc();
  const now = new Date().toISOString();
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const quote: CustomerQuote = {
    id: ref.id,
    applicationId,
    title,
    description,
    items,
    currency: "TRY",
    totalAmount,
    status: "draft",
    publishedAt: null,
    customerRespondedAt: null,
    customerNote: "",
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(quote);
  await logAction(applicationId, "note_added", actor, {
    scope: "quote",
    quoteId: quote.id,
    title: quote.title,
    totalAmount: String(totalAmount),
  });

  return quote;
}

export async function updateQuoteStatus(
  applicationId: string,
  quoteId: string,
  status: CustomerQuote["status"],
  actor: string,
  customerNote?: string
): Promise<CustomerQuote> {
  const ref = getApplicationRef(applicationId).collection(QUOTES_COLLECTION).doc(quoteId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("Teklif bulunamad?.");
  }

  const existing = snap.data() as CustomerQuote;
  const now = new Date().toISOString();

  const next: CustomerQuote = {
    ...existing,
    status,
    updatedAt: now,
    publishedAt: status === "published" && !existing.publishedAt ? now : existing.publishedAt,
    customerRespondedAt:
      status === "accepted" || status === "rejected" ? now : existing.customerRespondedAt,
    customerNote:
      status === "accepted" || status === "rejected"
        ? (customerNote?.trim() ?? existing.customerNote ?? "")
        : existing.customerNote,
  };

  await ref.set(next);
  await logAction(applicationId, "status_changed", actor, {
    scope: "quote",
    quoteId,
    status,
  });

  return next;
}

export async function listPayments(applicationId: string): Promise<CustomerPayment[]> {
  const snap = await getApplicationRef(applicationId)
    .collection(PAYMENTS_COLLECTION)
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((doc) => doc.data() as CustomerPayment);
}

export async function createPayment(
  applicationId: string,
  input: CreatePaymentInput,
  actor: string
): Promise<CustomerPayment> {
  const title = input.title.trim();
  const description = input.description.trim();
  const amount = Number(input.amount);

  if (title.length < 3) throw new Error("?deme ba?l??? en az 3 karakter olmal?d?r.");
  if (description.length < 5) throw new Error("?deme a??klamas? en az 5 karakter olmal?d?r.");
  if (!Number.isFinite(amount) || amount <= 0) throw new Error("Ge?erli bir ?deme tutar? girin.");

  const ref = getApplicationRef(applicationId).collection(PAYMENTS_COLLECTION).doc();
  const now = new Date().toISOString();

  const payment: CustomerPayment = {
    id: ref.id,
    applicationId,
    quoteId: input.quoteId?.trim() || null,
    title,
    description,
    amount,
    currency: "TRY",
    status: "pending",
    dueDate: input.dueDate?.trim() || null,
    iban: getPaymentAccountConfig(),
    customerReference: "",
    customerNote: "",
    proofDocumentId: null,
    proofFileName: "",
    adminNote: "",
    noticeSubmittedAt: null,
    confirmedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(payment);
  await logAction(applicationId, "note_added", actor, {
    scope: "payment",
    paymentId: payment.id,
    amount: String(amount),
  });

  return payment;
}

export async function submitPaymentNotice(
  applicationId: string,
  paymentId: string,
  input: {
    customerReference: string;
    customerNote?: string;
    proofDocumentId?: string | null;
    proofFileName?: string;
  },
  actor: string
): Promise<CustomerPayment> {
  const ref = getApplicationRef(applicationId).collection(PAYMENTS_COLLECTION).doc(paymentId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("?deme kayd? bulunamad?.");
  }

  const existing = snap.data() as CustomerPayment;
  const customerReference = input.customerReference.trim();

  if (customerReference.length < 3) {
    throw new Error("?deme bildirimi i?in a??klama veya referans girin.");
  }

  const now = new Date().toISOString();
  const next: CustomerPayment = {
    ...existing,
    status: "notice_sent",
    customerReference,
    customerNote: input.customerNote?.trim() ?? "",
    proofDocumentId: input.proofDocumentId?.trim() || null,
    proofFileName: input.proofFileName?.trim() || "",
    noticeSubmittedAt: now,
    updatedAt: now,
  };

  await ref.set(next);
  await logAction(applicationId, "note_added", actor, {
    scope: "payment_notice",
    paymentId,
    reference: customerReference,
    proofFileName: next.proofFileName || "",
  });

  return next;
}

export async function reviewPayment(
  applicationId: string,
  paymentId: string,
  input: { status: "confirmed" | "rejected"; adminNote?: string },
  actor: string
): Promise<CustomerPayment> {
  const ref = getApplicationRef(applicationId).collection(PAYMENTS_COLLECTION).doc(paymentId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("?deme kayd? bulunamad?.");
  }

  const existing = snap.data() as CustomerPayment;
  const now = new Date().toISOString();
  const next: CustomerPayment = {
    ...existing,
    status: input.status,
    adminNote: input.adminNote?.trim() ?? "",
    confirmedAt: input.status === "confirmed" ? now : existing.confirmedAt,
    updatedAt: now,
  };

  await ref.set(next);
  await logAction(applicationId, "status_changed", actor, {
    scope: "payment",
    paymentId,
    status: input.status,
  });

  return next;
}
