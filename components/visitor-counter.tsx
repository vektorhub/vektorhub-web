"use client";

import { useEffect, useState } from "react";

const LOCAL_COUNTER_KEY = "vektorhub-local-visit-count";
const TAB_VISIT_FLAG = "vektorhub-tab-visit-counted";
const TAB_LAST_COUNT = "vektorhub-tab-last-count";

type CountApiResponse = {
  value?: number;
};

function formatCount(value: number) {
  return Math.max(0, Math.trunc(value)).toString().padStart(4, "0");
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isActive = true;

    const getLocalCounter = () => {
      const current = Number(localStorage.getItem(LOCAL_COUNTER_KEY) ?? "0");
      return Number.isFinite(current) && current > 0 ? Math.trunc(current) : 0;
    };

    const increaseLocalCounter = () => {
      const next = getLocalCounter() + 1;
      localStorage.setItem(LOCAL_COUNTER_KEY, String(next));
      return next;
    };

    const updateCounter = async () => {
      const alreadyCountedInThisTab = sessionStorage.getItem(TAB_VISIT_FLAG) === "1";

      if (alreadyCountedInThisTab) {
        const tabCachedCount = Number(sessionStorage.getItem(TAB_LAST_COUNT) ?? "0");

        if (!isActive) {
          return;
        }

        if (Number.isFinite(tabCachedCount) && tabCachedCount > 0) {
          setCount(Math.trunc(tabCachedCount));
          return;
        }

        setCount(getLocalCounter() || null);
        return;
      }

      try {
        const response = await fetch("/api/visit", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("visit-api-not-ok");
        }

        const data = (await response.json()) as CountApiResponse;

        if (!isActive) {
          return;
        }

        let resolvedCount: number;

        if (typeof data.value === "number") {
          resolvedCount = data.value;
        } else {
          resolvedCount = increaseLocalCounter();
        }

        setCount(resolvedCount);
        sessionStorage.setItem(TAB_VISIT_FLAG, "1");
        sessionStorage.setItem(TAB_LAST_COUNT, String(resolvedCount));
      } catch {
        if (!isActive) {
          return;
        }

        const fallbackCount = increaseLocalCounter();
        setCount(fallbackCount);
        sessionStorage.setItem(TAB_VISIT_FLAG, "1");
        sessionStorage.setItem(TAB_LAST_COUNT, String(fallbackCount));
      }
    };

    updateCounter().catch(() => {
      // Silent fallback: keeps UI clean if the counter provider is temporarily unreachable.
      if (isActive) {
        setCount(null);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-3 right-2 z-[55] sm:bottom-4 sm:right-4">
      <div className="rounded-xl border border-orange-300/20 bg-[#0d1626]/78 px-2.5 py-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.24)] backdrop-blur-md">
        <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-orange-200/85">
          Ziyaret
        </div>
        <div className="mt-0.5 text-right text-[12px] font-bold leading-none text-white/95">
          {count === null ? "--" : formatCount(count)}
        </div>
      </div>
    </div>
  );
}