import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { sendAdminPushNotification } from "@/lib/admin-push";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";
import { listQuotes, updateQuoteStatus } from "@/lib/customer-commerce";

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
    const quotes = await listQuotes(id);
    return NextResponse.json({ quotes }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Teklifler alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function PATCH(
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
      quoteId?: string;
      status?: "accepted" | "rejected";
      customerNote?: string;
    };

    if (!body.quoteId || !body.status) {
      return NextResponse.json({ message: "Teklif bilgisi eksik." }, { status: 400 });
    }

    const quote = await updateQuoteStatus(
      id,
      body.quoteId,
      body.status,
      auth.customer.fullName,
      body.customerNote
    );

    await sendAdminPushNotification({
      title: body.status === "accepted" ? "Teklif kabul edildi" : "Teklif reddedildi",
      body: `${auth.customer.fullName} bir teklife yanit verdi.`,
      data: {
        type: "customer_quote_response",
        applicationId: id,
        quoteId: body.quoteId,
        quoteStatus: body.status,
        screen: "application_quotes",
      },
    });

    return NextResponse.json({ quote });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Teklif yanıtı kaydedilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
