import { NextResponse } from "next/server";
import {
  deleteApplicationWithChildren,
  getApplicationById,
  toCustomerApplicationView,
  updateApplicationStatus,
  type ApplicationStatus,
} from "@/lib/customer-applications";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { sendApplicationDeletedMail } from "@/lib/mailer";
import {
  getCustomerMessagingOverviewByPhone,
  sendApplicationStatusWhatsApp,
} from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";

const VALID_STATUSES = new Set<ApplicationStatus>([
  "Başvuru Alındı",
  "İnceleniyor",
  "Teklif Hazırlanıyor",
  "Tamamlandı",
]);

function getAdminSessionFromRequest(request: Request) {
  return getAuthenticatedAdminSession(request);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSessionFromRequest(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application) {
      return NextResponse.json({ message: "Talep bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(
      {
        application: {
          ...toCustomerApplicationView(application),
          messaging: await getCustomerMessagingOverviewByPhone(
            application.phone,
            application.id,
          ),
        },
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Talep alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSessionFromRequest(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { status?: string; note?: string };

    const status = body.status as ApplicationStatus | undefined;
    const note = body.note?.trim() ?? "";

    if (!status || !VALID_STATUSES.has(status)) {
      return NextResponse.json({ message: "Geçersiz durum değeri." }, { status: 400 });
    }

    if (note.length < 5) {
      return NextResponse.json({ message: "Not en az 5 karakter olmalıdır." }, { status: 400 });
    }

    await updateApplicationStatus(id, status, note);
    void sendApplicationStatusWhatsApp({
      applicationId: id,
      status,
      note,
    }).catch((error) => {
      console.error("WhatsApp durum guncelleme mesaji gonderilemedi:", error);
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Güncelleme başarısız.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSessionFromRequest(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { reason?: string };
    const reason = body.reason?.trim() ?? "";

    if (reason.length < 10) {
      return NextResponse.json(
        { message: "Silme açıklaması en az 10 karakter olmalıdır." },
        { status: 400 }
      );
    }

    const application = await getApplicationById(id);
    if (!application) {
      return NextResponse.json({ message: "Talep bulunamadı." }, { status: 404 });
    }

    await sendApplicationDeletedMail({
      to: application.email,
      fullName: application.fullName,
      referenceNo: application.referenceNo,
      reason,
    });

    await deleteApplicationWithChildren(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Talep silinemedi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
