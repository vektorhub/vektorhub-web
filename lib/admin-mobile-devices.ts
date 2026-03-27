import crypto from "node:crypto";
import { getAdminDb } from "@/lib/firebase-admin";

export type AdminMobileDevice = {
  id: string;
  adminId: string;
  fcmToken: string;
  deviceId: string;
  deviceName: string;
  platform: string;
  appVersion: string;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
  active: boolean;
};

const COLLECTION = "admin_mobile_devices";

function getCollection() {
  return getAdminDb().collection(COLLECTION);
}

function buildDeviceDocId(adminId: string, deviceId: string) {
  return crypto.createHash("sha256").update(`${adminId}:${deviceId}`).digest("hex");
}

export async function registerAdminMobileDevice(input: {
  adminId: string;
  fcmToken: string;
  deviceId: string;
  deviceName?: string;
  platform?: string;
  appVersion?: string;
}) {
  const adminId = input.adminId.trim();
  const fcmToken = input.fcmToken.trim();
  const deviceId = input.deviceId.trim();

  if (!adminId) throw new Error("adminId gerekli.");
  if (fcmToken.length < 32) throw new Error("Gecerli bir FCM token gerekli.");
  if (!deviceId) throw new Error("deviceId gerekli.");

  const now = new Date().toISOString();
  const record: AdminMobileDevice = {
    id: buildDeviceDocId(adminId, deviceId),
    adminId,
    fcmToken,
    deviceId,
    deviceName: input.deviceName?.trim() || "Android phone",
    platform: input.platform?.trim() || "android",
    appVersion: input.appVersion?.trim() || "dev",
    createdAt: now,
    updatedAt: now,
    lastSeenAt: now,
    active: true,
  };

  const ref = getCollection().doc(record.id);
  const existing = await ref.get();

  if (existing.exists) {
    const prev = existing.data() as AdminMobileDevice;
    record.createdAt = prev.createdAt || now;
  }

  await ref.set(record, { merge: true });
  return record;
}

export async function unregisterAdminMobileDevice(adminId: string, deviceId: string) {
  const normalizedAdminId = adminId.trim();
  const normalizedDeviceId = deviceId.trim();
  if (!normalizedAdminId || !normalizedDeviceId) {
    throw new Error("adminId ve deviceId gerekli.");
  }

  const ref = getCollection().doc(buildDeviceDocId(normalizedAdminId, normalizedDeviceId));
  const snap = await ref.get();
  if (!snap.exists) {
    return false;
  }

  await ref.set(
    {
      active: false,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return true;
}

export async function listActiveAdminMobileDevices(adminId?: string) {
  let query = getCollection().where("active", "==", true);
  if (adminId?.trim()) {
    query = query.where("adminId", "==", adminId.trim());
  }

  const snap = await query.get();
  return snap.docs.map((doc) => doc.data() as AdminMobileDevice);
}

export async function deactivateAdminMobileDeviceByFcmToken(fcmToken: string) {
  const normalized = fcmToken.trim();
  if (!normalized) return;

  const snap = await getCollection().where("fcmToken", "==", normalized).limit(10).get();
  if (snap.empty) return;

  const batch = getAdminDb().batch();
  const updatedAt = new Date().toISOString();
  for (const doc of snap.docs) {
    batch.set(doc.ref, { active: false, updatedAt }, { merge: true });
  }
  await batch.commit();
}
