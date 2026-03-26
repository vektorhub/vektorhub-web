import Link from "next/link";
import { ArrowRight, Blocks, Building2, Compass, LayoutPanelTop, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { label: "Odak", value: "KOBİ" },
  { label: "Model", value: "Dijital Ofis" },
  { label: "Yaklaşım", value: "Net + Kontrollü" },
];

const features = [
  {
    icon: Building2,
    title: "İnternette var ama düzgün görünmeyen işletmeler",
    desc: "Müşteri baktığında güven veren, ne iş yaptığınızın net anlaşıldığı bir dijital görünüm kurarız.",
  },
  {
    icon: LayoutPanelTop,
    title: "Telefon ve WhatsApp trafiğini daha düzenli yönetmek isteyenler",
    desc: "Dağınık iletişim yerine daha derli toplu, daha kontrollü bir müşteri akışı oluştururuz.",
  },
  {
    icon: ShieldCheck,
    title: "Teklif, evrak ve iş takibini tek yerde görmek isteyen firmalar",
    desc: "Portal yapısıyla müşteri sürecini izlenebilir hale getirir, profesyonel temas kurmanıza yardımcı oluruz.",
  },
  {
    icon: Compass,
    title: "Nereden başlayacağını bilmeyen ama işini büyütmek isteyen esnaf",
    desc: "Web, sosyal medya, Google ve içerik tarafında karmaşık değil uygulanabilir bir yol haritası çıkarırız.",
  },
];

export function HeroSection() {
  return (
    <section className="container-main pb-6 pt-6 md:pb-8 md:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <div className="mb-4 inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300 sm:text-xs">
              Esnaf ve KOBİ İçin Dijital Düzen
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Müşterisinin güvenle ulaştığı,
              <span className="brand-gradient block pt-2">işini dijitalde düzgün anlatan bir esnaf düzeni.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:text-lg">
              Web sitesi, Google görünürlüğü, sosyal medya düzeni ve müşteri takibini aynı yapıda toplarız.
              Amaç gösteriş değil; telefon açtıran, mesaj getiren ve işletmeyi daha derli toplu gösteren
              bir dijital düzen kurmaktır.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
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
                  className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4"
                >
                  <div className="text-2xl font-black sm:text-3xl">{item.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/38">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Web</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Portal</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Süreç Düzeni</span>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#0f1728_0%,#121b2e_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
            <div className="border-b border-white/10 pb-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">VektörHUB Yaklaşımı</p>
              <h3 className="mt-2 text-xl font-bold leading-tight sm:text-[1.75rem]">
                Küçük işletmenin dijitalde daha güvenli ve daha derli toplu görünmesi
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Burada amaç süslü sözler değil; müşterinin baktığında sizi ciddiye aldığı, ne yaptığınızı
                anladığı ve rahatça ulaşabildiği bir dijital düzen kurmak.
              </p>
            </div>

            <div className="mt-5 space-y-5">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4 border-b border-white/8 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="text-base font-bold leading-tight text-white">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-white/62">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-300">
                  <Blocks className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Müşteri size baktığında ne görsün?</p>
                  <p className="mt-2 text-sm leading-7 text-white/62">
                    Gelişi güzel açılmış hesaplar değil; ne iş yaptığı belli olan, güven veren, ulaşması kolay
                    ve süreci takip edilebilen bir işletme görsün istiyoruz.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm leading-7 text-white/66">
                Gösterişli vitrin yerine, işletmenin dijitalde daha düzenli, daha güven veren ve
                müşterisinin kolayca anlayabildiği bir sistem kurarız. Site yalnızca görünmez; iş getirir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
