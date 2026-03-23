import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referanslar",
  description:
    "VektörHUB ile çalışan firmaların kısa özetlerini ve sağlanan dijital hizmet odaklarını inceleyin.",
  alternates: {
    canonical: "/referanslar",
  },
};

const references = [
  {
    name: "ANAHTAR EVİ",
    city: "Ümraniye, İstanbul",
    sector: "Çilingir ve anahtarcılık hizmetleri",
    focus: "Tek sayfalık yönlendirici bir web sitesi kurgusu ile firmanın Google üzerinde daha görünür ve daha kolay bulunabilir hale gelmesine yönelik destek.",
  },
];

export default function ReferanslarPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-0">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#131b28] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.82), rgba(18,25,38,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Gerçek Müşteri Kayıtları
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Referanslarımızı firma adı, sektör, konum ve çalışma odağı net görülecek ortak bir şablonla yayınlıyoruz.
          </p>
        </div>
      </div>

      <h1 className="section-title">Referanslar</h1>
      <p className="section-text mt-6 max-w-3xl">
        Bu alanda VektörHUB ile çalışan müşteri firmaları kısa ve net bir özet kartı ile sunulur.
      </p>

      <div className="mt-8 grid gap-5">
        {references.map((reference) => (
          <article
            key={reference.name}
            className="max-w-2xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_22px_50px_rgba(0,0,0,0.18)]"
          >
            <h2 className="text-[26px] font-black leading-tight text-white">
              {reference.name}
            </h2>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">Firma Özeti</div>
              <div className="mt-3 space-y-3 text-[13px] leading-6 text-white/76">
                <p>
                  <span className="font-semibold text-white/92">Konum:</span> {reference.city}
                </p>
                <p>
                  <span className="font-semibold text-white/92">Sektör:</span> {reference.sector}
                </p>
                <p>
                  <span className="font-semibold text-white/92">Çalışma odağı:</span> {reference.focus}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

