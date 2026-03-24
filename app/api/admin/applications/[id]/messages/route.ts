import { NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSessionToken } from "../../../../../../lib/admin-session";
import { createMessage, getMessages } from "@/lib/customer-applications-extended";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getAdminCookieName()}=`))
      ?.slice(getAdminCookieName().length + 1);

    const session = verifyAdminSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const messages = await getMessages(id);
    return NextResponse.json({ messages }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesajlar alınamadı.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${getAdminCookieName()}=`))
      ?.slice(getAdminCookieName().length + 1);

    const session = verifyAdminSessionToken(token);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erişim." }, { status: 401 });
    }

    const body = await request.json();
    const { text } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ message: "Mesaj boş olamaz." }, { status: 400 });
    }

    const message = await createMessage(id, "admin", "Vektörhub Ekibi", text);

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesaj gönderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
