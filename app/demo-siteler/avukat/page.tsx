import { ArrowRight, BriefcaseBusiness, Landmark, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Avukat Demo Site",
  description: "Hukuk bürosu için hazırlanmış, ciddi ama ezber bozan kurumsal vitrin örneği.",
  path: "/demo-siteler/avukat",
  keywords: ["avukat demo site", "hukuk bürosu sitesi", "örnek avukat web sitesi", "hukuk sitesi örneği"],
});

const pillars = [
  { title: "Aile Hukuku", desc: "Yüksek duygulu dosyaları sade ve güven veren anlatımla taşıyan blok.", icon: Scale },
  { title: "İcra ve Alacak", desc: "Süreç, tahsilat ve takip disiplinini öne alan hizmet katmanı.", icon: Landmark },
  { title: "Kurumsal Danışmanlık", desc: "Şirket tarafı için düzenli hukuk desteğini ayrı premium alan olarak sunar.", icon: BriefcaseBusiness },
];

export default function AvukatDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Avukat", path: "/demo-siteler/avukat" },
        ])}
      />

      <div className="overflow-hidden rounded-[36px] border border-[#2f3643] bg-[#0e1218] text-white shadow-[0_34px_100px_rgba(0,0,0,0.32)]">
        <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
          <div className="border-b border-white/8 bg-[linear-gradient(180deg,#0b0f15,#111925)] px-6 py-8 sm:px-10 lg:border-b-0 lg:border-r">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/18 bg-amber-300/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-100">
              <Sparkles className="h-4 w-4" />
              Yalçın Hukuk Bürosu
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.2rem]">
              Sessiz bir güç.
              <span className="block text-[#d6b17a]">Ciddi bir dijital duruş.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
              Avukat sitesi bağırmamalı. Ağırlığı, güveni ve kontrol hissini fazla açıklama yapmadan vermeli.
              Bu demo klasik hukuk sitesi değil; daha rafine ve daha seçici.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#uzmanliklar" className="rounded-full bg-[#d6b17a] px-6 py-3 text-sm font-semibold text-[#111723]">
                Uzmanlıkları Gör
              </a>
              <a href="#iletisim" className="rounded-full border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white">
                Ön Görüşme Talebi
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#2a3343,transparent_34%),linear-gradient(135deg,#131a24,#0f141d_48%,#171f2b)] px-6 py-8 sm:px-10">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-black text-[#f3ddba]">6</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/44">Uzmanlık Alanı</div>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-black text-[#f3ddba]">1 Gün</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/44">Ön Görüşme</div>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-black text-[#f3ddba]">42+</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/44">Kurumsal Müvekkil</div>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#d6b17a]/18 bg-[linear-gradient(180deg,rgba(214,177,122,0.14),rgba(214,177,122,0.04))] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3ddba]">Algı Kurgusu</div>
              <p className="mt-3 max-w-2xl text-base leading-8 text-white/74">
                Burada lüks ajans dili yok. Daha çok taş, metal ve koyu kumaş hissi var. Kullanıcı bunu gördüğünde
                hukuk hizmetinin ciddi, kontrollü ve derli toplu yürütüleceğini düşünmeli.
              </p>
            </div>
          </div>
        </div>

        <div id="uzmanliklar" className="bg-[#f5f0e8] px-6 py-10 text-[#1f2730] sm:px-10">
          <div className="max-w-4xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6842]">Uzmanlık Vitrini</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
              Düz liste yerine güçlü servis blokları.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {pillars.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`rounded-[2rem] border p-6 ${index === 1 ? "bg-[#1a212c] text-white" : "bg-white text-[#1f2730]"}`}
                  style={{ borderColor: index === 1 ? "rgba(255,255,255,0.08)" : "rgba(138,104,66,0.14)" }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/10 text-[#f3ddba]" : "bg-[#f5ebdc] text-[#8a6842]"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-white/74" : "text-[#58626f]"}`}>{item.desc}</p>
                  <div className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${index === 1 ? "text-[#f3ddba]" : "text-[#8a6842]"}`}>
                    Detayı Gör
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr]">
          <div className="bg-[#111723] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3ddba]">Güven Katmanı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-[2.8rem]">
              Hukuk bürosu sitesi gösterişli değil, ikna edici olmalı.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                "Uzmanlık alanlarını net ayırır",
                "Kurucu avukatı görünür kılar",
                "Ön görüşme akışını kolaylaştırır",
                "Müvekkilin aklındaki ilk soruları sade cevaplar",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f3ddba]" />
                  <p className="text-sm leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="iletisim" className="bg-[linear-gradient(135deg,#f5f0e8,#fbf8f4)] px-6 py-10 text-[#1f2730] sm:px-10">
            <div className="rounded-[2rem] border border-[#d9c8b0] bg-white p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6842]">Ön Görüşme Kutusu</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                Kullanıcı buradan sakin ve kontrollü biçimde başvuru yapar.
              </h2>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "İlgili hukuk alanı"].map((field) => (
                  <div key={field} className="rounded-2xl border border-[#e7d8c4] bg-[#faf7f1] px-4 py-3 text-sm text-[#55606b]">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#8a6842] px-4 py-3 text-sm font-semibold text-white">
                  Ön Görüşme Talebi Gönder
                </button>
                <a href="tel:+905333850572" className="inline-flex items-center justify-center rounded-2xl bg-[#1a212c] px-4 py-3 text-sm font-semibold text-white">
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
