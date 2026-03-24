import { NextResponse } from "next/server";
import { getCustomerById } from "@/lib/customer-accounts";
import { getCustomerCookieName, verifyCustomerSessionToken } from "@/lib/customer-session";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
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

    const db = getAdminDb();
    
    // Get all applications for customer
    const appSnapshot = await db
      .collection("customer_applications")
      .where("customerId", "==", session.customerId)
      .get();

    // Count unread messages across all applications
    let totalUnreadMessages = 0;
    let totalPendingRequests = 0;

    for (const appDoc of appSnapshot.docs) {
      const appId = appDoc.id;

      // Count unread messages
      const unreadMsgSnapshot = await db
        .collection("customer_applications")
        .doc(appId)
        .collection("messages")
        .where("senderType", "==", "admin")
        .where("readAt", "==", null)
        .get();

      totalUnreadMessages += unreadMsgSnapshot.size;

      // Count pending requests (status=pending)
      const pendingReqSnapshot = await db
        .collection("customer_applications")
        .doc(appId)
        .collection("requests")
        .where("status", "==", "pending")
        .get();

      totalPendingRequests += pendingReqSnapshot.size;
    }

    return NextResponse.json(
      {
        unreadMessages: totalUnreadMessages,
        pendingRequests: totalPendingRequests,
        total: totalUnreadMessages + totalPendingRequests,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bildirimler alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
