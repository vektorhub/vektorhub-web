import crypto from "node:crypto";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  getAdminSessionSecret,
  isSessionSecretValid,
} from "@/lib/session-config";

export function getAdminCookieName(): string {
  return ADMIN_COOKIE_NAME;
}

export function getAdminSessionMaxAge(): number {
  return ADMIN_SESSION_MAX_AGE;
}

export function makeAdminSessionToken(adminId: string): string {
  const secret = getAdminSessionSecret();

  if (!isSessionSecretValid(secret)) {
    throw new Error("ADMIN_SESSION_SECRET güvenli değil veya tanımlı değil");
  }

  const payload = {
    adminId,
    scope: "admin_session",
    issuedAt: new Date().toISOString(),
  };

  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64url");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(base64)
    .digest("base64url");

  return `${base64}.${hmac}`;
}

export function verifyAdminSessionToken(
  token: string | undefined | null
): { adminId: string; iat: number } | null {
  if (!token) {
    return null;
  }

  const secret = getAdminSessionSecret();

  if (!isSessionSecretValid(secret)) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [base64, providedHmac] = parts;

  try {
    // Verify HMAC
    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(base64)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(providedHmac), Buffer.from(expectedHmac))) {
      return null;
    }

    // Parse payload
    const json = Buffer.from(base64, "base64url").toString("utf-8");
    const payload = JSON.parse(json);

    if (payload.scope !== "admin_session") {
      return null;
    }

    if (!payload.adminId) {
      return null;
    }

    // Check age (max 8 hours)
    const issuedAt = new Date(payload.issuedAt).getTime();
    const now = Date.now();
    const age = now - issuedAt;
    const maxAge = 8 * 60 * 60 * 1000; // 8 hours

    if (age > maxAge) {
      return null;
    }

    // Allow ±5 minute clock drift
    const drift = 5 * 60 * 1000;
    if (now - issuedAt < -drift) {
      return null;
    }

    return {
      adminId: payload.adminId,
      iat: issuedAt,
    };
  } catch {
    return null;
  }
}
