const LOCAL_FALLBACK_SUFFIX = "vektorhub-session-fallback-2026";

function getMachineSeed() {
  return [
    process.env.COMPUTERNAME,
    process.env.HOSTNAME,
    process.env.USERNAME,
    process.env.USER,
    process.env.USERPROFILE,
    process.env.HOME,
  ]
    .filter((value): value is string => Boolean(value && value.trim()))
    .join("|");
}

function buildSessionSecret(
  scope: "admin" | "admin_mobile" | "customer",
  explicitSecret?: string
) {
  const trimmed = explicitSecret?.trim();
  if (trimmed) {
    return trimmed;
  }

  const machineSeed = getMachineSeed() || "local-machine";
  return `${scope}:${machineSeed}:${LOCAL_FALLBACK_SUFFIX}`;
}

export const ADMIN_COOKIE_NAME = "vh_admin_session";
export const CUSTOMER_COOKIE_NAME = "vh_customer_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;
export const ADMIN_MOBILE_SESSION_MAX_AGE = 60 * 60 * 24 * 30;
export const CUSTOMER_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export function getAdminSessionSecret() {
  return buildSessionSecret("admin", process.env.ADMIN_SESSION_SECRET);
}

export function getAdminMobileSessionSecret() {
  return buildSessionSecret("admin_mobile", process.env.ADMIN_MOBILE_SESSION_SECRET);
}

export function getCustomerSessionSecret() {
  return buildSessionSecret("customer", process.env.CUSTOMER_SESSION_SECRET);
}

export function isSessionSecretValid(secret: string) {
  return secret.length >= 32;
}

export function shouldUseSecureCookies(requestUrl: string) {
  try {
    const hostname = new URL(requestUrl).hostname;
    return hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "::1";
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

export function getSharedCookieDomain(requestUrl: string) {
  try {
    const hostname = new URL(requestUrl).hostname.toLowerCase();

    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)
    ) {
      return undefined;
    }

    const parts = hostname.split(".").filter(Boolean);
    if (parts.length < 2) {
      return undefined;
    }

    return parts.slice(-2).join(".");
  } catch {
    return undefined;
  }
}
