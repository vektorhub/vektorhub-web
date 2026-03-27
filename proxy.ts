import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  CUSTOMER_COOKIE_NAME,
  CUSTOMER_SESSION_MAX_AGE,
  getAdminSessionSecret,
  getCustomerSessionSecret,
  isSessionSecretValid,
} from "./lib/session-config";

const ADMIN_MAX_AGE_MS = ADMIN_SESSION_MAX_AGE * 1000;
const CUSTOMER_MAX_AGE_MS = CUSTOMER_SESSION_MAX_AGE * 1000;

async function verifySessionToken(raw: string | undefined): Promise<boolean> {
  const secret = getAdminSessionSecret();
  if (!raw || !isSessionSecretValid(secret)) return false;
  try {
    const parts = raw.split(".");
    if (parts.length !== 2) return false;

    const [base64, providedHmac] = parts;
    const json = Buffer.from(base64, "base64url").toString("utf8");
    const payload = JSON.parse(json) as {
      adminId?: string;
      scope?: string;
      issuedAt?: string;
    };

    if (payload.scope !== "admin_session" || !payload.adminId || !payload.issuedAt) {
      return false;
    }

    const issuedAt = new Date(payload.issuedAt).getTime();
    if (!Number.isFinite(issuedAt)) return false;

    const nowMs = Date.now();
    if (issuedAt > nowMs + 5 * 60_000) return false;
    if (nowMs - issuedAt > ADMIN_MAX_AGE_MS) return false;

    const enc = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const sigBytes = Uint8Array.from(Buffer.from(providedHmac, "base64url"));
    return await globalThis.crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(base64));
  } catch {
    return false;
  }
}

async function verifyCustomerSessionToken(raw: string | undefined): Promise<boolean> {
  const secret = getCustomerSessionSecret();
  if (!raw || !isSessionSecretValid(secret)) return false;
  try {
    const decoded = Buffer.from(raw, "base64url").toString("utf8");
    const lastDot = decoded.lastIndexOf(".");
    if (lastDot === -1) return false;
    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    if (!/^[a-f0-9]{64}$/i.test(sig)) return false;

    const parsed = JSON.parse(payload) as {
      customerId?: string;
      email?: string;
      issuedAt?: number;
    };
    if (!parsed.customerId || !parsed.email || !Number.isFinite(parsed.issuedAt)) {
      return false;
    }

    const nowMs = Date.now();
    if ((parsed.issuedAt as number) > nowMs + 5 * 60_000) return false;
    if (nowMs - (parsed.issuedAt as number) > CUSTOMER_MAX_AGE_MS) return false;

    const enc = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const parts = sig.match(/.{1,2}/g);
    if (!parts) return false;
    const sigBytes = Uint8Array.from(parts.map((b) => parseInt(b, 16)));
    return await globalThis.crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authHeader = request.headers.get("authorization") ?? "";
  const hasBearerToken = authHeader.startsWith("Bearer ");

  // /admin/giris herkese açık (giriş sayfası ve session API)
  if (
    pathname === "/admin/giris" ||
    pathname.startsWith("/api/admin/session")
  ) {
    return NextResponse.next();
  }

  if (
    pathname === "/musteri/giris" ||
    pathname === "/musteri/davet" ||
    pathname.startsWith("/api/customer/session")
  ) {
    return NextResponse.next();
  }

  // /admin/** ve /api/admin/** için oturum kontrolü
  if (pathname.startsWith("/api/admin") && hasBearerToken) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!(await verifySessionToken(token))) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/giris", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/musteri/panel") || pathname.startsWith("/api/customer/me")) {
    const token = request.cookies.get(CUSTOMER_COOKIE_NAME)?.value;
    if (!(await verifyCustomerSessionToken(token))) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
      }
      const loginUrl = new URL("/musteri/giris", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/musteri/:path*",
    "/api/customer/:path*",
  ],
};
