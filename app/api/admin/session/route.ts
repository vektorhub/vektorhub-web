import { NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  getAdminCookieName,
  getAdminSessionMaxAge,
  makeAdminSessionToken,
} from "@/lib/admin-session";
import { shouldUseSecureCookies } from "@/lib/session-config";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const loginHits = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const fromForwarded = forwardedFor.split(",")[0]?.trim();
  return fromForwarded || realIp || "unknown";
}

function isRateLimited(ip: string, nowMs: number) {
  const hits = loginHits.get(ip) ?? [];
  const oneMinuteAgo = nowMs - 60_000;
  const kept = hits.filter((hit) => hit > oneMinuteAgo);
  kept.push(nowMs);
  loginHits.set(ip, kept);
  return kept.length > 10;
}

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Admin şifresi yapılandırılmamış." }, { status: 503 });
  }

  const nowMs = Date.now();
  const ip = getClientIp(request);
  if (isRateLimited(ip, nowMs)) {
    return NextResponse.json({ message: "Çok fazla giriş denemesi. Lütfen tekrar deneyin." }, { status: 429 });
  }

  const body = (await request.json()) as { password?: string };
  const incoming = body.password?.trim() ?? "";

  const isValid =
    incoming.length > 0 &&
    crypto.timingSafeEqual(
      Buffer.from(incoming.padEnd(256)),
      Buffer.from(ADMIN_PASSWORD.padEnd(256))
    );

  if (!isValid) {
    return NextResponse.json({ message: "Şifre hatalı." }, { status: 401 });
  }

  const token = makeAdminSessionToken("admin");
  const response = NextResponse.json({ ok: true });

  response.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    secure: shouldUseSecureCookies(request.url),
    sameSite: "lax",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
