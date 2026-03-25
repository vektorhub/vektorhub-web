import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import {
  createCustomerApplication,
  type CustomerApplicationInput,
} from "@/lib/customer-applications";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";

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
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json({ message: "Müşteri kaydı bulunamadı." }, { status: 404 });
    }

    const body = (await request.json()) as Partial<CustomerApplicationInput>;
    const serviceArea = body.serviceArea?.trim() as CustomerApplicationInput["serviceArea"] | undefined;

    if (!serviceArea || !SERVICE_AREAS.has(serviceArea)) {
      return NextResponse.json({ message: "Geçerli bir hizmet alanı seçin." }, { status: 400 });
    }

    const created = await createCustomerApplication({
      fullName: customer.fullName,
      companyName: body.companyName ?? "Bireysel Müşteri",
      phone: body.phone ?? "0000000000",
      email: customer.email,
      serviceArea,
      details: body.details ?? "",
      customerId: customer.id,
    });

    return NextResponse.json(created, {
      status: 201,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Talep oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}