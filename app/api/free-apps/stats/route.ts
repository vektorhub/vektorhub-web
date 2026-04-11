import { NextResponse } from "next/server";

import { getFreeAppDownloadCounts } from "@/lib/free-app-downloads";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const counts = await getFreeAppDownloadCounts();

  return NextResponse.json(
    { ok: true, counts },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
