import { NextResponse } from "next/server";

import { freeApps } from "@/data/free-apps";
import { incrementFreeAppDownload, isKnownFreeAppSlug } from "@/lib/free-app-downloads";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!isKnownFreeAppSlug(slug)) {
    return NextResponse.json({ message: "Uygulama bulunamadi." }, { status: 404 });
  }

  const app = freeApps.find((item) => item.slug === slug);

  if (!app) {
    return NextResponse.json({ message: "Uygulama bulunamadi." }, { status: 404 });
  }

  await incrementFreeAppDownload(slug);

  return NextResponse.redirect(new URL(app.downloadUrl, _request.url));
}
