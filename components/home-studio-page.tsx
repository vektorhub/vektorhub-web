import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Globe2,
  LayoutTemplate,
  LifeBuoy,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const services = [
  {
    href: "/hizmetler/web-sitesi-tasarimi",
    icon: LayoutTemplate,
    title: "Kurumsal web sitesi",
    text: "Hizmeti net anlatan, mobilde rahat kullanılan, yönetimi kolay web altyapısı.",
  },
  {
    href: "/hizmetler/google-seo-calismalari",
    icon: Search,
    title: "Google ve SEO hazırlığı",
    text: "Yerel arama, teknik yapı, sayfa başlıkları ve içerik düzeniyle bulunabilirliği güçlendiren çalışma.",
  },
  {
    href: "/hizmetler/mobil-uygulama-gelistirme",
    icon: Smartphone,
    title: "Özel yazılım ve uygulama",
    text: "İş takibi, teklif, bildirim, panel veya mobil kullanım gibi ihtiyaca özel küçük ama işlevsel sistemler.",
  },
  {
    href: "/hizmetler/ihtiyaca-uygun-ozel-calismalar",
    icon: LifeBuoy,
    title: "Bakım ve teknik destek",
    text: "Yayın sonrası güncelleme, hata düzeltme, güvenlik, taşıma ve eski sistemleri toparlama desteği.",
  },
];

const processSteps = [
  "İhtiyaç analizi",
  "Doğru yapı planı",
  "Mobil uyumlu arayüz",
  "Yayın öncesi kontrol",
];

const works = [
  {
    title: "SOYANIM.COM",
    type: "Dijital aile ağacı ve anı arşivi",
    href: "https://soyanim.com/",
    image: "/brand-flow.png",
  },
  {
    title: "DIFIKI",
    type: "Topluluk ve içerik sitesi",
    href: "https://difiki.com.tr/",
    image: "/reference-shots/difiki-home.png",
  },
  {
    title: "ANAHTAR EVİ",
    type: "Yerel hizmet web sitesi",
    href: "https://anahtarevi.net",
    image: "/reference-shots/anahtarevi-home.png",
  },
  {
    title: "VektörHUB araçları",
    type: "Yardımcı uygulama ve ürün vitrini",
    href: "/ucretsiz-uygulamalar",
    image: "/brand-flow.png",
  },
];

const proofItems = [
  { value: "Web", label: "Kurumsal site ve açılış sayfası" },
  { value: "SEO", label: "Google görünürlüğü ve yerel arama" },
  { value: "Yazılım", label: "İhtiyaca özel panel ve araçlar" },
];

