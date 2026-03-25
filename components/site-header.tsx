"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, UserCircle2, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/misyon", label: "Misyon" },
  { href: "/vizyon", label: "Vizyon" },
  {
    href: "/hizmetler",
    label: "Hizmetler",
    children: [
      {
        href: "/hizmetler/dijital-gorunum-ve-kurumsal-duzen",
        label: "Dijital Görünüm ve Kurumsal Düzen",
      },
      {
        href: "/hizmetler/pratik-dijital-cozumler",
        label: "Pratik Dijital Çözümler",
      },
      {
        href: "/hizmetler/dijital-tanitim-ve-icerik-destegi",
        label: "Dijital Tanıtım ve İçerik Desteği",
      },
      {
        href: "/hizmetler/ihtiyaca-uygun-ozel-calismalar",
        label: "İhtiyaca Uygun Özel Çalışmalar",
      },
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
    // Route degisince mobil menuyu kapatip gecisin anlasilmasini saglar.
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">

      {/* İNCE ENERJİ ŞERİDİ - Kaldırıldı (talep üzerine) */}

      {/* NAVBAR */}
      <div
        className="relative overflow-hidden backdrop-blur-md"
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

          {/* LOGO */}
          <Link href="/" className="flex min-w-0 items-start gap-3 text-left lg:absolute lg:left-2 lg:top-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#07101d] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:h-16 sm:w-16 lg:h-24 lg:w-24">
              <img src="/logo.png" alt="VektörHUB" className="h-full w-full object-contain bg-transparent" />
            </div>

            <div className="min-w-0 pt-0.5 sm:pt-1 lg:pt-1">
              <div className="truncate text-[0.95rem] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[1.1rem] lg:text-base">
                Vektör<span className="text-[#ff6a00]">HUB</span>
              </div>
              <div className="mt-1 max-w-[9rem] text-[8px] leading-tight text-white/70 sm:max-w-none sm:text-[10px] lg:text-xs">
                İş Geliştirme • Dijital Çözümler
              </div>
            </div>
          </Link>

          {/* TOP MENU removed — moved to left sidebar */}

          {/* BUTTON */}
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
          className="header-login-glow absolute bottom-3 right-2 hidden md:flex items-center gap-1 rounded-lg bg-orange-500 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-orange-500/30 hover:scale-[1.03]"
        >
          <UserCircle2 className="h-3 w-3" />
          Müşteri Girişi
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(180deg,rgba(7,16,29,0)_0%,rgba(11,18,32,0.1)_22%,rgba(11,18,32,0.24)_44%,rgba(11,18,32,0.45)_66%,rgba(11,18,32,0.7)_84%,rgba(11,18,32,0.96)_100%)] sm:h-16 lg:h-20" />

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#07101d]/95 backdrop-blur-md">
          <div className="container-main flex flex-col gap-2 py-4">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/musteri-girisi"
              className="mt-2 flex justify-center items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white font-semibold"
            >
              <UserCircle2 className="w-4 h-4" />
              Müşteri Girişi
            </Link>

          </div>
        </div>
      )}

      {/* LEFT SIDEBAR (desktop) */}
      <aside
        className={`hidden lg:flex flex-col fixed left-2 w-32 bg-[#0b1624]/90 p-1.5 rounded-xl shadow-lg z-40 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-40"
        }`}
        style={{ overflow: "visible", top: "calc(120px + 8px)", bottom: "8px" }}
      >
        <div className="rounded-lg border border-white/10 bg-[#09131f]/95 p-1.5">
          <div className="mb-1 flex items-center justify-between">
            <div className="text-xs font-semibold text-white">Menü</div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[10px] text-orange-400"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? "‹" : ">"}
            </button>
          </div>

          <nav className="flex flex-col gap-0.5 px-0.5">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setHoveredMenu(item.href)}
                onMouseLeave={() => item.children && setHoveredMenu((current) => (current === item.href ? null : current))}
              >
                <div className="flex items-center justify-between gap-1">
                  <Link
                    href={item.href}
                    className="w-full rounded-md bg-white/3 px-1.5 py-1 text-[12px] text-left text-white/95 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <span className="rounded-md p-0.5 text-orange-400">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                {item.children && hoveredMenu === item.href && (
                  <div className="absolute left-full top-0 z-50 w-[13.5rem] pl-2">
                    <div className="absolute inset-y-0 left-0 w-2" />
                    <div className="rounded-xl border border-white/10 bg-[#0c1623]/96 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-md">
                      <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300">
                        Hizmetler
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.children.map((ch) => (
                          <Link
                            key={ch.href}
                            href={ch.href}
                            className="rounded-lg bg-white/3 px-2 py-2 text-[11px] leading-tight text-white/82 transition hover:bg-white/8 hover:text-white"
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

        <div className="mt-2.5 rounded-lg border border-white/10 bg-[#08111d]/95 p-1">
          <div className="mb-1 text-[9px] font-semibold capitalize text-white/85">
            {monthLabel}
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[8px] text-white/45">
            {weekDays.map((day) => (
              <div key={day} className="py-0">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-0.5 grid grid-cols-7 gap-0.5 text-center text-[8px]">
            {calendarDays.map((day, index) => {
              const isToday = day === today.getDate();

              return (
                <div
                  key={`${day ?? "empty"}-${index}`}
                  className={`flex h-4 items-center justify-center rounded-sm ${
                    day
                      ? isToday
                        ? "bg-orange-500 text-white"
                        : "bg-white/4 text-white/78"
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
          className="fixed left-2 z-40 hidden h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.04] lg:flex"
          style={{ top: "calc(120px + 16px)" }}
          aria-label="Menüyü tekrar göster"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

    </header>
  );
}
