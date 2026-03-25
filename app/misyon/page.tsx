export default function MisyonPage() {
  const pillars = [
    {
      title: "İşe yarayan dijital düzen",
      body:
        "Misyonumuz, işletmeler için gösterişli ama boş yapılar kurmak değil; gerçekten kullanılan, güven veren ve işi kolaylaştıran dijital sistemler oluşturmaktır.",
    },
    {
      title: "İşletmeye uygun çözüm ölçeği",
      body:
        "Her işletmenin ihtiyacı farklıdır. Bu yüzden hazır kalıplar sunmak yerine, işletmenin ritmine ve hedeflerine uygun ölçekte çözümler geliştiririz.",
    },
    {
      title: "Uzun vadeli gelişim odağı",
      body:
        "VektörHUB, yalnızca teslim eden bir yapı değil; işletmenin dijitalde daha planlı, daha kontrollü ve daha olgun ilerlemesine eşlik eden bir iş ortağıdır.",
    },
  ];

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-10 overflow-hidden rounded-[30px] border border-white/10 bg-[#131b28] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(18,25,38,0.74)), url('/vizyon_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-4xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Misyon
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            Teknolojiyi somut faydaya,
            <span className="brand-gradient block pt-2">fikri uygulanabilir sisteme dönüştürmek.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
            VektörHUB’un misyonu; işletmelerin büyümesini hızlandıran, süreçlerini modern
            teknolojiyle güçlendiren ve daha net bir dijital yapı kurmasını sağlayan çözümler üretmektir.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pillars.map((item) => (
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
            Çalışma Modeli
          </div>
          <p className="mt-4 text-base leading-8 text-white/74">
            Yaklaşımımız hazır kalıplar sunmak değildir. Önce işletmenin yapısını, ihtiyaçlarını ve
            hedeflediği ilerleme alanını anlamaya çalışırız. Sonrasında buna uygun, sürdürülebilir
            ve uygulanabilir bir yapı kurarız.
          </p>
          <p className="mt-4 text-base leading-8 text-white/74">
            Böylece kurulan sistem yalnızca bugünün ihtiyacını karşılamaz; işletmenin yarın daha
            güvenli, daha görünür ve daha kontrollü hareket edebilmesi için de temel oluşturur.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Bizim İçin Misyon
          </div>
          <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
            Misyon, yalnızca iyi görünen işler üretmek değildir. Bizim için misyon; işletmenin daha
            verimli çalışmasına, müşterisiyle daha güçlü ilişki kurmasına ve dijitalde daha olgun bir
            yapı haline gelmesine katkı sunmaktır.
          </p>
          <p className="mt-4 text-base leading-8 text-white/72 sm:text-lg">
            Bu yüzden VektörHUB, teknoloji ile iş geliştirme disiplinlerini bir araya getirerek
            kurumlara yalnızca hizmet sağlayıcısı olarak değil, çözüm ve gelişim ortağı olarak yaklaşır.
          </p>
        </div>
      </div>
    </section>
  );
}
