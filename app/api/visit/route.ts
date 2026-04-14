import { randomUUID } from "crypto";

import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebase-admin";

const VISITOR_COOKIE = "vh_visitor_id";
const VISITOR_COLLECTION = "site_visitors";
const COUNTER_COLLECTION = "site_metrics";
const COUNTER_DOC = "visitor_count";
const BASE_VISITOR_COUNT = 200;

export const dynamic = "force-dynamic";
export const revalidate = 0;

function sanitizeVisitorId(value: string | null) {
  const normalized = (value ?? "").trim();
  if (!normalized) {
    return null;
  }

  const cleaned = normalized.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 96);
  return cleaned || null;
}

function readCookieValue(request: Request, key: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return (
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${key}=`))
      ?.slice(key.length + 1) ?? null
  );
}

export async function GET(request: Request) {
  const db = getAdminDb();
  const requestVisitorId = sanitizeVisitorId(request.headers.get("x-visitor-id"));
  const cookieVisitorId = sanitizeVisitorId(readCookieValue(request, VISITOR_COOKIE));
  const visitorId = requestVisitorId ?? cookieVisitorId ?? randomUUID();
  const counterRef = db.collection(COUNTER_COLLECTION).doc(COUNTER_DOC);
  const visitorRef = db.collection(VISITOR_COLLECTION).doc(visitorId);
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 512);
  let resolvedCount = BASE_VISITOR_COUNT;

  try {
    await db.runTransaction(async (transaction) => {
      const [counterSnap, visitorSnap] = await Promise.all([
        transaction.get(counterRef),
        transaction.get(visitorRef),
      ]);

      const storedCount = counterSnap.data()?.count;
      const currentCount =
        typeof storedCount === "number" && Number.isFinite(storedCount)
          ? Math.max(BASE_VISITOR_COUNT, Math.trunc(storedCount))
          : BASE_VISITOR_COUNT;

      if (visitorSnap.exists) {
        resolvedCount = currentCount;

        if (!counterSnap.exists) {
          transaction.set(
            counterRef,
            {
              count: currentCount,
              baseCount: BASE_VISITOR_COUNT,
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true },
          );
        }

        transaction.set(
          visitorRef,
          {
            lastSeenAt: FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

        return;
      }

      const nextCount = currentCount + 1;
      resolvedCount = nextCount;

      transaction.set(
        counterRef,
        {
          count: nextCount,
          baseCount: BASE_VISITOR_COUNT,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      transaction.set(visitorRef, {
        visitorId,
        firstSeenAt: FieldValue.serverTimestamp(),
        lastSeenAt: FieldValue.serverTimestamp(),
        userAgent,
      });
    });
  } catch {
    const response = NextResponse.json(
      { value: BASE_VISITOR_COUNT },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );

    response.cookies.set(VISITOR_COOKIE, visitorId, {
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  }

  const response = NextResponse.json(
    { value: resolvedCount },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );

  response.cookies.set(VISITOR_COOKIE, visitorId, {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
