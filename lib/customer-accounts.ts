import crypto from "node:crypto";
import { promisify } from "node:util";
import { getAdminDb } from "./firebase-admin";

const scryptAsync = promisify(crypto.scrypt);

const ACCOUNTS_COLLECTION = "customer_accounts";
const INVITES_COLLECTION = "customer_invites";
const PASSWORD_RESETS_COLLECTION = "customer_password_resets";
const INVITE_WINDOW_MS = 1000 * 60 * 60 * 24;
const PASSWORD_RESET_WINDOW_MS = 1000 * 60 * 60 * 2;

export type CustomerAccountStatus = "active" | "pending_review" | "disabled";

export type CustomerOfficialProfile = {
  companyName: string;
  legalCompanyName: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  billingEmail: string;
  phone: string;
  contactTitle: string;
};

type CustomerAccountRecord = {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  companyName?: string;
  legalCompanyName?: string;
  taxOffice?: string;
  taxNumber?: string;
  address?: string;
  billingEmail?: string;
  phone?: string;
  contactTitle?: string;
  onboardingCompletedAt?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  status: CustomerAccountStatus;
};

type CustomerInviteRecord = {
  id: string;
  tokenHash: string;
  email: string;
  fullName: string;
  applicationId?: string | null;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
  accountId: string | null;
};

type CustomerPasswordResetRecord = {
  id: string;
  tokenHash: string;
  accountId: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
};

export type PendingCustomerAccountReview = {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  legalCompanyName: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  billingEmail: string;
  phone: string;
  contactTitle: string;
  createdAt: string;
  onboardingCompletedAt: string | null;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

async function verifyPassword(password: string, hashed: string) {
  const [salt, keyHex] = hashed.split(":");
  if (!salt || !keyHex) {
    return false;
  }

  const incoming = (await scryptAsync(password, salt, 64)) as Buffer;
  const stored = Buffer.from(keyHex, "hex");

  if (incoming.length !== stored.length) {
    return false;
  }

  return crypto.timingSafeEqual(incoming, stored);
}

function validatePassword(password: string) {
  if (password.length < 8) {
    throw new Error("Şifre en az 8 karakter olmalıdır.");
  }
}

function validateOfficialProfile(profile: CustomerOfficialProfile) {
  const companyName = profile.companyName.trim();
  const legalCompanyName = profile.legalCompanyName.trim();
  const taxOffice = profile.taxOffice.trim();
  const taxNumber = normalizeDigits(profile.taxNumber);
  const address = profile.address.trim();
  const billingEmail = normalizeEmail(profile.billingEmail);
  const phone = normalizeDigits(profile.phone);
  const contactTitle = profile.contactTitle.trim();

  if (companyName.length < 2) {
    throw new Error("Firma adı en az 2 karakter olmalıdır.");
  }

  if (legalCompanyName.length < 2) {
    throw new Error("Resmi unvan en az 2 karakter olmalıdır.");
  }

  if (taxOffice.length < 2) {
    throw new Error("Vergi dairesi bilgisi zorunludur.");
  }

  if (taxNumber.length < 8) {
    throw new Error("Geçerli bir vergi numarası girin.");
  }

  if (address.length < 10) {
    throw new Error("Adres bilgisi en az 10 karakter olmalıdır.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail)) {
    throw new Error("Geçerli bir fatura e-postası girin.");
  }

  if (phone.length < 10) {
    throw new Error("Geçerli bir telefon numarası girin.");
  }

  if (contactTitle.length < 2) {
    throw new Error("Yetkili unvanı bilgisi zorunludur.");
  }
}

async function getAccountByEmail(email: string) {
  const db = getAdminDb();
  const snap = await db
    .collection(ACCOUNTS_COLLECTION)
    .where("email", "==", normalizeEmail(email))
    .limit(1)
    .get();

  if (snap.empty) {
    return null;
  }

  return snap.docs[0]!.data() as CustomerAccountRecord;
}

export async function getCustomerByEmail(email: string) {
  const account = await getAccountByEmail(email);

  if (!account || account.status !== "active") {
    return null;
  }

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    createdAt: account.createdAt,
    lastLoginAt: account.lastLoginAt,
  };
}

function getPhoneVariants(phone: string) {
  const digits = normalizeDigits(phone);
  const variants = new Set<string>();

  if (!digits) {
    return [];
  }

  variants.add(digits);

  if (digits.startsWith("90") && digits.length === 12) {
    variants.add(digits.slice(2));
    variants.add(`0${digits.slice(2)}`);
  }

  if (digits.startsWith("0") && digits.length === 11) {
    variants.add(digits.slice(1));
    variants.add(`90${digits.slice(1)}`);
  }

  if (digits.length === 10 && digits.startsWith("5")) {
    variants.add(`0${digits}`);
    variants.add(`90${digits}`);
  }

  return [...variants];
}

async function getActiveCustomerByPhone(phone: string) {
  const variants = getPhoneVariants(phone);
  if (variants.length === 0) {
    return null;
  }

  const db = getAdminDb();

  for (const candidate of variants) {
    const snap = await db
      .collection(ACCOUNTS_COLLECTION)
      .where("phone", "==", candidate)
      .where("status", "==", "active")
      .limit(1)
      .get();

    if (!snap.empty) {
      return snap.docs[0]!.data() as CustomerAccountRecord;
    }
  }

  return null;
}

export async function findActiveCustomerConflict(email: string, phone: string) {
  const normalizedEmail = normalizeEmail(email);
  const emailAccount = normalizedEmail
    ? await getCustomerByEmail(normalizedEmail)
    : null;

  const phoneAccount = phone.trim() ? await getActiveCustomerByPhone(phone) : null;

  if (!emailAccount && !phoneAccount) {
    return null;
  }

  return {
    emailMatched: Boolean(emailAccount),
    phoneMatched: Boolean(phoneAccount),
    accountId: emailAccount?.id ?? phoneAccount?.id ?? null,
    email: emailAccount?.email ?? phoneAccount?.email ?? normalizedEmail,
    fullName: emailAccount?.fullName ?? phoneAccount?.fullName ?? "",
  };
}

export async function createCustomerInvite(
  email: string,
  fullName: string,
  applicationId?: string | null
) {
  const normalizedEmail = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Geçerli bir e-posta girin.");
  }

  const cleanedName = fullName.trim();
  if (cleanedName.length < 2) {
    throw new Error("Müşteri adı en az 2 karakter olmalıdır.");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + INVITE_WINDOW_MS).toISOString();

  const invite: CustomerInviteRecord = {
    id: crypto.randomUUID(),
    tokenHash,
    email: normalizedEmail,
    fullName: cleanedName,
    applicationId: applicationId?.trim() || null,
    createdAt: nowIso,
    expiresAt,
    usedAt: null,
    accountId: null,
  };

  await getAdminDb().collection(INVITES_COLLECTION).doc(invite.id).set(invite);

  return {
    token,
    email: invite.email,
    fullName: invite.fullName,
    expiresAt,
    applicationId: invite.applicationId ?? null,
  };
}

