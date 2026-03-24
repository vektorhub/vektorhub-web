import { NextResponse } from "next/server";
import { completeCustomerInvite } from "@/lib/customer-accounts";
import {
  getCustomerCookieName,
  getCustomerSessionMaxAge,
  makeCustomerSessionToken,
} from "@/lib/customer-session";
import { shouldUseSecureCookies } from "@/lib/session-config";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      fullName?: string;
      password?: string;
    };

    const account = await completeCustomerInvite(
      body.token ?? "",
      body.password ?? "",
      body.fullName
    );

    const token = makeCustomerSessionToken(account.id, account.email);
    const response = NextResponse.json({
      ok: true,
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
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hesap oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
