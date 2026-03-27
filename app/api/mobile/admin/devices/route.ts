import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  registerAdminMobileDevice,
  unregisterAdminMobileDevice,
} from "@/lib/admin-mobile-devices";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      fcmToken?: string;
      deviceId?: string;
      deviceName?: string;
      platform?: string;
      appVersion?: string;
    };

    const device = await registerAdminMobileDevice({
      adminId: session.adminId,
      fcmToken: body.fcmToken ?? "",
      deviceId: body.deviceId ?? "",
      deviceName: body.deviceName ?? session.deviceName,
      platform: body.platform,
      appVersion: body.appVersion,
    });

    return NextResponse.json({ ok: true, device }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cihaz kaydi basarisiz.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { deviceId?: string };
    const removed = await unregisterAdminMobileDevice(session.adminId, body.deviceId ?? "");
    return NextResponse.json({ ok: true, removed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cihaz kaydi kaldirilamadi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