export async function completeCustomerInvite(
  token: string,
  password: string,
  fullName?: string,
  profile?: CustomerOfficialProfile
) {
  validatePassword(password);

  if (!profile) {
    throw new Error("Resmi müşteri kayıt bilgileri eksik.");
  }

  validateOfficialProfile(profile);

  const tokenHash = hashToken(token.trim());
  const db = getAdminDb();
  const snap = await db
    .collection(INVITES_COLLECTION)
    .where("tokenHash", "==", tokenHash)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error("Davet bağlantısı geçersiz.");
  }

  const inviteDoc = snap.docs[0]!;
  const invite = inviteDoc.data() as CustomerInviteRecord;

  if (invite.usedAt && invite.accountId) {
    const existing = await db.collection(ACCOUNTS_COLLECTION).doc(invite.accountId).get();
    if (existing.exists) {
      const account = existing.data() as CustomerAccountRecord;
      return {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
        status: account.status,
      };
    }
  }

  if (new Date(invite.expiresAt).getTime() < Date.now()) {
    throw new Error("Davet bağlantısının süresi dolmuş.");
  }

  const normalizedEmail = normalizeEmail(invite.email);
  const accountName = fullName?.trim().length ? fullName.trim() : invite.fullName;
  const nowIso = new Date().toISOString();
  const passwordHash = await hashPassword(password);
  const existingByEmail = await getAccountByEmail(normalizedEmail);

  if (existingByEmail?.status === "active") {
    await inviteDoc.ref.update({ usedAt: nowIso, accountId: existingByEmail.id });
    return {
      id: existingByEmail.id,
      email: existingByEmail.email,
      fullName: existingByEmail.fullName,
      status: existingByEmail.status,
    };
  }

  const accountId = existingByEmail?.id ?? crypto.randomUUID();

  const accountRecord: CustomerAccountRecord = {
    id: accountId,
    email: normalizedEmail,
    fullName: accountName,
    passwordHash,
    companyName: profile.companyName.trim(),
    legalCompanyName: profile.legalCompanyName.trim(),
    taxOffice: profile.taxOffice.trim(),
    taxNumber: normalizeDigits(profile.taxNumber),
    address: profile.address.trim(),
    billingEmail: normalizeEmail(profile.billingEmail),
    phone: normalizeDigits(profile.phone),
    contactTitle: profile.contactTitle.trim(),
    onboardingCompletedAt: nowIso,
    reviewedAt: existingByEmail?.reviewedAt ?? null,
    createdAt: existingByEmail?.createdAt ?? nowIso,
    updatedAt: nowIso,
    lastLoginAt: nowIso,
    status: "pending_review",
  };

  await db.collection(ACCOUNTS_COLLECTION).doc(accountId).set(accountRecord);
  await inviteDoc.ref.update({ usedAt: nowIso, accountId });

  return {
    id: accountId,
    email: accountRecord.email,
    fullName: accountRecord.fullName,
    status: accountRecord.status,
  };
}

