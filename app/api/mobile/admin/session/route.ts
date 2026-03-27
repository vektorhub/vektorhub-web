import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  getAdminMobileSessionMaxAge,
  makeAdminMobileSessionToken,
  verifyAdminMobileSessionToken,
} from "@/lib/admin-mobile-session";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";

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
    return NextResponse.json({ message: "Admin sifresi yapilandirilmamis." }, { status: 503 });
  }

  const nowMs = Date.now();
  const ip = getClientIp(request);
  if (isRateLimited(ip, nowMs)) {
    return NextResponse.json(
      { message: "Cok fazla giris denemesi. Lutfen tekrar deneyin." },
      { status: 429 }
    );
  }

  const body = (await request.json()) as { password?: string; deviceName?: string };
  const incoming = body.password?.trim() ?? "";
  const deviceName = body.deviceName?.trim() ?? "Android phone";

  const isValid =
    incoming.length > 0 &&
    crypto.timingSafeEqual(
      Buffer.from(incoming.padEnd(256)),
      Buffer.from(ADMIN_PASSWORD.padEnd(256))
    );

  if (!isValid) {
    return NextResponse.json({ message: "Sifre hatali." }, { status: 401 });
  }

  const token = makeAdminMobileSessionToken("admin", deviceName);
  const session = verifyAdminMobileSessionToken(token);

  return NextResponse.json({
    ok: true,
    token,
    tokenType: "Bearer",
    expiresIn: getAdminMobileSessionMaxAge(),
    expiresAt: session ? new Date(session.exp).toISOString() : null,
    admin: {
      id: "admin",
      deviceName,
    },
  });
}

export async function GET(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    admin: {
      id: session.adminId,
      source: session.source,
      deviceName: session.deviceName ?? null,
    },
  });
}
