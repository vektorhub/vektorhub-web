import Link from "next/link";

const packages = [
  {
    href: "/hizmetler/web-sitesi-tasarimi",
    title: "Web Sitesi Tasarımı",
    desc: "İşletmenizi dijitalde doğru temsil eden profesyonel web sitesi kurulumu ve düzenli dijital vitrin desteği.",
    accent: "Web",
  },
  {
    href: "/hizmetler/google-seo-calismalari",
    title: "Google & SEO Çalışmaları",
    desc: "Google'da görünür hale gelmek ve dijitalde daha kolay bulunmak için temel görünürlük yapısını güçlendirir.",
    accent: "Google",
  },
  {
    href: "/hizmetler/sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    desc: "Sosyal medya hesaplarını daha aktif, daha düzenli ve daha güven veren bir iletişim alanına dönüştürür.",
    accent: "Sosyal",
  },
  {
    href: "/hizmetler/dijital-reklam-yonetimi",
    title: "Dijital Reklam Yönetimi",
    desc: "Dijital reklamları daha kontrollü hedefleme, daha doğru mesaj ve düzenli takip mantığıyla yönetir.",
    accent: "Reklam",
  },
  {
    href: "/hizmetler/mobil-uygulama-gelistirme",
    title: "Mobil Uygulama Geliştirme",
    desc: "İhtiyaca özel mobil uygulamalarla işletmenin dijital akışını daha pratik hale getiren yapılar geliştirir.",
    accent: "Mobil",
  },
  {
    href: "/hizmetler/is-gelistirme-danismanligi",
    title: "İş Geliştirme Danışmanlığı",
    desc: "Dijitali yalnızca görünmek için değil, işi büyütecek sistem kurmak için ele alan destek modeli sunar.",
    accent: "Büyüme",
  },
  {
    href: "/hizmetler/logo-tasarimi",
    title: "Logo Tasarımı",
    desc: "Markanın dijitalde daha net tanınmasını sağlayan sade ve kullanışlı logo yapıları hazırlar.",
    accent: "Marka",
  },
];

export function ServicePackages() {
  return (
    <section className="container-main py-6 md:py-8">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Hizmet Alanları</p>
        <h2 className="section-title mt-3">
          İşletmenin dijitalde eksik kalan tarafını bulup, doğru hizmetle tamamlıyoruz.
        </h2>
        <p className="section-text mt-3">
          Her işletmenin ihtiyacı aynı değil. Kiminin web sitesi eksik, kiminin Google görünürlüğü
          zayıf, kiminin sosyal medya düzeni oturmamış oluyor. Biz ihtiyacı netleştirip doğru
          hizmet alanına odaklanan, uygulanabilir ve takip edilebilir dijital destek sunuyoruz.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => (
          <Link
            key={pkg.title}
            href={pkg.href}
            className="glass-card p-6 transition hover:border-orange-400/25 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">{pkg.title}</h3>
              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
                {pkg.accent}
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-white/68 sm:text-base">{pkg.desc}</p>

            <div className="mt-4 grid gap-2 text-sm text-white/65">
              <div>• Kapsamı ölçülüdür ve anlaşılır ilerler</div>
              <div>• Küçük işletme yapısına uygun kurulur</div>
              <div>• Kurulum sonrası takip mantığına uygundur</div>
            </div>

            <div className="mt-4 inline-flex rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20">
              Detayı Gör
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
