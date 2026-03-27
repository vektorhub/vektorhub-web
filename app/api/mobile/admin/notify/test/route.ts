import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { sendAdminPushNotification } from "@/lib/admin-push";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  const body = (await request.json()) as { title?: string; body?: string };
  const result = await sendAdminPushNotification({
    adminId: session.adminId,
    title: body.title?.trim() || "Vektorhub mobil hazir",
    body: body.body?.trim() || "Test bildirimi telefonuna basariyla ulasti.",
    data: {
      type: "test",
      screen: "cockpit",
    },
  });

  return NextResponse.json({ ok: true, result });
}
