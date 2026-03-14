export default function VizyonPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#111827] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(6,14,24,0.82), rgba(16,20,34,0.7)), url('/vizyon_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.26),transparent_35%),radial-gradient(circle_at_center_left,rgba(99,102,241,0.14),transparent_26%)]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
            Gelecek Perspektifi
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Büyüyen, teknoloji üreten ve farklı sektörlerde etki yaratan bir ekosistem vizyonu.
          </p>
        </div>
      </div>

      <h1 className="section-title">Vizyon</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörHUB’un vizyonu; iş geliştirme, teknoloji ve dijital çözümleri bir
        araya getirerek farklı sektörlerde değer üreten yenilikçi bir dijital
        ekosistem oluşturmaktır.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Amacımız yalnızca hizmet sunan bir yapı olmak değil; fikirlerin ürüne,
        projelerin sürdürülebilir iş modellerine ve teknolojinin gerçek ekonomik
        değere dönüşmesini sağlayan bir merkez haline gelmektir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Geleceğin iş dünyasında başarı; hız, veri, teknoloji ve doğru
        stratejinin birleşimiyle mümkün olacaktır. VektörHUB bu dönüşümün bir
        parçası değil, yön veren aktörlerinden biri olmayı hedefler.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Dijital platformlar, mobil teknolojiler, yazılım sistemleri ve
        yenilikçi projeler aracılığıyla ulusal ve uluslararası ölçekte büyüyen,
        teknoloji üreten ve farklı sektörlerde katma değer yaratan bir marka
        olmak temel vizyonumuzdur.
      </p>
    </section>
  );
}
