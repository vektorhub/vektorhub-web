export default function VektorNewsPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#131b28] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(18,25,38,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Proje Uygulaması
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            VektörNEWS, içerik ve haber akışını mobil deneyime taşıyan hafif ve okunabilir bir uygulama fikridir.
          </p>
        </div>
      </div>

      <h1 className="section-title">VektörNEWS</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörNEWS, haber, duyuru ve içerik akışlarını daha mobil odaklı bir yapıda sunmak üzere geliştirilen uygulama projelerimizden biridir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Bu projede temel hedef, kullanıcıya yoğun ve karmaşık bir deneyim sunmak değil; içeriklerin daha rahat takip edilebildiği, daha sade ve daha akıcı bir mobil yapı ortaya koymaktır.
      </p>

      <h2 className="section-subtitle mt-8">Öne çıkan yaklaşım</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Mobilde okunabilir ve akıcı bir içerik deneyimi oluşturmak.</p>
        <p>Duyuru ve haber yapısını sade, düzenli ve hızlı takip edilir hale getirmek.</p>
        <p>Dijital içerik tarafında küçük ama etkili bir ürün mantığı kurmak.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        VektörNEWS de VektörHUB’un büyük iddialar yerine uygulanabilir ve ürünleşebilir dijital fikirler üretme çizgisini yansıtan projelerden biridir.
      </p>
    </section>
  );
}