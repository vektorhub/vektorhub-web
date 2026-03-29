"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus =
  | "Başvuru Alındı"
  | "İnceleniyor"
  | "Teklif Hazırlanıyor"
  | "Tamamlandı"
  | "İptal Edildi";

type EditableApplicationStatus =
  | "Başvuru Alındı"
  | "İnceleniyor"
  | "Teklif Hazırlanıyor"
  | "Tamamlandı";

type Application = {
  id: string;
  referenceNo: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  serviceArea: string;
  details: string;
  status: ApplicationStatus;
  note: string;
  createdAt: string;
  updatedAt: string;
  messaging?: {
    whatsappConfigured: boolean;
    whatsappOptOut: boolean;
    whatsappStatusLabel: string;
    whatsappOptOutAt: string | null;
    lastInboundText: string;
    lastInboundAt: string | null;
    profileName: string | null;
  };
};

type AdminMessage = {
  id: string;
  applicationId: string;
  senderType: "admin" | "customer";
  senderName: string;
  text: string;
  createdAt: string;
  readAt: string | null;
};

type CustomerActionRequest = {
  id: string;
  applicationId: string;
  type: string;
  data: Record<string, string>;
  createdAt: string;
  status: "pending" | "completed" | "rejected";
  adminResponse?: string;
};

type PendingOnboardingAccount = {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  legalCompanyName: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  billingEmail: string;
  phone: string;
  contactTitle: string;
  createdAt: string;
  onboardingCompletedAt: string | null;
};

type CockpitSummary = {
  totalApplications: number;
  newApplications: number;
  quoteStageApplications: number;
  completedApplications: number;
  pendingOnboarding: number;
  unreadCustomerMessages: number;
  pendingRequests: number;
  pendingCancelRequests: number;
  pendingPaymentConfirmations: number;
};

type CockpitInboxItem = {
  applicationId: string;
  referenceNo: string;
  fullName: string;
  companyName: string;
  status: string;
  unreadCustomerMessages: number;
  latestMessage: AdminMessage;
};

type CockpitActionItem = {
  applicationId: string;
  referenceNo: string;
  fullName: string;
  companyName: string;
  status: string;
  pendingRequests: number;
  pendingCancelRequests: number;
};

type CockpitPayload = {
  summary: CockpitSummary;
  liveInbox: CockpitInboxItem[];
  pendingActionItems: CockpitActionItem[];
};

const STATUS_OPTIONS: EditableApplicationStatus[] = [
  "Başvuru Alındı",
  "İnceleniyor",
  "Teklif Hazırlanıyor",
  "Tamamlandı",
];

const FILTER_OPTIONS: Array<ApplicationStatus | "Tümü"> = ["Tümü", ...STATUS_OPTIONS, "İptal Edildi"];

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  "Başvuru Alındı": "border-sky-400/30 bg-sky-500/12 text-sky-200",
  "İnceleniyor": "border-yellow-400/30 bg-yellow-500/12 text-yellow-200",
  "Teklif Hazırlanıyor": "border-orange-400/30 bg-orange-500/12 text-orange-200",
  "Tamamlandı": "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
  "İptal Edildi": "border-rose-400/30 bg-rose-500/12 text-rose-200",
};

const REQUEST_TYPE_LABELS: Record<string, string> = {
  add_note: "Not Ekleme Talebi",
  change_status: "Durum Değiştirme Talebi",
  request_document: "Doküman Talebi",
  cancel_application: "İptal Talebi",
};

const REQUEST_STATUS_LABELS: Record<CustomerActionRequest["status"], string> = {
  pending: "Bekliyor",
  completed: "Onaylandı",
  rejected: "Reddedildi",
};

const REQUEST_STATUS_CLASSES: Record<CustomerActionRequest["status"], string> = {
  pending: "border-yellow-400/30 bg-yellow-500/10 text-yellow-200",
  completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getApplicationAgeHours(iso: string) {
  const createdAt = new Date(iso).getTime();
  const diffMs = Date.now() - createdAt;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
}

function ageBadgeClass(hours: number) {
  if (hours <= 24) return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";
  if (hours <= 72) return "border-yellow-400/30 bg-yellow-500/10 text-yellow-300";
  return "border-rose-400/30 bg-rose-500/10 text-rose-300";
}

function truncateText(value: string, length = 96) {
  if (value.length <= length) {
    return value;
  }
  return `${value.slice(0, length).trim()}...`;
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className={`mt-2 text-3xl font-black ${accent}`}>{value}</div>
    </div>
  );
}

