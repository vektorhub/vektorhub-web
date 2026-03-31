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
    city: "Ümraniye / İSTANBUL",
    sector: "Çilingir ve anahtarcılık hizmetleri",
    focus:
      "Tek sayfalık yönlendirici bir web sitesi kurgusu ile firmanın Google üzerinde daha görünür ve daha kolay bulunabilir hale gelmesine yönelik destek.",
    ctaLabel: "Canlı Site",
    ctaHref: "https://anahtarevi.net",
  },
  {
    name: "YZR TESBİH",
    city: "Körfez / KOCAELİ",
    sector: "Tesbih ve aksesuar satışı",
    focus:
      "Markanın Instagram üzerindeki dijital vitrininin daha düzenli, güven veren ve müşteriye daha net ulaşan bir yapıda konumlanmasına yönelik dijital görünüm desteği.",
    ctaLabel: "Instagram",
    ctaHref: "https://www.instagram.com/explore/locations/101387289569587/yzrtesbih/",
  },
];

export default function ReferanslarPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-0">
      <div
        className="relative mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#131b28] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(18,25,38,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Seçilmiş Referanslar
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Referanslarımızı firma adı, sektör ve sağlanan katkı net biçimde görülecek bir düzenle
            sunuyoruz.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Bu sayfa, birlikte çalıştığımız işletmeleri gösterişli bir vitrin olarak değil; kısa,
            anlaşılır ve güven veren vaka kartları olarak sunmak için tasarlandı.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Referans Vitrini
        </div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          VektörHUB ile çalışan firmaları; nerede oldukları, hangi alanda faaliyet gösterdikleri
          ve dijital tarafta hangi ihtiyaca cevap verdiğimiz üzerinden kısa ama seçici biçimde
          anlatıyoruz.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {references.map((reference) => (
          <article
            key={reference.name}
            className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] shadow-[0_22px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="border-b border-white/8 px-6 py-6 sm:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    Referans Kaydı
                  </div>
                  <h2 className="mt-3 text-[28px] font-black leading-tight text-white sm:text-[32px]">
                    {reference.name}
                  </h2>
                </div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/68">
                  {reference.city}
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:px-8 lg:grid-cols-[0.34fr_0.66fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                  Sektör
                </div>
                <p className="mt-3 text-sm leading-7 text-white/76">{reference.sector}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                  Sağlanan Katkı
                </div>
                <p className="mt-3 text-sm leading-7 text-white/76">{reference.focus}</p>
                <div className="mt-5">
                  <a
                    href={reference.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:border-orange-300/40 hover:bg-orange-500/15"
                  >
                    {reference.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
