export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-main grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">VektörHUB</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Endüstriyel tasarım, üretim ve danışmanlık süreçlerini tek merkezde
            yöneten modern kurumsal yapı.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
            İletişim
          </h4>
          <div className="mt-3 space-y-2 text-sm text-white/75">
            <p>www.vektorhub.com</p>
            <p>info@vektorhub.com</p>
            <p>vektorlabtech@gmail.com</p>
            <p>+90 533 385 05 72</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">
            Portal
          </h4>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Doğrulanmış müşteriler için teklif, hizmet paketi, evrak, takvim,
            notlar ve süreç takibi tek panelde.
          </p>
        </div>
      </div>
    </footer>
  );
}
