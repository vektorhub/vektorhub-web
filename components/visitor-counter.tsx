"use client";

import { useEffect, useState } from "react";

const LOCAL_COUNTER_KEY = "vektorhub-local-visit-count";

type CountApiResponse = {
  value?: number;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isActive = true;

    const increaseLocalCounter = () => {
      const current = Number(localStorage.getItem(LOCAL_COUNTER_KEY) ?? "0");
      const next = Number.isFinite(current) ? current + 1 : 1;
      localStorage.setItem(LOCAL_COUNTER_KEY, String(next));
      return next;
    };

    const updateCounter = async () => {
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

        if (typeof data.value === "number") {
          setCount(data.value);
          return;
        }

        setCount(increaseLocalCounter());
      } catch {
        if (!isActive) {
          return;
        }

        setCount(increaseLocalCounter());
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
    <div className="pointer-events-none fixed bottom-4 right-3 z-[55] sm:bottom-5 sm:right-5">
      <div className="rounded-2xl border border-orange-300/25 bg-[#0d1626]/88 px-3 py-2 shadow-[0_14px_36px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-orange-200/90">
          Ziyaret
        </div>
        <div className="mt-0.5 text-right text-sm font-black leading-none text-white">
          {count === null ? "--" : formatCount(count)}
        </div>
      </div>
    </div>
  );
}