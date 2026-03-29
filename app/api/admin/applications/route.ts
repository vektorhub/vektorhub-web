import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { getActiveCustomerAccountSummary } from "@/lib/customer-accounts";
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
      items.map(async (item) => {
        const customerAccount = await getActiveCustomerAccountSummary({
          id: item.customerId ?? null,
          email: item.email,
        });

        return {
          ...toCustomerApplicationView(item),
          customerAccount,
          messaging: await getCustomerMessagingOverviewByPhone(item.phone, item.id),
        };
      }),
    );

    return NextResponse.json({ applications }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Veri alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
