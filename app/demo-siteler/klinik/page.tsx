import { CalendarClock, CheckCircle2, HeartPulse, Microscope, Sparkles, Stethoscope } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Klinik Demo Site",
  description: "Klinik ve sağlık merkezi için hazırlanmış, steril ama cesur görsel dil kullanan örnek demo sayfası.",
  path: "/demo-siteler/klinik",
  keywords: ["klinik demo site", "örnek klinik sitesi", "sağlık merkezi web sitesi", "randevu sitesi"],
});

const treatments = [
  { title: "Dermatoloji Muayenesi", detail: "Aynı gün ön değerlendirme", badge: "Muayene" },
  { title: "Medikal Cilt Protokolü", detail: "3 aşamalı plan", badge: "Bakım" },
  { title: "Lazer Epilasyon", detail: "Cihaz ve bölge seçimi", badge: "Lazer" },
];

const signals = [
  "Steril ve güven veren ilk izlenim",
  "Doktor ve ekip görünürlüğü",
  "Randevuyu geciktirmeyen CTA",
  "Tedavi başlıklarını sade gösteren akış",
];

export default function KlinikDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Klinik", path: "/demo-siteler/klinik" },
        ])}
      />

      <div className="overflow-hidden rounded-[36px] border border-emerald-100/60 bg-[#f4fffb] text-[#16353d] shadow-[0_28px_90px_rgba(10,72,64,0.14)]">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#d8fff1,transparent_34%),radial-gradient(circle_at_bottom_right,#c8f2ff,transparent_38%),linear-gradient(135deg,#effff8_0%,#dffaf1_48%,#eefcff_100%)] px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Nova Klinik
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.06em] text-[#13333b] sm:text-5xl lg:text-[4.4rem]">
              Soğuk değil steril.
              <span className="block text-[#1f8f80]">Sakin değil güçlü.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#40626b] sm:text-lg">
              Bu demo klasik doktor sitesi gibi değil. Daha tıbbi, daha çağdaş ve daha düzenli bir güven hissi
              veriyor. Randevu kararını öne çekmek için içerik değil akış tasarlanıyor.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#randevu"
                className="inline-flex items-center rounded-full bg-[#16353d] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(22,53,61,0.18)]"
              >
                Randevu Al
              </a>
              <a
                href="#tedaviler"
                className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-[#16353d]"
              >
                Tedavileri Gör
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-5 backdrop-blur">
                <div className="text-3xl font-black">4</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#6b7f86]">Uzman Doktor</div>
              </div>
              <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-5 backdrop-blur">
                <div className="text-3xl font-black">7</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#6b7f86]">Aktif Branş</div>
              </div>
              <div className="rounded-[1.6rem] border border-white/70 bg-white/70 p-5 backdrop-blur">
                <div className="text-3xl font-black">30 sn</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#6b7f86]">Randevu Akışı</div>
              </div>
            </div>
          </div>

          <div className="bg-[#13333b] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/80">Canlı Randevu Paneli</div>
                <div className="mt-2 text-2xl font-black">Bugün uygun saatler</div>
              </div>
              <CalendarClock className="h-8 w-8 text-emerald-200" />
            </div>

            <div className="mt-6 grid gap-3">
              {["10:30 Dermatoloji", "12:00 Cilt Analizi", "14:15 Lazer Görüşmesi", "16:40 Kontrol Randevusu"].map((slot) => (
                <div key={slot} className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4 text-sm font-medium text-white/86">
                  {slot}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.8rem] bg-[linear-gradient(135deg,#1da48e,#58d2b5)] p-5 text-[#103137]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em]">Algı Notu</div>
              <p className="mt-3 text-sm leading-7 font-medium">
                Klinik demoda beyaz duvar yetmez. Dijitalde steril hissi, teknoloji ve sakin güven aynı anda görünmeli.
              </p>
            </div>
          </div>
        </div>

        <div id="tedaviler" className="grid gap-6 bg-white px-6 py-10 sm:px-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Tedavi Vitrini</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#16353d] sm:text-[2.7rem]">
              Kullanıcı burada hizmet değil, iç rahatlatan düzen görüyor.
            </h2>
            <div className="mt-6 space-y-4">
              {signals.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-emerald-100 bg-[#f5fffb] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-7 text-[#3d5f67]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {treatments.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[2rem] border p-5 ${index === 1 ? "bg-[#16353d] text-white" : "bg-[linear-gradient(180deg,#ffffff,#f7fffc)] text-[#16353d]"}`}
                style={{ borderColor: index === 1 ? "rgba(22,53,61,0.1)" : "rgba(16,185,129,0.15)" }}
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 1 ? "bg-white/12 text-emerald-200" : "bg-emerald-50 text-emerald-700"}`}>
                  {item.badge}
                </div>
                <h3 className="mt-5 text-2xl font-black leading-tight">{item.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-white/74" : "text-[#59717a]"}`}>{item.detail}</p>
                <div className="mt-8 flex items-center gap-3">
                  {index === 0 && <Stethoscope className="h-5 w-5 text-emerald-600" />}
                  {index === 1 && <HeartPulse className="h-5 w-5 text-emerald-200" />}
                  {index === 2 && <Microscope className="h-5 w-5 text-emerald-600" />}
                  <span className={`text-sm font-semibold ${index === 1 ? "text-emerald-100" : "text-[#21464f]"}`}>Detayı Aç</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="randevu" className="bg-[linear-gradient(135deg,#12343c,#183f47,#0e2c35)] px-6 py-10 text-white sm:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">Randevu CTA</div>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.05em] sm:text-[2.8rem]">
                Klinik sayfasında arama değil güven ve hız birlikte çalışmalı.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                Bu blok daha klasik formları kırıyor. Sol tarafta güven, sağ tarafta hızlı veri bırakma akışı var.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
              <div className="grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "İlgilendiğiniz işlem"].map((field) => (
                  <div key={field} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/72">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[linear-gradient(135deg,#35d0ad,#7df3ce)] px-4 py-3 text-sm font-semibold text-[#10343a]">
                  Hızlı Randevu Talebi Gönder
                </button>
                <a
                  href="tel:+905333850572"
                  className="inline-flex items-center justify-center rounded-2xl border border-emerald-200/22 bg-[#0c2026] px-4 py-3 text-sm font-semibold text-white"
                >
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
