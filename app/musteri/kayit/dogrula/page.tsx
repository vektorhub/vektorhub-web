"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Content() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "error";
  const message =
    searchParams.get("message") ??
    "Doğrulama bilgisi alınamadı. Lütfen e-postadaki bağlantıyı tekrar deneyin.";

  const success = status === "success";

  return (
    <section className="container-main page-content-template pb-24 pt-10">
      <div className="mx-auto max-w-xl rounded-[30px] border border-white/10 bg-[#0f1725]/92 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.26)]">
        <div
          className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
            success ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {success ? "Doğrulama Tamamlandı" : "Doğrulama Hatası"}
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">
          {success ? "E-posta doğrulandı" : "Bağlantı geçersiz"}
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/72">{message}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={success ? "/musteri/giris" : "/musteri/kayit"}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            {success ? "Giriş ekranına git" : "Kayıt ekranına dön"}
          </Link>
          <Link
            href="/iletisim"
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/72 transition hover:text-white"
          >
            İletişime geç
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MusteriKayitDogrulaPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
