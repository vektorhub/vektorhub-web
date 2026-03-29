import { NextResponse } from "next/server";
import {
  completeCustomerInvite,
  type CustomerOfficialProfile,
} from "@/lib/customer-accounts";
import {
  getCustomerCookieName,
  getCustomerSessionMaxAge,
  makeCustomerSessionToken,
} from "@/lib/customer-session";
import { getSharedCookieDomain, shouldUseSecureCookies } from "@/lib/session-config";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      fullName?: string;
      password?: string;
      profile?: CustomerOfficialProfile;
    };

    const account = await completeCustomerInvite(
      body.token ?? "",
      body.password ?? "",
      body.fullName,
      body.profile
    );

    if (account.status === "active") {
      const token = makeCustomerSessionToken(account.id, account.email);
      const cookieDomain = getSharedCookieDomain(request.url);
      const response = NextResponse.json({
        ok: true,
        status: account.status,
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
    }

    return NextResponse.json({
      ok: true,
      status: account.status,
      customer: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
      },
      message:
        "Resmi müşteri kaydınız alındı. Yönetici onayı tamamlandıktan sonra portal girişiniz aktifleşecektir.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hesap oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
