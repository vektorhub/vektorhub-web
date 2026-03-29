import { NextResponse } from "next/server";
import { authenticateCustomer } from "@/lib/customer-accounts";
import {
  getCustomerCookieName,
  getCustomerSessionMaxAge,
  makeCustomerSessionToken,
} from "@/lib/customer-session";
import { getSharedCookieDomain, shouldUseSecureCookies } from "@/lib/session-config";

export const dynamic = "force-dynamic";

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
  return kept.length > 12;
}

export async function POST(request: Request) {
  try {
    const nowMs = Date.now();
    const ip = getClientIp(request);
    if (isRateLimited(ip, nowMs)) {
      return NextResponse.json(
        { message: "Çok fazla giriş denemesi. Lütfen tekrar deneyin." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const account = await authenticateCustomer(body.email ?? "", body.password ?? "");
    if (!account) {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const token = makeCustomerSessionToken(account.id, account.email);
    const cookieDomain = getSharedCookieDomain(request.url);
    const response = NextResponse.json({
      ok: true,
      customer: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
      },
    });

    response.cookies.set(getCustomerCookieName(), token, {
      httpOnly: true,
      secure: shouldUseSecureCookies(request.url),
      sameSite: "lax",
      path: "/",
      maxAge: getCustomerSessionMaxAge(),
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Giriş yapılamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  const cookieDomain = process.env.APP_BASE_URL
    ? getSharedCookieDomain(process.env.APP_BASE_URL)
    : undefined;
  response.cookies.set(getCustomerCookieName(), "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });
  return response;
}
