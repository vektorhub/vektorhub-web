import { ArrowUpRight, MapPin, Phone, Square, Star } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Emlak Demo Site",
  description: "Emlak ofisi için hazırlanmış, daha cesur ve katmanlı portföy vitrini sunan örnek demo sayfası.",
  path: "/demo-siteler/emlak",
  keywords: ["emlak demo site", "emlak web sitesi örneği", "emlak portföy sitesi", "örnek emlak sitesi"],
});

const listings = [
  { title: "Sahil Çizgisine 2 Dakika", place: "Körfez / Yarımca", price: "4.850.000 TL", area: "145 m²" },
  { title: "Bahçe İçinde Sessiz Villa", place: "Başiskele", price: "11.400.000 TL", area: "280 m²" },
  { title: "Merkezde Kurumsal Ofis Katı", place: "İzmit Merkez", price: "68.000 TL / ay", area: "210 m²" },
];

export default function EmlakDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Emlak", path: "/demo-siteler/emlak" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#d9c39c]/30 bg-[#f6efdf] text-[#1e2630] shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#f7e5be,transparent_26%),radial-gradient(circle_at_top_right,#a67d46,transparent_28%),linear-gradient(135deg,#111722,#24303e_42%,#8d6c3f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="demo-spin-slow absolute right-[-5rem] top-[-5rem] h-48 w-48 rounded-full border border-white/10" />
          <div className="demo-float absolute right-[14%] top-[24%] h-28 w-28 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur" />

          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="inline-flex rounded-full border border-[#f3ddba]/16 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f3ddba]">
                Yıldız Emlak Ofisi
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.08em] sm:text-5xl lg:text-[5rem]">
                Portföy sayfası değil.
                <span className="block text-[#f1d8a7]">Dijital gayrimenkul sahnesi.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Emlak demosu sakin bir katalog gibi görünmemeli. İlanda geziyormuş hissi vermeli, fiyatı ve bölgeyi
                bir anda göstermeli, kullanıcıyı danışmana çekmeli. Bu yüzden daha katmanlı ve sinematik.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#portfoy" className="rounded-full bg-[#f1d8a7] px-6 py-3 text-sm font-semibold text-[#16202b]">
                  Portföyleri Aç
                </a>
                <a href="#iletisim" className="rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-semibold text-white">
                  Hızlı Temas
                </a>
              </div>
            </div>

            <div className="relative min-h-[340px]">
              <div className="demo-float absolute left-0 top-6 w-[68%] rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#f3ddba]">Öne Çıkan Portföy</div>
                <div className="mt-4 text-3xl font-black">3+1 Deniz Manzaralı</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/72">
                  <MapPin className="h-4 w-4 text-[#f3ddba]" />
                  Yarımca / Körfez
                </div>
                <div className="mt-6 text-2xl font-black text-[#f3ddba]">4.850.000 TL</div>
              </div>

              <div className="demo-float-delay absolute right-0 top-24 w-[58%] rounded-[2rem] bg-[#f7e4bc] p-5 text-[#1d2430] shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#87673d]">Bölge Vurgusu</div>
                <div className="mt-4 text-2xl font-black">Başiskele</div>
                <p className="mt-3 text-sm leading-7 text-[#5b6773]">Villa ve müstakil yaşam odaklı seçkin portföy sahası.</p>
              </div>

              <div className="absolute bottom-0 left-[10%] w-[62%] rounded-[2rem] border border-[#ccb283] bg-[#fff9ee] p-5 text-[#1e2630] shadow-[0_18px_42px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2 text-[#9a7b48]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5a6471]">
                  Bu yerleşim klasik kart sırası değil. Kullanıcıyı ilan, bölge ve güven arasında gezdiren katmanlı vitrin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="portfoy" className="bg-[#fbf7ef] px-6 py-10 sm:px-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b48]">Portföy Vitrini</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
                Satırlı katalog değil, hareketli portföy alanı.
              </h2>
            </div>
            <div className="hidden rounded-full bg-[#16202b] px-4 py-2 text-sm font-semibold text-[#f3ddba] md:block">
              Premium gayrimenkul akışı
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {listings.map((listing, index) => (
              <article
                key={listing.title}
                className={`rounded-[2.1rem] p-6 ${index === 1 ? "bg-[#16202b] text-white" : "bg-white text-[#1e2630]"}`}
                style={{ transform: index === 0 ? "translateY(20px)" : index === 2 ? "translateY(-12px)" : "none" }}
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 1 ? "bg-white/10 text-[#f3ddba]" : "bg-[#f5ead7] text-[#8f7046]"}`}>
                  Portföy
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight">{listing.title}</h3>
                <div className={`mt-4 flex items-center gap-2 text-sm ${index === 1 ? "text-white/72" : "text-[#5f6975]"}`}>
                  <MapPin className={`h-4 w-4 ${index === 1 ? "text-[#f3ddba]" : "text-[#9a7b48]"}`} />
                  {listing.place}
                </div>
                <div className={`mt-6 text-2xl font-black ${index === 1 ? "text-[#f3ddba]" : "text-[#16202b]"}`}>{listing.price}</div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/6 px-3 py-2 text-sm font-semibold">
                  <Square className="h-4 w-4" />
                  {listing.area}
                </div>
                <div className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${index === 1 ? "text-[#f3ddba]" : "text-[#8f7046]"}`}>
                  İlan Detayını Aç
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="iletisim" className="grid lg:grid-cols-[0.96fr_1.04fr]">
          <div className="bg-[#16202b] px-6 py-10 text-white sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3ddba]">Temas Katmanı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.8rem]">
              Kullanıcı burada danışmanın gerçekten ulaşılabilir olduğunu hissetmeli.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Emlakta temas alanı sonda gizlenmez. Fiyat ve bölge gördükten hemen sonra arama, form ve hızlı dönüş güveni görünür kalır.
            </p>
          </div>

          <div className="bg-[linear-gradient(135deg,#f7ecd8,#fffaf0)] px-6 py-10 sm:px-10">
            <div className="rounded-[2rem] border border-[#dcc39a] bg-white p-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b48]">Hızlı Talep</div>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "Aradığınız portföy tipi"].map((field) => (
                  <div key={field} className="rounded-2xl border border-[#ead7b5] bg-[#fbf7ef] px-4 py-3 text-sm text-[#5b6774]">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#b68844] px-4 py-3 text-sm font-semibold text-white">
                  Portföy Talebi Gönder
                </button>
                <a href="tel:+905333850572" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#182230] px-4 py-3 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4 text-[#f3ddba]" />
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
