import Link from "next/link";

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
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
              Proje Uygulaması
            </span>
            <Link
              href="/vektornews_privacy_policy"
              className="inline-flex items-center rounded-full border border-orange-300/40 bg-orange-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-orange-400"
            >
              Gizlilik Politikası
            </Link>
          </div>
          <div className="max-w-2xl">
            <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
              VektörNEWS, içerik ve haber akışını mobil deneyime taşıyan hafif ve okunabilir bir
              uygulama fikridir.
            </p>
          </div>
        </div>
      </div>

      <h1 className="section-title">VektörNEWS</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörNEWS, haber, duyuru ve içerik akışlarını daha mobil odaklı bir yapıda sunmak üzere
        geliştirilen uygulama projelerimizden biridir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Bu projede temel hedef, kullanıcıya yoğun ve karmaşık bir deneyim sunmak değil; içeriklerin
        daha rahat takip edilebildiği, daha sade ve daha akıcı bir mobil yapı ortaya koymaktır.
      </p>

      <div className="mt-8 max-w-3xl rounded-[30px] border border-orange-400/18 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_28%),linear-gradient(180deg,rgba(20,24,31,0.92),rgba(12,16,24,0.96))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
              Play Store
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">
              Uygulamayı doğrudan Google Play test bağlantısı üzerinden açın
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/68">
              VektörNEWS için mağaza geçişini sayfa içine premium bir indirme alanı olarak ekledik.
              Böylece uygulama bağlantısı daha güvenli ve görünür bir yerde duruyor.
            </p>
          </div>

          <a
            href="https://play.google.com/apps/internaltest/4700731647694572874"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-full items-center gap-3 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-4 py-3 shadow-[0_16px_34px_rgba(0,0,0,0.2)] transition hover:border-orange-300/30 hover:bg-white/[0.08] sm:min-w-[15rem] sm:w-auto"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                <path fill="#00D26A" d="M3.4 2.7 13.7 13 3.5 21.3c-.3-.3-.5-.8-.5-1.4V4.1c0-.6.2-1.1.4-1.4Z" />
                <path fill="#00A0FF" d="M13.7 13 16.9 9.8 20.8 12c1 .6 1 1.5 0 2l-3.9 2.2L13.7 13Z" />
                <path fill="#FFE000" d="M3.5 2.7 16.9 9.8 13.7 13 3.4 2.7h.1Z" />
                <path fill="#FF4B4B" d="M3.5 21.3 13.7 13l3.2 3.2-13.4 7.1h-.1Z" />
              </svg>
            </span>

            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Google Play'de
              </span>
              <span className="mt-1 block text-base font-black text-white group-hover:text-orange-100">
                Test Bağlantısını Aç
              </span>
            </span>
          </a>
        </div>
      </div>

      <h2 className="section-subtitle mt-8">Öne çıkan yaklaşım</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Mobilde okunabilir ve akıcı bir içerik deneyimi oluşturmak.</p>
        <p>Duyuru ve haber yapısını sade, düzenli ve hızlı takip edilir hale getirmek.</p>
        <p>Dijital içerik tarafında küçük ama etkili bir ürün mantığı kurmak.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        VektörNEWS de VektörHUB’un büyük iddialar yerine uygulanabilir ve ürünleşebilir dijital
        fikirler üretme çizgisini yansıtan projelerden biridir.
      </p>
    </section>
  );
}
