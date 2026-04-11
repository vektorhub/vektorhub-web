import Link from "next/link";
import { ArrowDownToLine, BadgeCheck, MonitorSmartphone, Sparkles } from "lucide-react";
import { FreeAppDownloadCount } from "@/components/free-app-download-count";
import { freeApps } from "@/data/free-apps";

export function FreeAppsShowcase() {
  return (
    <section className="container-main pb-8 pt-2 md:pb-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:px-6 sm:py-7 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_26%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Ücretsiz Uygulamalar
              </div>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                Hazır, indirilebilir ve işletmeye direkt fayda veren uygulamalar.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Bitirdiğimiz faydalı uygulamaları açık bir vitrine taşıyoruz. Hem marka güveni hem de doğrudan
                indirme odaklı bir reklam alanı olarak çalışıyor.
              </p>
            </div>

            <Link
              href="/ucretsiz-uygulamalar"
              className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Tüm Uygulamaları Göster
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-1">
            {freeApps.map((app) => (
              <article
                key={app.slug}
                className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(9,18,31,0.94),rgba(17,27,43,0.9))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/6 text-orange-300">
                      <MonitorSmartphone className="h-7 w-7" />
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
                        <FreeAppDownloadCount slug={app.slug} />
                      </div>
                      <h3 className="mt-3 text-2xl font-black text-white">{app.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/66">{app.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/42">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">{app.platform}</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                          Sürüm {app.version}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-[18rem]">
                    <a
                      href={`/api/free-apps/${app.slug}/download`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.01]"
                    >
                      <ArrowDownToLine className="h-4 w-4" />
                      Windows İçin İndir
                    </a>
                    <Link
                      href="/ucretsiz-uygulamalar"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
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
