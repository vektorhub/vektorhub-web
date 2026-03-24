"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus =
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
};

type AdminMessage = {
  id: string;
  applicationId: string;
  senderType: "admin" | "customer";
  senderName: string;
  text: string;
  createdAt: string;
};

type CustomerActionRequest = {
  id: string;
  applicationId: string;
  type: "add_note" | "change_status" | "request_document";
  data: Record<string, string>;
  createdAt: string;
  status: "pending" | "completed" | "rejected";
  adminResponse?: string;
};

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Başvuru Alındı",
  "İnceleniyor",
  "Teklif Hazırlanıyor",
  "Tamamlandı",
];

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  "Başvuru Alındı": "bg-blue-500/20 text-blue-300 border-blue-400/30",
  "İnceleniyor": "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
  "Teklif Hazırlanıyor": "bg-orange-500/20 text-orange-300 border-orange-400/30",
  "Tamamlandı": "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
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

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );
}

type UpdateDrawerProps = {
  app: Application;
  onClose: () => void;
  onSaved: (updated: Application) => void;
  onDeleted: (id: string) => void;
};

function UpdateDrawer({ app, onClose, onSaved, onDeleted }: UpdateDrawerProps) {
  const [status, setStatus] = useState<ApplicationStatus>(app.status);
  const [note, setNote] = useState(app.note);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteReason, setShowDeleteReason] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [requests, setRequests] = useState<CustomerActionRequest[]>([]);
  const [requestResponses, setRequestResponses] = useState<Record<string, string>>({});
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

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

  const requestTypeLabel: Record<CustomerActionRequest["type"], string> = {
    add_note: "Not Ekleme Talebi",
    change_status: "Durum Değiştirme Talebi",
    request_document: "Doküman Talebi",
  };

  const requestStatusClass: Record<CustomerActionRequest["status"], string> = {
    pending: "border-yellow-400/30 bg-yellow-500/10 text-yellow-200",
    completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  };

  const requestStatusLabel: Record<CustomerActionRequest["status"], string> = {
    pending: "Bekliyor",
    completed: "Onaylandı",
    rejected: "Reddedildi",
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInteractions = async () => {
      setRequestLoading(true);
      setRequestError("");
      try {
        const [msgRes, reqRes] = await Promise.all([
          fetch(`/api/admin/applications/${app.id}/messages`, { cache: "no-store" }),
          fetch(`/api/admin/applications/${app.id}/requests`, { cache: "no-store" }),
        ]);

        if (msgRes.ok) {
          const msgData = (await msgRes.json()) as { messages?: AdminMessage[] };
          if (isMounted) {
            setMessages(msgData.messages ?? []);
          }
        }

        if (reqRes.ok) {
          const reqData = (await reqRes.json()) as { requests?: CustomerActionRequest[] };
          if (isMounted) {
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
          }
        } else if (isMounted) {
          const body = (await reqRes.json().catch(() => ({}))) as { message?: string };
          setRequestError(body.message ?? "Aksiyon talepleri alınamadı.");
        }
      } catch {
        if (isMounted) {
          setRequestError("Mesaj ve aksiyon talepleri alınamadı.");
        }
      } finally {
        if (isMounted) {
          setRequestLoading(false);
        }
      }
    };

    void fetchInteractions();
    return () => {
      isMounted = false;
    };
  }, [app.id]);

  const handleRequestDecision = async (
    requestId: string,
    status: "completed" | "rejected"
  ) => {
    setRequestError("");

    try {
      const res = await fetch(`/api/admin/applications/${app.id}/requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          status,
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
                status,
                adminResponse: requestResponses[requestId] ?? "",
              }
            : item
        )
      );
    } catch {
      setRequestError("Bağlantı hatası. Aksiyon talebi güncellenemedi.");
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
        setError(data.message ?? "Kayıt başarısız.");
        return;
      }
      onSaved({ ...app, status, note, updatedAt: new Date().toISOString() });
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
      onClose();
    } catch {
      setDeleteError("Bağlantı hatası. Talep silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-0 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4">
      <div className="min-h-[100dvh] w-full max-w-4xl overscroll-contain rounded-none border border-white/10 bg-[#0f1725] p-6 shadow-[0_-24px_64px_rgba(0,0,0,0.5)] sm:min-h-0 sm:max-h-[92vh] sm:overflow-y-auto sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-300">
              Durum Güncelle
            </div>
            <h2 className="mt-1 text-lg font-black text-white">{app.referenceNo}</h2>
            <p className="text-sm text-white/60">{app.fullName} — {app.companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
          >
            Kapat
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    Başvuru Özeti
                  </div>
                  <div className="mt-1 text-base font-black text-white">{app.fullName}</div>
                </div>
                <StatusBadge status={status} />
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
              <p className="mt-3 text-sm leading-7 text-white/70">{app.details}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
              Durum
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              style={{ color: "#fff" }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} style={{ backgroundColor: "#0f1725", color: "#fff" }}>
                  {s}
                </option>
              ))}
            </select>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                  Müşteriye Gösterilecek Not
                </label>
                <span className="text-[11px] text-white/35">{note.trim().length} karakter</span>
              </div>
              <textarea
                rows={6}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
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
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Müşteri Mesajları ({messages.length})
              </div>
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-white/45">Henüz müşteri mesajı yok.</p>
                ) : (
                  messages
                    .filter((msg) => msg.senderType === "customer")
                    .map((msg) => (
                      <div key={msg.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                        <div className="text-[11px] text-white/45">
                          {msg.senderName} • {formatDate(msg.createdAt)}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-white/80">{msg.text}</p>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Müşteri Aksiyon Talepleri ({requests.length})
              </div>
              <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
                {requestLoading ? (
                  <p className="text-sm text-white/45">Yükleniyor...</p>
                ) : requests.length === 0 ? (
                  <p className="text-sm text-white/45">Henüz aksiyon talebi yok.</p>
                ) : (
                  requests.map((request) => (
                    <div key={request.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-white">{requestTypeLabel[request.type]}</div>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${requestStatusClass[request.status]}`}>
                          {requestStatusLabel[request.status]}
                        </span>
                      </div>
                      <div className="text-[12px] leading-6 text-white/65">
                        {request.type === "add_note" ? request.data.note : null}
                        {request.type === "change_status" ? `Önerilen durum: ${request.data.proposedStatus}` : null}
                        {request.type === "request_document" ? request.data.reason : null}
                      </div>
                      <div className="mt-1 text-[11px] text-white/40">{formatDate(request.createdAt)}</div>

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

            {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-5 w-full rounded-2xl bg-orange-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
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

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-rose-400/25 bg-[#10192a] p-5">
            <h3 className="text-lg font-black text-white">Emin misiniz?</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">
              {app.referenceNo} numaralı talep silinecek. Devam ederseniz bir sonraki adımda silme açıklaması yazmanız istenir.
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "Tümü">("Tümü");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "status">("newest");
  const [editing, setEditing] = useState<Application | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/applications");
      if (res.status === 401) {
        router.replace("/admin/giris");
        return;
      }
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string };
        setError(body.message ?? "Başvurular alınamadı. Firebase bağlantısını kontrol edin.");
        setItems([]);
        return;
      }
      const data = (await res.json()) as { applications?: Application[] } | Application[];
      const nextItems = Array.isArray(data) ? data : data.applications ?? [];
      setItems(nextItems);
    } catch {
      setError("Bağlantı hatası. Panel verileri alınamadı.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

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
      if (!res.ok) {
        setInviteError(data.message ?? "Davet gönderilemedi.");
        return;
      }

      const previewNote = data.previewUrl ? ` (Preview: ${data.previewUrl})` : "";
      setInviteMessage(`Davet gönderildi.${previewNote}`);
      setInviteEmail("");
      setInviteName("");
    } catch {
      setInviteError("Bağlantı hatası. Davet gönderilemedi.");
    } finally {
      setInviting(false);
    }
  };

  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => {
      acc[s] = items.filter((i) => i.status === s).length;
      return acc;
    },
    {} as Record<ApplicationStatus, number>
  );

  const filtered = useMemo(() => {
    const statusRank: Record<ApplicationStatus, number> = {
      "Başvuru Alındı": 1,
      "İnceleniyor": 2,
      "Teklif Hazırlanıyor": 3,
      "Tamamlandı": 4,
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
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#080e18]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
              VektörHUB
            </span>
            <h1 className="text-base font-black text-white">Yönetim Paneli</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10"
          >
            Çıkış
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-6 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_50%),linear-gradient(135deg,#0d1424_0%,#0a1220_100%)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-300">
                Operasyon Özeti
              </p>
              <h2 className="mt-1 text-lg font-black text-white">Premium Yönetim Görünümü</h2>
              <p className="mt-1 text-sm text-white/60">
                Gerçek zamanlı başvuru takibi, durum yönetimi ve hızlı dışa aktarma.
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
                onClick={fetchData}
                className="rounded-2xl border border-orange-400/30 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/25"
              >
                Veriyi Yenile
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-white/50">Toplam Başvuru</div>
              <div className="mt-1 text-2xl font-black text-white">{totalApplications}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-white/50">Tamamlanma Oranı</div>
              <div className="mt-1 text-2xl font-black text-emerald-300">%{completedRate}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-white/50">Ortalama Lead Yaşı</div>
              <div className="mt-1 text-2xl font-black text-yellow-300">{averageLeadAge}s</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs text-white/50">Filtre Sonucu</div>
              <div className="mt-1 text-2xl font-black text-orange-300">{filtered.length}</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
              Müşteri Hesap Daveti
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Müşteri adı"
                className="min-w-44 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
              <input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                type="email"
                placeholder="musteri@firma.com"
                className="min-w-52 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={handleInvite}
                disabled={inviting}
                className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {inviting ? "Gönderiliyor..." : "Davet Gönder"}
              </button>
            </div>
            {inviteError ? <p className="mt-2 text-sm text-rose-300">{inviteError}</p> : null}
            {inviteMessage ? <p className="mt-2 text-sm text-emerald-200">{inviteMessage}</p> : null}
          </div>
        </section>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s === filterStatus ? "Tümü" : s)}
              className={`rounded-2xl border p-4 text-left transition ${
                filterStatus === s
                  ? STATUS_COLORS[s]
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
              }`}
            >
              <div className="text-2xl font-black">{counts[s] ?? 0}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-white/60">{s}</div>
            </button>
          ))}
        </div>

        {/* Search + filter bar */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <input
            type="search"
            placeholder="İsim, firma, takip no, telefon…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none min-w-52"
          />
          <button
            onClick={() => { setFilterStatus("Tümü"); setSearch(""); }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/60 hover:text-white transition"
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
          <button
            onClick={fetchData}
            className="rounded-2xl border border-orange-400/30 bg-orange-500/10 px-4 py-2.5 text-sm font-semibold text-orange-300 hover:bg-orange-500/20 transition"
          >
            Yenile
          </button>
        </div>

        {error ? (
          <div className="mb-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/40">
            Yükleniyor…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-24 text-white/40">
            {items.length === 0 ? "Henüz başvuru yok." : "Arama sonucu bulunamadı."}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-white/8">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.03]">
                  {["Takip No", "Ad / Firma", "Hizmet", "Telefon", "Durum", "Lead Yaşı", "Tarih", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/45"
                      >
                        {h}
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
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${ageBadgeClass(getApplicationAgeHours(item.createdAt))}`}
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
                        Düzenle
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
        />
      ) : null}
    </div>
  );
}
