import Link from "next/link";

const packages = [
  {
    href: "/hizmetler/dijital-gorunum-ve-kurumsal-duzen",
    title: "Dijital Görünüm ve Kurumsal Düzen",
    desc: "Web sitesi, içerik yapısı ve dijital sunum tarafında daha güven veren bir görünüm kurulmasına destek olur.",
    accent: "İlk izlenim",
  },
  {
    href: "/hizmetler/pratik-dijital-cozumler",
    title: "Pratik Dijital Çözümler",
    desc: "Günlük işi kolaylaştıran, gereksiz karmaşıklık oluşturmayan, ölçülü dijital çözümler geliştirir.",
    accent: "Günlük akış",
  },
  {
    href: "/hizmetler/dijital-tanitim-ve-icerik-destegi",
    title: "Dijital Tanıtım ve İçerik Desteği",
    desc: "Markanın kendini daha doğru anlatmasına, daha net görünmesine ve daha güvenli iletişim kurmasına yardımcı olur.",
    accent: "Anlatım gücü",
  },
  {
    href: "/hizmetler/ihtiyaca-uygun-ozel-calismalar",
    title: "İhtiyaca Uygun Özel Çalışmalar",
    desc: "Hazır kalıplar yerine işletmenin gerçek ihtiyacına göre şekillenen kontrollü ve uygulanabilir özel çalışmalar sunar.",
    accent: "Özel çözüm",
  },
];

export function ServicePackages() {
  return (
    <section className="container-main py-6 md:py-8">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
          Hizmet Alanları
        </p>
        <h2 className="section-title mt-3">
          Küçük ve orta ölçekli işletmeler için ağır değil, işe yarayan yapı.
        </h2>
        <p className="section-text mt-3">
          Hizmet yaklaşımımız büyük kurumsal dönüşüm projeleri satmak değil;
          işletmenin ihtiyacına uygun doğru alanı netleştirmek ve uygulanabilir
          dijital destek sunmaktır.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {packages.map((pkg) => (
          <Link key={pkg.title} href={pkg.href} className="glass-card p-6 transition hover:border-orange-400/25 hover:bg-white/[0.08]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">{pkg.title}</h3>
              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
                {pkg.accent}
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-white/68 sm:text-base">
              {pkg.desc}
            </p>

            <div className="mt-4 grid gap-2 text-sm text-white/65">
              <div>• Kapsamı ölçülü ve anlaşılırdır</div>
              <div>• KOBİ yapısına uygun ilerler</div>
              <div>• Uygulanabilir dijital kazanım üretir</div>
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