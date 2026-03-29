import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { listActiveCustomerAccounts } from "@/lib/customer-accounts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const admin = getAuthenticatedAdminSession(request);
  if (!admin) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const items = await listActiveCustomerAccounts(300);
    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Aktif musteri listesi alinamadi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
