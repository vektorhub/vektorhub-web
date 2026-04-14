"use client";

import { useEffect, useState } from "react";

const VISITOR_ID_KEY = "vektorhub-visitor-id";
const LAST_COUNT_KEY = "vektorhub-last-visit-count";

type CountApiResponse = {
  value?: number;
};

let sharedCount: number | null | undefined;
let sharedCountPromise: Promise<number | null> | null = null;

function formatCount(value: number) {
  return Math.max(0, Math.trunc(value)).toString().padStart(4, "0");
}

function getStoredCount() {
  const stored = Number(localStorage.getItem(LAST_COUNT_KEY) ?? "0");
  return Number.isFinite(stored) && stored > 0 ? Math.trunc(stored) : null;
}

function getOrCreateVisitorId() {
  const stored = localStorage.getItem(VISITOR_ID_KEY)?.trim();
  if (stored) {
    return stored;
  }

  const nextId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `vh_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  localStorage.setItem(VISITOR_ID_KEY, nextId);
  return nextId;
}

async function resolveVisitorCount() {
  if (sharedCount !== undefined) {
    return sharedCount;
  }

  if (sharedCountPromise) {
    return sharedCountPromise;
  }

  sharedCountPromise = (async () => {
    try {
      const visitorId = getOrCreateVisitorId();
      const response = await fetch("/api/visit", {
        cache: "no-store",
        headers: {
          "x-visitor-id": visitorId,
        },
      });

      if (!response.ok) {
        throw new Error("visit-api-not-ok");
      }

      const data = (await response.json()) as CountApiResponse;
      const nextCount = typeof data.value === "number" ? Math.trunc(data.value) : getStoredCount();

      sharedCount = nextCount;

      if (typeof nextCount === "number" && nextCount > 0) {
        localStorage.setItem(LAST_COUNT_KEY, String(nextCount));
      }

      return nextCount;
    } catch {
      const fallback = getStoredCount();
      sharedCount = fallback;
      return fallback;
    } finally {
      sharedCountPromise = null;
    }
  })();

  return sharedCountPromise;
}

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(() => sharedCount ?? null);

  useEffect(() => {
    let isActive = true;

    resolveVisitorCount().then((nextCount) => {
      if (isActive) {
        setCount(nextCount);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return count;
}

function VisitorCounterCard({ count }: { count: number | null }) {
  return (
    <div className="w-full overflow-hidden rounded-[1rem] border border-orange-300/18 bg-[linear-gradient(180deg,rgba(13,22,38,0.9),rgba(10,17,30,0.96))] px-2.75 py-1.75 shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2.5">
        <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-orange-200/82">
          Ziyaret
        </div>
        <div className="rounded-full border border-orange-300/18 bg-orange-500/10 px-2 py-0.75 text-[10px] font-black tracking-[0.14em] text-white/95">
          {count === null ? "--" : formatCount(count)}
        </div>
      </div>
    </div>
  );
}

export function VisitorCounterInline() {
  const count = useVisitorCount();

  return <VisitorCounterCard count={count} />;
}

export function VisitorCounter() {
  const count = useVisitorCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncMobileMenuState = () => {
      setMobileMenuOpen(document.body.dataset.mobileMenu === "open");
    };

    syncMobileMenuState();

    const observer = new MutationObserver(syncMobileMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-mobile-menu"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-3 right-2 z-[55] w-[8.35rem] transition-opacity duration-200 lg:hidden sm:bottom-4 sm:right-4 ${
        mobileMenuOpen ? "opacity-0" : "opacity-100"
      }`}
    >
      <VisitorCounterCard count={count} />
    </div>
  );
}
