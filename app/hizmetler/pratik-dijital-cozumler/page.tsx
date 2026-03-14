export default function PratikDijitalCozumlerPage() {
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
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Günlük İşi Kolaylaştıran Yapılar
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Karmaşık sistemler yerine günlük işi rahatlatan sade dijital çözümler.
          </p>
        </div>
      </div>

      <h1 className="section-title">Pratik Dijital Çözümler</h1>
      <p className="section-text mt-6 max-w-3xl">
        Her işletmenin büyük yazılım projelerine ihtiyacı yoktur. Çoğu zaman asıl ihtiyaç,
        günlük iş akışını toparlayan, iletişimi kolaylaştıran ve takibi daha düzenli hale getiren
        küçük ama etkili dijital çözümlerdir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB bu noktada, işletmenin yapısına uygun pratik çözümler kurgular. Amaç,
        gereksiz karmaşıklık üretmek değil; gerçekten kullanılan ve işi kolaylaştıran bir yapı kurmaktır.
      </p>

      <h2 className="section-subtitle mt-8">Örnek destek alanları</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Basit müşteri takip alanları, bilgi formları ve iletişim akışlarının dijitalleştirilmesi.</p>
        <p>Teklif, talep veya başvuru süreçlerini kolaylaştıran küçük ölçekli dijital araçlar.</p>
        <p>İşletmenin ihtiyaç duyduğu temel operasyonları daha düzenli yürütecek yardımcı sistemler.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        Yani burada hedef, büyük bir teknoloji yatırımı değil; küçük işletmenin elini güçlendiren,
        hemen kullanılabilir ve sürdürülebilir çözümler üretmektir.
      </p>
    </section>
  );
}