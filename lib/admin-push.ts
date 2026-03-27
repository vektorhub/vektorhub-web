import { getAdminMessaging } from "@/lib/firebase-admin";
import { createAdminMobileNotification } from "@/lib/admin-mobile-notifications";
import {
  deactivateAdminMobileDeviceByFcmToken,
  listActiveAdminMobileDevices,
} from "@/lib/admin-mobile-devices";

type AdminPushPayload = {
  title: string;
  body: string;
  data?: Record<string, string>;
  adminId?: string;
};

export async function sendAdminPushNotification(payload: AdminPushPayload) {
  await createAdminMobileNotification({
    adminId: payload.adminId,
    title: payload.title,
    body: payload.body,
    data: payload.data,
  });

  const devices = await listActiveAdminMobileDevices(payload.adminId);
  const tokens = [...new Set(devices.map((item) => item.fcmToken).filter(Boolean))];

  if (!tokens.length) {
    return { sentCount: 0, skipped: true };
  }

  try {
    const result = await getAdminMessaging().sendEachForMulticast({
      tokens,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data,
      android: {
        priority: "high",
        notification: {
          channelId: "vektorhub_admin",
          priority: "max",
        },
      },
    });

    await Promise.all(
      result.responses.map(async (response, index) => {
        if (response.success) {
          return;
        }

        const errorCode = response.error?.code ?? "";
        if (
          errorCode.includes("registration-token-not-registered") ||
          errorCode.includes("invalid-argument")
        ) {
          const token = tokens[index];
          if (token) {
            await deactivateAdminMobileDeviceByFcmToken(token);
          }
        }
      })
    );

    return {
      sentCount: result.successCount,
      failureCount: result.failureCount,
      skipped: false,
    };
  } catch (error) {
    console.error("Admin push notification failed:", error);
    return { sentCount: 0, failureCount: tokens.length, skipped: false };
  }
}
