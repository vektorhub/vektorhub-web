import { ArrowDownToLine, BadgeCheck, Download, MonitorSmartphone } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { freeApps } from "@/data/free-apps";
import { createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ucretsiz Uygulamalar",
  description:
    "VektorHUB tarafindan yayinlanan ucretsiz masaustu ve mobil uygulamalari indirilebilir paketleriyle inceleyin.",
  path: "/ucretsiz-uygulamalar",
  keywords: ["ucretsiz uygulamalar", "windows uygulama indir", "vektorhub araclari"],
});

export default function FreeAppsPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <SeoJsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Ucretsiz Uygulamalar", path: "/ucretsiz-uygulamalar" },
          ]),
          createServiceSchema({
            name: "Ucretsiz Uygulamalar",
            description:
              "VektorHUB tarafindan yayinlanan indirilebilir yardimci uygulamalar ve araclar.",
            path: "/ucretsiz-uygulamalar",
            serviceType: "Ucretsiz uygulama yayini ve indirme sayfasi",
            keywords: ["windows utility", "ucretsiz araclar", "indirilebilir uygulamalar"],
          }),
        ]}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#101926] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-300/22 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Ucretsiz Uygulamalar
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            Hazir uygulamalarimizi indirilebilir paketlerle yayinliyoruz.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">
            Burasi sadece bir indirme alani degil. VektorHUB&apos;un urettigi calisan uygulamalari sergiledigi, marka
            guvenini ve teknik kapasitesini gosterdigi acik vitrin alani olarak tasarlandi.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {freeApps.map((app) => (
          <article
            key={app.slug}
            className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,40,0.95),rgba(11,18,32,0.95))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-1 gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/6 text-orange-300">
                  <MonitorSmartphone className="h-8 w-8" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-200">
                      {app.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/18 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {app.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-white">{app.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/65">{app.tagline}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">{app.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/42">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{app.platform}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                      Surum {app.version}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm leading-7 text-white/74">
                    {app.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:w-[18rem]">
                <a
                  href={app.downloadUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.01]"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Kurulum Paketini Indir
                </a>

                <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Download className="h-4 w-4 text-orange-300" />
                    Indirme Notu
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    Paket icinde kurulum dosyalari bulunur. Kurulum tamamlandiginda uygulama masaustune ve baslat
                    menusune kisayol birakir.
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
