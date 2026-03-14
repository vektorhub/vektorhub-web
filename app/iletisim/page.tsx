export default function IletisimPage() {
  return (
    <section className="container-main page-content-template py-20">
      <h1 className="section-title">İletişim</h1>
      <div className="page-body mt-6 max-w-3xl space-y-4 text-white/75">
        <p>
          <span className="font-semibold text-white/92">Web sitesi:</span> www.vektorhub.com
        </p>
        <p>
          <span className="font-semibold text-white/92">Mail adresi:</span> info@vektorhub.com
        </p>
        <p>
          <span className="font-semibold text-white/92">Telefon:</span> +90 533 385 05 72
        </p>
      </div>

      <div className="mt-8 max-w-3xl rounded-3xl border border-orange-400/20 bg-[linear-gradient(135deg,rgba(255,106,0,0.18),rgba(255,138,51,0.12))] px-5 py-5 shadow-[0_18px_36px_rgba(255,106,0,0.12)]">
        <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-orange-200">
          Dijital Ofis
        </div>
        <p className="page-body mt-3 text-white/88">
          VektörHUB için web sitesi ve müşteri portalı, klasik bir ofisin dijital
          karşılığı gibi çalışır. İletişim, planlama, doküman paylaşımı, süreç
          takibi ve proje koordinasyonu bu yapı üzerinden düzenli ve erişilebilir
          şekilde yürütülür.
        </p>
      </div>
    </section>
  );
}

