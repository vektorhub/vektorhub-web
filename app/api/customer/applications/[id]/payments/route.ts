import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";
import { sendAdminPushNotification } from "@/lib/admin-push";
import { listPayments, submitPaymentNotice } from "@/lib/customer-commerce";

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
  if (!session) return null;

  const customer = await getCustomerById(session.customerId);
  if (!customer) return null;

  return { session, customer };
}

async function verifyOwnership(applicationId: string, customerId: string, customerEmail: string) {
  const appSnap = await getAdminDb().collection("customer_applications").doc(applicationId).get();

  if (!appSnap.exists) throw new Error("Talep bulunamadı.");

  const appData = appSnap.data();
  const ownsById = appData?.customerId && appData.customerId === customerId;
  const ownsByEmail =
    typeof appData?.email === "string" &&
    appData.email.trim().toLowerCase() === customerEmail.trim().toLowerCase();

  if (!ownsById && !ownsByEmail) {
    throw new Error("Yetkisiz erişim.");
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getSessionCustomer(request);
    if (!auth) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    await verifyOwnership(id, auth.session.customerId, auth.customer.email);
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
    const auth = await getSessionCustomer(request);
    if (!auth) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    await verifyOwnership(id, auth.session.customerId, auth.customer.email);

    const body = (await request.json()) as {
      paymentId?: string;
      customerReference?: string;
      customerNote?: string;
      proofDocumentId?: string | null;
      proofFileName?: string;
    };

    if (!body.paymentId) {
      return NextResponse.json({ message: "Ödeme kaydı seçilmedi." }, { status: 400 });
    }

    const payment = await submitPaymentNotice(
      id,
      body.paymentId,
      {
        customerReference: body.customerReference ?? "",
        customerNote: body.customerNote,
        proofDocumentId: body.proofDocumentId,
        proofFileName: body.proofFileName,
      },
      auth.customer.fullName
    );

    await sendAdminPushNotification({
      title: "Odeme bildirimi geldi",
      body: `${auth.customer.fullName} bir odeme bildirimi gonderdi.`,
      data: {
        type: "payment_notice",
        applicationId: id,
        paymentId: body.paymentId,
        screen: "application_payments",
      },
    });

    return NextResponse.json({ payment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ödeme bildirimi kaydedilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
