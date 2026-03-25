const areas = [
  {
    title: "İlk İzlenim",
    description:
      "Web sitesi, sayfa düzeni ve genel sunum dili daha güven veren bir ilk temas kuracak şekilde toparlanır.",
  },
  {
    title: "İçerik Düzeni",
    description:
      "Hizmetlerin, ürünlerin ve temel marka anlatımının daha net anlaşılmasını sağlayan içerik akışı kurulur.",
  },
  {
    title: "Dijital Vitrin",
    description:
      "Görsel, metin ve sayfa hiyerarşisi daha derli toplu bir dijital görünüm üretecek şekilde sadeleştirilir.",
  },
];

export default function DijitalGorunumVeKurumsalDuzenPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#131b28] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.84), rgba(18,25,38,0.72)), url('/hizmet_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            İlk İzlenim ve Düzen
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.7rem]">
            Daha güven veren, daha anlaşılır ve daha derli toplu bir dijital görünüm.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            Küçük ve orta ölçekli işletmeler için dijital görünüm çoğu zaman ilk temas noktasıdır.
            Web sitesi, içerik düzeni ve genel sunum dili, firmanın nasıl algılandığını doğrudan
            etkiler.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Yaklaşımımız
        </div>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          VektörHUB bu alanda, işletmenin kendini daha temiz, daha profesyonel ve daha anlaşılır
          şekilde sunmasına yardımcı olur. Buradaki yaklaşımımız büyük ölçekli marka projeleri
          üretmekten çok, mevcut yapıyı daha güven veren bir seviyeye taşımaktır.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {areas.map((area) => (
          <article
            key={area.title}
            className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.16)]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Odak Alanı
            </div>
            <h2 className="mt-4 text-xl font-black leading-tight text-white">{area.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/68 sm:text-[15px]">{area.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 max-w-4xl rounded-[28px] border border-orange-500/15 bg-orange-500/[0.06] p-6 sm:p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
          Sonuç
        </div>
        <p className="mt-4 text-base leading-8 text-white/76 sm:text-lg">
          Amaç, abartılı bir kurumsal görünüm değil; işletmenin ölçeğine uygun, samimi ama düzenli
          bir dijital duruş kazandırmaktır.
        </p>
      </div>
    </section>
  );
}
