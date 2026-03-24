import { NextResponse } from "next/server";

const VISIT_COOKIE = "vh_visit_count";
let inMemoryCount = 0;

export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseCookieCount(value: string | undefined) {
  const parsed = Number(value ?? "0");
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : 0;
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const rawCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${VISIT_COOKIE}=`))
    ?.split("=")[1];

  const cookieCount = parseCookieCount(rawCookie);
  const baseCount = Math.max(cookieCount, inMemoryCount);
  const nextCount = baseCount + 1;

  inMemoryCount = nextCount;

  const response = NextResponse.json(
    { value: nextCount },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );

  response.cookies.set(VISIT_COOKIE, String(nextCount), {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}