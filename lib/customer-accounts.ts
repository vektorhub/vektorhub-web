import crypto from "node:crypto";
import { promisify } from "node:util";
import { getAdminDb } from "./firebase-admin";

const scryptAsync = promisify(crypto.scrypt);

const ACCOUNTS_COLLECTION = "customer_accounts";
const INVITES_COLLECTION = "customer_invites";
const INVITE_WINDOW_MS = 1000 * 60 * 60 * 24;

type CustomerAccountRecord = {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  status: "active" | "disabled";
};

type CustomerInviteRecord = {
  id: string;
  tokenHash: string;
  email: string;
  fullName: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
  accountId: string | null;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
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

export async function createCustomerInvite(email: string, fullName: string) {
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
  };
}

export async function completeCustomerInvite(token: string, password: string, fullName?: string) {
  validatePassword(password);

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

  let accountId = existingByEmail?.id ?? crypto.randomUUID();

  const accountRecord: CustomerAccountRecord = {
    id: accountId,
    email: normalizedEmail,
    fullName: accountName,
    passwordHash,
    createdAt: existingByEmail?.createdAt ?? nowIso,
    updatedAt: nowIso,
    lastLoginAt: nowIso,
    status: "active",
  };

  await db.collection(ACCOUNTS_COLLECTION).doc(accountId).set(accountRecord);
  await inviteDoc.ref.update({ usedAt: nowIso, accountId });

  return {
    id: accountId,
    email: accountRecord.email,
    fullName: accountRecord.fullName,
  };
}

export async function authenticateCustomer(email: string, password: string) {
  const account = await getAccountByEmail(email);

  if (!account || account.status !== "active") {
    return null;
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
