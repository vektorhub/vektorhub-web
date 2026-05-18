"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, MessageCircleMore, X } from "lucide-react";

const services = [
  { href: "/hizmetler/web-sitesi-tasarimi", label: "Web Sitesi" },
  { href: "/hizmetler/google-seo-calismalari", label: "Google & SEO" },
  { href: "/hizmetler/mobil-uygulama-gelistirme", label: "Özel Yazılım" },
  { href: "/hizmetler/ihtiyaca-uygun-ozel-calismalar", label: "Teknik Destek" },
];

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler", children: services },
  { href: "/demo-siteler", label: "Demo Siteler" },
  { href: "/ucretsiz-uygulamalar", label: "Araçlar" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/fiyat-listesi", label: "Fiyat Listesi" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isCustomerWorkspace =
    pathname.startsWith("/musteri/panel") || pathname.startsWith("/musteri/yeni-talep");
  const isAdminWorkspace = pathname.startsWith("/admin") && pathname !== "/admin/giris";
  const isWorkspaceMode = isCustomerWorkspace || isAdminWorkspace;

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isWorkspaceMode) {
    return (
      <header className="sticky top-0 z-50 border-b border-[#e4dbcf] bg-[#fffaf2]/95 backdrop-blur-xl">
        <div className="container-main flex min-h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="VektörHUB"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg border border-[#e4dbcf] bg-white object-contain"
            />
            <span className="text-sm font-black text-[#242424]">VektörHUB</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-[#6b665f]">
            Siteye dön
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4dbcf] bg-[#f7f4ee]/92 backdrop-blur-xl">
      <div className="container-main flex min-h-[72px] items-center justify-between gap-5">
        <Link href="/" className="flex min-w-[220px] items-center gap-3">
          <Image
            src="/logo.png"
            alt="VektörHUB"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-xl border border-[#e4dbcf] bg-white object-contain p-1"
          />
          <span className="min-w-0">
            <span className="block truncate text-lg font-black leading-none text-[#222]">
              Vektör<span className="text-[#f47a20]">HUB</span>
            </span>
            <span className="mt-1 block truncate text-xs font-medium text-[#746d64]">
              Web, SEO ve özel yazılım
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-bold whitespace-nowrap transition ${
                    isActive(pathname, item.href)
                      ? "bg-white text-[#222] shadow-sm"
                      : "text-[#5f5a53] hover:bg-white/72 hover:text-[#222]"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {servicesOpen ? (
                  <div className="absolute left-0 top-full w-56 pt-3">
                    <div className="rounded-xl border border-[#e4dbcf] bg-white p-2 shadow-[0_18px_50px_rgba(57,47,35,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#5f5a53] transition hover:bg-[#fff0e3] hover:text-[#222]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex h-10 items-center rounded-full px-3 text-sm font-bold whitespace-nowrap transition ${
                  isActive(pathname, item.href)
                    ? "bg-white text-[#222] shadow-sm"
                    : "text-[#5f5a53] hover:bg-white/72 hover:text-[#222]"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="https://wa.me/905333850572"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-[#d4ebe8] bg-[#f2fbfa] px-4 text-sm font-bold text-[#0f7777] transition hover:-translate-y-0.5"
          >
            <MessageCircleMore className="h-4 w-4" />
            WhatsApp
          </a>
          <Link
            href="/iletisim"
            className="inline-flex h-11 min-w-[90px] items-center justify-center whitespace-nowrap rounded-full bg-[#f47a20] px-5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(244,122,32,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e96d16]"
          >
            Teklif Al
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4dbcf] bg-white text-[#242424] lg:hidden"
          aria-label="Menüyü aç"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#e4dbcf] bg-[#f7f4ee] px-4 py-4 shadow-[0_24px_60px_rgba(57,47,35,0.12)] lg:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-bold ${
                  isActive(pathname, item.href) ? "bg-white text-[#222]" : "bg-[#fffaf2] text-[#5f5a53]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/905333850572"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl bg-[#e3f6f4] px-4 py-3 text-center text-base font-bold text-[#0f7777]"
            >
              WhatsApp ile görüş
            </a>
            <Link
              href="/iletisim"
              className="rounded-xl bg-[#f47a20] px-4 py-3 text-center text-base font-bold text-white"
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
