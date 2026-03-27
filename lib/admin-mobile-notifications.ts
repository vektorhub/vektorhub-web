import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

const COLLECTION = "admin_mobile_notifications";

export type AdminMobileNotificationItem = {
  id: string;
  adminId: string;
  title: string;
  body: string;
  data: Record<string, string>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function createAdminMobileNotification(input: {
  adminId?: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}) {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION).doc();
  const now = new Date().toISOString();

  const item: AdminMobileNotificationItem = {
    id: docRef.id,
    adminId: input.adminId?.trim() || "admin",
    title: input.title,
    body: input.body,
    data: input.data ?? {},
    isRead: false,
    createdAt: now,
    updatedAt: now,
  };

  await docRef.set(item);
  return item;
}

export async function listAdminMobileNotifications(adminId = "admin", limit = 50) {
  const db = getAdminDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("adminId", "==", adminId)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data() as AdminMobileNotificationItem);
}

export async function markAdminMobileNotificationRead(
  adminId: string,
  notificationId: string
) {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION).doc(notificationId);
  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    throw new Error("Bildirim bulunamadi.");
  }

  const data = snapshot.data() as AdminMobileNotificationItem | undefined;
  if (!data || data.adminId !== adminId) {
    throw new Error("Yetkisiz bildirim islemi.");
  }

  await docRef.update({
    isRead: true,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function markAllAdminMobileNotificationsRead(adminId: string) {
  const db = getAdminDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("adminId", "==", adminId)
    .where("isRead", "==", false)
    .get();

  if (snapshot.empty) {
    return { updatedCount: 0 };
  }

  const batch = db.batch();
  for (const doc of snapshot.docs) {
    batch.update(doc.ref, {
      isRead: true,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  return { updatedCount: snapshot.size };
}
