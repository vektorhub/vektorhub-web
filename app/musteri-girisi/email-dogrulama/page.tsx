import Link from "next/link";

type SearchParams = Promise<{
  status?: string;
  message?: string;
  referenceNo?: string;
  submittedAt?: string;
}>;

export default async function EmailDogrulamaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const isSuccess = params.status === "success";
  const submittedAt = params.submittedAt
    ? new Date(params.submittedAt).toLocaleString("tr-TR")
    : "";

  return (
    <section className="container-main page-content-template pb-20 pt-10">
      <div
        className={`max-w-4xl rounded-[32px] border p-8 shadow-[0_20px_40px_rgba(0,0,0,0.18)] ${
          isSuccess
            ? "border-emerald-400/20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_28%),linear-gradient(135deg,rgba(7,12,22,0.96),rgba(16,25,38,0.94))]"
            : "border-rose-400/20 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_28%),linear-gradient(135deg,rgba(7,12,22,0.96),rgba(16,25,38,0.94))]"
        }`}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
          Aday Başvuru Doğrulaması
        </div>
        <h1 className="mt-4 text-3xl font-black text-white">
          {isSuccess ? "Başvurunuz doğrulandı ve inceleme kuyruğuna alındı" : "Doğrulama tamamlanamadı"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
          {isSuccess
            ? "E-posta adresiniz doğrulandı. Başvurunuz artık takip numarasıyla süreç ekranından izlenebilir. Uygun bulunursanız sonraki aşamada davet gönderilir."
            : params.message ?? "Bağlantı geçersiz, süresi dolmuş veya daha önce kullanılmış olabilir."}
        </p>

        {isSuccess ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">Takip Numarası</div>
              <div className="mt-3 text-2xl font-black text-white">{params.referenceNo}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">Doğrulama Zamanı</div>
              <div className="mt-3 text-lg font-bold text-white">{submittedAt}</div>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/musteri-girisi/durum-sorgula"
            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Başvuru Durumunu Takip Et
          </Link>
          <Link
            href="/musteri-girisi/ilk-basvuru"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
          >
            Yeni Aday Başvurusu Oluştur
          </Link>
        </div>
      </div>
    </section>
  );
}
