import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { getPublicPricingStorageRef } from "@/lib/public-pricing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_PRICING_SYNC_TOKEN = "vhq-pricing-sync-20260409";
const PRICING_SYNC_TOKEN = process.env.PRICING_SYNC_TOKEN?.trim() ?? "";

function hasValidSyncToken(request: Request) {
  const expectedToken = PRICING_SYNC_TOKEN || DEFAULT_PRICING_SYNC_TOKEN;
  if (!expectedToken) {
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return false;
  }

  const incoming = authHeader.slice("Bearer ".length).trim();
  if (!incoming) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(incoming.padEnd(256)),
    Buffer.from(expectedToken.padEnd(256)),
  );
}

function isAuthorized(request: Request) {
  return Boolean(getAuthenticatedAdminSession(request) || hasValidSyncToken(request));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const ref = getPublicPricingStorageRef();
    const snapshot = await getAdminDb().collection(ref.collection).doc(ref.document).get();

    return NextResponse.json(
      {
        ok: true,
        exists: snapshot.exists,
        data: snapshot.data() ?? null,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Fiyat listesi okunamadi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const ref = getPublicPricingStorageRef();

    await getAdminDb()
      .collection(ref.collection)
      .doc(ref.document)
      .set(
        {
          ...payload,
          updatedAt: new Date(),
          syncedFrom: "vektorhub_hq",
        },
        { merge: true },
      );

    return NextResponse.json(
      {
        ok: true,
        message: "Fiyat listesi guncellendi.",
        storage: ref,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Fiyat listesi yazilamadi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
