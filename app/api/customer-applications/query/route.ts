import { NextResponse } from "next/server";
import { queryCustomerApplication } from "@/lib/customer-applications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      referenceNo?: string;
      phone?: string;
    };

    const result = await queryCustomerApplication(body.referenceNo ?? "", body.phone ?? "");

    if (!result) {
      return NextResponse.json(
        {
          message:
            "Başvuru bulunamadı. Takip numarasını ve başvuru telefonunu kontrol ederek tekrar deneyin.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sorgu sırasında bir hata oluştu.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
