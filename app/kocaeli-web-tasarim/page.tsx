import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-json-ld";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kocaeli Web Tasarım",
  description:
    "Kocaeli'deki küçük ve orta ölçekli işletmeler için profesyonel web tasarım, kurumsal site kurgusu, Google görünürlüğü ve dijital yapı desteği.",
  path: "/kocaeli-web-tasarim",
  keywords: [
    "kocaeli web tasarım",
    "kocaeli kurumsal web sitesi",
    "kocaeli web sitesi yaptırma",
    "kocaeli seo",
  ],
});

const highlights = [
  {
    title: "Kurumsal Görünüm",
    description:
      "İşletmenin dijitalde daha güven veren, daha düzenli ve daha anlaşılır görünmesini sağlayan web sitesi yapısı kurulur.",
  },
  {
    title: "Yerel Görünürlük",
    description:
      "Kocaeli merkezli aramalarda işletmenin daha net anlaşılması için sayfa yapısı, içerik düzeni ve temel SEO sinyalleri güçlendirilir.",
  },
  {
    title: "İletişim Odaklı Akış",
    description:
      "Ziyaretçinin hizmeti, çalışma şeklini ve iletişim adımını hızlı kavrayacağı sade ama profesyonel bir akış hazırlanır.",
  },
];

const serviceScope = [
  "Kurumsal web sitesi kurgusu",
  "Hizmet ve içerik akışının düzenlenmesi",
  "İletişim ve teklif alma alanlarının netleştirilmesi",
  "Temel teknik SEO yapısının güçlendirilmesi",
  "Google görünürlüğünü destekleyen sayfa düzeni",
];

const localFocusAreas = [
  "Kocaeli",
  "Körfez",
  "İzmit",
  "Başiskele",
  "Derince",
  "Gebze",
];

const processSteps = [
  {
    title: "İşletmeyi Anlama",
    description:
      "Firmanın sunduğu hizmeti, müşteri profilini ve dijitalde nasıl görünmek istediğini netleştiririz.",
  },
  {
    title: "Sayfa Yapısını Kurma",
    description:
      "Ana mesaj, hizmet akışı, güven sinyalleri ve iletişim alanlarını sade ama güçlü bir düzenle yerleştiririz.",
  },
  {
    title: "Görünürlük Temeli",
    description:
      "Sayfa başlıkları, içerik hiyerarşisi ve temel SEO düzeniyle Google tarafında daha anlaşılır bir yapı oluştururuz.",
  },
];

const faqItems = [
  {
    question: "Kocaeli'de web tasarım hizmeti hangi işletmeler için uygundur?",
    answer:
      "Kurumsal görünümünü güçlendirmek, Google'da daha net görünmek ve müşterisine daha profesyonel dijital temas sunmak isteyen küçük ve orta ölçekli işletmeler için uygundur.",
  },
  {
    question: "Web sitesi sadece tasarım işi midir?",
    answer:
      "Hayır. Doğru web sitesi; tasarım, içerik akışı, güven sinyalleri, iletişim netliği ve temel SEO yapısının birlikte kurulmasıyla değer üretir.",
  },
  {
    question: "Bu sayfadan ana hizmet sayfasına geçilebilir mi?",
    answer:
      "Evet. Bu sayfa Kocaeli odaklı bir giriş sayfasıdır. İsteyen ziyaretçi doğrudan ana web sitesi tasarımı hizmet sayfasına geçebilir.",
  },
];

