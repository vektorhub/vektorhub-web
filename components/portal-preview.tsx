const portalItems = [
  "Teklif ve talep takibi",
  "Takvim ve randevu görünümü",
  "Dosya ve evrak paylaşımı",
  "Duyuru ve güncelleme alanı",
  "İş notları ve süreç takibi",
  "Müşteri özel erişim yapısı",
  "Hizmet görünümü ve yönlendirme",
  "Dijital ofis deneyimi",
];

export function PortalPreview() {
  return (
    <section className="container-main py-16 md:py-24">
      <div className="glass-card p-6 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
              Dijital Ofis Kurgusu
            </p>
            <h2 className="section-title mt-3">
              Web sitesi biter, çalışma alanı başlar.
            </h2>
            <p className="section-text mt-4">
              VektörHUB’un müşteri portalı, klasik bir giriş ekranından öte;
              işletmenin müşterisiyle daha düzenli çalışmasını sağlayan dijital
              ofis mantığıdır. Amaç, iletişim ve süreç takibini tek bir sade yapı içinde toplamaktır.
            </p>
            <p className="section-text mt-4">
              Böylece web sitesi vitrini kurar, portal ise ilişkinin çalıştığı alan haline gelir.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portalItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold leading-6 sm:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}