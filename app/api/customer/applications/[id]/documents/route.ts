import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
} from "@/lib/customer-applications-extended";
import { sendAdminPushNotification } from "@/lib/admin-push";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_FILE_SIZE = 50 * 1024 * 1024;

async function verifyOwnership(applicationId: string, customerId: string, customerEmail?: string) {
  const db = getAdminDb();
  const appSnap = await db.collection("customer_applications").doc(applicationId).get();

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
    const documents = await getDocuments(id);

    return NextResponse.json(
      { documents },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dokümanlar alınamadı.";
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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const docType = (formData.get("docType") as string) || "diger";

    if (!file) {
      return NextResponse.json({ message: "Dosya gerekli." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Dosya 50 MB'den büyük olamaz." },
        { status: 400 }
      );
    }

    if (!["teklif", "taraf", "diger"].includes(docType)) {
      return NextResponse.json(
        { message: "Geçersiz doküman türü." },
        { status: 400 }
      );
    }

    const url = `/api/customer/applications/${id}/documents/${file.name}`;
    const document = await uploadDocument(
      id,
      file.name,
      file.size,
      file.type,
      docType as "teklif" | "taraf" | "diger",
      url,
      "customer"
    );

    await sendAdminPushNotification({
      title: "Yeni musteri dokumani",
      body: `${customer.fullName} yeni bir dokuman yukledi: ${file.name}`,
      data: {
        type: "customer_document_uploaded",
        applicationId: id,
        documentId: document.id,
        documentName: file.name,
        screen: "application_documents",
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dosya yüklenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(
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

    const body = (await request.json()) as { documentId?: string };
    const documentId = body.documentId ?? "";

    if (!documentId) {
      return NextResponse.json({ message: "Doküman kimliği gerekli." }, { status: 400 });
    }

    await deleteDocument(id, documentId);

    await sendAdminPushNotification({
      title: "Musteri dokumani silindi",
      body: `${customer?.fullName ?? "Musteri"} bir dokumani kaldirdi.`,
      data: {
        type: "customer_document_deleted",
        applicationId: id,
        documentId,
        screen: "application_documents",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Doküman silinemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
