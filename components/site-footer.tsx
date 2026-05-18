import Link from "next/link";

const footerLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/demo-siteler", label: "Demo Siteler" },
  { href: "/fiyat-listesi", label: "Fiyat Listesi" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e4dbcf] bg-[#fffaf2] py-10 text-[#242424]">
      <div className="container-main grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h3 className="text-xl font-black">
            Vektör<span className="text-[#f47a20]">HUB</span>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#6b665f]">
            İşletmeler için web sitesi, Google görünürlüğü, özel yazılım ve teknik bakım hizmetleri.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#8a8177]">Sayfalar</h4>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-[#5f5a53]">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#f47a20]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#8a8177]">İletişim</h4>
          <div className="mt-3 space-y-2 text-sm font-semibold text-[#5f5a53]">
            <p>www.vektorhub.com</p>
            <p>info@vektorhub.com</p>
            <p>+90 533 385 05 72</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
