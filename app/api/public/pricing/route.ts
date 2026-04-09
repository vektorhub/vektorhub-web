import { NextResponse } from "next/server";

import { getPublicPricingSection } from "@/lib/public-pricing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const section = await getPublicPricingSection();

  return NextResponse.json(section, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
