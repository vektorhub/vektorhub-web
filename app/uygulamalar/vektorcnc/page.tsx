import Link from "next/link";

export default function VektorCncPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#101926] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(16,20,34,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
              Proje Uygulaması
            </span>
            <Link
              href="/vektorcnc_privacy_policy"
              className="inline-flex items-center rounded-full border border-orange-300/40 bg-orange-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-orange-400"
            >
              Gizlilik Politikası
            </Link>
          </div>
          <div className="max-w-2xl">
            <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
              VektörCNC, üretim ve CNC odaklı akışları daha düzenli sunmak için geliştirilen mobil uygulama yapısıdır.
            </p>
          </div>
        </div>
      </div>

      <h1 className="section-title">VektörCNC</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörCNC, üretim tarafında çalışan yapılar için daha anlaşılır, daha erişilebilir ve daha düzenli bir dijital deneyim oluşturma fikriyle geliştirilen mobil uygulama projelerimizden biridir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Buradaki yaklaşım, büyük ve karmaşık sistemler kurmaktan çok; sahada veya atölyede ihtiyaç duyulan bilgilere daha hızlı ulaşılmasını sağlayan sade bir kullanım kurgusu oluşturmaktır.
      </p>

      <h2 className="section-subtitle mt-8">Öne çıkan yaklaşım</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Üretim odaklı yapıların dijitalde daha düzenli görünmesini sağlamak.</p>
        <p>Bilgi, akış ve kullanıcı deneyimini gereksiz karmaşıklık oluşturmadan sadeleştirmek.</p>
        <p>Mobil kullanım için daha pratik, erişilebilir ve anlaşılır bir yapı sunmak.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        VektörCNC, VektörHUB’un küçük ve orta ölçekli işletmeleri dijitalle tanıştırma yaklaşımının proje bazlı örneklerinden biridir.
      </p>
    </section>
  );
}