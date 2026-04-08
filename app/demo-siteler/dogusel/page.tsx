import { Anchor, ArrowUpRight, Building2, CheckCircle2, Compass, Phone, ShipWheel, Waves } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Doğusel Kurumsal Demo Site",
  description:
    "Doğusel benzeri çok şirketli ve çok sektörlü yapılar için hazırlanmış, daha güçlü kurumsal güven ve endüstriyel prestij hissi veren demo sayfa.",
  path: "/demo-siteler/dogusel",
  keywords: [
    "kurumsal grup web sitesi",
    "holding web sitesi örneği",
    "denizcilik şirketi web tasarımı",
    "endüstriyel kurumsal demo site",
  ],
});

const sectors = [
  {
    title: "Gemi İnşa ve Marine Üretim",
    copy: "Üretim kabiliyetini yalnızca başlıkla değil, disiplin ve teslim gücüyle anlatan yapı.",
    icon: ShipWheel,
  },
  {
    title: "Yat ve Özel Projeler",
    copy: "Premium üretim hattını ve estetik yaklaşımı aynı ekranda taşıyan kurgu.",
    icon: Waves,
  },
  {
    title: "Tasarım, Mimarlık ve Danışmanlık",
    copy: "Grubun yalnızca üreten değil, yön veren tarafını görünür kılan anlatım.",
    icon: Compass,
  },
];

const companies = [
  { name: "DDM Marine Interior", focus: "Gemi yaşam alanları ve marine iç mekan üretimi" },
  { name: "TRX Marine", focus: "Gemi inşa ve denizcilik üretim organizasyonu" },
  { name: "Huzur Yat", focus: "Yat üretimi ve özel deniz projeleri" },
  { name: "Viya Architectural Design", focus: "Tasarım, mimari çözüm ve proje dili" },
];

const strengths = [
  "Grup yapısı ilk ekranda net anlaşılır.",
  "Faaliyet alanları dağınık değil, stratejik sırayla sunulur.",
  "Kök, üretim gücü ve kurumsal ciddiyet aynı dilde birleşir.",
  "İletişim akışı yatırımcıya, müşteriye ve aday personele ayrı kapı açar.",
];

