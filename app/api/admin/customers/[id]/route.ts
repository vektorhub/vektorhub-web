import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { disableCustomerAccount } from "@/lib/customer-accounts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, context: Context) {
  const admin = getAuthenticatedAdminSession(request);
  if (!admin) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { reason?: string };
    const { id } = await context.params;
    const account = await disableCustomerAccount(id, body.reason ?? "", admin.adminId || "admin");
    return NextResponse.json({ ok: true, account });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Musteri kaldirilamadi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
