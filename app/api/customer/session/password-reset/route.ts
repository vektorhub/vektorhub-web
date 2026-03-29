import { NextResponse } from "next/server";
import { resetCustomerPassword } from "@/lib/customer-accounts";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      token?: string;
      password?: string;
    };

    const account = await resetCustomerPassword(body.token ?? "", body.password ?? "");

    return NextResponse.json({
      ok: true,
      customer: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
        status: account.status,
      },
      message: "Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Şifre güncellenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
