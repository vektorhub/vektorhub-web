const events = [
  {
    step: "01",
    title: "Tanışma ve ihtiyaç analizi",
    desc: "İşletmenin mevcut durumu, müşteri tipi ve öncelikli ihtiyacı netleştirilir.",
  },
  {
    step: "02",
    title: "Doğru alanın netleştirilmesi",
    desc: "Web, Google, sosyal medya, reklam ya da portal tarafında hangi alanın öne çıkacağı belirlenir.",
  },
  {
    step: "03",
    title: "Dijital yapı ve içerik kurulumu",
    desc: "Seçilen hizmet alanı kurulur, içerik düzeni hazırlanır ve iletişim dili netleştirilir.",
  },
  {
    step: "04",
    title: "Yayına alma ve düzenli kullanım",
    desc: "Kurulan yapı aktif hale getirilir; ardından takip, güncelleme ve kullanım düzeni oturtulur.",
  },
];

export function CalendarPreview() {
  return (
    <section className="container-main py-6 md:py-8">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Çalışma Ritmi</p>
          <h2 className="section-title mt-3">Nasıl ilerlediğimiz de en az tasarım kadar önemli.</h2>
          <p className="section-text mt-3">
            Küçük ve orta ölçekli işletmeler için değer, sadece sonuçta değil; sürecin ne kadar
            anlaşılır ve yönetilebilir olduğunda da ortaya çıkar. VektörHUB bu yüzden işleri adım adım,
            net ve yormayan bir akışla ilerletir.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8">
          <div className="pointer-events-none absolute bottom-0 left-[0.9rem] top-2 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] sm:left-[1.1rem]" />

          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.title} className="relative">
                <div className="absolute left-[-0.15rem] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-orange-400/28 bg-[#111a27] text-sm font-black text-orange-300 shadow-[0_8px_20px_rgba(255,106,0,0.14)] sm:left-[-0.05rem]">
                  {event.step}
                </div>

                <div className="pl-10 sm:pl-12">
                  <h3 className="text-2xl font-bold leading-tight text-white">{event.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/64 sm:text-[15px]">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
