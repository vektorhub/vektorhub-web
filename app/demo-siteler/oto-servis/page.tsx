import { Gauge, MapPinned, Phone, Settings2, Shield, Wrench } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Oto Servis Demo Site",
  description: "Oto servis için hazırlanmış, daha teknik ve yüksek kontrastlı örnek demo sayfası.",
  path: "/demo-siteler/oto-servis",
  keywords: ["oto servis demo site", "servis web sitesi", "örnek oto servis sitesi", "bakım sitesi"],
});

export default function OtoServisDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Oto Servis", path: "/demo-siteler/oto-servis" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#1f2f3e] bg-[#0a1117] text-white shadow-[0_34px_100px_rgba(0,0,0,0.34)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[radial-gradient(circle_at_top_right,#ff8c2f,transparent_22%),linear-gradient(135deg,#0a1117,#12202c_46%,#0d1720)] px-6 py-10 sm:px-10">
            <div className="inline-flex rounded-full border border-[#ff9e49]/22 bg-[#ff8c2f]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffb468]">
              Atlas Oto Servis
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.94] tracking-[-0.07em] text-white sm:text-5xl lg:text-[4.7rem]">
              Temiz değil sert.
              <span className="block text-[#ff9f43]">Düz değil mekanik.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Oto servis demosu pırıl pırıl kurumsal kartlarla bitmemeli. Daha çok atölye ritmi, teknik netlik ve
              hızlı iletişim hissi taşımalı. Kullanıcı sorununu çözecek yeri arıyor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#servisler" className="rounded-full bg-[#ff8c2f] px-6 py-3 text-sm font-semibold text-[#111820]">
                Servisleri Gör
              </a>
              <a href="#kayit" className="rounded-full border border-white/12 bg-white/7 px-6 py-3 text-sm font-semibold text-white">
                Hızlı Servis Kaydı
              </a>
            </div>
          </div>

          <div className="grid gap-4 bg-[#0f1821] px-6 py-10 sm:px-10 md:grid-cols-2">
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#ffb468]/80">Araç Kabul</div>
              <div className="mt-3 text-3xl font-black text-white">Aynı Gün</div>
            </div>
            <div className="rounded-[2rem] border border-[#ff8c2f]/18 bg-[linear-gradient(135deg,#ff8c2f,#ffb246)] p-5 text-[#1a2027]">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#6b3d0e]">Marka Desteği</div>
              <div className="mt-3 text-3xl font-black">12+</div>
            </div>
            <div className="rounded-[2rem] border border-white/8 bg-white/5 p-5 md:col-span-2">
              <div className="flex items-center gap-3 text-[#ffb468]">
                <Gauge className="h-5 w-5" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Teknik Hız</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Bu vitrin daha endüstriyel duruyor. Çünkü servis kullanıcıları yumuşak marka hikayesi değil, net çözüm ve güçlü temas arıyor.
              </p>
            </div>
          </div>
        </div>

        <div id="servisler" className="bg-[#f4f7fa] px-6 py-10 text-[#17222d] sm:px-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c56c18]">Servis Kurgusu</div>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
            Burada kullanıcı problemiyle eşleşen hizmeti anında bulmalı.
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              { title: "Periyodik Bakım", icon: Wrench, text: "Standart bakım işlerini sade paket bloklarında taşır." },
              { title: "Arıza Tespiti", icon: Settings2, text: "Bilgisayarlı test akışını teknik ama anlaşılır gösterir." },
              { title: "Güvenlik Kontrolü", icon: Shield, text: "Fren, balata ve mekanik güven alanlarını ayrı vurgular." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`rounded-[2rem] p-6 ${index === 1 ? "bg-[#15222d] text-white" : "bg-white text-[#17222d]"}`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/10 text-[#ffb468]" : "bg-[#fff0e2] text-[#c56c18]"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-white/72" : "text-[#5f6973]"}`}>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
          <div className="bg-[#121d27] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb468]">Neden Çalışır</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-[2.8rem]">
              Kullanıcı burada atölye netliği hissediyor.
            </h2>
            <div className="mt-6 space-y-4">
              {["Hizmet başlıkları nettir", "Telefon ve konum görünürdür", "Marka bağımsız güven verir", "Hızlı kayıt eşiğini düşürür"].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="kayit" className="bg-[linear-gradient(135deg,#f4f7fa,#eaf0f5)] px-6 py-10 text-[#17222d] sm:px-10">
            <div className="rounded-[2rem] border border-[#d5dee8] bg-white p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c56c18]">Servis Kaydı</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                Telefon, araç bilgisi ve konum tek ekranda görünmeli.
              </h2>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "Araç marka / model"].map((field) => (
                  <div key={field} className="rounded-2xl border border-[#e0e8f0] bg-[#f8fbfd] px-4 py-3 text-sm text-[#5f6973]">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#ff8c2f] px-4 py-3 text-sm font-semibold text-[#10171f]">
                  Servis Kaydı Oluştur
                </button>
                <div className="flex items-center gap-3 rounded-2xl bg-[#121d27] px-4 py-3 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4 text-[#ffb468]" />
                  0533 385 05 72
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#fff2e4] px-4 py-3 text-sm font-medium text-[#9c5716]">
                  <MapPinned className="h-4 w-4" />
                  İzmit Sanayi / Körfez / Başiskele servis ağı
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
