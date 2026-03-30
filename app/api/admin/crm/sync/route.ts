import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import { pullOfficeCrmSnapshot, pushOfficeCrmSnapshot } from "@/lib/crm-office";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const OFFICE_CRM_SYNC_TOKEN = process.env.OFFICE_CRM_SYNC_TOKEN?.trim() ?? "";

function hasValidOfficeCrmToken(request: Request) {
  if (!OFFICE_CRM_SYNC_TOKEN) {
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
    Buffer.from(OFFICE_CRM_SYNC_TOKEN.padEnd(256))
  );
}

function isAuthorized(request: Request) {
  return Boolean(getAuthenticatedAdminSession(request) || hasValidOfficeCrmToken(request));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const snapshot = await pullOfficeCrmSnapshot();
    return NextResponse.json(
      {
        ok: true,
        ...snapshot,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "CRM snapshot alınamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      customers?: unknown[];
      notes?: unknown[];
      tasks?: unknown[];
    };

    const result = await pushOfficeCrmSnapshot({
      customers: Array.isArray(payload.customers) ? (payload.customers as never[]) : [],
      notes: Array.isArray(payload.notes) ? (payload.notes as never[]) : [],
      tasks: Array.isArray(payload.tasks) ? (payload.tasks as never[]) : [],
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "CRM snapshot yazılamadı.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
