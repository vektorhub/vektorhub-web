"use client";

import { useEffect, useState } from "react";

const COUNTER_NAMESPACE = "vektorhub_web";
const COUNTER_KEY = "site_visits";
const SESSION_FLAG = "vektorhub-visit-counted";

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

    const updateCounter = async () => {
      const hasCountedThisSession = sessionStorage.getItem(SESSION_FLAG) === "1";
      const endpoint = hasCountedThisSession
        ? `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
        : `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;

      const response = await fetch(endpoint, {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as CountApiResponse;

      if (!isActive || typeof data.value !== "number") {
        return;
      }

      if (!hasCountedThisSession) {
        sessionStorage.setItem(SESSION_FLAG, "1");
      }

      setCount(data.value);
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