import { NextResponse } from "next/server";
import { confirmCustomerApplicationWithCode } from "@/lib/customer-applications";
import { sendAdminPushNotification } from "@/lib/admin-push";
import { sendInitialApplicationWhatsApp } from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      verificationId?: string;
      code?: string;
    };

    const result = await confirmCustomerApplicationWithCode(
      body.verificationId ?? "",
      body.code ?? ""
    );

    await sendAdminPushNotification({
      title: "Yeni basvuru onaylandi",
      body: `${result.referenceNo} takip numarali yeni basvuru olustu.`,
      data: {
        type: "new_application",
        referenceNo: result.referenceNo,
        screen: "cockpit",
      },
    });

    if ("id" in result && typeof result.id === "string" && result.id) {
      void sendInitialApplicationWhatsApp(result.id).catch((error) => {
        console.error("WhatsApp ilk basvuru mesaji gonderilemedi:", error);
      });
    }

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kod doğrulama başarısız.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