type UpdateDrawerProps = {
  app: Application;
  onClose: () => void;
  onSaved: (updated: Application) => void;
  onDeleted: (id: string) => void;
  onInteractionChanged: () => void;
};

function UpdateDrawer({
  app,
  onClose,
  onSaved,
  onDeleted,
  onInteractionChanged,
}: UpdateDrawerProps) {
  const [status, setStatus] = useState<EditableApplicationStatus>(
    STATUS_OPTIONS.includes(app.status as EditableApplicationStatus)
      ? (app.status as EditableApplicationStatus)
      : "İnceleniyor"
  );
  const [note, setNote] = useState(app.note);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteReason, setShowDeleteReason] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [requests, setRequests] = useState<CustomerActionRequest[]>([]);
  const [requestResponses, setRequestResponses] = useState<Record<string, string>>({});
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [sendingInitialWhatsApp, setSendingInitialWhatsApp] = useState(false);
  const [whatsAppActionMessage, setWhatsAppActionMessage] = useState("");

  const detailMetrics = [
    ["Takip No", app.referenceNo],
    ["Hizmet", app.serviceArea],
    ["Telefon", app.phone],
    ["E-posta", app.email],
    ["Lead Yaşı", `${getApplicationAgeHours(app.createdAt)}s`],
    ["Son Güncelleme", formatDate(app.updatedAt)],
  ];

  const quickNotes = [
    "İlk dönüş planlandı, kısa süre içinde iletişime geçilecek.",
    "Talep kapsamı inceleniyor, ön analiz devam ediyor.",
    "Teklif hazırlık aşamasındayız, kısa süre içinde paylaşılacak.",
  ];

  const fetchInteractions = useCallback(async () => {
    setRequestLoading(true);
    setRequestError("");

    try {
      const [msgRes, reqRes] = await Promise.all([
        fetch(`/api/admin/applications/${app.id}/messages`, { cache: "no-store" }),
        fetch(`/api/admin/applications/${app.id}/requests`, { cache: "no-store" }),
      ]);

      if (msgRes.ok) {
        const msgData = (await msgRes.json()) as { messages?: AdminMessage[] };
        setMessages(msgData.messages ?? []);
      }

      if (reqRes.ok) {
        const reqData = (await reqRes.json()) as { requests?: CustomerActionRequest[] };
        const nextRequests = reqData.requests ?? [];
        setRequests(nextRequests);
        setRequestResponses((prev) => {
          const next = { ...prev };
          for (const item of nextRequests) {
            if (!(item.id in next)) {
              next[item.id] = item.adminResponse ?? "";
            }
          }
          return next;
        });
      } else {
        const body = (await reqRes.json().catch(() => ({}))) as { message?: string };
        setRequestError(body.message ?? "Aksiyon talepleri alınamadı.");
      }
    } catch {
      setRequestError("Mesaj ve aksiyon talepleri alınamadı.");
    } finally {
      setRequestLoading(false);
    }
  }, [app.id]);

  useEffect(() => {
    void fetchInteractions();
  }, [fetchInteractions]);

  const handleRequestDecision = async (
    requestId: string,
    nextStatus: "completed" | "rejected"
  ) => {
    setRequestError("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}/requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          status: nextStatus,
          adminResponse: requestResponses[requestId] ?? "",
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setRequestError(body.message ?? "Aksiyon talebi güncellenemedi.");
        return;
      }

      setRequests((prev) =>
        prev.map((item) =>
          item.id === requestId
            ? {
                ...item,
                status: nextStatus,
                adminResponse: requestResponses[requestId] ?? "",
              }
            : item
        )
      );
      onInteractionChanged();
    } catch {
      setRequestError("Bağlantı hatası. Aksiyon talebi güncellenemedi.");
    }
  };

  const handleSendMessage = async () => {
    const text = replyText.trim();
    if (text.length < 2) {
      setError("Yanıt en az 2 karakter olmalıdır.");
      return;
    }

    setSendingReply(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setError(body.message ?? "Mesaj gönderilemedi.");
        return;
      }

      const body = (await res.json()) as { message: AdminMessage };
      setMessages((prev) => [...prev, body.message]);
      setReplyText("");
      onInteractionChanged();
    } catch {
      setError("Bağlantı hatası. Mesaj gönderilemedi.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleResendInitialWhatsApp = async () => {
    setSendingInitialWhatsApp(true);
    setWhatsAppActionMessage("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}/whatsapp-initial`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!res.ok) {
        setWhatsAppActionMessage(
          data.message ?? "WhatsApp mesaji yeniden gonderilemedi."
        );
        return;
      }

      setWhatsAppActionMessage(
        data.message ?? "Ilk WhatsApp mesaji yeniden gonderildi."
      );
      onInteractionChanged();
    } catch {
      setWhatsAppActionMessage(
        "Baglanti hatasi. WhatsApp mesaji yeniden gonderilemedi."
      );
    } finally {
      setSendingInitialWhatsApp(false);
    }
  };

  const handleSave = async () => {
    if (note.trim().length < 5) {
      setError("Not en az 5 karakter olmalıdır.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        setError(data.message ?? "Kayıt güncellenemedi.");
        return;
      }

      onSaved({ ...app, status, note, updatedAt: new Date().toISOString() });
      onInteractionChanged();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const reason = deleteReason.trim();
    if (reason.length < 10) {
      setDeleteError("Silme açıklaması en az 10 karakter olmalıdır.");
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        setDeleteError(data.message ?? "Talep silinemedi.");
        return;
      }

      onDeleted(app.id);
      onInteractionChanged();
      onClose();
    } catch {
      setDeleteError("Bağlantı hatası. Talep silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 p-0 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4">
      <div className="min-h-[100dvh] w-full max-w-6xl overscroll-contain rounded-none border border-white/10 bg-[#0f1725] p-6 shadow-[0_-24px_64px_rgba(0,0,0,0.5)] sm:min-h-0 sm:max-h-[94vh] sm:overflow-y-auto sm:rounded-3xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-300">
              Başvuru Yönetimi
            </div>
            <h2 className="mt-1 text-xl font-black text-white">{app.referenceNo}</h2>
            <p className="text-sm text-white/60">
              {app.fullName} • {app.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10"
          >
            Kapat
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    Başvuru Özeti
                  </div>
                  <div className="mt-1 text-base font-black text-white">{app.fullName}</div>
                </div>
                <StatusBadge status={app.status} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {detailMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</div>
                    <div
                      className={`mt-2 font-semibold text-white ${
                        label === "E-posta" ? "break-all text-[13px] leading-5" : "text-sm"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Talep Detayı
              </div>
              <p className="mt-3 text-sm leading-7 text-white/72">{app.details}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                  Mesaj Merkezi
                </div>
                <span className="text-xs text-white/45">{messages.length} mesaj</span>
              </div>

              <div className="max-h-[22rem] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1322]/80 p-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-white/45">Henüz bir mesaj akışı bulunmuyor.</p>
                ) : (
                  messages.map((message) => {
                    const isAdmin = message.senderType === "admin";
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl border px-4 py-3 ${
                            isAdmin
                              ? "border-orange-400/25 bg-orange-500/12 text-orange-50"
                              : "border-sky-400/25 bg-sky-500/10 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-[11px] text-white/60">
                            <span className="font-semibold">{message.senderName}</span>
                            <span>•</span>
                            <span>{formatDate(message.createdAt)}</span>
                            {!isAdmin && !message.readAt ? (
                              <span className="rounded-full border border-emerald-400/25 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                                Yeni
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-2 text-sm leading-6">{message.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Müşteriye net, kısa ve güven veren bir yanıt yazın..."
                  className="min-h-[5.5rem] flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={sendingReply}
                  className="rounded-2xl border border-orange-400/30 bg-orange-500/15 px-5 py-3 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/24 disabled:cursor-not-allowed disabled:opacity-60 sm:w-44"
                >
                  {sendingReply ? "Gönderiliyor..." : "Yanıt Gönder"}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                Durum
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EditableApplicationStatus)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                style={{ color: "#fff" }}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    style={{ backgroundColor: "#0f1725", color: "#fff" }}
                  >
                    {option}
                  </option>
                ))}
              </select>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                    Müşteriye Görünecek Not
                  </label>
                  <span className="text-[11px] text-white/35">{note.trim().length} karakter</span>
                </div>
                <textarea
                  rows={6}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleResendInitialWhatsApp}
                    disabled={sendingInitialWhatsApp || !app.messaging?.whatsappConfigured}
                    className="rounded-2xl border border-emerald-400/25 bg-emerald-500/12 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendingInitialWhatsApp
                      ? "WhatsApp gönderiliyor..."
                      : "İlk WhatsApp mesajını tekrar gönder"}
                  </button>
                  <div className="text-xs leading-6 text-white/50 sm:max-w-[22rem] sm:text-right">
                    Bu işlem yalnızca ilk karşılama mesajını bir kez daha yollar.
                  </div>
                </div>
                {whatsAppActionMessage ? (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
                    {whatsAppActionMessage}
                  </div>
                ) : null}
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    WhatsApp Bildirim Durumu
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                      app.messaging?.whatsappConfigured
                        ? app.messaging?.whatsappOptOut
                          ? "border-rose-400/30 bg-rose-500/10 text-rose-200"
                          : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                        : "border-white/10 bg-white/5 text-white/55"
                    }`}
                  >
                    {app.messaging?.whatsappStatusLabel ?? "Bilinmiyor"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Son Gelen Cevap
                    </div>
                    <div className="mt-2 text-sm text-white/80">
                      {app.messaging?.lastInboundText?.trim() || "Henüz müşteri cevabı yok."}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Son Hareket
                    </div>
                    <div className="mt-2 text-sm text-white/80">
                      {app.messaging?.lastInboundAt
                        ? formatDate(app.messaging.lastInboundAt)
                        : "Henüz cevap alınmadı."}
                    </div>
                    {app.messaging?.whatsappOptOutAt ? (
                      <div className="mt-2 text-xs text-rose-200">
                        Bildirim kapatma tarihi: {formatDate(app.messaging.whatsappOptOutAt)}
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-6 text-white/55">
                  Durum güncellemesi kaydedildiğinde müşteri aktifse WhatsApp bildirimi alır.
                  Müşteri RET yazdıysa yeni bildirim gönderilmez.
                </p>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                  Hızlı Notlar
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickNotes.map((quickNote) => (
                    <button
                      key={quickNote}
                      type="button"
                      onClick={() => setNote(quickNote)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                    >
                      {quickNote}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    Müşteri Aksiyon Talepleri
                  </div>
                  <span className="text-xs text-white/45">{requests.length} kayıt</span>
                </div>

                <div className="max-h-[28rem] space-y-3 overflow-y-auto">
                  {requestLoading ? (
                    <p className="text-sm text-white/45">Yükleniyor...</p>
                  ) : requests.length === 0 ? (
                    <p className="text-sm text-white/45">Henüz aksiyon talebi yok.</p>
                  ) : (
                    requests.map((request) => (
                      <div
                        key={request.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                      >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm font-semibold text-white">
                            {REQUEST_TYPE_LABELS[request.type] ?? "Yönetici İşlemi"}
                          </div>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${REQUEST_STATUS_CLASSES[request.status]}`}
                          >
                            {REQUEST_STATUS_LABELS[request.status]}
                          </span>
                        </div>

                        <div className="space-y-1 text-[12px] leading-6 text-white/65">
                          {request.type === "add_note" ? <div>{request.data.note}</div> : null}
                          {request.type === "change_status" ? (
                            <div>Önerilen durum: {request.data.proposedStatus}</div>
                          ) : null}
                          {request.type === "request_document" ? (
                            <div>İstenen belge notu: {request.data.reason}</div>
                          ) : null}
                          {request.type === "cancel_application" ? (
                            <div>İptal gerekçesi: {request.data.reason}</div>
                          ) : null}
                        </div>

                        <div className="mt-1 text-[11px] text-white/40">
                          {formatDate(request.createdAt)}
                        </div>

                        <textarea
                          rows={2}
                          value={requestResponses[request.id] ?? ""}
                          onChange={(e) =>
                            setRequestResponses((prev) => ({
                              ...prev,
                              [request.id]: e.target.value,
                            }))
                          }
                          placeholder="Müşteriye görünecek yönetici yanıtı"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none placeholder:text-white/35"
                        />

                        {request.status === "pending" ? (
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleRequestDecision(request.id, "completed")}
                              className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-200"
                            >
                              Onayla
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRequestDecision(request.id, "rejected")}
                              className="flex-1 rounded-xl border border-rose-400/30 bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-200"
                            >
                              Reddet
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
                {requestError ? <p className="mt-2 text-sm text-rose-300">{requestError}</p> : null}
              </div>

              {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-5 w-full rounded-2xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Kaydediliyor..." : "Güncellemeyi Kaydet"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setDeleteError("");
                }}
                className="mt-3 w-full rounded-2xl border border-rose-400/35 bg-rose-500/12 py-3 font-semibold text-rose-200 transition hover:bg-rose-500/20"
              >
                Talebi Sil
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-rose-400/25 bg-[#10192a] p-5">
            <h3 className="text-lg font-black text-white">Emin misiniz?</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              {app.referenceNo} numaralı talep silinecek. Devam ederseniz bir sonraki adımda silme
              açıklaması yazmanız istenir.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/75"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setShowDeleteReason(true);
                }}
                className="flex-1 rounded-2xl bg-rose-500 py-2.5 text-sm font-semibold text-white"
              >
                Devam
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showDeleteReason ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-rose-400/25 bg-[#10192a] p-5">
            <h3 className="text-lg font-black text-white">Silme Açıklaması</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Bu açıklama müşteriye e-posta olarak gönderilecektir.
            </p>
            <textarea
              rows={5}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Örn: Talep içeriği mükerrer olduğu için kayıt kaldırıldı..."
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            {deleteError ? <p className="mt-2 text-sm text-rose-300">{deleteError}</p> : null}
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteReason(false);
                  setDeleteReason("");
                  setDeleteError("");
                }}
                disabled={deleting}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/75 disabled:opacity-60"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-rose-500 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {deleting ? "Siliniyor..." : "Tamam"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminPanelPage() {
  const router = useRouter();
  const [items, setItems] = useState<Application[]>([]);
  const [onboardingItems, setOnboardingItems] = useState<PendingOnboardingAccount[]>([]);
  const [cockpit, setCockpit] = useState<CockpitPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [onboardingError, setOnboardingError] = useState("");
  const [cockpitError, setCockpitError] = useState("");
  const [approvingId, setApprovingId] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "Tümü">("Tümü");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "status">("newest");
  const [editing, setEditing] = useState<Application | null>(null);

  const handleUnauthorized = useCallback(() => {
    router.replace("/admin/giris");
  }, [router]);

  const fetchApplications = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true);
      }
      setError("");

      try {
        const res = await fetch("/api/admin/applications", { cache: "no-store" });
        if (res.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { message?: string };
          setError(body.message ?? "Başvurular alınamadı.");
          setItems([]);
          return;
        }

        const data = (await res.json()) as { applications?: Application[] } | Application[];
        setItems(Array.isArray(data) ? data : data.applications ?? []);
      } catch {
        setError("Bağlantı hatası. Başvurular alınamadı.");
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [handleUnauthorized]
  );

  const fetchOnboardingData = useCallback(async () => {
    setOnboardingError("");
    try {
      const res = await fetch("/api/admin/customers/onboarding", { cache: "no-store" });
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setOnboardingError(body.message ?? "Onboarding kayıtları alınamadı.");
        setOnboardingItems([]);
        return;
      }

      const data = (await res.json()) as { items?: PendingOnboardingAccount[] };
      setOnboardingItems(data.items ?? []);
    } catch {
      setOnboardingError("Onboarding kayıtları alınamadı.");
      setOnboardingItems([]);
    }
  }, [handleUnauthorized]);

  const fetchCockpit = useCallback(async () => {
    setCockpitError("");
    try {
      const res = await fetch("/api/admin/cockpit", { cache: "no-store" });
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setCockpitError(body.message ?? "Kokpit verileri alınamadı.");
        setCockpit(null);
        return;
      }

      const data = (await res.json()) as CockpitPayload;
      setCockpit(data);
    } catch {
      setCockpitError("Kokpit verileri alınamadı.");
      setCockpit(null);
    }
  }, [handleUnauthorized]);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchApplications(true), fetchOnboardingData(), fetchCockpit()]);
  }, [fetchApplications, fetchOnboardingData, fetchCockpit]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const handleApproveOnboarding = async (accountId: string) => {
    setApprovingId(accountId);
    setOnboardingError("");

    try {
      const res = await fetch("/api/admin/customers/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        setOnboardingError(data.message ?? "Müşteri hesabı onaylanamadı.");
        return;
      }

      setOnboardingItems((prev) => prev.filter((item) => item.id !== accountId));
      void fetchCockpit();
    } catch {
      setOnboardingError("Müşteri hesabı onaylanamadı.");
    } finally {
      setApprovingId("");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/giris");
  };

  const handleSaved = (updated: Application) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setEditing(null);
  };

  const handleDeleted = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setEditing(null);
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim() || !inviteName.trim()) {
      setInviteError("Müşteri adı ve e-posta zorunludur.");
      setInviteMessage("");
      return;
    }

    setInviting(true);
    setInviteError("");
    setInviteMessage("");

    try {
      const res = await fetch("/api/admin/customers/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, fullName: inviteName }),
      });

      const data = (await res.json()) as { message?: string; previewUrl?: string };
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        setInviteError(data.message ?? "Davet gönderilemedi.");
        return;
      }

      const previewNote = data.previewUrl ? ` (Preview: ${data.previewUrl})` : "";
      setInviteMessage(`Davet gönderildi.${previewNote}`);
      setInviteEmail("");
      setInviteName("");
      void fetchCockpit();
    } catch {
      setInviteError("Bağlantı hatası. Davet gönderilemedi.");
    } finally {
      setInviting(false);
    }
  };

  const counts = useMemo(
    () =>
      FILTER_OPTIONS.filter((status) => status !== "Tümü").reduce((acc, status) => {
        acc[status] = items.filter((item) => item.status === status).length;
        return acc;
      }, {} as Record<ApplicationStatus, number>),
    [items]
  );

  const filtered = useMemo(() => {
    const statusRank: Record<ApplicationStatus, number> = {
      "Başvuru Alındı": 1,
      "İnceleniyor": 2,
      "Teklif Hazırlanıyor": 3,
      "Tamamlandı": 4,
      "İptal Edildi": 5,
    };

    const q = search.toLowerCase();
    const base = items.filter((item) => {
      const matchStatus = filterStatus === "Tümü" || item.status === filterStatus;
      const matchSearch =
        !q ||
        item.fullName.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q) ||
        item.referenceNo.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.email.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "status") {
        return statusRank[a.status] - statusRank[b.status];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filterStatus, items, search, sortBy]);

  const totalApplications = items.length;
  const completedRate =
    totalApplications > 0
      ? Math.round(((counts["Tamamlandı"] ?? 0) / totalApplications) * 100)
      : 0;

  const averageLeadAge =
    filtered.length > 0
      ? Math.round(
          filtered.reduce((sum, item) => sum + getApplicationAgeHours(item.createdAt), 0) /
            filtered.length
        )
      : 0;

  const openEditorById = useCallback(
    (applicationId: string) => {
      const target = items.find((item) => item.id === applicationId);
      if (target) {
        setEditing(target);
      }
    },
    [items]
  );

  const exportCsv = () => {
    if (filtered.length === 0) return;
    const rows = [
      ["Takip No", "Ad Soyad", "Firma", "Telefon", "E-posta", "Hizmet", "Durum", "Not", "Tarih"],
      ...filtered.map((item) => [
        item.referenceNo,
        item.fullName,
        item.companyName,
        item.phone,
        item.email,
        item.serviceArea,
        item.status,
        item.note,
        formatDate(item.createdAt),
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vektorhub-basvurular-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080e18] text-white">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#080e18]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
              VektörHUB
            </span>
            <h1 className="text-base font-black text-white">Yönetim Kokpiti</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refreshAll}
              className="rounded-xl border border-orange-400/30 bg-orange-500/12 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20"
            >
              Kokpiti Yenile
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_35%),linear-gradient(135deg,#0d1424_0%,#0a1220_100%)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-300">
                Yönetim Merkezi
              </p>
              <h2 className="mt-1 text-xl font-black text-white">Canlı başvuru, mesaj ve onay akışı</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/62">
                Bu ekran başvuruları, müşteri mesajlarını, iptal taleplerini ve onboarding onaylarını
                tek ritimde yönetmek için hazırlandı. İhtiyaç olan hareketler tek bakışta öne düşer.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportCsv}
                disabled={filtered.length === 0}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                CSV İndir
              </button>
              <button
                onClick={() => {
                  void fetchApplications();
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10"
              >
                Listeyi Yenile
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Toplam Başvuru"
              value={cockpit?.summary.totalApplications ?? totalApplications}
              accent="text-white"
            />
            <MetricCard
              label="Okunmamış Mesaj"
              value={cockpit?.summary.unreadCustomerMessages ?? 0}
              accent="text-sky-200"
            />
            <MetricCard
              label="Bekleyen Aksiyon"
              value={cockpit?.summary.pendingRequests ?? 0}
              accent="text-yellow-200"
            />
            <MetricCard
              label="Onboarding Kuyruğu"
              value={cockpit?.summary.pendingOnboarding ?? onboardingItems.length}
              accent="text-emerald-200"
            />
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                    Canlı Mesaj Kutusu
                  </div>
                  <p className="mt-1 text-sm text-white/55">
                    Müşteri tarafında yeni hareket olan kayıtlar burada öne çıkar.
                  </p>
                </div>
              </div>

              {cockpitError ? (
                <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {cockpitError}
                </div>
              ) : cockpit?.liveInbox.length ? (
                <div className="space-y-3">
                  {cockpit.liveInbox.map((item) => (
                    <button
                      key={item.applicationId}
                      type="button"
                      onClick={() => openEditorById(item.applicationId)}
                      className="w-full rounded-2xl border border-white/10 bg-[#0d1525]/85 p-4 text-left transition hover:border-orange-400/25 hover:bg-[#111a2c]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-black text-white">
                            {item.referenceNo} • {item.companyName || item.fullName}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/50">
                            <span>{item.fullName}</span>
                            <span>•</span>
                            <span>{formatDate(item.latestMessage.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.unreadCustomerMessages > 0 ? (
                            <span className="rounded-full border border-sky-400/30 bg-sky-500/15 px-2 py-0.5 text-[11px] font-semibold text-sky-200">
                              {item.unreadCustomerMessages} yeni
                            </span>
                          ) : null}
                          <StatusBadge status={item.status as ApplicationStatus} />
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/72">
                        {truncateText(item.latestMessage.text)}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-white/45">
                  Şu anda yeni mesaj trafiği görünmüyor.
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                  Yönetim Nabzı
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-white/45">Yeni Başvuru</div>
                    <div className="mt-1 text-2xl font-black text-sky-200">
                      {cockpit?.summary.newApplications ?? counts["Başvuru Alındı"] ?? 0}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-white/45">Teklif Aşamasında</div>
                    <div className="mt-1 text-2xl font-black text-orange-200">
                      {cockpit?.summary.quoteStageApplications ?? counts["Teklif Hazırlanıyor"] ?? 0}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-white/45">İptal Talebi</div>
                    <div className="mt-1 text-2xl font-black text-rose-200">
                      {cockpit?.summary.pendingCancelRequests ?? 0}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-white/45">Ödeme Doğrulama</div>
                    <div className="mt-1 text-2xl font-black text-violet-200">
                      {cockpit?.summary.pendingPaymentConfirmations ?? 0}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-xs text-white/45">Tamamlanma Oranı</div>
                    <div className="mt-1 text-2xl font-black text-emerald-200">%{completedRate}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                      Aksiyon Radarı
                    </div>
                    <p className="mt-1 text-sm text-white/55">
                      Bekleyen müşteri işlemleri öncelik sırasıyla görünür.
                    </p>
                  </div>
                </div>

                {cockpit?.pendingActionItems.length ? (
                  <div className="space-y-3">
                    {cockpit.pendingActionItems.map((item) => (
                      <button
                        key={item.applicationId}
                        type="button"
                        onClick={() => openEditorById(item.applicationId)}
                        className="w-full rounded-2xl border border-white/10 bg-[#0d1525]/85 p-4 text-left transition hover:border-orange-400/25 hover:bg-[#111a2c]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-black text-white">
                              {item.referenceNo} • {item.companyName || item.fullName}
                            </div>
                            <p className="mt-1 text-xs text-white/50">{item.fullName}</p>
                          </div>
                          <StatusBadge status={item.status as ApplicationStatus} />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-yellow-400/25 bg-yellow-500/12 px-2 py-0.5 text-[11px] font-semibold text-yellow-200">
                            {item.pendingRequests} bekleyen işlem
                          </span>
                          {item.pendingCancelRequests > 0 ? (
                            <span className="rounded-full border border-rose-400/25 bg-rose-500/12 px-2 py-0.5 text-[11px] font-semibold text-rose-200">
                              {item.pendingCancelRequests} iptal talebi
                            </span>
                          ) : null}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-white/45">
                    Bekleyen aksiyon talebi görünmüyor.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                Müşteri Hesap Daveti
              </div>
              <p className="mt-2 text-sm leading-7 text-white/60">
                Uygun bulunan müşterileri kontrollü şekilde portala dahil etmek için davet gönderin.
              </p>
              <div className="mt-4 space-y-3">
                <input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Müşteri adı"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  type="email"
                  placeholder="musteri@firma.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={handleInvite}
                  disabled={inviting}
                  className="w-full rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {inviting ? "Gönderiliyor..." : "Davet Gönder"}
                </button>
              </div>
              {inviteError ? <p className="mt-3 text-sm text-rose-300">{inviteError}</p> : null}
              {inviteMessage ? <p className="mt-3 text-sm text-emerald-200">{inviteMessage}</p> : null}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                    Onboarding Onay Kuyruğu
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    Davetle resmi kaydını tamamlayan firmalar burada son onayı bekler.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchOnboardingData}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Kuyruğu Yenile
                </button>
              </div>

              {onboardingError ? <p className="mb-3 text-sm text-rose-300">{onboardingError}</p> : null}

              <div className="grid gap-3 xl:grid-cols-2">
                {onboardingItems.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm text-white/50">
                    Onay bekleyen resmi müşteri kaydı bulunmuyor.
                  </div>
                ) : (
                  onboardingItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-white/10 bg-[#0f1725]/88 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.16)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-black text-white">
                            {item.companyName || item.fullName}
                          </div>
                          <div className="mt-1 text-sm text-white/58">{item.email}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApproveOnboarding(item.id)}
                          disabled={approvingId === item.id}
                          className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/24 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {approvingId === item.id ? "Onaylanıyor..." : "Aktif Müşteri Olarak Onayla"}
                        </button>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                            Resmi Ünvan
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            {item.legalCompanyName}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                            Vergi
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            {item.taxOffice} / {item.taxNumber}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                            Yetkili
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            {item.fullName} {item.contactTitle ? `• ${item.contactTitle}` : ""}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                            Fatura E-postası
                          </div>
                          <div className="mt-2 break-all text-sm font-semibold text-white">
                            {item.billingEmail}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                          Adres
                        </div>
                        <div className="mt-2 text-sm leading-6 text-white/72">{item.address}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {FILTER_OPTIONS.filter((status) => status !== "Tümü").map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status === filterStatus ? "Tümü" : status)}
              className={`rounded-2xl border p-4 text-left transition ${
                filterStatus === status
                  ? STATUS_COLORS[status]
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <div className="text-2xl font-black">{counts[status] ?? 0}</div>
              <div className="mt-1 text-[11px] font-semibold text-white/60">{status}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="İsim, firma, takip no, telefon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-52 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            onClick={() => {
              setFilterStatus("Tümü");
              setSearch("");
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 transition hover:text-white"
          >
            Sıfırla
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "status")}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none"
            style={{ color: "#fff" }}
          >
            <option value="newest" style={{ backgroundColor: "#0f1725", color: "#fff" }}>
              En Yeni
            </option>
            <option value="oldest" style={{ backgroundColor: "#0f1725", color: "#fff" }}>
              En Eski
            </option>
            <option value="status" style={{ backgroundColor: "#0f1725", color: "#fff" }}>
              Duruma Göre
            </option>
          </select>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/60">
            Ortalama Lead Yaşı: <span className="font-semibold text-yellow-200">{averageLeadAge}s</span>
          </div>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/40">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-24 text-white/40">
            {items.length === 0 ? "Henüz başvuru yok." : "Arama sonucu bulunamadı."}
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-3xl border border-white/8">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.03]">
                  {["Takip No", "Ad / Firma", "Hizmet", "Telefon", "Durum", "Lead Yaşı", "Tarih", ""].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/45"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((item) => (
                  <tr key={item.id} className="group transition hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold text-orange-300">
                      {item.referenceNo}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{item.fullName}</div>
                      <div className="text-[12px] text-white/50">{item.companyName}</div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-white/70">{item.serviceArea}</td>
                    <td className="px-4 py-3 text-[12px] text-white/70">{item.phone}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${ageBadgeClass(
                          getApplicationAgeHours(item.createdAt)
                        )}`}
                      >
                        {getApplicationAgeHours(item.createdAt)}s
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-white/50">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setEditing(item)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-white/10"
                      >
                        Aç
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-right text-[12px] text-white/30">
          {filtered.length} / {items.length} başvuru gösteriliyor
        </p>
      </main>

      {editing ? (
        <UpdateDrawer
          app={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
          onInteractionChanged={() => {
            void fetchCockpit();
            void fetchApplications(false);
          }}
        />
      ) : null}
    </div>
  );
}
