export default function DijitalTanitimVeIcerikDestegiPage() {
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
            Daha Net Anlatım
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Markayı abartmadan, doğru ve güven veren bir dille anlatan dijital içerik desteği.
          </p>
        </div>
      </div>

      <h1 className="section-title">Dijital Tanıtım ve İçerik Desteği</h1>
      <p className="section-text mt-6 max-w-3xl">
        Birçok küçük ve orta ölçekli işletme iyi iş yapmasına rağmen bunu dijitalde yeterince net anlatamaz.
        Sorun çoğu zaman ürün ya da hizmette değil; anlatımın dağınık, düzensiz veya yetersiz kalmasındadır.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB, firmanın sunduğu değeri daha anlaşılır hale getiren içerik yapıları kurar.
        Böylece marka dijital ortamda daha net konuşur, daha güvenli görünür ve müşteriyle daha doğru temas kurar.
      </p>

      <h2 className="section-subtitle mt-8">Destek başlıkları</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Web sitesi metinlerinin, hizmet anlatımlarının ve temel içerik yapısının düzenlenmesi.</p>
        <p>Firmanın diliyle uyumlu, sade ama güven veren dijital tanıtım çerçevesinin oluşturulması.</p>
        <p>Müşterinin işletmeyi daha hızlı anlamasını sağlayan açık ve tutarlı içerik kurgusu.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        Bu hizmetin amacı büyük kampanyalar kurmak değil; işletmenin dijitalde daha anlaşılır,
        daha düzgün ve daha profesyonel bir şekilde görünmesini sağlamaktır.
      </p>
    </section>
  );
}