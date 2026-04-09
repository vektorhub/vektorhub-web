import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { getPublicPricingSection } from "@/lib/public-pricing";

type PricingShowcaseProps = {
  className?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export async function PricingShowcase({ className }: PricingShowcaseProps) {
  const section = await getPublicPricingSection();

  if (section.items.length === 0) {
    return (
      <section id="fiyat-listesi" className={joinClassNames("container-main py-6 md:py-8", className)}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
          <div className="relative max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300">{section.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">{section.description}</p>
            <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
              Fiyat listesi baglandi, veri bekleniyor
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fiyat-listesi" className={joinClassNames("container-main py-6 md:py-8", className)}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-300">{section.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{section.title}</h2>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">{section.description}</p>
        </div>

        {section.updatedAtLabel ? (
          <div className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
            Son guncelleme: {section.updatedAtLabel}
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {section.items.map((item, index) => (
          <article
            key={item.id}
            className={joinClassNames(
              "group relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1",
              index === 1
                ? "border-orange-400/35 bg-[linear-gradient(180deg,rgba(255,136,0,0.16),rgba(12,18,32,0.95))]"
                : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(10,14,24,0.94))]",
            )}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                {item.badge}
              </div>
              <div className="text-sm font-semibold text-white/38">0{index + 1}</div>
            </div>

            <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{item.title}</h3>
            <div className="mt-4 text-4xl font-black leading-none text-white">{item.price}</div>
            {item.summary ? <p className="mt-4 text-sm leading-7 text-white/68">{item.summary}</p> : null}

            {item.highlights.length > 0 ? (
              <div className="mt-6 space-y-3">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 text-sm leading-6 text-white/72">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/8 text-orange-300">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <Link
              href={item.ctaHref}
              className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-orange-300/35 bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(255,106,0,0.24)] transition hover:bg-orange-400"
            >
              {item.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
