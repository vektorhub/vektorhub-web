import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  listAdminMobileNotifications,
  markAdminMobileNotificationRead,
  markAllAdminMobileNotificationsRead,
} from "@/lib/admin-mobile-notifications";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);
    const items = await listAdminMobileNotifications(session.adminId, limit);
    return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bildirimler alinamadi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      notificationId?: string;
      markAll?: boolean;
    };

    if (body.markAll) {
      const result = await markAllAdminMobileNotificationsRead(session.adminId);
      return NextResponse.json({ ok: true, ...result });
    }

    if (!body.notificationId) {
      return NextResponse.json(
        { message: "Bildirim kimligi gerekli." },
        { status: 400 }
      );
    }

    await markAdminMobileNotificationRead(session.adminId, body.notificationId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Bildirim guncellenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
