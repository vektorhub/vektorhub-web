import { NextResponse } from "next/server";
import { confirmCustomerApplicationWithCode } from "@/lib/customer-applications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      verificationId?: string;
      code?: string;
    };

    const result = await confirmCustomerApplicationWithCode(
      body.verificationId ?? "",
      body.code ?? ""
    );

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kod doğrulama başarısız.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
