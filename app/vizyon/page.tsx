export default function VizyonPage() {
  const visionAreas = [
    {
      title: "Teknolojiyi daha erişilebilir hale getirmek",
      body:
        "Vizyonumuz, teknoloji ve dijital sistemleri yalnızca büyük yapılar için değil; küçük ve orta ölçekli işletmeler için de uygulanabilir ve sürdürülebilir hale getirmektir.",
    },
    {
      title: "Fikri çalışır modele dönüştürmek",
      body:
        "İyi fikirlerin yalnızca konuşulan değil, ürüne, hizmete ve işleyen sisteme dönüşebildiği bir üretim yapısı kurmak istiyoruz.",
    },
    {
      title: "Dijitalde olgun markalar üretmek",
      body:
        "İşletmelerin dijitalde daha güçlü görünmesi kadar, daha güven veren, daha planlı ve daha sürdürülebilir markalara dönüşmesi de vizyonumuzun parçasıdır.",
    },
  ];

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-10 overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(6,14,24,0.84), rgba(16,20,34,0.72)), url('/vizyon_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.26),transparent_35%),radial-gradient(circle_at_center_left,rgba(99,102,241,0.14),transparent_26%)]" />
        <div className="relative max-w-4xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
            Vizyon
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            Fikirlerin ürüne,
            <span className="brand-gradient block pt-2">teknolojinin gerçek değere dönüştüğü bir yapı kurmak.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            VektörHUB’un vizyonu; iş geliştirme, teknoloji ve dijital çözümleri bir araya getirerek
            farklı sektörlerde değer üreten, ölçeklenebilir ve yenilikçi bir dijital ekosistem oluşturmaktır.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {visionAreas.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/66 sm:text-[15px]">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-orange-500/15 bg-orange-500/[0.07] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Gelecek Perspektifi
          </div>
          <p className="mt-4 text-base leading-8 text-white/74">
            Amacımız yalnızca hizmet sunan bir yapı olmak değil; fikirlerin ürüne, projelerin
            sürdürülebilir iş modellerine ve teknolojinin gerçek ekonomik değere dönüşmesini sağlayan
            bir merkez haline gelmektir.
          </p>
          <p className="mt-4 text-base leading-8 text-white/74">
            Geleceğin iş dünyasında başarı; hız, veri, teknoloji ve doğru stratejinin birleşimiyle
            mümkün olacaktır. VektörHUB bu dönüşümün yalnızca parçası değil, yön veren aktörlerinden biri
            olmayı hedefler.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Hedeflediğimiz Yapı
          </div>
          <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
            Dijital platformlar, mobil teknolojiler, yazılım sistemleri ve yenilikçi projeler aracılığıyla
            ulusal ve uluslararası ölçekte büyüyen, teknoloji üreten ve farklı sektörlerde katma değer
            yaratan bir marka olmak temel vizyonumuzdur.
          </p>
          <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
            Bizim için vizyon yalnızca büyümek değildir; doğru sistemler kurarak, daha nitelikli işler
            üretmek ve işletmelerin dijitalde daha güçlü bir geleceğe hazırlanmasına katkı sunmaktır.
          </p>
        </div>
      </div>
    </section>
  );
}
