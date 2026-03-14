"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const items = [
  {
    title: "VektörHUB fikri netleşti ve ilk mobil uygulama odaklı çalışma yapısı kuruldu.",
    date: "Tem 2025",
    content: [
      "Temmuz 2025 döneminde VektörHUB adı altında daha düzenli bir üretim fikri şekillenmeye başladı. İlk çıkış noktası, mobil uygulama geliştirme tarafında daha odaklı bir yapı kurmaktı.",
      "Bu aşamada amaç büyük bir yapı kurmaktan çok, ürün odaklı ve uygulanabilir dijital işler üretebilecek sağlam bir başlangıç yapmaktı.",
    ],
  },
  {
    title: "Mobil uygulama geliştirme tarafında ilk ürün ve ekran kurguları üzerinde çalışılmaya başlandı.",
    date: "Ağu 2025",
    content: [
      "Ağustos ayında mobil uygulama tarafında ilk ekran mantıkları, kullanıcı akışları ve basit ürün kurguları üzerinde çalışıldı.",
      "Bu dönem, VektörHUB'un ilk somut üretim düzenini oluşturan temel hazırlık aşaması oldu.",
    ],
  },
  {
    title: "Küçük işletmeler için dijital araçların daha erişilebilir hale gelmesi hedefi netleştirildi.",
    date: "Eyl 2025",
    content: [
      "Eylül 2025 itibarıyla yalnızca ürün geliştirmek değil, küçük ve orta ölçekli işletmelerin dijital araçlara daha rahat ulaşabilmesi de ana hedeflerden biri haline geldi.",
      "Bu fikir daha sonra hizmet yapısının temel yönünü belirleyen ana karar noktasına dönüştü.",
    ],
  },
  {
    title: "Mobil tarafın yanında web sitesi çözümleri de sunma fikri ilk kez planlamaya alındı.",
    date: "Eki 2025",
    content: [
      "Ekim ayında işletmelerin sadece mobil çözümlere değil, daha düzenli web görünümüne de ihtiyaç duyduğu daha net görüldü.",
      "Böylece mobil uygulamaların yanında web sitesi geliştirme ve dijital görünüm düzenleme fikri ilk kez planlı şekilde ele alındı.",
    ],
  },
  {
    title: "KOBİ'ler için bazen tek sayfa, bazen ihtiyaca göre daha gelişmiş site modelleri üzerine içerik üretildi.",
    date: "Kas 2025",
    content: [
      "Kasım ayında küçük işletmeler için tek tip çözüm yerine ihtiyaca göre değişen site yapıları üzerinde düşünülmeye başlandı.",
      "Bazı firmalar için tek sayfalık sade yapılar yeterli olurken, bazıları için daha gelişmiş ve çok bölümlü yapılar gerektiği netleşti.",
    ],
  },
  {
    title: "Dijital görünüm ile pratik iş geliştirme desteğini bir araya getiren daha geniş hizmet kurgusu oluşturuldu.",
    date: "Ara 2025",
    content: [
      "Aralık 2025 döneminde web sitesi desteği ile iş geliştirme bakışını aynı çatı altında buluşturan daha geniş bir hizmet kurgusu oluştu.",
      "Bu sayede yapılan iş yalnızca tasarım ya da yazılım değil, aynı zamanda işletmenin kendini daha doğru konumlandırmasına destek veren bir yapıya dönüştü.",
    ],
  },
  {
    title: "VektörHUB yapısının yalnızca proje bazlı değil, bir hizmet merkezi gibi çalışması yönünde karar alındı.",
    date: "Oca 2026",
    content: [
      "Ocak 2026 itibarıyla VektörHUB'un yalnızca tekil projeler üreten bir yapı olarak değil, daha düzenli bir hizmet merkezi olarak ilerlemesi gerektiğine karar verildi.",
      "Bu karar, daha sonra hizmet sayfalarının, içerik dilinin ve portal fikrinin temelini oluşturdu.",
    ],
  },
  {
    title: "VektörCNC mobil uygulama projesi tamamlandı ve ürünleşen ilk yapılardan biri haline geldi.",
    date: "Oca 2026",
    content: [
      "VektörCNC mobil uygulaması Ocak 2026 döneminde tamamlanan ilk net proje çıktılarından biri oldu.",
      "Bu proje, VektörHUB'un fikir aşamasından çıkarak çalışan ürünler geliştirebildiğini gösteren önemli adımlardan biri haline geldi.",
    ],
  },
  {
    title: "Kurumsal web sitesi ile müşteri portalını birlikte düşünen dijital ofis yaklaşımı netleşti.",
    date: "Şub 2026",
    content: [
      "Şubat 2026'da web sitesi ile müşteri portalını ayrı iki unsur olarak değil, birlikte çalışan dijital ofis yapısı olarak ele alma fikri netleşti.",
      "Bu yaklaşım, müşterinin sadece bilgi aldığı değil aynı zamanda işini takip ettiği bir düzen kurma hedefini öne çıkardı.",
    ],
  },
  {
    title: "Misyon, vizyon ve hizmet yapısı; küçük ve orta ölçekli işletmelere çözüm üretme odağıyla yeniden yazıldı.",
    date: "Şub 2026",
    content: [
      "Aynı dönemde markanın dili de yeniden ele alındı. Misyon, vizyon ve hizmet anlatımı daha büyük görünme çabasından çıkarılıp KOBİ odaklı gerçek bir çözüm yapısına göre yeniden yazıldı.",
      "Böylece VektörHUB'un tonu daha net, daha samimi ve daha gerçekçi bir çizgiye oturdu.",
    ],
  },
  {
    title: "VektörNEWS mobil uygulama projesi tamamlandı ve proje uygulamaları arasında yerini aldı.",
    date: "Mar 2026",
    content: [
      "Mart 2026 döneminde VektörNEWS mobil uygulaması tamamlandı ve proje uygulamaları arasında yerini aldı.",
      "Bu gelişme, VektörHUB'un farklı içerik ve kullanım alanlarına hitap eden ürünler oluşturabildiğini gösteren ikinci önemli proje oldu.",
    ],
  },
  {
    title: "Web sitesi, hizmet hub'ı mantığıyla geliştirilerek daha düzenli, daha kapsamlı ve daha yaşayan bir yapıya dönüştürüldü.",
    date: "Mar 2026",
    content: [
      "Mart ayı içinde web sitesi yalnızca kurumsal vitrin olmaktan çıkarılıp bir hizmet hub'ı mantığıyla yeniden düzenlendi.",
      "Sayfalar, hizmet yapısı, proje uygulamaları ve güncellemeler aynı çatı altında toplanarak daha yaşayan bir dijital yapı kuruldu.",
    ],
  },
  {
    title: "Mobil ve web çözümlerini aynı çatı altında toplayan daha net bir KOBİ destek modeli üzerinde ilerleniyor.",
    date: "Mar 2026",
    content: [
      "Bugün gelinen noktada VektörHUB, mobil uygulama geliştirme ile web çözümlerini tek çatı altında toplayan daha net bir KOBİ destek modeline doğru ilerliyor.",
      "Bu model, işletmelerin dijitalde ihtiyaç duyduğu desteği daha sade ve daha uygulanabilir şekilde sunmayı hedefliyor.",
    ],
  },
  {
    title: "VektörHUB, küçük ve orta ölçekli işletmeler için ölçülü ama güçlü dijital çözümler üretme yolculuğuna devam ediyor.",
    date: "Mar 2026",
    content: [
      "VektörHUB yolun başında olan ama yönü netleşmiş bir yapı olarak ilerlemeyi sürdürüyor.",
      "Amaç büyük görünmek değil; küçük ve orta ölçekli işletmeler için gerçekten kullanılan, güven veren ve düzen kuran dijital çözümler üretmek.",
    ],
  },
];

