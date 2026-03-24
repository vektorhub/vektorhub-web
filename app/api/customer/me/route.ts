import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import {
  listCustomerApplicationsForCustomer,
  toCustomerApplicationView,
} from "@/lib/customer-applications";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getCustomerCookieName()}=`))
      ?.slice(getCustomerCookieName().length + 1);

    const session = verifyCustomerSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json({ message: "Müşteri kaydı bulunamadı." }, { status: 404 });
    }

    const applications = (await listCustomerApplicationsForCustomer(
      customer.id,
      customer.email,
      100
    )).map(
      toCustomerApplicationView
    );

    return NextResponse.json(
      {
        customer,
        applications,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Profil alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
