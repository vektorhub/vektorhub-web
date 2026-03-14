import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Building2,
  Compass,
  LayoutPanelTop,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Odak", value: "KOBİ" },
  { label: "Model", value: "Dijital Ofis" },
  { label: "Yaklaşım", value: "Ölçülü + Net" },
];

const features = [
  {
    icon: Building2,
    title: "Dijital görünümünü toparlamak isteyen işletmeler",
    desc: "Karmaşık olmayan ama güven veren bir dijital vitrin kurmak için doğru başlangıç.",
  },
  {
    icon: LayoutPanelTop,
    title: "Günlük işini kolaylaştıracak pratik çözümler",
    desc: "Sadece lazım olanı kuran, işi büyütmeden düzeni iyileştiren yaklaşım.",
  },
  {
    icon: Compass,
    title: "Ne yapacağını netleştirmek isteyen markalar",
    desc: "İş geliştirme, dijital görünüm ve anlatım tarafında sade yol haritası.",
  },
  {
    icon: ShieldCheck,
    title: "Müşterisiyle daha düzenli çalışmak isteyen firmalar",
    desc: "Portal, takip ve görünür süreç yapısıyla daha profesyonel temas kurar.",
  },
];

export function HeroSection() {
  return (
    <section className="container-main pb-6 pt-6 md:pb-8 md:pt-6">
      <div className="grid items-center gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300 sm:text-xs">
            KOBİ Odaklı Dijital Yapılanma
          </div>

          <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Büyük görünmek zorunda olmayan işletmeler için
            <span className="brand-gradient block pt-2">
              premium, net ve çalışan dijital düzen.
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:text-lg">
            VektörHUB, küçük ve orta ölçekli işletmelerin dijital dünyada daha
            düzenli görünmesi, işini daha net anlatması ve müşterileriyle daha
            kontrollü çalışabilmesi için kurulmuş ölçülü bir dijital çözüm yapısıdır.
            Amacımız gösterişli ama boş sistemler değil, gerçekten kullanılan dijital düzen kurmaktır.
          </p>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm leading-7 text-white/74 sm:text-[15px]">
                Web sitesi, hizmet anlatımı ve müşteri portalı birlikte çalıştığında
                işletme sadece internette görünmüş olmaz; dijitalde daha güven veren,
                daha planlı ve daha profesyonel bir ofis gibi hareket etmeye başlar.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02]"
            >
              Hizmetleri İncele
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              İletişime Geç
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-2xl font-black sm:text-3xl">{item.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-4 sm:p-5 md:p-6">
          <div className="rounded-[28px] border border-white/10 bg-[#0f1728] p-4 sm:p-5 md:p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                  VektörHUB Yaklaşımı
                </p>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  Az ama doğru kurulan dijital yapı
                </h3>
              </div>

              <div className="inline-flex rounded-full bg-orange-500/15 px-3 py-2 text-xs font-semibold text-orange-300">
                Abartı Değil, Etki
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold sm:text-base">{item.title}</h4>
                      <p className="mt-1 text-xs leading-6 text-white/62 sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-orange-500/15 bg-orange-500/[0.08] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                  <Blocks className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dijital ofis mantığı</p>
                  <p className="mt-1 text-xs leading-6 text-white/64 sm:text-sm">
                    Site, içerik yapısı ve müşteri portalı birlikte kurgulanır. Böylece
                    ziyaretçi güven hisseder, müşteri süreç takibini rahat yapar, işletme de
                    dijitalde daha olgun bir yapı kazanır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}