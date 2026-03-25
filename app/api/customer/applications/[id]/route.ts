import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";
import { withdrawCustomerApplication } from "@/lib/customer-applications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSessionCustomer(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${getCustomerCookieName()}=`))
    ?.slice(getCustomerCookieName().length + 1);

  const session = verifyCustomerSessionToken(token);
  if (!session) {
    return null;
  }

  const customer = await getCustomerById(session.customerId);
  if (!customer) {
    return null;
  }

  return { session, customer };
}

async function verifyOwnership(applicationId: string, customerId: string, customerEmail: string) {
  const db = getAdminDb();
  const appSnap = await db.collection("customer_applications").doc(applicationId).get();

  if (!appSnap.exists) {
    throw new Error("Talep bulunamadı.");
  }

  const appData = appSnap.data();
  const ownsById = appData?.customerId && appData.customerId === customerId;
  const ownsByEmail =
    typeof appData?.email === "string" &&
    appData.email.trim().toLowerCase() === customerEmail.trim().toLowerCase();

  if (!ownsById && !ownsByEmail) {
    throw new Error("Yetkisiz erişim.");
  }

  return appData as { status?: string; referenceNo?: string };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getSessionCustomer(request);
    if (!auth) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as {
      action?: "withdraw" | "cancel_request";
      reason?: string;
    };

    const action = body.action;
    const reason = body.reason?.trim() ?? "";

    if (!action) {
      return NextResponse.json({ message: "İşlem türü belirtilmedi." }, { status: 400 });
    }

    const appData = await verifyOwnership(id, auth.session.customerId, auth.customer.email);

    if (action === "withdraw") {
      const updated = await withdrawCustomerApplication(
        id,
        auth.session.customerId,
        auth.customer.email,
        reason
      );

      return NextResponse.json({ application: updated });
    }

    if (action === "cancel_request") {
      if (appData.status === "İptal Edildi") {
        return NextResponse.json({ message: "Bu kayıt zaten kapatılmış durumda." }, { status: 400 });
      }

      const db = getAdminDb();
      const requestRef = db
        .collection("customer_applications")
        .doc(id)
        .collection("requests")
        .doc();

      const now = new Date().toISOString();

      await requestRef.set({
        id: requestRef.id,
        applicationId: id,
        type: "cancel_application",
        data: {
          reason: reason || "Müşteri bu süreci sonlandırmak istediğini bildirdi.",
          requestedBy: auth.customer.fullName,
          referenceNo: appData.referenceNo ?? "",
        },
        createdAt: now,
        status: "pending",
      });

      await db
        .collection("customer_applications")
        .doc(id)
        .collection("activity_log")
        .add({
          type: "request_cancel_application",
          actor: auth.customer.fullName,
          details: {
            requestId: requestRef.id,
            reason,
          },
          createdAt: now,
        });

      return NextResponse.json({
        request: {
          id: requestRef.id,
          applicationId: id,
          type: "cancel_application",
          status: "pending",
        },
      });
    }

    return NextResponse.json({ message: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "İşlem gerçekleştirilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
