import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { createCustomerInvite } from "@/lib/customer-accounts";
import { isMailConfigured, sendCustomerInviteMail } from "@/lib/mailer";

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

export async function POST(request: Request) {
  const session = getAuthenticatedAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      fullName?: string;
    };

    const invite = await createCustomerInvite(body.email ?? "", body.fullName ?? "");
    const inviteUrl = `${getBaseUrl(request)}/musteri/davet?token=${invite.token}`;
    const showPreviewUrl = process.env.NODE_ENV !== "production";

    if (isMailConfigured()) {
      await sendCustomerInviteMail({
        to: invite.email,
        fullName: invite.fullName,
        inviteUrl,
        expiresAt: invite.expiresAt,
      });
    }

    return NextResponse.json({
      ok: true,
      email: invite.email,
      expiresAt: invite.expiresAt,
      previewUrl: showPreviewUrl ? inviteUrl : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Davet gönderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
