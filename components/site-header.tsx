"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, UserCircle2, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/misyon", label: "Misyon" },
  { href: "/vizyon", label: "Vizyon" },
  {
    href: "/hizmetler",
    label: "Hizmetler",
    children: [
      { href: "/hizmetler/web-sitesi-tasarimi", label: "Web Sitesi Tasarımı" },
      { href: "/hizmetler/google-seo-calismalari", label: "Google & SEO Çalışmaları" },
      { href: "/hizmetler/sosyal-medya-yonetimi", label: "Sosyal Medya Yönetimi" },
      { href: "/hizmetler/dijital-reklam-yonetimi", label: "Dijital Reklam Yönetimi" },
      { href: "/hizmetler/mobil-uygulama-gelistirme", label: "Mobil Uygulama Geliştirme" },
      { href: "/hizmetler/is-gelistirme-danismanligi", label: "İş Geliştirme Danışmanlığı" },
      { href: "/hizmetler/logo-tasarimi", label: "Logo Tasarımı" },
    ],
  },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/iletisim", label: "İletişim" },
];

const weekDays = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthLabel = new Intl.DateTimeFormat("tr-TR", {
    month: "long",
    year: "numeric",
  }).format(today);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();
  const calendarDays = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  useEffect(() => {
    document.body.dataset.leftSidebar = sidebarOpen ? "open" : "collapsed";
    window.dispatchEvent(
      new CustomEvent("left-sidebar-change", {
        detail: { open: sidebarOpen },
      })
    );

    return () => {
      delete document.body.dataset.leftSidebar;
    };
  }, [sidebarOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="relative overflow-hidden border-b border-white/8 backdrop-blur-md"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,16,29,0.55), rgba(7,16,29,0.55)), url('/header-flow.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container-main flex min-h-[92px] items-center justify-between gap-3 py-3 sm:min-h-[104px] sm:py-4 lg:min-h-[120px] lg:items-end lg:justify-end lg:gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 text-left lg:absolute lg:left-2 lg:top-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-1 shadow-[0_14px_34px_rgba(0,0,0,0.24)] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
              <img
                src="/logo.png"
                alt="VektörHUB"
                className="h-full w-full scale-[1.04] bg-transparent object-contain"
              />
            </div>

            <div className="min-w-0 pt-0.5">
              <div className="truncate text-[1.05rem] font-black leading-none tracking-[-0.04em] text-white sm:text-[1.2rem] lg:text-[1.35rem]">
                Vektör<span className="text-[#ff6a00]">HUB</span>
              </div>
              <div className="mt-1 text-[9px] leading-tight tracking-[0.08em] text-white/58 sm:text-[10px] lg:text-[10px]">
                İş Geliştirme • Dijital Çözümler
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3 self-center lg:items-end lg:self-end">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#08101c]/90 text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] lg:hidden"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <Link
          href="/musteri-girisi"
          className="header-login-glow absolute bottom-3 right-2 hidden isolate w-[9.6rem] items-center justify-center gap-2 overflow-hidden rounded-full border border-orange-300/30 bg-[linear-gradient(135deg,rgba(255,106,0,0.92),rgba(255,140,56,0.82))] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_16px_36px_rgba(255,106,0,0.32)] transition hover:scale-[1.02] hover:border-orange-200/40 hover:shadow-[0_18px_40px_rgba(255,106,0,0.4)] md:flex"
        >
          <span aria-hidden className="header-login-energy absolute inset-0 rounded-full" />
          <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-white/18 bg-white/14 text-white">
            <UserCircle2 className="h-3 w-3" />
          </span>
          <span className="relative z-10 tracking-[0.02em]">Müşteri Girişi</span>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(180deg,rgba(7,16,29,0)_0%,rgba(11,18,32,0.1)_22%,rgba(11,18,32,0.24)_44%,rgba(11,18,32,0.45)_66%,rgba(11,18,32,0.7)_84%,rgba(11,18,32,0.96)_100%)] sm:h-16 lg:h-20" />
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#07101d]/95 backdrop-blur-md lg:hidden">
          <div className="container-main flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl bg-white/5 px-4 py-3 text-white/90 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/musteri-girisi"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white"
            >
              <UserCircle2 className="h-4 w-4" />
              Müşteri Girişi
            </Link>
          </div>
        </div>
      )}

      <aside
        className={`fixed left-2 z-40 hidden w-[9.75rem] flex-col rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(11,22,36,0.94),rgba(8,17,29,0.98))] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out lg:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-40"
        }`}
        style={{ overflow: "visible", top: "calc(120px + 8px)", bottom: "8px" }}
      >
        <div className="rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,19,31,0.92),rgba(7,15,25,0.97))] p-2">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-300/90">
                Navigasyon
              </div>
              <div className="mt-1 text-[11px] font-medium text-white/58">Bölümler</div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-[10px] text-orange-300 transition hover:bg-white/[0.08]"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? "‹" : ">"}
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setHoveredMenu(item.href)}
                onMouseLeave={() =>
                  item.children &&
                  setHoveredMenu((current) => (current === item.href ? null : current))
                }
              >
                <div className="flex items-center justify-between gap-1.5">
                  <Link
                    href={item.href}
                    className={`w-full rounded-xl px-2.5 py-2 text-left text-[13px] leading-none transition ${
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                        ? "border border-white/10 bg-white/[0.08] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                        : "border border-transparent bg-transparent font-medium text-white/78 hover:bg-white/[0.045] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <span className="rounded-full bg-white/[0.04] p-1 text-orange-300">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                {item.children && hoveredMenu === item.href && (
                  <div className="absolute left-full top-0 z-50 w-[13.5rem] pl-2">
                    <div className="absolute inset-y-0 left-0 w-2" />
                    <div className="rounded-[1rem] border border-white/10 bg-[#0c1623]/96 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-md">
                      <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                        Hizmetler
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.children.map((ch) => (
                          <Link
                            key={ch.href}
                            href={ch.href}
                            className="rounded-xl bg-white/[0.03] px-2.5 py-2 text-[11px] leading-tight text-white/82 transition hover:bg-white/[0.08] hover:text-white"
                          >
                            {ch.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-3 rounded-[1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,17,29,0.96),rgba(7,14,23,0.98))] p-2">
          <div className="mb-2">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-orange-300/85">
              Takvim
            </div>
            <div className="mt-1 text-[10px] font-medium capitalize text-white/72">{monthLabel}</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[8px] text-white/34">
            {weekDays.map((day) => (
              <div key={day} className="py-0">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[8px]">
            {calendarDays.map((day, index) => {
              const isToday = day === today.getDate();

              return (
                <div
                  key={`${day ?? "empty"}-${index}`}
                  className={`flex h-4.5 items-center justify-center rounded-md ${
                    day
                      ? isToday
                        ? "bg-orange-500 text-white shadow-[0_6px_14px_rgba(255,106,0,0.28)]"
                        : "bg-white/[0.04] text-white/68"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  {day ?? "."}
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-2 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-orange-300/20 bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.04] lg:flex"
          style={{ top: "calc(120px + 16px)" }}
          aria-label="Menüyü tekrar göster"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </header>
  );
}
