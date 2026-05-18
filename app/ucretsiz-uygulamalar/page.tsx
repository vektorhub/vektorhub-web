import { ArrowDownToLine, BadgeCheck, Download, MonitorSmartphone } from "lucide-react";

import { FreeAppDownloadCount } from "@/components/free-app-download-count";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { freeApps } from "@/data/free-apps";
import { createBreadcrumbSchema, createPageMetadata, createServiceSchema } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Ücretsiz Uygulamalar",
  description:
    "VektörHUB tarafından hazırlanan ücretsiz masaüstü ve mobil uygulamaları indirilebilir paketleriyle inceleyin.",
  path: "/ucretsiz-uygulamalar",
  keywords: ["ücretsiz uygulamalar", "windows uygulama indir", "vektörhub araçları"],
});

export default function FreeAppsPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <SeoJsonLd
        data={[
          createBreadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Ücretsiz Uygulamalar", path: "/ucretsiz-uygulamalar" },
          ]),
          createServiceSchema({
            name: "Ücretsiz Uygulamalar",
            description:
              "VektörHUB tarafından hazırlanan indirilebilir yardımcı uygulamalar ve araçlar.",
            path: "/ucretsiz-uygulamalar",
            serviceType: "Ücretsiz uygulama ve indirme sayfası",
            keywords: ["windows utility", "ücretsiz araçlar", "indirilebilir uygulamalar"],
          }),
        ]}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-[#e4dbcf] bg-[linear-gradient(135deg,#fffaf2,#f2fbfa)] px-6 py-7 shadow-[0_22px_60px_rgba(57,47,35,0.08)]">
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-[#f4b37f] bg-white/76 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#c95f14]">
            Ücretsiz Uygulamalar
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-[#242424] sm:text-4xl">
            İşletmeler için pratik dijital araçlar.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f5a53] sm:text-base">
            Masaüstü ve yardımcı uygulamalar; net açıklama, sürüm bilgisi ve doğrudan indirme
            bağlantısıyla listelenir.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {freeApps.map((app) => (
          <article
            key={app.slug}
            className="rounded-[28px] border border-[#e4dbcf] bg-[#fffaf2] p-6 shadow-[0_18px_42px_rgba(57,47,35,0.08)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-1 gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] border border-[#eadfce] bg-white text-[#f47a20]">
                  <MonitorSmartphone className="h-8 w-8" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#f4b37f] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c95f14]">
                      {app.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#9ed9d1] bg-[#f2fbfa] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f7777]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {app.status}
                    </span>
                    <FreeAppDownloadCount slug={app.slug} />
                  </div>

                  <h2 className="mt-4 text-2xl font-black text-[#242424]">{app.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#746d64]">{app.tagline}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f5a53]">{app.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-[#746d64]">
                    <span className="rounded-full border border-[#e4dbcf] bg-white px-3 py-1.5">
                      {app.platform}
                    </span>
                    <span className="rounded-full border border-[#e4dbcf] bg-white px-3 py-1.5">
                      Sürüm {app.version}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm leading-7 text-[#4d4842]">
                    {app.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-2xl border border-[#e4dbcf] bg-white px-4 py-3">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:w-[18rem]">
                <a
                  href={`/api/free-apps/${app.slug}/download`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f47a20] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(244,122,32,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e96d16]"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  Kurulum Paketini İndir
                </a>

                <div className="mt-4 rounded-[22px] border border-[#d4ebe8] bg-[#f2fbfa] p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#242424]">
                    <Download className="h-4 w-4 text-[#0f7777]" />
                    İndirme Notu
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#5f5a53]">
                    Paket içinde kurulum dosyaları bulunur. Kurulum tamamlandığında uygulama
                    masaüstüne ve başlat menüsüne kısayol bırakır.
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