export default function DoguselDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Doğusel Demo", path: "/demo-siteler/dogusel" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#26465d]/35 bg-[#091521] text-white shadow-[0_30px_90px_rgba(0,0,0,0.24)]">
        <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_12%_18%,rgba(103,177,220,0.24),transparent_20%),radial-gradient(circle_at_84%_14%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,#07111b_0%,#0d2233_42%,#18384e_72%,#dce6ed_138%)] px-6 py-10 sm:px-10 sm:py-12">
          <div className="demo-spin-slow absolute right-[-6rem] top-[-6rem] h-56 w-56 rounded-full border border-white/10" />
          <div className="demo-float absolute left-[8%] top-[24%] h-24 w-24 rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur" />
          <div className="demo-float-delay absolute right-[14%] top-[36%] h-20 w-20 rounded-full border border-white/10 bg-white/8 backdrop-blur" />

          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8ab8d5]/25 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c3e6fb]">
                <Anchor className="h-4 w-4" />
                Çok Şirketli Grup Vitrini
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.08em] sm:text-5xl lg:text-[5rem]">
                Köklü geçmişi olan grup
                <span className="block text-[#c8d9e5]">broşür gibi görünmemeli.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Bu demo, Doğusel gibi bir yapının kendini yalnızca anlatan değil, kurumsal ağırlığını hissettiren bir
                web sitesinde nasıl konumlanabileceğini göstermek için hazırlandı. Merkezde tarihçe değil; kabiliyet,
                grup gücü, sektör derinliği ve güven var.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#sirketler" className="rounded-full bg-[#d8e6ef] px-6 py-3 text-sm font-semibold text-[#0c2131]">
                  Grup Yapısını İncele
                </a>
                <a href="#iletisim" className="rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-semibold text-white">
                  İletişim Alanını Gör
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-[#08131d]/44 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#9bc3db]">Ana Mesaj</div>
                <div className="mt-3 text-3xl font-black">1958’den gelen güven</div>
                <p className="mt-3 text-sm leading-7 text-white/68">Kökü vurgulayan ama eski görünmeyen yeni dijital duruş.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#d6eaf7]">Sunum Dili</div>
                <div className="mt-3 text-3xl font-black">Prestij + netlik</div>
                <p className="mt-3 text-sm leading-7 text-white/68">Holding diliyle endüstriyel üretim gücünü birleştiren kurgu.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/92 p-5 text-[#102333] shadow-[0_18px_42px_rgba(0,0,0,0.18)] sm:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#54748b]">Neden Bu Yön</div>
                <p className="mt-4 text-sm leading-7 text-[#486072]">
                  Mevcut yapı bilgi veriyor ama marka etkisini tam taşımıyor. Bu öneri, Doğusel’i daha büyük, daha düzenli
                  ve daha profesyonel gösteren dijital vitrini hedefliyor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 border-b border-white/10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[#eff4f7] px-6 py-10 text-[#132838] sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5b778b]">Ana Sayfa Kurgusu</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.8rem]">
              Güçlü grup yapısı ilk bakışta anlaşılmalı.
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                "Hero: güçlü mesaj, kısa grup özeti, net CTA",
                "Sayılarla güven: yıl, sektör, şirket, istihdam",
                "Faaliyet alanları: dağınık değil, stratejik sırada",
                "Şirketler: her iştirak için ayrı güçlü blok",
                "Seçilmiş projeler veya referans mantığı",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#d4dde4] bg-white px-5 py-4 text-sm font-semibold text-[#294252]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#12273a] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9bc3db]">Kurumsal Etki</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-[2.8rem]">
              Mesaj daha kısa, algı daha güçlü.
            </h2>
            <div className="mt-8 space-y-4">
              {strengths.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bfe2f7]" />
                  <p className="text-sm leading-7 text-white/74">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="sirketler" className="bg-[#f7fafc] px-6 py-10 text-[#122839] sm:px-10 sm:py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#607d92]">Şirket Yapısı</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
                Grup, iştirakleriyle birlikte kurumsal ağırlık kazanır.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#102434] px-4 py-2 text-sm font-semibold text-[#d7e8f2]">
              Örnek iştirak vitrini
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {companies.map((company, index) => (
              <article
                key={company.name}
                className={`rounded-[2rem] border p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] ${index % 2 === 0 ? "bg-white" : "bg-[#eaf1f5]"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102434] text-[#d2e8f6]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="rounded-full border border-[#c9d7df] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#637f93]">
                    İştirak
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight">{company.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#556d7d]">{company.focus}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-0 border-t border-white/10 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;

            return (
              <article
                key={sector.title}
                className={`px-6 py-10 sm:px-8 ${index === 1 ? "bg-[#102434]" : index === 2 ? "bg-[#dfe8ee] text-[#102535]" : "bg-[#0b1b28]"} ${index === 2 ? "" : "text-white"}`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 2 ? "bg-[#102434] text-[#d8e8f2]" : "bg-white/10 text-[#c6e3f4]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight">{sector.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 2 ? "text-[#536c7d]" : "text-white/72"}`}>{sector.copy}</p>
              </article>
            );
          })}
        </div>

        <div id="iletisim" className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[#0d1d2a] px-6 py-10 text-white sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a1c8de]">Satış Mesajı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.7rem]">
              “Markanız daha güçlü temsil edilebilir” dedirten alan.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Bu demo, müşteriye fikir değil görüntü gösterme mantığında hazırlanır. Böylece “nasıl olur?” yerine
              “bunu bize uyarlayabilir misiniz?” sorusu gelir.
            </p>
          </div>

          <div className="bg-[linear-gradient(135deg,#edf3f7,#ffffff)] px-6 py-10 text-[#122838] sm:px-10">
            <div className="rounded-[2rem] border border-[#d5e0e7] bg-white p-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5d798d]">Hızlı İletişim Bloğu</div>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Firma / Pozisyon", "İlgi alanı: kurumsal site / İngilizce site / şirket sayfaları"].map((field) => (
                  <div key={field} className="rounded-2xl border border-[#d9e3e8] bg-[#f6fafc] px-4 py-3 text-sm text-[#5a7181]">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#102434] px-4 py-3 text-sm font-semibold text-white">
                  Demo Sunumu Talep Et
                </button>
                <a
                  href="tel:+905333850572"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cad8e0] bg-[#e9f1f6] px-4 py-3 text-sm font-semibold text-[#102434]"
                >
                  <Phone className="h-4 w-4" />
                  0533 385 05 72
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