export async function authenticateCustomer(email: string, password: string) {
  const account = await getAccountByEmail(email);

  if (!account) {
    return null;
  }

  if (account.status === "pending_review") {
    throw new Error("Hesabınız oluşturuldu ancak yönetici onayı bekleniyor.");
  }

  if (account.status === "disabled") {
    throw new Error("Hesabınız pasif durumda. Lütfen bizimle iletişime geçin.");
  }

  const passwordOk = await verifyPassword(password, account.passwordHash);
  if (!passwordOk) {
    return null;
  }

  const nowIso = new Date().toISOString();
  await getAdminDb().collection(ACCOUNTS_COLLECTION).doc(account.id).update({
    lastLoginAt: nowIso,
    updatedAt: nowIso,
  });

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    lastLoginAt: nowIso,
  };
}

export async function createCustomerPasswordReset(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const account = await getAccountByEmail(normalizedEmail);

  if (!account) {
    return null;
  }

  if (account.status === "disabled") {
    return null;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + PASSWORD_RESET_WINDOW_MS).toISOString();

  const record: CustomerPasswordResetRecord = {
    id: crypto.randomUUID(),
    tokenHash,
    accountId: account.id,
    email: account.email,
    createdAt: nowIso,
    expiresAt,
    usedAt: null,
  };

  await getAdminDb().collection(PASSWORD_RESETS_COLLECTION).doc(record.id).set(record);

  return {
    token,
    email: account.email,
    fullName: account.fullName,
    expiresAt,
    status: account.status,
  };
}

export async function resetCustomerPassword(token: string, password: string) {
  validatePassword(password);

  const tokenHash = hashToken(token.trim());
  const db = getAdminDb();
  const snap = await db
    .collection(PASSWORD_RESETS_COLLECTION)
    .where("tokenHash", "==", tokenHash)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error("Şifre sıfırlama bağlantısı geçersiz.");
  }

  const resetDoc = snap.docs[0]!;
  const reset = resetDoc.data() as CustomerPasswordResetRecord;

  if (reset.usedAt) {
    throw new Error("Bu şifre sıfırlama bağlantısı daha önce kullanılmış.");
  }

  if (new Date(reset.expiresAt).getTime() < Date.now()) {
    throw new Error("Şifre sıfırlama bağlantısının süresi dolmuş.");
  }

  const accountRef = db.collection(ACCOUNTS_COLLECTION).doc(reset.accountId);
  const accountSnap = await accountRef.get();

  if (!accountSnap.exists) {
    throw new Error("Müşteri hesabı bulunamadı.");
  }

  const account = accountSnap.data() as CustomerAccountRecord;
  const nowIso = new Date().toISOString();
  const passwordHash = await hashPassword(password);

  await accountRef.update({
    passwordHash,
    updatedAt: nowIso,
  });

  await resetDoc.ref.update({
    usedAt: nowIso,
  });

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    status: account.status,
  };
}

export async function getCustomerById(id: string) {
  const snap = await getAdminDb().collection(ACCOUNTS_COLLECTION).doc(id).get();
  if (!snap.exists) {
    return null;
  }

  const account = snap.data() as CustomerAccountRecord;
  if (account.status !== "active") {
    return null;
  }

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    createdAt: account.createdAt,
    lastLoginAt: account.lastLoginAt,
  };
}

export async function listPendingCustomerAccounts(limit = 50) {
  const snap = await getAdminDb()
    .collection(ACCOUNTS_COLLECTION)
    .where("status", "==", "pending_review")
    .limit(limit)
    .get();

  const items = snap.docs.map((doc) => {
    const account = doc.data() as CustomerAccountRecord;
    return {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      companyName: account.companyName ?? "",
      legalCompanyName: account.legalCompanyName ?? "",
      taxOffice: account.taxOffice ?? "",
      taxNumber: account.taxNumber ?? "",
      address: account.address ?? "",
      billingEmail: account.billingEmail ?? account.email,
      phone: account.phone ?? "",
      contactTitle: account.contactTitle ?? "",
      createdAt: account.createdAt,
      onboardingCompletedAt: account.onboardingCompletedAt ?? null,
    } satisfies PendingCustomerAccountReview;
  });

  return items.sort((a, b) => {
    const aTime = new Date(a.onboardingCompletedAt ?? a.createdAt).getTime();
    const bTime = new Date(b.onboardingCompletedAt ?? b.createdAt).getTime();
    return bTime - aTime;
  });
}

export async function approveCustomerAccount(accountId: string) {
  const ref = getAdminDb().collection(ACCOUNTS_COLLECTION).doc(accountId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw new Error("Müşteri hesabı bulunamadı.");
  }

  const account = snap.data() as CustomerAccountRecord;
  const nowIso = new Date().toISOString();

  await ref.update({
    status: "active",
    updatedAt: nowIso,
    reviewedAt: nowIso,
  });

  return {
    id: account.id,
    email: account.email,
    fullName: account.fullName,
    status: "active" as CustomerAccountStatus,
  };
}
