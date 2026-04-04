import Link from "next/link";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Demo Siteler",
  description:
    "Farklı sektörler için hazırlanmış deneysel ve dikkat çekici demo web sitesi vitrinlerini inceleyin.",
  path: "/demo-siteler",
  keywords: ["demo siteler", "örnek web sitesi", "sektörel demo site", "yaratıcı demo tasarım"],
});

const demoCards = [
  {
    href: "/demo-siteler/emlak",
    title: "Emlak",
    tone: "Altın / premium",
    bg: "linear-gradient(135deg,#1a202b 0%,#a47b42 52%,#f4e2bb 100%)",
    badge: "Portföy Sahnesi",
  },
  {
    href: "/demo-siteler/klinik",
    title: "Klinik",
    tone: "Mint / steril",
    bg: "linear-gradient(135deg,#0f2d35 0%,#4ec9b0 45%,#e8fffb 100%)",
    badge: "Steril Akış",
  },
  {
    href: "/demo-siteler/avukat",
    title: "Avukat",
    tone: "Koyu / rafine",
    bg: "linear-gradient(135deg,#080b10 0%,#2b3340 44%,#d5ba91 100%)",
    badge: "Ciddi Duruş",
  },
  {
    href: "/demo-siteler/oto-servis",
    title: "Oto Servis",
    tone: "Teknik / sert",
    bg: "linear-gradient(135deg,#091117 0%,#1d3241 46%,#ff8a28 100%)",
    badge: "Atölye Gücü",
  },
  {
    href: "/demo-siteler/guzellik-merkezi",
    title: "Güzellik",
    tone: "Editorial / pembe",
    bg: "linear-gradient(135deg,#301d29 0%,#be5d84 44%,#ffe5f0 100%)",
    badge: "Editorial Vibe",
  },
  {
    href: "/demo-siteler/restoran",
    title: "Restoran",
    tone: "Sıcak / teatral",
    bg: "linear-gradient(135deg,#120d0a 0%,#833d17 42%,#ffb85d 100%)",
    badge: "Akşam Sahnesi",
  },
];

export default function DemoSitelerPage() {
  return (
    <section className="container-main py-14 sm:py-20">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
        ])}
      />

      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#090f18] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:px-10 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,124,61,0.26),transparent_20%),radial-gradient(circle_at_82%_16%,rgba(74,222,255,0.22),transparent_22%),radial-gradient(circle_at_50%_84%,rgba(255,116,184,0.18),transparent_26%)]" />
        <div className="demo-spin-slow pointer-events-none absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full border border-white/10" />
        <div className="demo-float pointer-events-none absolute left-[8%] top-[28%] h-24 w-24 rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur" />
        <div className="demo-float-delay pointer-events-none absolute right-[18%] top-[42%] h-20 w-20 rounded-full border border-white/10 bg-white/6 backdrop-blur" />

        <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/16 bg-sky-300/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-100">
              <Sparkles className="h-4 w-4" />
              Demo Siteler
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.08em] text-white sm:text-5xl lg:text-[5.2rem]">
              Uzaya çıkmayan
              <span className="demo-gradient-shift block bg-[linear-gradient(90deg,#ff8f4d,#ffd36a,#7ae7ff,#ff8cc7)] bg-clip-text text-transparent">
                demo vitrin sayılmaz.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Bu alan artık “aynı siteyi sektöre boyama” alanı değil. Her kart farklı bir estetik dil, farklı bir enerji ve farklı bir
              kullanıcı psikolojisi taşıyor. Amaç müşteriyi bilgilendirmekten önce şaşırtmak.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <div className="text-[11px] uppercase tracking-[0.22em] text-orange-200/82">Yaklaşım</div>
              <div className="mt-3 text-3xl font-black text-white">Tek şablon yok</div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <div className="text-[11px] uppercase tracking-[0.22em] text-sky-200/82">Hedef</div>
              <div className="mt-3 text-3xl font-black text-white">İlk bakışta etki</div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur sm:col-span-2">
              <div className="flex items-center gap-3 text-white/80">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-semibold uppercase tracking-[0.22em]">Vitrin Notu</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Sektör demoları aynı iskeletin varyasyonu değil, karakterleri ayrışan mikro markalar gibi görünmeli. Bu turda yön o tarafa çekildi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {demoCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative overflow-hidden rounded-[30px] border border-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-2 ${index % 2 === 0 ? "md:-rotate-[1.2deg] hover:rotate-0" : "md:rotate-[1.2deg] hover:rotate-0"}`}
            style={{ background: card.bg }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-full border border-white/20 bg-black/16 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  {card.badge}
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/80 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h2 className="mt-10 text-3xl font-black leading-none tracking-[-0.06em] text-white sm:text-[2.6rem]">
                {card.title}
              </h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/72">{card.tone}</p>
              <div className="mt-8 inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Demoyu Aç
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
