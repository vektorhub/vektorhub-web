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

const SERVICE_AREAS = new Set([
  "Web Sitesi Tasar\u0131m\u0131",
  "Google & SEO \u00c7al\u0131\u015fmalar\u0131",
  "Sosyal Medya Y\u00f6netimi",
  "Dijital Reklam Y\u00f6netimi",
  "Mobil Uygulama Geli\u015ftirme",
  "\u0130\u015f Geli\u015ftirme Dan\u0131\u015fmanl\u0131\u011f\u0131",
  "Logo Tasar\u0131m\u0131",
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
      return NextResponse.json({ message: "Yetkisiz eri\u015fim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json(
        { message: "M\u00fc\u015fteri kayd\u0131 bulunamad\u0131." },
        { status: 404 }
      );
    }

    const body = (await request.json()) as Partial<CustomerApplicationInput>;
    const serviceArea = body.serviceArea?.trim() as
      | CustomerApplicationInput["serviceArea"]
      | undefined;

    if (!serviceArea || !SERVICE_AREAS.has(serviceArea)) {
      return NextResponse.json(
        { message: "Ge\u00e7erli bir hizmet alan\u0131 se\u00e7in." },
        { status: 400 }
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
      error instanceof Error ? error.message : "Talep olu\u015fturulamad\u0131.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
