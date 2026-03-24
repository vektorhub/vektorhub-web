import { NextResponse } from "next/server";
import { createCustomerInvite } from "@/lib/customer-accounts";
import { isMailConfigured, sendCustomerInviteMail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

function getBaseUrl(request: Request) {
  const envBaseUrl = process.env.APP_BASE_URL?.trim();
  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("APP_BASE_URL üretim ortamında zorunludur.");
  }

  return new URL(request.url).origin;
}

export async function POST(request: Request) {
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
