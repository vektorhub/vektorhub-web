import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";
import { verifyAdminMobileSessionToken } from "@/lib/admin-mobile-session";

export type AuthenticatedAdminSession = {
  adminId: string;
  source: "cookie" | "bearer";
  deviceName?: string;
};

function readAdminCookieToken(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return (
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${getAdminCookieName()}=`))
      ?.slice(getAdminCookieName().length + 1) ?? null
  );
}

function readBearerToken(request: Request): string | null {
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice("Bearer ".length).trim();
  return token || null;
}

export function getAuthenticatedAdminSession(
  request: Request
): AuthenticatedAdminSession | null {
  const cookieToken = readAdminCookieToken(request);
  const cookieSession = verifyAdminSessionToken(cookieToken);
  if (cookieSession) {
    return {
      adminId: cookieSession.adminId,
      source: "cookie",
    };
  }

  const bearerToken = readBearerToken(request);
  const bearerSession = verifyAdminMobileSessionToken(bearerToken);
  if (bearerSession) {
    return {
      adminId: bearerSession.adminId,
      source: "bearer",
      deviceName: bearerSession.deviceName,
    };
  }

  return null;
}
