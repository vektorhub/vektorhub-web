import { NextResponse } from "next/server";
import { getAuthenticatedAdminSession } from "@/lib/admin-auth";
import {
  createMessage,
  getMessages,
  markMessagesAsReadBySender,
} from "@/lib/customer-applications-extended";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getAuthenticatedAdminSession(request);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
    }

    const messages = await getMessages(id);
    await markMessagesAsReadBySender(id, "customer");
    return NextResponse.json({ messages }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesajlar alinamadi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getAuthenticatedAdminSession(request);
    if (!session) {
      return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
    }

    const body = await request.json();
    const { text } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ message: "Mesaj bos olamaz." }, { status: 400 });
    }

    const message = await createMessage(id, "admin", "Vektorhub Ekibi", text);

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mesaj gonderilemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
