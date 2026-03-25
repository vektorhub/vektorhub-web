import { NextResponse } from "next/server";
import {
  createCustomerApplicationVerification,
  type CustomerApplicationInput,
} from "@/lib/customer-applications";
import { isMailConfigured, sendApplicationVerificationMail } from "@/lib/mailer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SERVICE_AREAS = new Set([
  "Web Sitesi Tasarımı",
  "Google & SEO Çalışmaları",
  "Sosyal Medya Yönetimi",
  "Dijital Reklam Yönetimi",
  "Mobil Uygulama Geliştirme",
  "İş Geliştirme Danışmanlığı",
  "Logo Tasarımı",
]);

const ipHits = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const fromForwarded = forwardedFor.split(",")[0]?.trim();
  return fromForwarded || realIp || "unknown";
}

function isRateLimited(ip: string, nowMs: number) {
  const currentHits = ipHits.get(ip) ?? [];
  const oneMinuteAgo = nowMs - 60_000;
  const kept = currentHits.filter((hit) => hit > oneMinuteAgo);

  kept.push(nowMs);
  ipHits.set(ip, kept);

  return kept.length > 10;
}

function getBaseUrl(request: Request) {
  const envBaseUrl = process.env.APP_BASE_URL?.trim();
  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("APP_BASE_URL üretim ortamında zorunludur.");
  }

  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const nowMs = Date.now();
    const ip = getClientIp(request);

    if (isRateLimited(ip, nowMs)) {
      return NextResponse.json(
        { message: "Kısa sürede çok fazla başvuru gönderildi. Lütfen 1 dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<CustomerApplicationInput> & {
      website?: string;
    };

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
    }

    const serviceArea = body.serviceArea?.trim() as CustomerApplicationInput["serviceArea"] | undefined;

    if (!serviceArea || !SERVICE_AREAS.has(serviceArea)) {
      return NextResponse.json({ message: "Geçerli bir hizmet alanı seçin." }, { status: 400 });
    }

    const verification = await createCustomerApplicationVerification({
      fullName: body.fullName ?? "",
      companyName: body.companyName ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      serviceArea,
      details: body.details ?? "",
    });

    const verificationUrl = `${getBaseUrl(request)}/api/customer-applications/verify?token=${verification.token}`;
    let deliveryMode: "smtp" | "preview" = "smtp";
    const showPreviewUrl = process.env.NODE_ENV !== "production";

    if (isMailConfigured()) {
      await sendApplicationVerificationMail({
        to: verification.email,
        fullName: body.fullName?.trim() ?? "Müşteri",
        verificationCode: verification.verificationCode,
        verificationUrl,
        expiresAt: verification.expiresAt,
        serviceArea,
      });
    } else if (process.env.NODE_ENV !== "production") {
      deliveryMode = "preview";
    } else {
      return NextResponse.json(
        { message: "E-posta doğrulama sistemi yapılandırılmamış. SMTP ayarlarını tamamlayın." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        verificationRequired: true,
        verificationId: verification.verificationId,
        maskedEmail: verification.maskedEmail,
        expiresAt: verification.expiresAt,
        deliveryMode,
        previewUrl: showPreviewUrl ? verificationUrl : undefined,
        message:
          deliveryMode === "smtp"
            ? "Başvurunuzu tamamlamak için doğrulama mailini kontrol edin. Mail onaylandıktan sonra takip numaranız oluşturulacaktır."
            : "SMTP henüz yapılandırılmadığı için geliştirme önizleme bağlantısı üretildi. Üretimde gerçek doğrulama maili gönderilecektir.",
      },
      {
        status: 202,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Başvuru oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
