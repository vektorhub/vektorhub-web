import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/seo";
import { getLocationLandingConfig } from "@/lib/location-landings";

type LocationLandingPageProps = {
  slug: string;
};

export function LocationLandingPage({ slug }: LocationLandingPageProps) {
  const config = getLocationLandingConfig(slug);

  if (!config) {
    return null;
  }

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <SeoJsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: config.serviceTitle, path: `/${config.slug}` },
          ]),
          createServiceSchema({
            name: config.serviceTitle,
            description: config.description,
            path: `/${config.slug}`,
            serviceType: config.serviceType,
            keywords: config.keywords,
          }),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: config.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${config.serviceTitle} Hizmet Kapsamı`,
            itemListElement: config.scope.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item,
            })),
          },
        ]}
      />

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
            {config.serviceTitle}
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
            {config.serviceTitle} hizmetinde işletmenizi dijitalde daha net ve daha güven veren şekilde temsil eden profesyonel yapı kurulur.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            {config.intro}
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Hizmet Yaklaşımı
        </div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          {config.city} merkezli aramalarda bu sayfa; işletmenin ihtiyaç duyduğu hizmeti daha net,
          daha güven veren ve daha güçlü bir dijital anlatımla karşılamak için hazırlandı.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {config.highlights.map((item) => (
          <article
            key={item}
            className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Odak Alanı
            </div>
            <h2 className="mt-4 text-xl font-black leading-tight text-white">{item}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">
              {config.serviceTitle} kapsamında bu alan, dijital yapının daha anlaşılır ve daha güçlü çalışmasını destekler.
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-orange-500/15 bg-orange-500/[0.06] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
            Hizmet Kapsamı
          </div>
          <div className="mt-5 space-y-3">
            {config.scope.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-white/72 sm:text-[15px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Geçiş Alanı
          </div>
          <p className="mt-4 text-sm leading-7 text-white/68 sm:text-[15px]">
            Detaylı hizmet yapısını görmek isteyen ziyaretçiler, ana hizmet sayfasına doğrudan geçebilir.
          </p>
          <div className="mt-6">
            <Link
              href={config.primaryHref}
              className="inline-flex items-center rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:border-orange-300/40 hover:bg-orange-500/15"
            >
              {config.primaryLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.94fr_1.06fr]">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Çalışma Süreci
          </div>
          <div className="mt-5 space-y-4">
            {config.process.map((step) => (
              <article
                key={step}
                className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <h2 className="text-lg font-bold text-white">{step}</h2>
                <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">
                  {config.serviceTitle} sürecinde bu adım, işletmenin ihtiyacını daha doğru yapıya dönüştürmek için kullanılır.
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Bölgesel Odak
          </div>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
            {config.city} çevresinde hizmet arayan işletmeler için sayfa dili, yerel niyeti daha doğru karşılayan ve daha güçlü güven hissi oluşturan yapıda hazırlanmıştır.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {config.districts.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-white/68"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Sık Sorulan Sorular
        </div>
        <div className="mt-5 space-y-4">
          {config.faq.map((item) => (
            <article key={item.question} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-bold text-white">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {config.relatedLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition hover:border-orange-400/25 hover:bg-white/[0.05]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Destek Sayfası
            </div>
            <h2 className="mt-4 text-xl font-black text-white">{link.label}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
