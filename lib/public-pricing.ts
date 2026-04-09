import { unstable_noStore as noStore } from "next/cache";

import { getAdminDb } from "@/lib/firebase-admin";

export type PublicPricingItem = {
  id: string;
  badge: string;
  title: string;
  price: string;
  summary: string;
  highlights: string[];
  ctaHref: string;
  ctaLabel: string;
};

export type PublicPricingSection = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAtLabel: string | null;
  items: PublicPricingItem[];
  source: "firestore" | "fallback";
};

const FALLBACK_PRICING_SECTION: PublicPricingSection = {
  eyebrow: "Guncel Fiyat Listesi",
  title: "Fiyat tablosu merkez ofisten canli olarak okunur",
  description:
    "Bu alan vektorhub_hq tarafindaki fiyat listesini gostermek icin hazirlandi. Liste yayinlandiginda burada otomatik gorunur.",
  updatedAtLabel: null,
  items: [],
  source: "fallback",
};

const PRICING_COLLECTION = "site_public_content";
const PRICING_DOCUMENT = "pricing";

type FirestorePricingPayload = Partial<{
  eyebrow: unknown;
  title: unknown;
  description: unknown;
  updatedAtLabel: unknown;
  updatedAt: unknown;
  items: unknown;
}>;

function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asHighlights(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim())
    .slice(0, 4);
}

function formatUpdatedAtLabel(value: unknown) {
  if (!value) {
    return null;
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    const date = value.toDate() as Date;
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return null;
}

function normalizePricingItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index): PublicPricingItem | null => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = asText(record.title);
      const price = asText(record.price);

      if (!title || !price) {
        return null;
      }

      return {
        id: asText(record.id, `pricing-item-${index + 1}`),
        badge: asText(record.badge, "Paket"),
        title,
        price,
        summary: asText(record.summary),
        highlights: asHighlights(record.highlights),
        ctaHref: asText(record.ctaHref, "/iletisim"),
        ctaLabel: asText(record.ctaLabel, "Bilgi Al"),
      };
    })
    .filter((item): item is PublicPricingItem => item !== null);
}

function normalizePricingSection(payload: FirestorePricingPayload): PublicPricingSection {
  const updatedAtLabel =
    formatUpdatedAtLabel(payload.updatedAtLabel) ?? formatUpdatedAtLabel(payload.updatedAt);

  return {
    eyebrow: asText(payload.eyebrow, FALLBACK_PRICING_SECTION.eyebrow),
    title: asText(payload.title, FALLBACK_PRICING_SECTION.title),
    description: asText(payload.description, FALLBACK_PRICING_SECTION.description),
    updatedAtLabel,
    items: normalizePricingItems(payload.items),
    source: "firestore",
  };
}

export async function getPublicPricingSection(): Promise<PublicPricingSection> {
  noStore();

  try {
    const snapshot = await getAdminDb().collection(PRICING_COLLECTION).doc(PRICING_DOCUMENT).get();
    if (!snapshot.exists) {
      return FALLBACK_PRICING_SECTION;
    }

    return normalizePricingSection((snapshot.data() ?? {}) as FirestorePricingPayload);
  } catch {
    return FALLBACK_PRICING_SECTION;
  }
}

export function getPublicPricingStorageRef() {
  return {
    collection: PRICING_COLLECTION,
    document: PRICING_DOCUMENT,
  };
}
