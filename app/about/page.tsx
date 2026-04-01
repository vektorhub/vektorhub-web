import type { Metadata } from "next";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "VektörHUB'un iş geliştirme, web tasarım, dijital çözümler ve sürdürülebilir proje yaklaşımını inceleyin.",
  path: "/about",
  keywords: ["vektorhub hakkında", "iş geliştirme yaklaşımı", "dijital çözüm ajansı"],
});

const principles = [
  {
    title: "Daha net görünen işletmeler",
    body:
      "İyi bir dijital yapı yalnızca şık görünmez; işletmenin ne yaptığını, nasıl çalıştığını ve neden güven verdiğini daha net anlatır.",
  },
  {
    title: "Abartısız ama güçlü sistemler",
    body:
      "Amacımız büyük görünen ama içi boş vitrinler kurmak değil; gerçekten kullanılan, sürdürülebilen ve işi kolaylaştıran dijital düzenler oluşturmaktır.",
  },
  {
    title: "Uzun vadeli iş ortağı yaklaşımı",
    body:
      "VektörHUB, tek seferlik teslim mantığından çok, işletmenin dijitalde daha kontrollü büyümesine eşlik eden bir çalışma modeli kurar.",
  },
];

const focusAreas = [
  {
    title: "İş Geliştirme ve Stratejik Danışmanlık",
    body:
      "İş modelinin güçlendirilmesi, yeni gelir alanlarının netleştirilmesi ve daha sürdürülebilir büyüme kararlarının desteklenmesi.",
  },
  {
    title: "Dijital Ürün ve Yazılım Çözümleri",
    body:
      "Web platformları, mobil uygulamalar, dijital servisler ve işletmeye gerçek fayda sağlayacak teknoloji odaklı ürün kurguları.",
  },
  {
    title: "Dijital Altyapı ve Süreç Düzeni",
    body:
      "İş süreçlerinin dijitalleşmesi, müşteri takibinin görünür hale gelmesi ve işletmenin dijitalde daha düzenli hareket etmesini sağlayan sistemler.",
  },
];

export default function AboutPage() {
  return (
    <section className="container-main page-content-template py-16 sm:py-20">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/about" },
        ])}
      />
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300 sm:text-xs">
          Hakkımızda
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
          VektörHUB, işletmeler için
          <span className="brand-gradient block pt-2">ölçülü ama güçlü dijital düzen kurar.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
          VektörHUB, işletmelerin daha net görünmesi, daha güven veren bir dijital yapı kurması
          ve müşterileriyle daha kontrollü çalışabilmesi için geliştirilmiş bir iş geliştirme ve
          dijital çözüm yapısıdır. Bizim için teknoloji, yalnızca araçtır; asıl hedef işletmenin
          dijitalde daha olgun, daha planlı ve daha sürdürülebilir hareket etmesidir.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {principles.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[15px]">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-orange-500/15 bg-orange-500/[0.07] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Yaklaşımımız
          </div>
          <p className="mt-4 text-base leading-8 text-white/74">
            Her işletmenin ihtiyacı aynı değildir. Bu yüzden hazır kalıplar sunmak yerine,
            işletmenin ölçeğine, ritmine ve hedeflerine uygun bir dijital yapı kurmayı tercih ederiz.
          </p>
          <p className="mt-4 text-base leading-8 text-white/74">
            Web sitesi, içerik dili, ürün yapısı ve müşteri süreci birlikte düşünüldüğünde,
            işletme yalnızca internette görünmüş olmaz; daha profesyonel, daha güvenilir ve daha
            kontrollü bir iş yapısına kavuşur.
          </p>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Ne Yapıyoruz
          </div>
          <div className="mt-4 space-y-4">
            {focusAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
              >
                <h3 className="text-lg font-bold text-white sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[15px]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-4xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Projelerimiz
        </div>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
          VektörHUB bünyesinde geliştirilen projeler, farklı sektörlerde dijital dönüşümü destekleyen
          uygulama ve platformlardan oluşur. Bu yapı; üretim teknolojilerinden haber platformlarına,
          mobil uygulamalardan dijital servis altyapılarına kadar uzanan daha geniş bir teknoloji
          ekosistemini kapsar.
        </p>
        <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
          Her proje bizim için yalnızca bir ürün değil, aynı zamanda doğru iş modeli, doğru anlatım
          ve sürdürülebilir dijital düzen fikrinin pratikteki karşılığıdır.
        </p>
      </div>
    </section>
  );
}
