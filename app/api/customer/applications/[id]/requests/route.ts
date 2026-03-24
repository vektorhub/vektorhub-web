import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export type CustomerRequest = {
  id: string;
  applicationId: string;
  type: "add_note" | "change_status" | "request_document";
  data: Record<string, string>;
  createdAt: string;
  status: "pending" | "completed" | "rejected";
  adminResponse?: string;
};

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
    await verifyOwnership(id, session.customerId, customer?.email);

    const db = getAdminDb();
    const snapshot = await db
      .collection("customer_applications")
      .doc(id)
      .collection("requests")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as CustomerRequest));

    return NextResponse.json({ requests }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "İstekler alınamadı.";
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
    const { type, data } = body;

    // Validate request type
    if (!["add_note", "change_status", "request_document"].includes(type)) {
      return NextResponse.json({ message: "Geçersiz istek türü." }, { status: 400 });
    }

    // Validate data based on type
    if (type === "add_note" && (!data?.note || data.note.trim().length === 0)) {
      return NextResponse.json({ message: "Not boş olamaz." }, { status: 400 });
    }

    if (type === "change_status" && !data?.proposedStatus) {
      return NextResponse.json({ message: "Önerilen durum gerekli." }, { status: 400 });
    }

    if (type === "request_document" && !data?.reason) {
      return NextResponse.json({ message: "Sebep gerekli." }, { status: 400 });
    }

    // Create request in Firestore
    const db = getAdminDb();
    const docRef = db
      .collection("customer_applications")
      .doc(id)
      .collection("requests")
      .doc();

    const customerRequest: CustomerRequest = {
      id: docRef.id,
      applicationId: id,
      type,
      data: {
        ...data,
        requestedBy: customer.fullName,
      },
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    await docRef.set(customerRequest);

    // Log action
    await db
      .collection("customer_applications")
      .doc(id)
      .collection("activity_log")
      .add({
        type: `request_${type}`,
        actor: customer.fullName,
        details: { requestId: docRef.id, ...data },
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json({ request: customerRequest }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "İstek gönderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
