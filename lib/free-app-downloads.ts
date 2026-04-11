import { FieldValue } from "firebase-admin/firestore";

import { freeApps } from "@/data/free-apps";
import { getAdminDb } from "@/lib/firebase-admin";

const COLLECTION = "public_free_app_downloads";

export function isKnownFreeAppSlug(slug: string) {
  return freeApps.some((app) => app.slug === slug);
}

export async function getFreeAppDownloadCounts() {
  const fallback = Object.fromEntries(freeApps.map((app) => [app.slug, 0]));

  try {
    const snapshot = await getAdminDb().collection(COLLECTION).get();

    for (const doc of snapshot.docs) {
      const data = doc.data() as { count?: unknown };
      fallback[doc.id] = typeof data.count === "number" ? data.count : 0;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

export async function incrementFreeAppDownload(slug: string) {
  if (!isKnownFreeAppSlug(slug)) {
    return false;
  }

  try {
    await getAdminDb()
      .collection(COLLECTION)
      .doc(slug)
      .set(
        {
          slug,
          count: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

    return true;
  } catch {
    return false;
  }
}
