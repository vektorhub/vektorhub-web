"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type QueryResult = {
  referenceNo: string;
  status: string;
  note: string;
  updatedAt: string;
  submittedAt: string;
  serviceArea: string;
};

function statusTone(status: string) {
  if (status === "Tamamlandı") return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  if (status === "Teklif Hazırlanıyor") return "border-orange-400/30 bg-orange-500/10 text-orange-200";
  if (status === "İnceleniyor") return "border-yellow-400/30 bg-yellow-500/10 text-yellow-200";
  return "border-blue-400/30 bg-blue-500/10 text-blue-200";
}

export default function DurumSorgulaPage() {
  const [referenceNo, setReferenceNo] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const formattedUpdatedAt = useMemo(() => {
    if (!result?.updatedAt) {
      return "";
    }

    return new Date(result.updatedAt).toLocaleString("tr-TR");
  }, [result?.updatedAt]);

  const formattedSubmittedAt = useMemo(() => {
    if (!result?.submittedAt) {
      return "";
    }

    return new Date(result.submittedAt).toLocaleString("tr-TR");
  }, [result?.submittedAt]);

  useEffect(() => {
    if (result && resultRef.current) {
      const rect = resultRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - 112;
      window.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" });
    }
  }, [result]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/customer-applications/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceNo,
          phone,
        }),
      });

      const data = (await response.json()) as QueryResult | { message?: string };

      if (!response.ok || !("status" in data)) {
        const message = "message" in data && data.message ? data.message : "Durum bilgisi alınamadı.";
        setErrorMessage(message);
        return;
      }

      setResult(data);
    } catch {
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <h1 className="section-title">Başvuru Durumu Sorgula</h1>
      <p className="section-text mt-5 max-w-3xl">
        Başvuru takip numarası ve başvuru sırasında kullandığınız telefon bilgisiyle güncel durumunuzu görebilirsiniz.
      </p>

      <div className="mt-8 grid max-w-6xl gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_30%),linear-gradient(180deg,rgba(15,23,37,0.96),rgba(10,16,28,0.96))] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
        >
          <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Takip Merkezi</p>
            <h2 className="mt-2 text-2xl font-black text-white">Başvurunuzu tek ekrandan izleyin</h2>
            <p className="mt-2 text-sm leading-7 text-white/58">
              Takip numaranız ve telefon bilginiz eşleştiğinde, güncel durumu ve müşteri notlarını anında görürsünüz.
            </p>
          </div>
        <input
          required
          value={referenceNo}
          onChange={(event) => setReferenceNo(event.target.value.toUpperCase())}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
          placeholder="Takip No (örn: VH-2026-1234)"
        />
        <input
          required
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
          placeholder="Telefon"
        />

        {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Sorgulanıyor..." : "Durumu Sorgula"}
        </button>
        </form>

        <aside className="rounded-[32px] border border-white/10 bg-[#0d1421]/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Süreç Görünümü</p>
          <div className="mt-5 space-y-4">
            {[
              ["Başvuru Alındı", "Talebiniz sisteme işlendi ve ilk inceleme kuyruğuna alındı."],
              ["İnceleniyor", "İçerik ve ihtiyaç kapsamı değerlendiriliyor."],
              ["Teklif Hazırlanıyor", "Uygun çözüm yaklaşımı ve kapsam teklifi oluşturuluyor."],
              ["Tamamlandı", "Karar ve teslim aşaması sonuçlandı."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {result && (
        <div
          ref={resultRef}
          className="mt-7 max-w-5xl rounded-[32px] border border-orange-400/20 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.2),transparent_24%),linear-gradient(135deg,rgba(255,106,0,0.16),rgba(255,138,51,0.1))] p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-orange-200">Güncel Durum</div>
              <h2 className="mt-3 text-[24px] font-black text-white">{result.status}</h2>
            </div>
            <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusTone(result.status)}`}>
              {result.status}
            </span>
          </div>

          <p className="mt-3 text-[13px] leading-7 text-white/82">{result.note}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Takip No</div>
              <div className="mt-2 text-lg font-black text-white">{result.referenceNo}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Hizmet Alanı</div>
              <div className="mt-2 text-lg font-black text-white">{result.serviceArea}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Başvuru Zamanı</div>
              <div className="mt-2 text-sm font-semibold text-white">{formattedSubmittedAt}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Son Güncelleme</div>
              <div className="mt-2 text-sm font-semibold text-white">{formattedUpdatedAt}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {[
              "Başvuru Alındı",
              "İnceleniyor",
              "Teklif Hazırlanıyor",
              "Tamamlandı",
            ].map((step) => {
              const active = step === result.status;
              return (
                <div
                  key={step}
                  className={`rounded-2xl border p-4 ${active ? "border-orange-300/35 bg-orange-500/14 text-white" : "border-white/10 bg-white/[0.04] text-white/42"}`}
                >
                  <div className="text-[11px] uppercase tracking-[0.2em]">Adım</div>
                  <div className="mt-2 text-sm font-bold">{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/musteri-girisi/ilk-basvuru"
          className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          İlk Kez Başvuru Oluştur
        </Link>
        <Link
          href="/musteri-girisi"
          className="rounded-2xl border border-orange-300/30 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/25"
        >
          Müşteri Portalına Dön
        </Link>
      </div>
    </section>
  );
}
