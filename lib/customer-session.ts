import crypto from "node:crypto";
import {
  CUSTOMER_COOKIE_NAME,
  CUSTOMER_SESSION_MAX_AGE,
  getCustomerSessionSecret,
  isSessionSecretValid,
} from "@/lib/session-config";

type CustomerSessionPayload = {
  customerId: string;
  email: string;
  issuedAt: number;
};

function signPayload(payload: string) {
  const secret = getCustomerSessionSecret();

  if (!isSessionSecretValid(secret)) {
    throw new Error("CUSTOMER_SESSION_SECRET güvenli değil.");
  }

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  return hmac.digest("hex");
}

export function getCustomerCookieName() {
  return CUSTOMER_COOKIE_NAME;
}

export function getCustomerSessionMaxAge() {
  return CUSTOMER_SESSION_MAX_AGE;
}

export function makeCustomerSessionToken(customerId: string, email: string) {
  const payloadObj: CustomerSessionPayload = {
    customerId,
    email,
    issuedAt: Date.now(),
  };
  const payload = JSON.stringify(payloadObj);
  const sig = signPayload(payload);
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

export function verifyCustomerSessionToken(raw: string | undefined) {
  if (!raw) {
    return null;
  }

  if (!isSessionSecretValid(getCustomerSessionSecret())) {
    return null;
  }

  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8");
    const lastDot = decoded.lastIndexOf(".");
    if (lastDot === -1) {
      return null;
    }

    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    const expected = signPayload(payload);

    if (sig.length !== expected.length) {
      return null;
    }

    if (!crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) {
      return null;
    }

    const parsed = JSON.parse(payload) as CustomerSessionPayload;
    if (!parsed.customerId || !parsed.email || !Number.isFinite(parsed.issuedAt)) {
      return null;
    }

    const maxAgeMs = CUSTOMER_SESSION_MAX_AGE * 1000;
    const nowMs = Date.now();
    if (parsed.issuedAt > nowMs + 5 * 60_000) {
      return null;
    }

    if (nowMs - parsed.issuedAt > maxAgeMs) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
