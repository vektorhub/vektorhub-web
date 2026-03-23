import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "KOBİ'ler için web sitesi, dijital görünüm, tanıtım desteği ve ihtiyaca uygun özel dijital çözümler.",
  alternates: {
    canonical: "/hizmetler",
  },
};

const servicePages = [
  {
    href: "/hizmetler/dijital-gorunum-ve-kurumsal-duzen",
    title: "Dijital Görünüm ve Kurumsal Düzen",
    description:
      "Web sitesi, kurumsal sunum dili ve dijital görünüm tarafında daha düzenli, daha güven veren bir yapı kurulmasına destek olur.",
  },
  {
    href: "/hizmetler/pratik-dijital-cozumler",
    title: "Pratik Dijital Çözümler",
    description:
      "Günlük işi kolaylaştıran, karmaşık olmayan, ihtiyaca göre şekillenen küçük ama etkili dijital çözümler geliştirir.",
  },
  {
    href: "/hizmetler/dijital-tanitim-ve-icerik-destegi",
    title: "Dijital Tanıtım ve İçerik Desteği",
    description:
      "Markanın kendini daha net anlatması ve müşteriye daha güvenli ulaşması için içerik ve dijital tanıtım desteği sunar.",
  },
  {
    href: "/hizmetler/ihtiyaca-uygun-ozel-calismalar",
    title: "İhtiyaca Uygun Özel Çalışmalar",
    description:
      "Hazır kalıplar yerine, işletmenin gerçek ihtiyacına göre şekillenen ölçülü ve uygulanabilir özel çalışmalar planlar.",
  },
];

export default function HizmetlerPage() {
  return (
    <section className="container-main page-content-template py-20">
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
            Ölçülü ve Uygulanabilir
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Küçük ve orta ölçekli işletmeleri dijitalle tanıştıran sade ama güçlü hizmetler.
          </p>
        </div>
      </div>

      <h1 className="section-title">Hizmetler</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörHUB, büyük ölçekli ve ağır dönüşüm projelerinden çok; küçük ve
        orta ölçekli işletmelerin dijital dünyada daha düzenli, daha görünür ve
        daha kontrollü ilerlemesine yardımcı olan uygulanabilir hizmetlere odaklanır.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Hedefimiz işletmeleri gereksiz karmaşıklığa değil, ihtiyaç duydukları
        kadar dijital desteğe ulaştırmaktır. Bu nedenle hizmet yapımız daha
        sade, daha erişilebilir ve gerçek ihtiyaca göre şekillenen bir anlayışla kuruldu.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {servicePages.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-400/30 hover:bg-white/[0.05]"
          >
            <div className="text-sm font-semibold text-orange-300 transition group-hover:text-orange-200">
              {service.title}
            </div>
            <p className="section-text mt-3 max-w-none text-white/70">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}


