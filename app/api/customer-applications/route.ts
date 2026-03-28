import { NextResponse } from "next/server";
import {
  createCustomerApplicationVerification,
  type CustomerApplicationInput,
} from "@/lib/customer-applications";
import {
  isMailConfigured,
  sendApplicationVerificationMail,
} from "@/lib/mailer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SERVICE_AREA_ALIASES: readonly (readonly [string, readonly string[]])[] =
  [
    ["Web Sitesi Tasarımı", ["Web Sitesi Tasarımı", "Web Sitesi Tasarimi"]],
    [
      "Google & SEO Çalışmaları",
      ["Google & SEO Çalışmaları", "Google & SEO Calismalari"],
    ],
    [
      "Sosyal Medya Yönetimi",
      ["Sosyal Medya Yönetimi", "Sosyal Medya Yonetimi"],
    ],
    [
      "Dijital Reklam Yönetimi",
      ["Dijital Reklam Yönetimi", "Dijital Reklam Yonetimi"],
    ],
    [
      "Mobil Uygulama Geliştirme",
      ["Mobil Uygulama Geliştirme", "Mobil Uygulama Gelistirme"],
    ],
    [
      "İş Geliştirme Danışmanlığı",
      ["İş Geliştirme Danışmanlığı", "Is Gelistirme Danismanligi"],
    ],
    ["Logo Tasarımı", ["Logo Tasarımı", "Logo Tasarimi"]],
  ];

const SERVICE_AREA_MAP = new Map(
  SERVICE_AREA_ALIASES.flatMap(([canonical, aliases]) =>
    aliases.map(
      (alias) =>
        [alias.toLocaleLowerCase("tr-TR").normalize("NFC"), canonical] as const,
    ),
  ),
);

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

  const forwardedHost = request.headers.get("x-forwarded-host")?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.trim();

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`.replace(/\/$/, "");
  }

  return new URL(request.url).origin.replace(/\/$/, "");
}

function normalizeServiceArea(value?: string) {
  if (!value) {
    return null;
  }

  return (
    SERVICE_AREA_MAP.get(
      value.trim().toLocaleLowerCase("tr-TR").normalize("NFC"),
    ) ?? null
  );
}

export async function POST(request: Request) {
  try {
    const nowMs = Date.now();
    const ip = getClientIp(request);

    if (isRateLimited(ip, nowMs)) {
      return NextResponse.json(
        {
          message:
            "Kısa sürede çok fazla başvuru gönderildi. Lütfen 1 dakika sonra tekrar deneyin.",
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Partial<CustomerApplicationInput> & {
      website?: string;
    };

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
    }

    const serviceArea = normalizeServiceArea(body.serviceArea) as
      | CustomerApplicationInput["serviceArea"]
      | null;

    if (!serviceArea) {
      return NextResponse.json(
        { message: "Geçerli bir hizmet alanı seçin." },
        { status: 400 },
      );
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
        {
          message:
            "E-posta doğrulama sistemi yapılandırılmamış. SMTP ayarlarını tamamlayın.",
        },
        { status: 503 },
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
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Başvuru oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
