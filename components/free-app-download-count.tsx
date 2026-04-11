"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

type StatsResponse = {
  ok?: boolean;
  counts?: Record<string, number>;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export function FreeAppDownloadCount({ slug }: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/free-apps/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as StatsResponse;
        if (!cancelled) {
          setCount(payload.counts?.[slug] ?? 0);
        }
      } catch {
        if (!cancelled) {
          setCount(0);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/18 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-100">
      <Download className="h-3.5 w-3.5" />
      {count === null ? "Yukleniyor" : `${formatCount(count)} indirme`}
    </span>
  );
}
