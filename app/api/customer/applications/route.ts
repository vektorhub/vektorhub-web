import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import {
  createCustomerApplication,
  type CustomerApplicationInput,
} from "@/lib/customer-applications";
import { sendAdminPushNotification } from "@/lib/admin-push";
import {
  getCustomerCookieName,
  verifyCustomerSessionToken,
} from "@/lib/customer-session";

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
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${getCustomerCookieName()}=`))
      ?.slice(getCustomerCookieName().length + 1);

    const session = verifyCustomerSessionToken(token);
    if (!session) {
      return NextResponse.json(
        { message: "Yetkisiz eri\u015fim." },
        { status: 401 },
      );
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json(
        { message: "M\u00fc\u015fteri kayd\u0131 bulunamad\u0131." },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Partial<CustomerApplicationInput>;
    const serviceArea = normalizeServiceArea(body.serviceArea) as
      | CustomerApplicationInput["serviceArea"]
      | null;

    if (!serviceArea) {
      return NextResponse.json(
        { message: "Ge\u00e7erli bir hizmet alan\u0131 se\u00e7in." },
        { status: 400 },
      );
    }

    const created = await createCustomerApplication({
      fullName: customer.fullName,
      companyName: body.companyName ?? "Bireysel M\u00fc\u015fteri",
      phone: body.phone ?? "0000000000",
      email: customer.email,
      serviceArea,
      details: body.details ?? "",
      customerId: customer.id,
    });

    await sendAdminPushNotification({
      title: "Yeni musteri talebi",
      body: `${created.referenceNo} takip numarali yeni talep olusturuldu.`,
      data: {
        type: "new_customer_application",
        applicationId: created.id,
        referenceNo: created.referenceNo,
        screen: "application_detail",
      },
    });

    return NextResponse.json(created, {
      status: 201,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Talep olu\u015fturulamad\u0131.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
