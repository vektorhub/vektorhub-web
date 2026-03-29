import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  getCustomerCookieName,
  getCustomerSessionMaxAge,
  makeCustomerSessionToken,
} from "@/lib/customer-session";
import { getSharedCookieDomain, shouldUseSecureCookies } from "@/lib/session-config";
import { getCustomerById } from "@/lib/customer-accounts";
import { listCustomerApplicationsForCustomer } from "@/lib/customer-applications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: Promise<{ id: string }>;
};

function getBaseUrl(request: Request) {
  const configured = process.env.APP_BASE_URL?.trim();
  if (configured) {
    return configured;
  }

  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function GET(request: Request, context: Context) {
  const admin = getAuthenticatedAdminSession(request);
  if (!admin) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  const { id } = await context.params;
  const customer = await getCustomerById(id);

  if (!customer) {
    return NextResponse.json({ message: "Aktif musteri hesabi bulunamadi." }, { status: 404 });
  }

  const applications = await listCustomerApplicationsForCustomer(customer.id, customer.email, 100);
  const latestHref = applications[0] ? `/musteri/panel/${applications[0].id}` : "/musteri/panel";

  const token = makeCustomerSessionToken(customer.id, customer.email);
  const response = NextResponse.redirect(new URL(latestHref, getBaseUrl(request)));
  const cookieDomain = getSharedCookieDomain(getBaseUrl(request));

  response.cookies.set(getCustomerCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookies(getBaseUrl(request)),
    path: "/",
    maxAge: getCustomerSessionMaxAge(),
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });

  return response;
}
