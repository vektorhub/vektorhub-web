const events = [
  { date: "01", title: "Tanışma ve ihtiyaç analizi" },
  { date: "02", title: "Doğru alanın netleştirilmesi" },
  { date: "03", title: "Dijital yapı ve içerik kurulumu" },
  { date: "04", title: "Yayına alma ve düzenli kullanım" },
];

export function CalendarPreview() {
  return (
    <section className="container-main py-6 md:py-8">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
            Çalışma Ritmi
          </p>
          <h2 className="section-title mt-3">Nasıl ilerlediğimiz de en az tasarım kadar önemli.</h2>
          <p className="section-text mt-3">
            Küçük ve orta ölçekli işletmeler için değer, sadece sonuçta değil;
            sürecin ne kadar anlaşılır ve yönetilebilir olduğunda da ortaya çıkar.
            VektörHUB bu yüzden işleri adım adım, net ve yormayan bir akışla ilerletir.
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="grid gap-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold sm:text-base">{event.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">Adım {event.date}</p>
                </div>

                <div className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
                  Kontrollü
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}