import { NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";
import { listPendingCustomerAccounts } from "@/lib/customer-accounts";
import { listAllApplications } from "@/lib/customer-applications";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CockpitMessage = {
  id: string;
  applicationId: string;
  senderType: "admin" | "customer";
  senderName: string;
  text: string;
  createdAt: string;
  readAt: string | null;
};

type CockpitRequest = {
  id: string;
  type: string;
  status: "pending" | "completed" | "rejected";
};

type CockpitPayment = {
  id: string;
  status: "pending" | "notice_sent" | "confirmed" | "rejected";
};

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getAdminCookieName()}=`))
      ?.slice(getAdminCookieName().length + 1);

    const session = verifyAdminSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const [applications, onboardingItems] = await Promise.all([
      listAllApplications(120),
      listPendingCustomerAccounts(40),
    ]);

    const db = getAdminDb();

    const applicationSignals = await Promise.all(
      applications.map(async (application) => {
        const appRef = db.collection("customer_applications").doc(application.id);
        const [
          latestMessageSnap,
          unreadCustomerSnap,
          pendingRequestsSnap,
          pendingCancelSnap,
          pendingPaymentSnap,
        ] =
          await Promise.all([
            appRef.collection("messages").orderBy("createdAt", "desc").limit(1).get(),
            appRef
              .collection("messages")
              .where("senderType", "==", "customer")
              .where("readAt", "==", null)
              .get(),
            appRef.collection("requests").where("status", "==", "pending").get(),
            appRef
              .collection("requests")
              .where("status", "==", "pending")
              .where("type", "==", "cancel_application")
              .get(),
            appRef
              .collection("payments")
              .where("status", "==", "notice_sent")
              .get(),
          ]);

        const latestMessage = latestMessageSnap.empty
          ? null
          : (latestMessageSnap.docs[0]!.data() as CockpitMessage);

        const pendingRequests = pendingRequestsSnap.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as CockpitRequest
        );

        return {
          applicationId: application.id,
          referenceNo: application.referenceNo,
          fullName: application.fullName,
          companyName: application.companyName,
          serviceArea: application.serviceArea,
          status: application.status,
          createdAt: application.createdAt,
          updatedAt: application.updatedAt,
          latestMessage,
          unreadCustomerMessages: unreadCustomerSnap.size,
          pendingRequests: pendingRequests.length,
          pendingCancelRequests: pendingCancelSnap.size,
          pendingPaymentConfirmations: pendingPaymentSnap.docs.filter(
            (doc) => ((doc.data() as CockpitPayment).status ?? "") === "notice_sent"
          ).length,
        };
      })
    );

    const liveInbox = applicationSignals
      .filter((item) => item.latestMessage)
      .sort(
        (a, b) =>
          new Date(b.latestMessage!.createdAt).getTime() -
          new Date(a.latestMessage!.createdAt).getTime()
      )
      .slice(0, 8)
      .map((item) => ({
        applicationId: item.applicationId,
        referenceNo: item.referenceNo,
        fullName: item.fullName,
        companyName: item.companyName,
        status: item.status,
        unreadCustomerMessages: item.unreadCustomerMessages,
        latestMessage: item.latestMessage,
      }));

    const pendingActionItems = applicationSignals
      .filter((item) => item.pendingRequests > 0)
      .sort((a, b) => b.pendingRequests - a.pendingRequests || b.unreadCustomerMessages - a.unreadCustomerMessages)
      .slice(0, 8)
      .map((item) => ({
        applicationId: item.applicationId,
        referenceNo: item.referenceNo,
        fullName: item.fullName,
        companyName: item.companyName,
        status: item.status,
        pendingRequests: item.pendingRequests,
        pendingCancelRequests: item.pendingCancelRequests,
      }));

    const summary = {
      totalApplications: applications.length,
      newApplications: applications.filter((item) => item.status === "Başvuru Alındı").length,
      quoteStageApplications: applications.filter((item) => item.status === "Teklif Hazırlanıyor")
        .length,
      completedApplications: applications.filter((item) => item.status === "Tamamlandı").length,
      pendingOnboarding: onboardingItems.length,
      unreadCustomerMessages: applicationSignals.reduce(
        (sum, item) => sum + item.unreadCustomerMessages,
        0
      ),
      pendingRequests: applicationSignals.reduce((sum, item) => sum + item.pendingRequests, 0),
      pendingCancelRequests: applicationSignals.reduce(
        (sum, item) => sum + item.pendingCancelRequests,
        0
      ),
      pendingPaymentConfirmations: applicationSignals.reduce(
        (sum, item) => sum + item.pendingPaymentConfirmations,
        0
      ),
    };

    return NextResponse.json(
      {
        summary,
        liveInbox,
        pendingActionItems,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kokpit verisi alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
