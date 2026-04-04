import { BadgeCheck, Flower2, Phone, ScissorsLineDashed, Sparkles, WandSparkles } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Güzellik Merkezi Demo Site",
  description: "Güzellik merkezi için hazırlanmış, editorial ve premium vitrin hissi veren örnek demo sayfası.",
  path: "/demo-siteler/guzellik-merkezi",
  keywords: ["güzellik merkezi demo site", "örnek güzellik sitesi", "randevu sitesi", "bakım merkezi web sitesi"],
});

export default function GuzellikMerkeziDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Güzellik Merkezi", path: "/demo-siteler/guzellik-merkezi" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#efcfe0] bg-[#fff7fb] text-[#3b2230] shadow-[0_30px_90px_rgba(178,85,121,0.12)]">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,#ffd9e8,transparent_28%),linear-gradient(135deg,#fff7fb,#ffeef5_46%,#fffafb)] px-6 py-10 sm:px-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f2d8e5] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b25579]">
              <Flower2 className="h-4 w-4" />
              Luna Beauty Studio
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.07em] sm:text-5xl lg:text-[4.8rem]">
              Editorial bir hava.
              <span className="block text-[#b25579]">Premium bir randevu hissi.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#7b5968] sm:text-lg">
              Güzellik merkezi demo sayfası ucuz kampanya posteri gibi görünmemeli. Daha seçkin, daha estetik ve daha
              fotoğraf çekimine hazır bir dijital moda dili taşımalı.
            </p>
          </div>

          <div className="grid gap-4 bg-[#fff1f7] px-6 py-10 sm:px-10 md:grid-cols-2">
            <div className="rounded-[2rem] bg-[#3b2230] p-5 text-white">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#ffcde0]">Hızlı Randevu</div>
              <div className="mt-3 text-3xl font-black">1 dk</div>
              <p className="mt-4 text-sm leading-7 text-white/72">Kararı uzatmayan kısa form akışı.</p>
            </div>
            <div className="rounded-[2rem] bg-white p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#b25579]">İmza Hizmet</div>
              <div className="mt-3 text-3xl font-black">Hydrafacial</div>
              <p className="mt-4 text-sm leading-7 text-[#785967]">Bakım odaklı premium sunum kartı.</p>
            </div>
            <div className="rounded-[2rem] bg-white p-5 md:col-span-2">
              <div className="flex items-center gap-3 text-[#b25579]">
                <Sparkles className="h-5 w-5" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Algı Notu</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#6f5662]">
                Burada amaç fazla pembe olmak değil; rafine bir bakım markası gibi görünmek. Daha çok dergi sayfası estetiği,
                daha az standart kampanya sitesi.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 bg-white px-6 py-10 sm:px-10 lg:grid-cols-3">
          {[
            { title: "Cilt Protokolleri", icon: WandSparkles, text: "Katmanlı ama anlaşılır işlem sunumu" },
            { title: "Lazer Uygulamaları", icon: ScissorsLineDashed, text: "Daha teknik ama zarif anlatım" },
            { title: "Uzman Dokunuşu", icon: BadgeCheck, text: "Ekibi güven unsuru yapan editorial blok" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`rounded-[2rem] border p-6 ${index === 1 ? "bg-[linear-gradient(135deg,#b25579,#d67ca0)] text-white" : "bg-[#fff7fb] text-[#3b2230]"}`}
                style={{ borderColor: index === 1 ? "rgba(255,255,255,0.12)" : "rgba(242,216,229,1)" }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-white/14" : "bg-white"}`}>
                  <Icon className={`h-5 w-5 ${index === 1 ? "text-white" : "text-[#b25579]"}`} />
                </div>
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-white/76" : "text-[#6d5662]"}`}>{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[linear-gradient(135deg,#fff5fa,#ffeaf3)] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b25579]">Randevu Akışı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
              Zarif görünürken aksiyon da güçlü kalmalı.
            </h2>
            <div className="mt-6 space-y-4">
              {["İşlem seçilir", "Ön bilgi verilir", "Seans planlanır", "Takip süreci görünür tutulur"].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-[1.5rem] border border-[#f0d7e5] bg-white p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffe4ef] text-sm font-black text-[#b25579]">
                    0{index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-[#6b5561]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#3b2230] px-6 py-10 text-white sm:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffcde0]">Hızlı Form</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                Kullanıcı burada kendini butik bir merkeze yazıyor gibi hissetmeli.
              </h2>
              <div className="mt-6 grid gap-3">
                {["Ad Soyad", "Telefon Numarası", "İlgilendiğiniz işlem"].map((field) => (
                  <div key={field} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/70">
                    {field}
                  </div>
                ))}
                <button className="rounded-2xl bg-[#ffd6e6] px-4 py-3 text-sm font-semibold text-[#3b2230]">Randevu Talebi Gönder</button>
                <div className="flex items-center gap-3 rounded-2xl bg-[#281821] px-4 py-3 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4 text-[#ffcde0]" />
                  0533 385 05 72
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
