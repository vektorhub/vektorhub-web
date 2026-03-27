import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  approveCustomerAccount,
  listPendingCustomerAccounts,
} from "@/lib/customer-accounts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function verifyAdmin(request: Request) {
  return getAuthenticatedAdminSession(request);
}

export async function GET(request: Request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const items = await listPendingCustomerAccounts(100);
    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Onboarding kayıtları alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { accountId?: string };
    const approved = await approveCustomerAccount(body.accountId ?? "");
    return NextResponse.json({ ok: true, account: approved });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Müşteri hesabı onaylanamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