export function HomeStudioPage() {
  return (
    <div className="overflow-hidden bg-[#f7f4ee] text-[#242424]">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[linear-gradient(180deg,#fffaf2_0%,#f7f4ee_68%,rgba(247,244,238,0)_100%)]" />
        <div className="container-main relative grid gap-10 pb-16 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:pb-20 lg:pt-16">
          <div>
            <div className="inline-flex rounded-full border border-[#f47a20]/20 bg-[#fff0e3] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a94f13]">
              Web sitesi, SEO ve özel yazılım
            </div>
            <h1 className="mt-6 max-w-3xl text-[2.15rem] font-black leading-[1.08] text-[#202020] sm:text-[2.75rem] lg:text-[3.1rem]">
              İşletmeler için yönetimi kolay dijital sistemler.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#68635c] sm:text-lg">
              Web sitesi, Google görünürlüğü, teknik bakım ve ihtiyaca özel yazılım tek çatı altında.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/iletisim"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f47a20] px-6 text-sm font-bold text-white shadow-[0_16px_36px_rgba(244,122,32,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e96d16]"
              >
                Teklif görüşmesi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/referanslar"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#ded4c7] bg-white px-6 text-sm font-bold text-[#2b2926] transition hover:-translate-y-0.5 hover:border-[#f47a20]/45"
              >
                Referanslar
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.value} className="rounded-lg border border-[#e7ded2] bg-white/78 p-4 shadow-[0_16px_40px_rgba(57,47,35,0.05)]">
                  <div className="text-xl font-black text-[#202020]">{item.value}</div>
                  <div className="mt-2 text-sm leading-5 text-[#756f66]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-[#15a6a6]/12 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-40 w-40 rounded-full bg-[#f47a20]/14 blur-3xl" />
            <div className="relative overflow-hidden rounded-xl border border-[#e1d7cb] bg-white shadow-[0_28px_80px_rgba(67,52,35,0.14)]">
              <div className="flex items-center gap-2 border-b border-[#ece4da] bg-[#f4eee5] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d7cabc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d7cabc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d7cabc]" />
                <span className="ml-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7a736a]">
                  vektorhub.com
                </span>
              </div>
              <div className="grid gap-4 p-5 sm:p-6">
                <div className="rounded-lg bg-[linear-gradient(135deg,#fff0e3,#e3f6f4)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9b4b13]">
                        Proje akışı
                      </p>
                      <h2 className="mt-3 text-2xl font-black leading-tight text-[#252525]">
                        Tasarım, yazılım, yayın ve bakım aynı planda.
                      </h2>
                    </div>
                    <div className="hidden h-16 w-16 place-items-center rounded-2xl bg-white/72 text-[#15a6a6] sm:grid">
                      <Code2 className="h-8 w-8" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#ebe2d8] bg-[#fbf8f2] p-4">
                    <Globe2 className="h-5 w-5 text-[#f47a20]" />
                    <p className="mt-3 text-sm font-bold">Mobil uyumlu web sitesi</p>
                    <p className="mt-2 text-sm leading-6 text-[#6d675f]">Hızlı açılan, net okunan, sade arayüz.</p>
                  </div>
                  <div className="rounded-lg border border-[#d7efec] bg-[#f2fbfa] p-4">
                    <ShieldCheck className="h-5 w-5 text-[#15a6a6]" />
                    <p className="mt-3 text-sm font-bold">Yayın öncesi kontrol</p>
                    <p className="mt-2 text-sm leading-6 text-[#5f6d6a]">Form, telefon, WhatsApp ve SEO kontrolü.</p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#ebe2d8] bg-white p-4">
                  <div className="mb-3 flex items-center justify-between text-sm font-bold">
                    <span>Site teslim hazırlığı</span>
                    <span className="text-[#15a6a6]">Canlı test</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#efe7dc]">
                    <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#f47a20,#15a6a6)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-main py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f47a20]">Hizmet alanları</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#222] sm:text-4xl">
              Web, görünürlük ve teknik altyapı aynı düzende.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#6c665e]">
            İşletmenin ihtiyacına göre sade, ölçülebilir ve sürdürülebilir bir dijital yapı.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-lg border border-[#e4dbcf] bg-white/80 p-5 shadow-[0_18px_50px_rgba(57,47,35,0.05)] transition hover:-translate-y-1 hover:border-[#f47a20]/35 hover:bg-white"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3f6f4] text-[#0b8c8c]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-[#222]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b665f]">{item.text}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-[#d86515]">
                  Detay
                  <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#fffaf2] py-14">
        <div className="container-main grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#15a6a6]">Çalışma şekli</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#222] sm:text-4xl">
              Önce ihtiyaç analizi, sonra doğru yapı.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6c665e]">
              Web sitesi, SEO ve teknik altyapı tek plan içinde değerlendirilir.
            </p>
          </div>
          <div className="rounded-xl border border-[#e5d9ca] bg-white p-5 shadow-[0_22px_60px_rgba(57,47,35,0.07)] sm:p-6">
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-[#eee6dc] bg-[#fdfaf5] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0e3] text-sm font-black text-[#d86515]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-[#4e4942]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-main py-14">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f47a20]">Referans ve üretim</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#222] sm:text-4xl">
              Referanslar ve ürünler tek bakışta anlaşılır.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6c665e]">
              Yayındaki işler, ürünler ve hizmet alanları gerçek bağlantılarıyla listelenir.
            </p>
            <Link
              href="/referanslar"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-[#ded4c7] bg-white px-6 text-sm font-bold text-[#2b2926] transition hover:border-[#f47a20]/45"
            >
              Referansları incele
            </Link>
          </div>
          <div className="grid gap-4">
            {works.map((work) => (
              <a
                key={work.title}
                href={work.href}
                className="grid gap-4 rounded-lg border border-[#e4dbcf] bg-white/80 p-4 shadow-[0_16px_46px_rgba(57,47,35,0.05)] transition hover:-translate-y-0.5 hover:border-[#15a6a6]/35 sm:grid-cols-[92px_1fr_auto] sm:items-center"
              >
                <div className="relative min-h-20 overflow-hidden rounded-lg border border-[#eee6dc] bg-[#f7f4ee]">
                  <Image
                    src={work.image}
                    alt={`${work.title} web sitesi önizlemesi`}
                    fill
                    sizes="92px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#222]">{work.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#70695f]">{work.type}</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-[#f47a20] sm:block" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main pb-16">
        <div className="grid gap-6 rounded-xl border border-[#e4dbcf] bg-[#242424] p-6 text-white shadow-[0_22px_70px_rgba(36,36,36,0.16)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#8ee3dd]">
              <Compass className="h-4 w-4" />
              Net başlangıç
            </div>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
              İşletmenizin web sitesini profesyonel hale getirelim.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
              Mevcut site, yeni proje veya Google görünürlüğü için kısa bir ön inceleme yeterlidir.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f47a20] px-6 text-sm font-bold text-white transition hover:bg-[#e96d16]"
          >
            İletişime geç
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container-main pb-14">
        <div className="grid gap-3 rounded-lg border border-[#d7efec] bg-[#f2fbfa] p-5 text-sm leading-7 text-[#47625f] sm:grid-cols-[auto_1fr]">
          <CheckCircle2 className="mt-1 h-5 w-5 text-[#15a6a6]" />
          <p>
            Müşteri portalı bu kurguda silinmedi. Sadece ana site menüsünden ve ana sayfa akışından pasife
            alındı; ileride tekrar aktif etmek istersek mevcut altyapı üzerinden geri açılabilir.
          </p>
        </div>
      </section>
    </div>
  );
}
