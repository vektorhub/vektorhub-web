import { NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSessionToken } from "../../../../../../lib/admin-session";
import { uploadDocument, getDocuments, deleteDocument } from "@/lib/customer-applications-extended";

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

    const documents = await getDocuments(id);
    return NextResponse.json({ documents }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dokümanlar alınamadı.";
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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const docType = (formData.get("docType") as string) || "teklif";

    if (!file) {
      return NextResponse.json({ message: "Dosya gerekli." }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ message: "Dosya 50 MB'den büyük olamaz." }, { status: 400 });
    }

    const url = `/api/admin/applications/${id}/documents/${file.name}`;
    const document = await uploadDocument(
      id,
      file.name,
      file.size,
      file.type,
      docType as "teklif" | "taraf" | "diger",
      url,
      "admin"
    );

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Dosya yüklenemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function DELETE(
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
    const { documentId } = body;

    if (!documentId) {
      return NextResponse.json({ message: "Doküman kimliği gerekli." }, { status: 400 });
    }

    await deleteDocument(id, documentId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Doküman silinemedi.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
