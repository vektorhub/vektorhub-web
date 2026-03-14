const posts = [
  {
    title: "İlk bakışta daha düzenli bir dijital görünüm",
    tag: "İlk İzlenim",
    desc: "Ziyaretçi, dağınık bir yapı yerine daha net anlatılmış bir işletmeyle karşılaşır.",
  },
  {
    title: "Hizmetlerini daha anlaşılır anlatan sayfa yapısı",
    tag: "Net Anlatım",
    desc: "Ne sunduğunu açık gösteren bir yapı, müşterinin güvenini daha hızlı kazanır.",
  },
  {
    title: "Müşteriyle daha profesyonel dijital temas",
    tag: "Güven",
    desc: "İletişim, teklif ve süreç takibi dijitalde daha kontrollü ilerler.",
  },
  {
    title: "Günlük işi yormayan pratik dijital araçlar",
    tag: "Kolaylık",
    desc: "Ağır sistemler yerine işletmenin gerçekten kullanacağı basit çözümler öne çıkar.",
  },
  {
    title: "Web sitesi ile portalın birlikte çalışan kurgusu",
    tag: "Dijital Ofis",
    desc: "Kurumsal görünüm ile müşteri deneyimi aynı çizgide ilerler.",
  },
  {
    title: "Yolun başındaki işletmeye ağır gelmeyen bir yapı",
    tag: "Ölçülü Büyüme",
    desc: "Amaç büyük görünmek değil, doğru bir dijital temel oluşturmaktır.",
  },
];

export function InstagramFlow() {
  return (
    <section className="container-main py-16 md:py-24">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
          Neden Etkili
        </p>
        <h2 className="section-title mt-3">
          Premium görünüm sadece tasarımla değil, doğru kurguyla gelir.
        </h2>
        <p className="section-text mt-4">
          VektörHUB’un önerdiği yapı; küçük işletmeyi büyük bir kurum gibi
          göstermeye çalışmaz. Onu daha net, daha güvenli ve daha düzenli gösterir.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => (
          <article key={post.title} className="glass-card overflow-hidden">
            <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,rgba(255,106,0,0.3),rgba(255,255,255,0.02),rgba(59,130,246,0.18))]">
              <div className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                #{index + 1}
              </div>
            </div>

            <div className="p-5">
              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300">
                {post.tag}
              </span>

              <h3 className="mt-4 text-lg font-bold leading-7">{post.title}</h3>

              <p className="mt-3 text-sm leading-7 text-white/65">
                {post.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}