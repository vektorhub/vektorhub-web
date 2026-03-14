export default function DijitalGorunumVeKurumsalDuzenPage() {
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
            İlk İzlenim ve Düzen
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Daha güven veren, daha anlaşılır ve daha derli toplu bir dijital görünüm.
          </p>
        </div>
      </div>

      <h1 className="section-title">Dijital Görünüm ve Kurumsal Düzen</h1>
      <p className="section-text mt-6 max-w-3xl">
        Küçük ve orta ölçekli işletmeler için dijital görünüm çoğu zaman ilk temas
        noktasıdır. Web sitesi, içerik düzeni ve genel sunum dili; firmanın nasıl
        algılandığını doğrudan etkiler.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB bu alanda, işletmenin kendini daha temiz, daha profesyonel ve daha
        anlaşılır şekilde sunmasına yardımcı olur. Buradaki yaklaşımımız büyük ölçekli
        marka projeleri üretmekten çok, mevcut yapıyı daha güven veren bir seviyeye taşımaktır.
      </p>

      <h2 className="section-subtitle mt-8">Bu kapsamda neler yapılabilir</h2>
      <div className="page-body mt-4 max-w-3xl space-y-3 text-white/76">
        <p>Kurumsal web sitesi yapısının sadeleştirilmesi ve içerik akışının düzenlenmesi.</p>
        <p>İşletmenin sunduğu hizmetlerin daha net ve güven veren bir dille anlatılması.</p>
        <p>Görsel, metin ve sayfa düzeni tarafında daha derli toplu bir dijital vitrin kurulması.</p>
      </div>

      <p className="section-text mt-8 max-w-3xl">
        Amaç, abartılı bir kurumsal görünüm değil; işletmenin ölçeğine uygun, samimi ama
        düzenli bir dijital duruş kazandırmaktır.
      </p>
    </section>
  );
}