export default function IhtiyacaUygunOzelCalismalarPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#101926] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(16,20,34,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            Hazır Kalıp Değil
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            İşletmenin ölçüsüne uygun, kontrollü kapsamda ve gerçekten işe yarayan özel çalışmalar.
          </p>
        </div>
      </div>

      <h1 className="section-title">İhtiyaca Uygun Özel Çalışmalar</h1>
      <p className="section-text mt-6 max-w-3xl">
        Her işletmenin ihtiyacı aynı değildir. Bu nedenle her zaman hazır paketler yerine,
        işletmenin yapısına, imkanına ve önceliğine göre şekillenen daha özel çalışmalar gerekebilir.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB bu noktada büyük ve ağır projeler değil; ölçüsü belli, amacı net ve uygulanabilir
        kapsamda özel çözümler üretmeyi hedefler. Yani işin boyutundan çok, işletmeye gerçek katkı sağlaması önceliklidir.
      </p>

      <h2 className="section-subtitle mt-8">Nasıl ilerlenir</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Önce işletmenin ihtiyacı, mevcut düzeni ve ulaşmak istediği hedef netleştirilir.</p>
        <p>Ardından gereksiz yük oluşturmayan, ölçülü ve uygulanabilir bir çalışma planı hazırlanır.</p>
        <p>Çözüm, işletmenin kullanabileceği sadelikte ve sürdürülebilir düzeyde kurgulanır.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        Buradaki yaklaşımımız şudur: büyük görünmek için büyük işler vaat etmek değil,
        işletmenin gerçekten ihtiyacı olan doğru işi doğru ölçekte üretmek.
      </p>
    </section>
  );
}