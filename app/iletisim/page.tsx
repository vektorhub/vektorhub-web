import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ExternalLink, MapPin, Navigation } from "lucide-react";

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
    "VektörHUB iletişim bilgileri, ofis adresi, harita yönlendirmeleri ve resmi erişim kanalları.",
  alternates: {
    canonical: "/iletisim",
  },
};

const officeAddress = "Hacıosman Mahallesi, Bağdat Caddesi, No: 270/A Körfez / KOCAELİ";
const encodedAddress = encodeURIComponent(officeAddress);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

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
  {
    label: "Adres",
    value: officeAddress,
    href: mapsUrl,
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
    iconClassName: "border-[#9ed9d1] bg-[#f2fbfa] text-[#0f7777]",
  },
  {
    platform: "Instagram",
    note: "Güncel paylaşımlar ve kısa marka içerikleri için aktif profil",
    status: "Aktif",
    href: "https://www.instagram.com/vektorhubdijital",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.1" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
    iconClassName: "border-[#f7c5dc] bg-[#fff3f8] text-[#b83f76]",
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
    iconClassName: "border-[#b7dbe8] bg-[#f3fbff] text-[#26708c]",
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
    iconClassName: "border-[#9ed9d1] bg-[#f2fbfa] text-[#0f7777]",
  },
];

export default function IletisimPage() {
  return (
    <section className="container-main page-content-template py-14 sm:py-18">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full border border-[#f4b37f] bg-white/76 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c95f14] sm:text-xs">
          İletişim
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#242424] sm:text-5xl lg:text-6xl">
          Proje görüşmesi ve kurumsal iletişim kanalları.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f5a53] sm:text-lg">
          Web sitesi, Google görünürlüğü, teknik bakım ve özel yazılım ihtiyaçları için resmi iletişim
          bilgileri aşağıda yer alır.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label === "Adres" || item.label === "Web sitesi" ? "_blank" : undefined}
            rel={item.label === "Adres" || item.label === "Web sitesi" ? "noreferrer" : undefined}
            className="rounded-[1.5rem] border border-[#e4dbcf] bg-[#fffaf2] p-5 shadow-[0_16px_34px_rgba(57,47,35,0.06)] transition hover:border-[#f4b37f] hover:bg-white"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c95f14]">
              {item.label}
            </div>
            <div className="mt-4 break-words text-base font-bold leading-7 text-[#242424]">{item.value}</div>
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-[#e4dbcf] bg-[linear-gradient(135deg,#fffaf2,#f2fbfa)] p-6 shadow-[0_20px_50px_rgba(57,47,35,0.08)] sm:p-7">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0f7777]">
            <MapPin className="h-4 w-4" />
            Ofis Adresi
          </div>
          <p className="mt-4 text-2xl font-black leading-tight text-[#242424]">{officeAddress}</p>
          <p className="mt-4 text-base leading-8 text-[#5f5a53]">
            Ziyaret ve yüz yüze görüşme planı için önceden randevu alınması önerilir.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f47a20] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(244,122,32,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e96d16]"
            >
              <MapPin className="h-4 w-4" />
              Haritada Aç
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d4ebe8] bg-[#f2fbfa] px-5 py-3 text-sm font-bold text-[#0f7777] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Navigation className="h-4 w-4" />
              Yol Tarifi
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e4dbcf] bg-[#fffaf2] p-6 shadow-[0_18px_42px_rgba(57,47,35,0.07)] sm:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c95f14]">
            Sosyal Bağlantılar
          </div>
          <p className="mt-4 text-sm leading-7 text-[#5f5a53] sm:text-[15px]">
            Aktif profiller ve hızlı temas kanalları doğrudan erişime açıktır.
          </p>

          <div className="mt-5 space-y-3">
            {socialItems.map((item) => (
              <a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.25rem] border border-[#e4dbcf] bg-white px-4 py-4 transition hover:border-[#f4b37f]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${item.iconClassName}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#242424]">{item.platform}</div>
                      <div className="mt-1 text-sm leading-6 text-[#5f5a53]">{item.note}</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#e4dbcf] bg-[#fffaf2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#746d64]">
                    {item.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#e4dbcf] bg-[#fffaf2] shadow-[0_18px_42px_rgba(57,47,35,0.06)]">
        <div className="flex flex-col gap-4 border-b border-[#e4dbcf] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c95f14]">
              Harita Önizlemesi
            </div>
            <div className="mt-2 text-lg font-black text-[#242424]">VektörHUB Ofis Konumu</div>
            <div className="mt-1 text-sm leading-6 text-[#5f5a53]">{officeAddress}</div>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e4dbcf] bg-white px-5 py-3 text-sm font-bold text-[#242424] transition hover:border-[#f4b37f] hover:text-[#c95f14]"
          >
            <ExternalLink className="h-4 w-4" />
            Google Haritalar
          </a>
        </div>
        <iframe
          title="VektörHUB ofis haritası"
          src={mapEmbedUrl}
          className="h-[320px] w-full border-0 sm:h-[380px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
