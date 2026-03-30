"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CustomerProfile = {
  customer?: {
    fullName: string;
    email: string;
    companyName: string;
    legalCompanyName: string;
    phone: string;
  };
  message?: string;
};

export function CustomerServiceRequestCta({
  serviceTitle,
  serviceDescription,
}: {
  serviceTitle: string;
  serviceDescription: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setSubmitting(true);
    setError("");

    try {
      const meRes = await fetch("/api/customer/me", { cache: "no-store" });
      if (meRes.status === 401) {
        window.location.assign("/musteri/giris?from=/musteri/panel");
        return;
      }

      const meData = (await meRes.json()) as CustomerProfile;
      if (!meRes.ok || !meData.customer) {
        setError(meData.message ?? "Müşteri bilgileri alınamadı.");
        return;
      }

      const customer = meData.customer;
      const requestRes = await fetch("/api/customer/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName:
            customer.companyName || customer.legalCompanyName || `${customer.fullName} Talebi`,
          phone: customer.phone,
          serviceArea: serviceTitle,
          details: `Müşteri portalı üzerinden ${serviceTitle} hizmeti için talep oluşturuldu. ${serviceDescription}`,
        }),
      });

      const requestData = (await requestRes.json()) as { message?: string };
      if (!requestRes.ok) {
        setError(requestData.message ?? "Talep oluşturulamadı.");
        return;
      }

      window.location.assign("/musteri/panel#surec-kayitlari");
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCreate}
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Talep oluşturuluyor..." : "Hizmet için talep oluştur"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          href="/musteri/panel"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/74 transition hover:text-white"
        >
          Portala geri dön
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
    </>
  );
}
