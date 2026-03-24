import { useEffect, useState, useRef } from "react";
import { getAdminDb } from "./firebase-admin";

type ListenerCallback<T> = (data: T[]) => void;

export function useFirestoreListener<T extends { id?: string }>(
  collection: string,
  subcollection: string | null,
  docId: string | null,
  callback: ListenerCallback<T>,
  enabled: boolean = true
) {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled || !collection) return;

    const setupListener = async () => {
      try {
        const db = getAdminDb();
        let query;

        if (subcollection && docId) {
          // Listen to subcollection
          query = db
            .collection(collection)
            .doc(docId)
            .collection(subcollection);
        } else if (docId) {
          // Single document
          query = db.collection(collection).doc(docId);
        } else {
          // Full collection
          query = db.collection(collection);
        }

        if ("onSnapshot" in query) {
          unsubscribeRef.current = query.onSnapshot((snapshot: any) => {
            if (snapshot.docs) {
              const data = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data(),
              })) as T[];
              callback(data);
            } else {
              callback([snapshot.data() ? { id: snapshot.id, ...snapshot.data() } : null].filter(Boolean) as T[]);
            }
          });
        }
      } catch (error) {
        console.error("Firestore listener error:", error);
      }
    };

    setupListener();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collection, subcollection, docId, enabled, callback]);
}

// Hook for real-time unread count
export function useUnreadCount() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/customer/notifications/unread");
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.total);
        }
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
    setLoading(false);

    // Poll every 10 seconds for updates (fallback if Realtime not available)
    pollIntervalRef.current = setInterval(fetchUnreadCount, 10000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return { unreadCount, loading };
}
