import { NextResponse } from "next/server";
import { updateWhatsAppDeliveryStatus } from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const messageSid = String(formData.get("MessageSid") ?? "").trim();
    const status = String(formData.get("MessageStatus") ?? "").trim();
    const errorCode = String(formData.get("ErrorCode") ?? "").trim() || null;
    const errorMessage =
      String(formData.get("ErrorMessage") ?? "").trim() || null;

    if (messageSid && status) {
      await updateWhatsAppDeliveryStatus({
        messageSid,
        status,
        errorCode,
        errorMessage,
      });
    }

    return new NextResponse("ok", { status: 200 });
  } catch {
    return new NextResponse("ignored", { status: 200 });
  }
}
