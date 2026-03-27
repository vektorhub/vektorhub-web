import crypto from "node:crypto";
import {
  ADMIN_MOBILE_SESSION_MAX_AGE,
  getAdminMobileSessionSecret,
  isSessionSecretValid,
} from "@/lib/session-config";

type AdminMobileSessionPayload = {
  adminId: string;
  scope: "admin_mobile_session";
  deviceName: string;
  issuedAt: string;
  expiresAt: string;
};

export type AdminMobileSession = {
  adminId: string;
  deviceName: string;
  iat: number;
  exp: number;
};

export function getAdminMobileSessionMaxAge(): number {
  return ADMIN_MOBILE_SESSION_MAX_AGE;
}

export function makeAdminMobileSessionToken(adminId: string, deviceName: string): string {
  const secret = getAdminMobileSessionSecret();

  if (!isSessionSecretValid(secret)) {
    throw new Error("ADMIN_MOBILE_SESSION_SECRET gvenli degil veya tanimli degil");
  }

  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + ADMIN_MOBILE_SESSION_MAX_AGE * 1000);
  const payload: AdminMobileSessionPayload = {
    adminId,
    scope: "admin_mobile_session",
    deviceName: deviceName.trim() || "Mobile device",
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64url");
  const hmac = crypto.createHmac("sha256", secret).update(base64).digest("base64url");

  return `${base64}.${hmac}`;
}

export function verifyAdminMobileSessionToken(
  token: string | undefined | null
): AdminMobileSession | null {
  if (!token) {
    return null;
  }

  const secret = getAdminMobileSessionSecret();
  if (!isSessionSecretValid(secret)) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [base64, providedHmac] = parts;

  try {
    const expectedHmac = crypto.createHmac("sha256", secret).update(base64).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(providedHmac), Buffer.from(expectedHmac))) {
      return null;
    }

    const json = Buffer.from(base64, "base64url").toString("utf-8");
    const payload = JSON.parse(json) as AdminMobileSessionPayload;

    if (payload.scope !== "admin_mobile_session" || !payload.adminId) {
      return null;
    }

    const issuedAt = new Date(payload.issuedAt).getTime();
    const expiresAt = new Date(payload.expiresAt).getTime();
    const now = Date.now();
    const drift = 5 * 60 * 1000;

    if (!Number.isFinite(issuedAt) || !Number.isFinite(expiresAt)) {
      return null;
    }

    if (expiresAt <= now || issuedAt - now > drift) {
      return null;
    }

    return {
      adminId: payload.adminId,
      deviceName: payload.deviceName || "Mobile device",
      iat: issuedAt,
      exp: expiresAt,
    };
  } catch {
    return null;
  }
}
