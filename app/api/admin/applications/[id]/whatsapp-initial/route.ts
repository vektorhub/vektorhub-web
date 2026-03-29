import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { getApplicationById } from "@/lib/customer-applications";
import { sendInitialApplicationWhatsApp } from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getAdminSession(request: Request) {
  return getAuthenticatedAdminSession(request);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
    }

    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application) {
      return NextResponse.json({ message: "Talep bulunamadi." }, { status: 404 });
    }

    const result = await sendInitialApplicationWhatsApp(id);

    if (result && typeof result === "object" && "skipped" in result && result.skipped) {
      const reason =
        result.reason === "opted_out"
          ? "Musteri WhatsApp bildirimlerini kapattigi icin mesaj gonderilmedi."
          : "WhatsApp mesaji bu kayit icin gonderilemedi.";

      return NextResponse.json({ ok: false, skipped: true, message: reason });
    }

    return NextResponse.json({
      ok: true,
      skipped: false,
      message: "Ilk WhatsApp mesaji yeniden gonderildi.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "WhatsApp mesaji yeniden gonderilemedi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
