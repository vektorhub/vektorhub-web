import { NextResponse } from "next/server";
import {
  listAllApplications,
  toCustomerApplicationView,
} from "@/lib/customer-applications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const items = await listAllApplications(200);
    return NextResponse.json({ applications: items.map(toCustomerApplicationView) }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Veri alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
