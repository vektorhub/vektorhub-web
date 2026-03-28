import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  listAllApplications,
  toCustomerApplicationView,
} from "@/lib/customer-applications";
import { getCustomerMessagingOverviewByPhone } from "@/lib/customer-messaging";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    if (!getAuthenticatedAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
    }

    const items = await listAllApplications(200);
    const applications = await Promise.all(
      items.map(async (item) => ({
        ...toCustomerApplicationView(item),
        messaging: await getCustomerMessagingOverviewByPhone(item.phone),
      })),
    );

    return NextResponse.json({ applications }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Veri alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
