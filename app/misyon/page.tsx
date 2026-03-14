export default function MisyonPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#131b28] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.82), rgba(18,25,38,0.72)), url('/vizyon_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Stratejik Yaklaşım
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Teknolojiyi somut faydaya, fikri uygulanabilir sisteme dönüştüren bir misyon.
          </p>
        </div>
      </div>

      <h1 className="section-title">Misyon</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörHUB’un misyonu; işletmelerin büyümesini hızlandıran, süreçlerini
        modern teknolojiyle güçlendiren ve yeni fırsatlar yaratan stratejik
        dijital çözümler geliştirmektir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Her işletmenin ihtiyaçları farklıdır. Bu nedenle yaklaşımımız hazır
        kalıplar sunmak değil, işletmenin yapısını analiz ederek ona uygun
        ölçeklenebilir ve sürdürülebilir çözümler üretmektir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Geliştirdiğimiz projeler, platformlar ve dijital ürünler; işletmelerin
        daha verimli çalışmasını, yeni pazarlara ulaşmasını ve rekabet gücünü
        artırmasını hedefler.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB, teknoloji ile iş geliştirme disiplinlerini bir araya
        getirerek kurumlara yalnızca bir hizmet sağlayıcı olarak değil, uzun
        vadeli bir çözüm ve gelişim ortağı olarak katkı sunar.
      </p>
    </section>
  );
}
