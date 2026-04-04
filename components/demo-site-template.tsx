import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  MapPin,
  Phone,
  Search,
  Square,
  Star,
} from "lucide-react";

export type DemoMetric = {
  label: string;
  value: string;
};

export type DemoListing = {
  title: string;
  type: string;
  location: string;
  price: string;
  area: string;
  beds: string;
  baths: string;
  tag: string;
};

export type DemoArea = {
  name: string;
  detail: string;
};

export type DemoFaq = {
  question: string;
  answer: string;
};

export type DemoTheme = {
  shellBg: string;
  shellText: string;
  shellBorder: string;
  topBarBg: string;
  topBarText: string;
  topBarSubtle: string;
  sectionLight: string;
  sectionAlt: string;
  sectionWarm: string;
  cardBg: string;
  softCardBg: string;
  softBorder: string;
  accentText: string;
  accentBg: string;
  accentSoftBg: string;
  darkPanel: string;
  darkPanelText: string;
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  phoneButtonBg: string;
  phoneButtonText: string;
  phoneButtonBorder: string;
};

export type DemoSiteConfig = {
  slug: string;
  categoryLabel: string;
  brandName: string;
  heroTitle: string;
  heroDescription: string;
  topNote: string;
  categoryChips: string[];
  metrics: DemoMetric[];
  quickSearchTitle: string;
  quickSearchRows: string[];
  quickSearchNote: string;
  listingsTitle: string;
  listingsSubtitle: string;
  featuredListings: DemoListing[];
  areasTitle: string;
  areasLead: string;
  areas: DemoArea[];
  reasonsTitle: string;
  reasonsLead: string;
  reasons: string[];
  advisorName: string;
  advisorRole: string;
  advisorNote: string;
  processTitle: string;
  processLead: string;
  processSteps: string[];
  contactTitle: string;
  contactLead: string;
  contactPlaceholders: string[];
  faqsTitle: string;
  faqsLead: string;
  faqs: DemoFaq[];
  theme: DemoTheme;
};

