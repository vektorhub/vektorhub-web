import Link from "next/link";
import { ArrowDownToLine, BadgeCheck, MonitorSmartphone, Sparkles } from "lucide-react";

import { FreeAppDownloadCount } from "@/components/free-app-download-count";
import { freeApps } from "@/data/free-apps";

export function FreeAppsShowcase() {
  return (
    <section className="container-main pb-8 pt-2 md:pb-10">
      <div className="rounded-[2rem] border border-[#e4dbcf] bg-[linear-gradient(135deg,#fffaf2,#f2fbfa)] px-5 py-6 shadow-[0_22px_60px_rgba(57,47,35,0.08)] sm:px-6 sm:py-7 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9ed9d1] bg-white/76 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0f7777]">
                <Sparkles className="h-3.5 w-3.5" />
                Ücretsiz Uygulamalar
              </div>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#242424] sm:text-4xl">
                İndirilebilir yardımcı araçlar.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f5a53] sm:text-base">
                Masaüstü araçları, sürüm bilgisi ve doğrudan indirme bağlantılarıyla tek alanda listelenir.
              </p>
            </div>

            <Link
              href="/ucretsiz-uygulamalar"
              className="inline-flex items-center justify-center rounded-2xl border border-[#e4dbcf] bg-white px-5 py-3 text-sm font-bold text-[#242424] transition hover:border-[#f4b37f] hover:text-[#c95f14]"
            >
              Tüm Uygulamaları Göster
            </Link>
          </div>

          <div className="grid gap-4">
            {freeApps.map((app) => (
              <article
                key={app.slug}
                className="rounded-[1.7rem] border border-[#e4dbcf] bg-[#fffaf2] p-5 shadow-[0_16px_34px_rgba(57,47,35,0.07)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-[#eadfce] bg-white text-[#f47a20]">
                      <MonitorSmartphone className="h-7 w-7" />
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
                      <h3 className="mt-3 text-2xl font-black text-[#242424]">{app.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#5f5a53]">{app.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-[#746d64]">
                        <span className="rounded-full border border-[#e4dbcf] bg-white px-3 py-1.5">
                          {app.platform}
                        </span>
                        <span className="rounded-full border border-[#e4dbcf] bg-white px-3 py-1.5">
                          Sürüm {app.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-[18rem]">
                    <a
                      href={`/api/free-apps/${app.slug}/download`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f47a20] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(244,122,32,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e96d16]"
                    >
                      <ArrowDownToLine className="h-4 w-4" />
                      Windows İçin İndir
                    </a>
                    <Link
                      href="/ucretsiz-uygulamalar"
                      className="inline-flex items-center justify-center rounded-2xl border border-[#e4dbcf] bg-white px-5 py-3 text-sm font-bold text-[#242424] transition hover:border-[#f4b37f] hover:text-[#c95f14]"
                    >
                      Detayları Gör
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
