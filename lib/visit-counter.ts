import { getAdminDb } from "@/lib/firebase-admin";

export const BASE_VISITOR_COUNT = 200;
export const VISITOR_COLLECTION = "site_visitors";
export const COUNTER_COLLECTION = "site_metrics";
export const COUNTER_DOC = "visitor_count";

export async function getCurrentVisitCount() {
  try {
    const snapshot = await getAdminDb().collection(COUNTER_COLLECTION).doc(COUNTER_DOC).get();
    const storedCount = snapshot.data()?.count;

    if (typeof storedCount === "number" && Number.isFinite(storedCount)) {
      return Math.max(BASE_VISITOR_COUNT, Math.trunc(storedCount));
    }
  } catch {
    return BASE_VISITOR_COUNT;
  }

  return BASE_VISITOR_COUNT;
}