export default function KocaeliWebTasarimPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <SeoJsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Kocaeli Web Tasarım", path: "/kocaeli-web-tasarim" },
          ]),
          createServiceSchema({
            name: "Kocaeli Web Tasarım",
            description:
              "Kocaeli'deki işletmeler için profesyonel web tasarım, kurumsal site düzeni ve Google görünürlüğü desteği.",
            path: "/kocaeli-web-tasarim",
            serviceType: "Kocaeli web tasarım hizmeti",
            keywords: ["kocaeli web tasarım", "kurumsal web sitesi", "google görünürlüğü"],
          }),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
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
            name: "Kocaeli Web Tasarım Hizmet Kapsamı",
            itemListElement: serviceScope.map((item, index) => ({
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
            Kocaeli Web Tasarım
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Kocaeli'de işletmenizi dijitalde daha net ve daha güven veren şekilde temsil eden web sitesi kurulumu.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Kocaeli'deki küçük ve orta ölçekli işletmeler için web sitesi yalnızca bir vitrin değil,
            müşterinin ilk güven temaslarından biridir. VektörHUB bu yapıyı sade, profesyonel ve
            işletmenin gerçek ihtiyacına uygun şekilde kurar.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Neden Bu Sayfa
        </div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          Bu sayfa, Kocaeli web tasarım aramalarında işletmelerin ihtiyaç duyduğu hizmeti daha net
          karşılamak için hazırlandı. Amaç mevcut siteyi değiştirmek değil; hedef aramalarda daha
          güçlü ve daha alakalı bir giriş sayfası sunmaktır.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Odak Alanı
            </div>
            <h2 className="mt-4 text-xl font-black leading-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-orange-500/15 bg-orange-500/[0.06] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
            Web Sitesi Yaklaşımı
          </div>
          <p className="mt-4 text-base leading-8 text-white/76 sm:text-lg">
            Buradaki yaklaşım büyük ve karmaşık projeler önermek değil; Kocaeli'de faaliyet gösteren
            işletmenin daha düzenli, daha bulunabilir ve daha profesyonel görünmesini sağlayan net bir
            web yapısı kurmaktır.
          </p>
          <p className="mt-4 text-base leading-8 text-white/76 sm:text-lg">
            İçerik dili, hizmet anlatımı, iletişim akışı ve temel SEO düzeni birlikte kurgulandığında,
            site yalnızca güzel görünmez; daha güven verir ve daha kolay anlaşılır hale gelir.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Geçiş Alanı
          </div>
          <p className="mt-4 text-sm leading-7 text-white/68 sm:text-[15px]">
            Bu sayfa hedef arama için açılmış özel giriş sayfasıdır. Ayrıntılı hizmet yapısını görmek
            isteyen ziyaretçiler doğrudan ana hizmet sayfasına geçebilir.
          </p>
          <div className="mt-6">
            <Link
              href="/hizmetler/web-sitesi-tasarimi"
              className="inline-flex items-center rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:border-orange-300/40 hover:bg-orange-500/15"
            >
              Web Sitesi Tasarımı Hizmetini İncele
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.94fr_1.06fr]">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Hizmet Kapsamı
          </div>
          <div className="mt-5 space-y-3">
            {serviceScope.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-white/72 sm:text-[15px]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Çalışma Süreci
          </div>
          <div className="mt-5 space-y-4">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <h2 className="text-lg font-bold text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-orange-500/15 bg-orange-500/[0.05] p-6 sm:p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
          Kocaeli Odaklı Görünürlük
        </div>
        <p className="mt-4 max-w-4xl text-base leading-8 text-white/76 sm:text-lg">
          Bu sayfa Kocaeli web tasarım aramalarını daha doğru karşılamak için hazırlandı. Amaç yalnızca
          bir şehir adı geçirmek değil; bölgedeki işletmelerin ihtiyaç duyduğu hizmeti daha net, daha
          güven veren ve daha alakalı bir yapıda anlatmaktır.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {localFocusAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-white/68"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Sık Sorulan Sorular
        </div>
        <div className="mt-5 space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-bold text-white">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Link
          href="/hizmetler/google-seo-calismalari"
          className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition hover:border-orange-400/25 hover:bg-white/[0.05]"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Destek Sayfası
          </div>
          <h2 className="mt-4 text-xl font-black text-white">Google ve SEO Çalışmaları</h2>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Kocaeli odaklı görünürlüğü güçlendiren teknik ve içerik düzenini inceleyin.
          </p>
        </Link>

        <Link
          href="/referanslar"
          className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition hover:border-orange-400/25 hover:bg-white/[0.05]"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Güven Alanı
          </div>
          <h2 className="mt-4 text-xl font-black text-white">Referanslar</h2>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Çalışma yaklaşımını ve sağlanan katkıları referans sayfasında görün.
          </p>
        </Link>

        <Link
          href="/iletisim"
          className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 transition hover:border-orange-400/25 hover:bg-white/[0.05]"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            İletişim
          </div>
          <h2 className="mt-4 text-xl font-black text-white">Proje Görüşmesi Başlat</h2>
          <p className="mt-3 text-sm leading-7 text-white/68">
            Doğrudan iletişim sayfasına geçip web sitesi ihtiyacınızı net şekilde iletin.
          </p>
        </Link>
      </div>
    </section>
  );
}
