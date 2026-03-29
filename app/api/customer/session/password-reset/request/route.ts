import { NextResponse } from "next/server";
import { createCustomerPasswordReset } from "@/lib/customer-accounts";
import { isMailConfigured, sendCustomerPasswordResetMail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

function getBaseUrl(request: Request) {
  const envBaseUrl = process.env.APP_BASE_URL?.trim();
  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.trim();

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`.replace(/\/$/, "");
  }

  return new URL(request.url).origin.replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const reset = await createCustomerPasswordReset(body.email ?? "");

    if (reset && isMailConfigured()) {
      const resetUrl = `${getBaseUrl(request)}/musteri/sifre-sifirla?token=${reset.token}`;
      await sendCustomerPasswordResetMail({
        to: reset.email,
        fullName: reset.fullName,
        resetUrl,
        expiresAt: reset.expiresAt,
      });
    }

    return NextResponse.json({
      ok: true,
      message:
        "E-posta adresi sistemde varsa şifre yenileme bağlantısı gönderildi.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Şifre yenileme bağlantısı gönderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
