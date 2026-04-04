import { Flame, GlassWater, Music4, Phone, Soup, Sparkles } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Restoran Demo Site",
  description: "Restoran için hazırlanmış, atmosferi ve menüyü daha cesur bir sahne düzeniyle sunan demo sayfası.",
  path: "/demo-siteler/restoran",
  keywords: ["restoran demo site", "örnek restoran sitesi", "menü sitesi", "rezervasyon web sitesi"],
});

const plates = [
  { title: "Odun Ateşinde Izgara", note: "Akşam servis favorisi" },
  { title: "Şefin Tadım Menüsü", note: "6 adımlı deneyim" },
  { title: "Bahçe Kahvaltısı", note: "Hafta sonu akışı" },
];

export default function RestoranDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Restoran", path: "/demo-siteler/restoran" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#513320] bg-[#120d0a] text-white shadow-[0_34px_100px_rgba(0,0,0,0.36)]">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#7e4319,transparent_28%),radial-gradient(circle_at_top_right,#d18a2e,transparent_22%),linear-gradient(135deg,#120d0a,#1d130d_45%,#29160e)] px-6 py-10 sm:px-10 sm:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffcb8b]/20 bg-[#ffb86a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd49f]">
            <Sparkles className="h-4 w-4" />
            Miras Sofra
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-[0.94] tracking-[-0.07em] text-[#fff2df] sm:text-5xl lg:text-[4.7rem]">
                Menü değil sahne.
                <span className="block text-[#ffb65d]">Lezzet değil deneyim.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#f3d8b4]/76 sm:text-lg">
                Restoran demosu düz kartlar ve klasik kahverengi bloklarla boğulmaz. İlk anda dumanı, ısıyı ve akşam
                servis enerjisini hissettirmeli. Bu sayfa o yüzden daha teatral.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className="rounded-full bg-[#ffb65d] px-6 py-3 text-sm font-semibold text-[#211208]">
                  Menüyü Keşfet
                </a>
                <a href="#rezervasyon" className="rounded-full border border-white/12 bg-white/8 px-6 py-3 text-sm font-semibold text-white">
                  Masa Ayırt
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#ffcf98]/72">İmza Alan</div>
                <div className="mt-3 text-3xl font-black text-[#fff1dd]">Teras</div>
                <p className="mt-3 text-sm leading-7 text-white/68">Canlı müzikli akşam kurgusu ve gün batımı deneyimi.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#ffb65d,#ff8c37)] p-5 text-[#2d180c]">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#6e3711]">Rezervasyon</div>
                <div className="mt-3 text-3xl font-black">45 sn</div>
                <p className="mt-3 text-sm leading-7 font-medium">Kararı bekletmeyen hızlı rezervasyon akışı.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-[#1d130d] p-5 sm:col-span-2">
                <div className="flex items-center gap-3 text-[#ffcf98]">
                  <Flame className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.22em]">Akşam Servisi Hissi</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  Fotoğraf olmasa bile ışık, kontrast, renk ısısı ve güçlü tipografiyle iştah açan bir dijital atmosfer kurulabilir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="menu" className="bg-[#f8e7cc] px-6 py-10 text-[#2d180c] sm:px-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9b5522]">Menü Kurgusu</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
                Bu sektör düz kutu istemez, sahne ışığı ister.
              </h2>
            </div>
            <div className="hidden rounded-full bg-[#2d180c] px-4 py-2 text-sm font-semibold text-[#ffd8a6] md:block">
              Akşam servisi canlı
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {plates.map((plate, index) => (
              <article
                key={plate.title}
                className={`rounded-[2.2rem] p-6 ${index === 1 ? "bg-[#2d180c] text-white" : "bg-[#fff6ea] text-[#2d180c]"}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/10 text-[#ffcf98]" : "bg-[#ffe1bd] text-[#a95b24]"}`}>
                  {index === 0 && <Soup className="h-5 w-5" />}
                  {index === 1 && <Flame className="h-5 w-5" />}
                  {index === 2 && <GlassWater className="h-5 w-5" />}
                </div>
                <h3 className="mt-6 text-2xl font-black">{plate.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-white/72" : "text-[#6d4d38]"}`}>{plate.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#1c120d] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffcf98]">Deneyim Katmanı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#fff1dd] sm:text-[2.8rem]">
              Yemek kadar ortam da satılmalı.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                "Mekan hissini ayrı blokta taşır",
                "İmza lezzetleri öne alır",
                "Rezervasyonu her karar anında görünür tutar",
                "Etkinlik ve canlı müzik akışını ayrı enerjiyle sunar",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="rezervasyon" className="bg-[linear-gradient(135deg,#29160e,#482412,#120d0a)] px-6 py-10 sm:px-10">
            <div className="rounded-[2.2rem] border border-[#ffbf77]/14 bg-black/20 p-6 backdrop-blur">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffcf98]">Rezervasyon Kutusu</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#fff1dd]">
                Burada kullanıcı arayıp masa ayırtmak istesin.
              </h2>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "Tarih / kişi sayısı"].map((field) => (
                  <div key={field} className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/72">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#ffb65d] px-4 py-3 text-sm font-semibold text-[#211208]">Rezervasyon Talebi Gönder</button>
                <div className="flex items-center gap-3 rounded-2xl bg-[#20120b] px-4 py-3 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4 text-[#ffcf98]" />
                  0533 385 05 72
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm font-medium text-[#ffcf98]">
                  <Music4 className="h-4 w-4" />
                  Canlı müzikli akşamlar için ayrı rezervasyon akışı
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
