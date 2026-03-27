import { NextResponse } from "next/server";
import { confirmCustomerApplicationVerification } from "@/lib/customer-applications";
import { sendAdminPushNotification } from "@/lib/admin-push";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function redirectWithState(baseUrl: URL, status: "success" | "error", params: Record<string, string>) {
  const redirectUrl = new URL("/musteri-girisi/email-dogrulama", baseUrl);
  redirectUrl.searchParams.set("status", status);
  for (const [key, value] of Object.entries(params)) {
    redirectUrl.searchParams.set(key, value);
  }
  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";

  try {
    const result = await confirmCustomerApplicationVerification(token);
    await sendAdminPushNotification({
      title: "Yeni basvuru onaylandi",
      body: `${result.referenceNo} takip numarali yeni basvuru olustu.`,
      data: {
        type: "new_application",
        referenceNo: result.referenceNo,
        screen: "cockpit",
      },
    });
    return redirectWithState(url, "success", {
      referenceNo: result.referenceNo,
      submittedAt: result.submittedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Doğrulama başarısız oldu.";
    return redirectWithState(url, "error", { message });
  }
}
