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
  { label: "Yaklaşım", value: "Net + Kontrollü" },
];

const features = [
  {
    icon: Building2,
    title: "Dijital görünümünü toparlamak isteyen işletmeler",
    desc: "Karmaşık olmayan ama güven veren bir dijital vitrin için doğru başlangıç.",
  },
  {
    icon: LayoutPanelTop,
    title: "Günlük işini kolaylaştıracak pratik çözümler",
    desc: "Sadece gerekli olanı kuran, işi büyütmeden düzeni iyileştiren yaklaşım.",
  },
  {
    icon: ShieldCheck,
    title: "Müşterisiyle daha düzenli çalışmak isteyen firmalar",
    desc: "Portal, takip ve görünür süreç yapısıyla daha profesyonel temas kurar.",
  },
  {
    icon: Compass,
    title: "Ne yapacağını netleştirmek isteyen markalar",
    desc: "İş geliştirme, anlatım ve dijital sunum tarafında sade yol haritası.",
  },
];

export function HeroSection() {
  return (
    <section className="container-main pb-6 pt-6 md:pb-8 md:pt-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(77,132,255,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="grid items-center gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="relative">
            <div className="mb-4 inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300 sm:text-xs">
              KOBİ Odaklı Dijital Yapılanma
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Büyük görünmek zorunda olmayan işletmeler için
              <span className="brand-gradient block pt-2">premium, net ve çalışan dijital düzen.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8 md:text-lg">
              Web sitesi, anlatım dili ve müşteri sürecini aynı düzende bir araya getiririz.
              Amaç daha büyük görünmek değil; daha net, daha güven veren ve gerçekten kullanılan
              bir dijital yapı kurmaktır.
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.025))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-white/74 sm:text-[15px]">
                  Gösterişli vitrin yerine, işletmenin dijitalde daha olgun ve daha kontrollü
                  göründüğü bir sistem kurarız. Site yalnızca göstermez; düzen hissi verir.
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
                  className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="text-2xl font-black sm:text-3xl">{item.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/38">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Web</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Portal</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">Süreç Düzeni</span>
            </div>
          </div>

          <div className="glass-card relative p-4 sm:p-5 md:p-6">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.12),transparent_22%)]" />
            <div className="relative rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#0f1728_0%,#121b2e_100%)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-5 md:p-6">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
                    VektörHUB Yaklaşımı
                  </p>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">Az ama doğru kurulan dijital yapı</h3>
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
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold sm:text-base">{item.title}</h4>
                        <p className="mt-1 text-xs leading-6 text-white/62 sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-orange-500/15 bg-[linear-gradient(180deg,rgba(255,106,0,0.1),rgba(255,106,0,0.06))] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                    <Blocks className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Dijital ofis mantığı</p>
                    <p className="mt-1 text-xs leading-6 text-white/64 sm:text-sm">
                      Site, içerik yapısı ve müşteri portalı birlikte kurgulanır. Böylece ziyaretçi
                      güven hisseder, müşteri süreci rahat takip eder, işletme de dijitalde daha olgun görünür.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
