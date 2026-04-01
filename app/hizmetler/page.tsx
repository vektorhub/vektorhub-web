import Link from "next/link";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Web Tasarım, Google SEO ve Dijital Hizmetler",
  description:
    "VektörHUB'un web tasarım, Google SEO, sosyal medya, dijital reklam, mobil uygulama ve iş geliştirme hizmetlerini inceleyin.",
  path: "/hizmetler",
  keywords: ["web tasarım hizmeti", "google seo hizmeti", "mobil uygulama geliştirme", "kocaeli web tasarım"],
});

const servicePages = [
  {
    href: "/hizmetler/web-sitesi-tasarimi",
    title: "Web Sitesi Tasarımı",
    label: "Web",
    description:
      "Profesyonel web sitesi kurulumu ile işletmenin dijitalde daha güven veren ve daha düzenli görünmesini sağlar.",
  },
  {
    href: "/hizmetler/google-seo-calismalari",
    title: "Google & SEO Çalışmaları",
    label: "Google",
    description:
      "Google'da daha görünür olmak ve doğru arandığında daha kolay bulunmak için temel görünürlük yapısını güçlendirir.",
  },
  {
    href: "/hizmetler/sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    label: "Sosyal",
    description:
      "Sosyal medya hesaplarını daha düzenli, daha aktif ve daha güven veren bir iletişim alanına dönüştürür.",
  },
  {
    href: "/hizmetler/dijital-reklam-yonetimi",
    title: "Dijital Reklam Yönetimi",
    label: "Reklam",
    description:
      "Reklam bütçesini daha kontrollü kullanmak ve doğru müşteriyle temas kurmak için yönetim desteği sunar.",
  },
  {
    href: "/hizmetler/mobil-uygulama-gelistirme",
    title: "Mobil Uygulama Geliştirme",
    label: "Mobil",
    description:
      "İhtiyaca özel mobil uygulamalarla işletmenin dijital akışını pratik ve kullanılabilir yapılarla destekler.",
  },
  {
    href: "/hizmetler/is-gelistirme-danismanligi",
    title: "İş Geliştirme Danışmanlığı",
    label: "Büyüme",
    description:
      "İşletmenin görünürlük, sistem ve büyüme tarafını birlikte ele alan uygulanabilir yol haritası oluşturur.",
  },
  {
    href: "/hizmetler/logo-tasarimi",
    title: "Logo Tasarımı",
    label: "Marka",
    description:
      "Markanın dijitalde daha net tanınmasını sağlayan sade, kullanışlı ve güven veren logo yapıları hazırlar.",
  },
];

export default function HizmetlerPage() {
  return (
    <section className="container-main page-content-template py-20">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
        ])}
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
            Ölçülü ve Uygulanabilir
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Web'den mobil uygulamaya, görünürlükten iş geliştirmeye uzanan sade ama güçlü hizmetler.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            VektörHUB, broşür ve saha dilinde anlattığı hizmetleri sitede de aynı açıklıkla sunar.
            Amaç büyük görünmek değil; işletmenin gerçekten ihtiyaç duyduğu doğru alanı netleştirip
            işe yarayan dijital sistemi kurmaktır.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Hizmet Yapısı
        </div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          Küçük ve orta ölçekli işletmeler için profesyonel web sitesi, Google görünürlüğü, sosyal
          medya yönetimi, dijital reklam, mobil uygulama, iş geliştirme ve logo tasarımı gibi
          alanlarda uygulanabilir hizmetler sunuyoruz.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
          Hedefimiz işletmeleri gereksiz teknoloji yüküne değil, gerçekten ihtiyaç duydukları
          dijital desteğe ulaştırmak. Bu yüzden hizmet yapımız broşür dilimizle uyumlu, daha net ve
          daha anlaşılır bir başlık sistemiyle yeniden kurgulandı.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {servicePages.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.16)] transition hover:border-orange-400/25 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                {service.label}
              </div>
              <div className="text-sm font-medium text-white/38 transition group-hover:text-white/58">
                İncele
              </div>
            </div>

            <h2 className="mt-5 max-w-sm text-2xl font-black leading-tight text-white">
              {service.title}
            </h2>

            <p className="mt-4 max-w-none text-sm leading-7 text-white/68 sm:text-[15px]">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
