import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { createPayment, listPayments, reviewPayment } from "@/lib/customer-commerce";
import {
  sendPaymentCreatedWhatsApp,
  sendPaymentReviewedWhatsApp,
} from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getAdminSession(request: Request) {
  return getAuthenticatedAdminSession(request);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const payments = await listPayments(id);
    return NextResponse.json({ payments }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ödeme kayıtları alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      amount?: number;
      dueDate?: string | null;
      quoteId?: string | null;
    };

    const payment = await createPayment(
      id,
      {
        title: body.title ?? "",
        description: body.description ?? "",
        amount: Number(body.amount ?? 0),
        dueDate: body.dueDate ?? null,
        quoteId: body.quoteId ?? null,
      },
      "Yönetici"
    );

    void sendPaymentCreatedWhatsApp({
      applicationId: id,
      title: payment.title,
      amount: payment.amount,
      dueDate: payment.dueDate,
    }).catch((error) => {
      console.error("WhatsApp odeme bildirimi gonderilemedi:", error);
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ödeme kaydı oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as {
      paymentId?: string;
      status?: "confirmed" | "rejected";
      adminNote?: string;
    };

    if (!body.paymentId || !body.status) {
      return NextResponse.json({ message: "Ödeme bilgisi eksik." }, { status: 400 });
    }

    const payment = await reviewPayment(id, body.paymentId, {
      status: body.status,
      adminNote: body.adminNote,
    }, "Yönetici");

    void sendPaymentReviewedWhatsApp({
      applicationId: id,
      title: payment.title,
      status: body.status,
      adminNote: body.adminNote,
    }).catch((error) => {
      console.error("WhatsApp odeme sonuc bildirimi gonderilemedi:", error);
    });

    return NextResponse.json({ payment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ödeme kaydı güncellenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
