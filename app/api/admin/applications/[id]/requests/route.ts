import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CustomerRequest = {
  id: string;
  applicationId: string;
  type: "add_note" | "change_status" | "request_document";
  data: Record<string, string>;
  createdAt: string;
  status: "pending" | "completed" | "rejected";
  adminResponse?: string;
};

function getAdminSessionFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${getAdminCookieName()}=`))
    ?.slice(getAdminCookieName().length + 1);

  return verifyAdminSessionToken(token);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const db = getAdminDb();

    const appSnap = await db.collection("customer_applications").doc(id).get();
    if (!appSnap.exists) {
      return NextResponse.json({ message: "Talep bulunamadı." }, { status: 404 });
    }

    const snapshot = await db
      .collection("customer_applications")
      .doc(id)
      .collection("requests")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const requests = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as CustomerRequest
    );

    return NextResponse.json({ requests }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Aksiyon talepleri alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as {
      requestId?: string;
      status?: "pending" | "completed" | "rejected";
      adminResponse?: string;
    };

    const requestId = body.requestId?.trim() ?? "";
    const status = body.status;
    const adminResponse = body.adminResponse?.trim() ?? "";

    if (!requestId) {
      return NextResponse.json({ message: "requestId zorunludur." }, { status: 400 });
    }

    if (!status || !["pending", "completed", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Geçersiz aksiyon durumu." }, { status: 400 });
    }

    const db = getAdminDb();
    const reqRef = db
      .collection("customer_applications")
      .doc(id)
      .collection("requests")
      .doc(requestId);

    const reqSnap = await reqRef.get();
    if (!reqSnap.exists) {
      return NextResponse.json({ message: "Aksiyon talebi bulunamadı." }, { status: 404 });
    }

    await reqRef.update({
      status,
      adminResponse,
      updatedAt: new Date().toISOString(),
    });

    await db
      .collection("customer_applications")
      .doc(id)
      .collection("activity_log")
      .add({
        type: "admin_request_review",
        actor: session.adminId,
        details: { requestId, status, adminResponse },
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Aksiyon talebi güncellenemedi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}