import { NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";
import { createQuote, listQuotes, updateQuoteStatus } from "@/lib/customer-commerce";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getAdminSession(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${getAdminCookieName()}=`))
    ?.slice(getAdminCookieName().length + 1);

  return verifyAdminSessionToken(token);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const quotes = await listQuotes(id);
    return NextResponse.json({ quotes }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Teklifler alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as {
      title?: string;
      description?: string;
      items?: Array<{ label: string; amount: number }>;
    };

    const quote = await createQuote(
      id,
      {
        title: body.title ?? "",
        description: body.description ?? "",
        items: body.items ?? [],
      },
      "Yönetici"
    );

    return NextResponse.json({ quote }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Teklif oluşturulamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!getAdminSession(request)) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as {
      quoteId?: string;
      status?: "draft" | "published" | "accepted" | "rejected";
    };

    if (!body.quoteId || !body.status) {
      return NextResponse.json({ message: "Teklif bilgisi eksik." }, { status: 400 });
    }

    const quote = await updateQuoteStatus(id, body.quoteId, body.status, "Yönetici");
    return NextResponse.json({ quote });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Teklif güncellenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
