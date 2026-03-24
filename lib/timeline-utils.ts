type TimelineStatus = "Başvuru Alındı" | "İnceleniyor" | "Teklif Hazırlanıyor" | "Tamamlandı";

export type TimelineEvent = {
  status: TimelineStatus;
  date: string | null;
  description: string;
  completed: boolean;
  current: boolean;
};

const STATUS_ORDER: TimelineStatus[] = [
  "Başvuru Alındı",
  "İnceleniyor",
  "Teklif Hazırlanıyor",
  "Tamamlandı",
];

const STATUS_DESCRIPTIONS: Record<TimelineStatus, string> = {
  "Başvuru Alındı": "Talebiniz sistemimize kaydedildi",
  "İnceleniyor": "Ekibimiz talebinizi inceliyordur",
  "Teklif Hazırlanıyor": "Özel teklif hazırlanmaktadır",
  "Tamamlandı": "İşlem tamamlandı",
};

export function generateTimeline(
  applicationStatus: string,
  createdAt: string,
  updatedAt: string
): TimelineEvent[] {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  // Calculate estimated dates based on status progression
  const estimateDaysBetween = (fromDate: Date, days: number) => {
    const copy = new Date(fromDate);
    copy.setDate(copy.getDate() + days);
    return copy.toISOString();
  };

  const statusIndex = STATUS_ORDER.indexOf(applicationStatus as TimelineStatus);

  const events: TimelineEvent[] = STATUS_ORDER.map((status, index) => {
    let eventDate: string | null = null;
    let isCompleted = false;
    let isCurrent = false;

    if (status === "Başvuru Alındı") {
      eventDate = created.toISOString();
      isCompleted = true;
    } else if (index <= statusIndex) {
      // Past or current status - use actual or estimated date
      const daysFromStart = index;
      eventDate = estimateDaysBetween(created, daysFromStart * 2);
      isCompleted = index < statusIndex;
    } else {
      // Future status - estimate
      const daysFromStart = index;
      eventDate = estimateDaysBetween(created, daysFromStart * 2);
      isCompleted = false;
    }

    isCurrent = status === applicationStatus;

    return {
      status,
      date: eventDate,
      description: STATUS_DESCRIPTIONS[status],
      completed: isCompleted || isCurrent,
      current: isCurrent,
    };
  });

  // If completed, use actual updated date for the final milestone
  if (applicationStatus === "Tamamlandı") {
    events[3].date = updated.toISOString();
  }

  return events;
}

export function getProgressPercentage(applicationStatus: string): number {
  const index = STATUS_ORDER.indexOf(applicationStatus as TimelineStatus);
  if (index === -1) return 0;
  return ((index + 1) / STATUS_ORDER.length) * 100;
}
