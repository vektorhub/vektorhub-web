import type { Metadata } from "next";
import type { ReactNode } from "react";

type SocialItem = {
  platform: string;
  note: string;
  status: string;
  href: string;
  icon: ReactNode;
  iconClassName: string;
};

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "VektörHUB iletişim bilgileri, dijital ofis yaklaşımı ve proje görüşmeleri için resmi erişim kanalları.",
  alternates: {
    canonical: "/iletisim",
  },
};

const contactItems = [
  {
    label: "Web sitesi",
    value: "www.vektorhub.com",
    href: "https://www.vektorhub.com",
  },
  {
    label: "Mail adresi",
    value: "info@vektorhub.com",
    href: "mailto:info@vektorhub.com",
  },
  {
    label: "Telefon",
    value: "+90 533 385 05 72",
    href: "tel:+905333850572",
  },
];

const socialItems: SocialItem[] = [
  {
    platform: "WhatsApp",
    note: "Hızlı yazışma ve ilk temas için doğrudan aynı numaraya bağlı hat",
    status: "Aktif",
    href: "https://wa.me/905333850572",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.3 4.8 5-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 .9c-.2 0-.5 0-.8-.3a6.6 6.6 0 0 1-2-2.4c-.2-.4 0-.6.2-.8l.4-.5c.1-.2.2-.3.3-.5l-.1-.5-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5 0-.8.3-.3.4-1 1-1 2.3s1 2.5 1 2.7c.2.2 2 3.2 5 4.3 2.9 1.1 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4Z" />
      </svg>
    ),
    iconClassName: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
  },
  {
    platform: "Instagram",
    note: "Güncel paylaşımlar ve kısa marka anlatıları için aktif profil",
    status: "Aktif",
    href: "https://www.instagram.com/vektorhubdijital",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.1" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
    iconClassName: "border-pink-400/30 bg-pink-500/15 text-pink-300",
  },
  {
    platform: "Facebook",
    note: "Kurumsal görünürlük ve paylaşımlar için resmi sayfa",
    status: "Aktif",
    href: "https://www.facebook.com/vektorhubdijital",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M13.4 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.5v3h2.6V21h3.3Z" />
      </svg>
    ),
    iconClassName: "border-sky-400/30 bg-sky-500/15 text-sky-300",
  },
  {
    platform: "Telegram",
    note: "Duyurular ve bağlantı odaklı iletişim için açık kanal",
    status: "Aktif",
    href: "https://t.me/vektorhubdijital",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="m19.8 5.1-15.2 5.9c-1 .4-1 1 .2 1.4l3.9 1.2 1.5 4.8c.2.6.1.8.8.8.5 0 .8-.2 1-.5l2.2-2.2 4.5 3.3c.8.5 1.5.3 1.7-.8l2.6-12.4c.3-1.3-.5-1.9-1.4-1.5Zm-8 9.8-.3 3.1-1.5-4.9 9.8-6.2-8 8Z" />
      </svg>
    ),
    iconClassName: "border-cyan-400/30 bg-cyan-500/15 text-cyan-300",
  },
];

export default function IletisimPage() {
  return (
    <section className="container-main page-content-template py-16 sm:py-20">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300 sm:text-xs">
          İletişim
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Görüşme, planlama ve
          <span className="brand-gradient block pt-2">dijital ofis iletişimi için buradayız.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
          VektörHUB ile yeni proje görüşmeleri, dijital yapı planlaması ve genel iletişim için
          aşağıdaki resmi kanalları kullanabilirsiniz. Amacımız hızlı görünmek değil; düzenli,
          net ve ulaşılabilir bir iletişim kurmaktır.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-orange-400/20 hover:bg-white/[0.05]"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              {item.label}
            </div>
            <div className="mt-4 break-words text-lg font-bold text-white">{item.value}</div>
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-orange-500/15 bg-orange-500/[0.07] p-6 sm:p-7">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Dijital Ofis
          </div>
          <p className="mt-4 text-base leading-8 text-white/74">
            VektörHUB için web sitesi ve müşteri portalı, klasik bir ofisin dijital karşılığı gibi
            çalışır. İletişim, planlama, doküman paylaşımı, süreç takibi ve proje koordinasyonu bu
            yapı üzerinden düzenli ve erişilebilir şekilde yürütülür.
          </p>
          <p className="mt-4 text-base leading-8 text-white/74">
            Bu nedenle bizim için iletişim yalnızca bir mesajlaşma kanalı değil; güven veren,
            sürdürülebilir bir çalışma düzeninin parçasıdır.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Sosyal Bağlantılar
          </div>
          <p className="mt-4 text-sm leading-7 text-white/64 sm:text-[15px]">
            Sosyal medya alanını da kurumsal iletişimin uzantısı olarak konumlandırıyoruz. Aktif
            profiller ve hızlı temas kanalları aşağıda doğrudan erişime açık durumda.
          </p>

          <div className="mt-5 space-y-3">
            {socialItems.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-orange-400/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-[11px] font-bold uppercase tracking-[0.18em] ${item.iconClassName}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">{item.platform}</div>
                      <div className="mt-1 text-sm leading-6 text-white/60">{item.note}</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/52">
                    {item.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
