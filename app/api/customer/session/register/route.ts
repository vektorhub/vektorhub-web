import { NextResponse } from "next/server";
import {
  createCustomerRegistration,
  type CustomerOfficialProfile,
} from "@/lib/customer-accounts";
import {
  isMailConfigured,
  sendCustomerRegistrationVerificationMail,
} from "@/lib/mailer";

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
    if (!isMailConfigured()) {
      return NextResponse.json(
        { message: "Kayıt için e-posta doğrulama sistemi hazır değil." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      fullName?: string;
      password?: string;
      profile?: CustomerOfficialProfile;
    };

    const registration = await createCustomerRegistration({
      email: body.email ?? "",
      fullName: body.fullName ?? "",
      password: body.password ?? "",
      profile: body.profile as CustomerOfficialProfile,
    });

    const verificationUrl = `${getBaseUrl(request)}/api/customer/session/register/verify?token=${registration.token}`;

    await sendCustomerRegistrationVerificationMail({
      to: registration.email,
      fullName: registration.fullName,
      verificationUrl,
      expiresAt: registration.expiresAt,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Kayıt alındı. E-posta doğrulama bağlantısı gönderildi. Doğrulamadan sonra hesabınız admin onayına düşecektir.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kayıt oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
