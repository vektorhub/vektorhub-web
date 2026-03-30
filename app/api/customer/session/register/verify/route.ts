import { NextResponse } from "next/server";
import { verifyCustomerRegistrationEmail } from "@/lib/customer-accounts";

export const dynamic = "force-dynamic";

function getBaseUrl(request: Request) {
  const envBaseUrl = process.env.APP_BASE_URL?.trim();
  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.trim();

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`.replace(/\/$/, "");
  }

  return new URL(request.url).origin.replace(/\/$/, "");
}

function redirectWithState(request: Request, status: "success" | "error", message: string) {
  const redirectUrl = new URL("/musteri/kayit/dogrula", getBaseUrl(request));
  redirectUrl.searchParams.set("status", status);
  redirectUrl.searchParams.set("message", message);
  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") ?? "";
    await verifyCustomerRegistrationEmail(token);

    return redirectWithState(
      request,
      "success",
      "E-posta doğrulandı. Artık giriş yapabilirsiniz. Admin onayı tamamlanana kadar onay bekliyor ekranı gösterilecektir."
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "E-posta doğrulaması tamamlanamadı.";
    return redirectWithState(request, "error", message);
  }
}