export function DemoSiteTemplate({ config }: { config: DemoSiteConfig }) {
  const { theme } = config;

  return (
    <section className="container-main py-8 sm:py-10">
      <div
        className="overflow-hidden rounded-[34px] shadow-[0_30px_90px_rgba(0,0,0,0.18)]"
        style={{
          background: theme.shellBg,
          color: theme.shellText,
          border: `1px solid ${theme.shellBorder}`,
        }}
      >
        <div
          className="px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] sm:px-8"
          style={{
            background: theme.topBarBg,
            color: theme.topBarText,
            borderBottom: `1px solid ${theme.softBorder}`,
          }}
        >
          Demo Vitrin
          <span className="ml-3" style={{ color: theme.topBarSubtle }}>
            {config.topNote}
          </span>
        </div>

        <div
          className="px-5 py-5 sm:px-8"
          style={{ background: theme.sectionLight, borderBottom: `1px solid ${theme.softBorder}` }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: theme.accentText }}>
                {config.brandName}
              </div>
              <div className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-[2.7rem]">
                {config.heroTitle}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#ilanlar"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-[0_16px_36px_rgba(0,0,0,0.14)] transition hover:scale-[1.02]"
                style={{ background: theme.buttonPrimaryBg, color: theme.buttonPrimaryText }}
              >
                Portföylere Bak
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition"
                style={{ background: theme.cardBg, color: theme.darkPanel, borderColor: theme.softBorder }}
              >
                Hemen İletişim
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            {config.categoryChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border px-3 py-1.5"
                style={{ background: theme.cardBg, color: theme.shellText, borderColor: theme.softBorder }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-5 py-10 sm:px-8 sm:py-12" style={{ background: theme.sectionWarm }}>
            <div className="relative max-w-2xl">
              <div
                className="inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ borderColor: theme.softBorder, background: theme.cardBg, color: theme.accentText }}
              >
                {config.categoryLabel}
              </div>
              <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-[4.15rem]">
                {config.heroDescription}
              </h1>
              <div className="mt-5 max-w-xl text-base leading-8 sm:text-lg" style={{ color: "#334155" }}>
                {config.listingsSubtitle}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {config.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.4rem] border p-4 backdrop-blur"
                    style={{ borderColor: theme.softBorder, background: "rgba(255,255,255,0.72)" }}
                  >
                    <div className="text-2xl font-black">{metric.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: "#6b7280" }}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="border-t px-5 py-8 sm:px-8 lg:border-l lg:border-t-0"
            style={{ background: theme.sectionLight, borderColor: theme.softBorder }}
          >
            <div
              className="rounded-[2rem] border p-5 shadow-[0_20px_48px_rgba(40,40,40,0.08)]"
              style={{ borderColor: theme.softBorder, background: theme.cardBg }}
            >
              <div className="flex items-center justify-between gap-3 border-b pb-4" style={{ borderColor: theme.softBorder }}>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.accentText }}>
                    Hızlı Arama
                  </div>
                  <div className="mt-1 text-lg font-bold">{config.quickSearchTitle}</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: theme.accentSoftBg, color: theme.accentText }}>
                  <Search className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {config.quickSearchRows.map((row) => (
                  <div
                    key={row}
                    className="rounded-2xl border px-4 py-3 text-sm"
                    style={{ borderColor: theme.softBorder, background: theme.softCardBg, color: "#495362" }}
                  >
                    {row}
                  </div>
                ))}
                <button className="mt-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition" style={{ background: theme.darkPanel }}>
                  Portföyleri Listele
                </button>
              </div>

              <div className="mt-5 rounded-[1.5rem] border p-4" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{config.quickSearchNote}</div>
                    <p className="mt-2 text-sm leading-7" style={{ color: "#5b6470" }}>
                      Ziyaretçi uzun form doldurmadan önce arama veya WhatsApp ile hızla temas kurabilir.
                    </p>
                  </div>
                  <Phone className="mt-1 h-5 w-5" style={{ color: theme.accentText }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="ilanlar" className="px-5 py-10 sm:px-8 sm:py-12" style={{ background: theme.sectionAlt }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
                Öne Çıkan İçerikler
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-[2.4rem]">{config.listingsTitle}</h2>
            </div>
            <div className="text-sm font-medium" style={{ color: "#6b7280" }}>
              Filtrelenebilir kart yapısı örneği
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {config.featuredListings.map((listing) => (
              <article
                key={listing.title}
                className="overflow-hidden rounded-[2rem] border shadow-[0_18px_42px_rgba(0,0,0,0.08)]"
                style={{ borderColor: theme.softBorder, background: theme.cardBg }}
              >
                <div className="relative h-56" style={{ background: theme.sectionWarm }}>
                  <div
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ background: theme.darkPanel, color: theme.topBarText }}
                  >
                    {listing.tag}
                  </div>
                  <div
                    className="absolute bottom-4 left-4 right-4 rounded-[1.2rem] border p-3 backdrop-blur"
                    style={{ borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.78)" }}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.accentText }}>
                      {listing.type}
                    </div>
                    <div className="mt-1 text-xl font-black">{listing.price}</div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black leading-tight">{listing.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: "#65707d" }}>
                    <MapPin className="h-4 w-4" style={{ color: theme.accentText }} />
                    {listing.location}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-[1rem] border px-2 py-3" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                      <Square className="mx-auto h-4 w-4" style={{ color: theme.accentText }} />
                      <div className="mt-2 text-xs font-semibold">{listing.area}</div>
                    </div>
                    <div className="rounded-[1rem] border px-2 py-3" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                      <BedDouble className="mx-auto h-4 w-4" style={{ color: theme.accentText }} />
                      <div className="mt-2 text-xs font-semibold">{listing.beds}</div>
                    </div>
                    <div className="rounded-[1rem] border px-2 py-3" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                      <Bath className="mx-auto h-4 w-4" style={{ color: theme.accentText }} />
                      <div className="mt-2 text-xs font-semibold">{listing.baths}</div>
                    </div>
                  </div>

                  <button
                    className="mt-5 w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition"
                    style={{ borderColor: `${theme.darkPanel}1f`, background: theme.darkPanel, color: theme.darkPanelText }}
                  >
                    Detayı Gör
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]" style={{ borderTop: `1px solid ${theme.softBorder}`, borderBottom: `1px solid ${theme.softBorder}` }}>
          <div className="px-5 py-10 sm:px-8" style={{ background: theme.sectionLight }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
              Çalışılan Alanlar
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{config.areasTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: "#586170" }}>
              {config.areasLead}
            </p>
            <div className="mt-6 space-y-4">
              {config.areas.map((area) => (
                <article key={area.name} className="rounded-[1.6rem] border p-5" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: theme.accentSoftBg, color: theme.accentText }}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold">{area.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7" style={{ color: "#586170" }}>
                    {area.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="px-5 py-10 sm:px-8" style={{ background: theme.sectionWarm }}>
            <div className="rounded-[2rem] border p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)]" style={{ borderColor: theme.softBorder, background: theme.cardBg }}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
                Neden Bu Yapı Çalışır
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{config.reasonsTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: "#56606d" }}>
                {config.reasonsLead}
              </p>
              <div className="mt-6 space-y-4">
                {config.reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3 rounded-[1.3rem] border p-4" style={{ borderColor: theme.softBorder, background: theme.softCardBg }}>
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: theme.accentText }} />
                    <p className="text-sm leading-7" style={{ color: "#56606d" }}>
                      {reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] p-5 text-white" style={{ background: theme.darkPanel }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: theme.topBarText }}>
                  Uzman Alanı
                </div>
                <div className="mt-2 text-2xl font-black">{config.advisorName}</div>
                <div className="mt-1 text-sm text-white/70">{config.advisorRole}</div>
                <div className="mt-4 flex items-center gap-1" style={{ color: theme.topBarText }}>
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="mt-4 text-sm leading-7 text-white/74">{config.advisorNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
          <div className="px-5 py-10 sm:px-8" style={{ background: theme.sectionAlt }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
              Süreç Akışı
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{config.processTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: "#5a6571" }}>
              {config.processLead}
            </p>
            <div className="mt-6 space-y-4">
              {config.processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[1.5rem] border p-4" style={{ borderColor: theme.softBorder, background: theme.cardBg }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black" style={{ background: theme.accentSoftBg, color: theme.accentText }}>
                    0{index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7" style={{ color: "#5a6571" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="iletisim" className="px-5 py-10 sm:px-8" style={{ background: theme.sectionLight }}>
            <div className="rounded-[2rem] border p-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)]" style={{ borderColor: theme.softBorder, background: theme.cardBg }}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
                İletişim Kutusu
              </div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{config.contactTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: "#5b6470" }}>
                {config.contactLead}
              </p>
              <div className="mt-6 grid gap-3">
                {config.contactPlaceholders.map((row) => (
                  <div key={row} className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: theme.softBorder, background: theme.softCardBg, color: "#4e5967" }}>
                    {row}
                  </div>
                ))}
                <button
                  className="rounded-2xl px-4 py-3 text-sm font-semibold shadow-[0_16px_32px_rgba(0,0,0,0.16)] transition hover:scale-[1.01]"
                  style={{ background: theme.buttonPrimaryBg, color: theme.buttonPrimaryText }}
                >
                  Bilgi Talebi Gönder
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+905333850572"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-[0_12px_26px_rgba(0,0,0,0.12)]"
                  style={{
                    background: theme.phoneButtonBg,
                    color: theme.phoneButtonText,
                    borderColor: theme.phoneButtonBorder,
                  }}
                >
                  <Phone className="h-4 w-4" style={{ color: theme.topBarText }} />
                  0533 385 05 72
                </a>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold"
                  style={{ borderColor: theme.softBorder, background: theme.softCardBg, color: theme.darkPanel }}
                >
                  Detaylı İletişim Sayfası
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-10 sm:px-8" style={{ background: theme.sectionWarm, borderTop: `1px solid ${theme.softBorder}` }}>
          <div className="max-w-4xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
              Sık Sorulanlar
            </div>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{config.faqsTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7" style={{ color: "#5b6571" }}>
              {config.faqsLead}
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {config.faqs.map((item) => (
              <article key={item.question} className="rounded-[1.6rem] border p-5" style={{ borderColor: theme.softBorder, background: theme.cardBg }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: theme.accentSoftBg, color: theme.accentText }}>
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.question}</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "#5b6571" }}>
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