const projectApps = [
  {
    href: "/uygulamalar/vektorcnc",
    title: "VektörCNC",
    subtitle: "Mobil uygulama",
  },
  {
    href: "/uygulamalar/vektornews",
    title: "VektörNEWS",
    subtitle: "Mobil uygulama",
  },
];

export function AnnouncementBar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[number] | null>(null);
  const activeIndexRef = useRef(0);
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTokenRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const mobileListRef = useRef<HTMLDivElement | null>(null);
  const mobileAutoScrollTokenRef = useRef<number | null>(null);
  const mobileResumeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const syncViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    setSidebarVisible(document.body.dataset.leftSidebar !== "collapsed");

    const handleSidebarChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      setSidebarVisible(customEvent.detail.open);
    };

    window.addEventListener("left-sidebar-change", handleSidebarChange as EventListener);

    return () => {
      window.removeEventListener("left-sidebar-change", handleSidebarChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    const list = desktopListRef.current;

    if (!list || isMobile) {
      return;
    }

    const approxRowHeight = 53;
    let pausedByUser = false;

    const setPause = () => {
      pausedByUser = true;

      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }

      resumeTimeoutRef.current = window.setTimeout(() => {
        pausedByUser = false;
      }, 2600);
    };

    const handleWheel = () => {
      setPause();
    };

    const handleTouchStart = () => {
      setPause();
    };

    const handlePointerDown = () => {
      setPause();
    };

    list.addEventListener("wheel", handleWheel, { passive: true });
    list.addEventListener("touchstart", handleTouchStart, { passive: true });
    list.addEventListener("pointerdown", handlePointerDown);

    autoScrollTokenRef.current = window.setInterval(() => {
      if (pausedByUser) {
        return;
      }

      const maxScrollTop = list.scrollHeight - list.clientHeight;
      if (maxScrollTop <= 0) {
        return;
      }

      const nextScrollTop = list.scrollTop + approxRowHeight;

      if (nextScrollTop >= maxScrollTop - 4) {
        list.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      list.scrollTo({ top: nextScrollTop, behavior: "smooth" });
    }, 2300);

    return () => {
      list.removeEventListener("wheel", handleWheel);
      list.removeEventListener("touchstart", handleTouchStart);
      list.removeEventListener("pointerdown", handlePointerDown);

      if (autoScrollTokenRef.current) {
        window.clearInterval(autoScrollTokenRef.current);
        autoScrollTokenRef.current = null;
      }

      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const list = mobileListRef.current;

    if (!list || !isMobile || selectedItem) {
      return;
    }

    let pausedByUser = false;
    let programmaticScroll = false;

    const setPause = () => {
      pausedByUser = true;

      if (mobileResumeTimeoutRef.current) {
        window.clearTimeout(mobileResumeTimeoutRef.current);
      }

      mobileResumeTimeoutRef.current = window.setTimeout(() => {
        pausedByUser = false;
      }, 2600);
    };

    const getCards = () => list.querySelectorAll<HTMLButtonElement>("[data-update-index]");

    const syncActiveFromScroll = () => {
      if (programmaticScroll) {
        return;
      }

      const cards = getCards();
      if (cards.length === 0) {
        return;
      }

      const viewportCenter = list.scrollLeft + list.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        setActiveIndex(closestIndex);
      }
    };

    const handleWheel = () => {
      setPause();
    };

    const handleTouchStart = () => {
      setPause();
    };

    const handlePointerDown = () => {
      setPause();
    };

    const handleScroll = () => {
      setPause();
      syncActiveFromScroll();
    };

    list.addEventListener("wheel", handleWheel, { passive: true });
    list.addEventListener("touchstart", handleTouchStart, { passive: true });
    list.addEventListener("pointerdown", handlePointerDown);
    list.addEventListener("scroll", handleScroll, { passive: true });

    mobileAutoScrollTokenRef.current = window.setInterval(() => {
      if (pausedByUser) {
        return;
      }

      const cards = getCards();
      if (cards.length === 0) {
        return;
      }

      const nextIndex = (activeIndexRef.current + 1) % cards.length;
      const nextCard = cards[nextIndex];
      if (!nextCard) {
        return;
      }

      programmaticScroll = true;
      list.scrollTo({ left: Math.max(0, nextCard.offsetLeft - 4), behavior: "smooth" });
      setActiveIndex(nextIndex);

      window.setTimeout(() => {
        programmaticScroll = false;
      }, 420);
    }, 2400);

    return () => {
      list.removeEventListener("wheel", handleWheel);
      list.removeEventListener("touchstart", handleTouchStart);
      list.removeEventListener("pointerdown", handlePointerDown);
      list.removeEventListener("scroll", handleScroll);

      if (mobileAutoScrollTokenRef.current) {
        window.clearInterval(mobileAutoScrollTokenRef.current);
        mobileAutoScrollTokenRef.current = null;
      }

      if (mobileResumeTimeoutRef.current) {
        window.clearTimeout(mobileResumeTimeoutRef.current);
        mobileResumeTimeoutRef.current = null;
      }
    };
  }, [isMobile, selectedItem]);

  return (
    <>
      {/* Compact right-top announcement box for xl and up -> convert to fixed right sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed right-2 w-32 bg-[#181c22]/90 p-2 rounded-xl shadow-lg z-50 transition-all duration-300 ${
          sidebarVisible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[140%] opacity-0 pointer-events-none"
        }`}
        style={{ top: "calc(120px + 8px)", bottom: "8px" }}
      >
        <div
          className="rounded-lg border border-white/10 p-1.5"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(32,37,45,0.94), rgba(32,37,45,0.97)), url('/guncelleme_banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex w-fit rounded-md bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-orange-300">
                Güncellemeler...
              </span>
            </div>

            <div className="flex items-center gap-2" />
          </div>

          <div className="mt-2 rounded-md bg-white/[0.03] p-1">
            <div
              ref={desktopListRef}
              className="max-h-[13.25rem] overflow-y-auto pr-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item.title} className="min-h-[50px]">
                    <button
                      type="button"
                      className="flex min-h-[50px] w-full flex-col justify-center rounded-md bg-white/2 px-1.5 py-1 text-left text-[10px] leading-[1.15] text-white/80 transition hover:bg-orange-500/[0.08]"
                      title={item.title}
                      onClick={() => setSelectedItem(item)}
                    >
                      <span
                        className="block w-full overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {item.title}
                      </span>
                      <span className="mt-0.5 text-[8px] text-white/40">{item.date}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-[#20252d]/95 p-1.5">
          <div className="inline-flex rounded-md bg-orange-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-orange-300">
            Proje Uygulamaları
          </div>

          <div className="mt-2 flex flex-col gap-1.5">
            {projectApps.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-2 transition hover:border-orange-400/30 hover:bg-orange-500/[0.06]"
              >
                <div className="text-[10px] font-semibold leading-tight text-white/88">
                  {project.title}
                </div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/42">
                  {project.subtitle}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Fallback inline bar for smaller viewports (kept similar to previous) */}
      <div className="container-main mt-2 lg:hidden">
          <div className="mb-2 px-1">
            <span className="inline-flex w-fit rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-orange-200">
              Güncellemeler...
            </span>
          </div>
          <div
            ref={mobileListRef}
            className="-mx-1 overflow-x-auto px-1 pb-1 snap-x snap-mandatory scroll-px-1 overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-max gap-2">
              {items.map((item, index) => {
                const isActive = index === activeIndex % items.length;

                return (
                  <button
                    key={item.title}
                    data-update-index={index}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setSelectedItem(item);
                    }}
                    className={`w-[156px] shrink-0 snap-start rounded-2xl border px-3 py-2 text-left transition ${
                      isActive
                        ? "border-orange-400/70 bg-orange-500/12 text-white shadow-[0_8px_20px_rgba(255,106,0,0.15)]"
                        : "border-white/8 bg-white/[0.04] text-white/72"
                    }`}
                  >
                    <div className="w-full">
                      <p
                        className="text-[11px] font-medium leading-[1.25]"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </p>
                      <span className={`mt-1 block text-[9px] ${isActive ? "text-orange-100/80" : "text-white/38"}`}>
                        {item.date}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 px-1">
            <div className="mb-2 inline-flex w-fit rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-orange-200">
              Proje Uygulamaları
            </div>
            <div className="grid gap-2">
              {projectApps.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 transition hover:border-orange-400/30 hover:bg-orange-500/[0.08]"
                >
                  <div className="text-sm font-semibold text-white">{project.title}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/42">
                    {project.subtitle}
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07101d]/72 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-18rem)] xl:max-w-[calc(100%-22rem)]">
            <div className="max-h-[calc(100vh-2rem)] overflow-hidden rounded-[28px] border border-orange-400/35 bg-[#121821]/98 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
              <div
                className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(12,18,28,0.88), rgba(18,24,33,0.78)), url('/guncelleme_banner.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="min-w-0">
                  <div className="inline-flex rounded-md bg-orange-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-orange-300">
                    Güncellemeler...
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-tight text-white sm:text-xl">
                    {selectedItem.title}
                  </h3>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/38">
                    {selectedItem.date}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="shrink-0 rounded-xl border border-orange-400/25 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-200 transition hover:bg-orange-500/18"
                >
                  Kapat
                </button>
              </div>

              <div className="max-h-[calc(100vh-11rem)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <div className="space-y-4">
                  {selectedItem.content.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-white/76 sm:text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}