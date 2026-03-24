import { NextResponse } from "next/server";

const COUNTER_NAMESPACE = "vektorhub_web";
const COUNTER_KEY = "site_visits";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CountApiResponse = {
  value?: number;
};

export async function GET() {
  try {
    const response = await fetch(
      `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json({ value: null }, { status: 502 });
    }

    const data = (await response.json()) as CountApiResponse;

    return NextResponse.json(
      {
        value: typeof data.value === "number" ? data.value : null,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch {
    return NextResponse.json({ value: null }, { status: 500 });
  }
}