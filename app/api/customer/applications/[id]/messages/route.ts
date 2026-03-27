import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { getMessages, createMessage, markMessageAsRead } from "@/lib/customer-applications-extended";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";
import { sendAdminPushNotification } from "@/lib/admin-push";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function verifyOwnership(applicationId: string, customerId: string, customerEmail?: string) {
  const db = getAdminDb();
  const appSnap = await db
    .collection("customer_applications")
    .doc(applicationId)
    .get();

  if (!appSnap.exists) {
    throw new Error("Talep bulunamadı.");
  }

  const appData = appSnap.data();
  const ownsById = appData?.customerId && appData.customerId === customerId;
  const ownsByEmail =
    customerEmail &&
    typeof appData?.email === "string" &&
    appData.email.trim().toLowerCase() === customerEmail.trim().toLowerCase();

  if (!ownsById && !ownsByEmail) {
    throw new Error("Yetkisiz erişim.");
  }

  return appData;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getCustomerCookieName()}=`))
      ?.slice(getCustomerCookieName().length + 1);

    const session = verifyCustomerSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json({ message: "Müşteri bulunamadı." }, { status: 404 });
    }

    await verifyOwnership(id, session.customerId, customer.email);

    const messages = await getMessages(id, 50);

    return NextResponse.json(
      { messages },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesajlar alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getCustomerCookieName()}=`))
      ?.slice(getCustomerCookieName().length + 1);

    const session = verifyCustomerSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    if (!customer) {
      return NextResponse.json({ message: "Müşteri bulunamadı." }, { status: 404 });
    }

    await verifyOwnership(id, session.customerId, customer.email);

    const body = await request.json();
    const { text } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ message: "Mesaj boş olamaz." }, { status: 400 });
    }

    const message = await createMessage(
      id,
      "customer",
      customer.fullName,
      text
    );

    await sendAdminPushNotification({
      title: "Yeni musteri mesaji",
      body: `${customer.fullName} size yeni bir mesaj gonderdi.`,
      data: {
        type: "customer_message",
        applicationId: id,
        senderName: customer.fullName,
        screen: "application_messages",
      },
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesaj gönderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getCustomerCookieName()}=`))
      ?.slice(getCustomerCookieName().length + 1);

    const session = verifyCustomerSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const customer = await getCustomerById(session.customerId);
    await verifyOwnership(id, session.customerId, customer?.email);

    const body = await request.json();
    const { messageId } = body;

    if (!messageId) {
      return NextResponse.json({ message: "Mesaj kimliği gerekli." }, { status: 400 });
    }

    await markMessageAsRead(id, messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "İşlem başarısız.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
