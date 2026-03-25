"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

type QuickActionType =
  | "add_note"
  | "change_status"
  | "request_document"
  | "cancel_application"
  | "withdraw"
  | null;

interface QuickActionsDialogProps {
  applicationId: string;
  currentStatus: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function QuickActionsDialog({
  applicationId,
  currentStatus,
  isOpen,
  onClose,
  onSuccess,
}: QuickActionsDialogProps) {
  const [activeAction, setActiveAction] = useState<QuickActionType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [noteText, setNoteText] = useState("");
  const [proposedStatus, setProposedStatus] = useState("");
  const [documentReason, setDocumentReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const statusOptions = [
    "Başvuru Alındı",
    "İnceleniyor",
    "Teklif Hazırlanıyor",
    "Tamamlandı",
  ];

  const canWithdrawDirectly = currentStatus === "Başvuru Alındı";
  const isClosed = currentStatus === "Tamamlandı" || currentStatus === "İptal Edildi";

  const resetForms = () => {
    setNoteText("");
    setProposedStatus("");
    setDocumentReason("");
    setCancelReason("");
    setError("");
    setSuccess(false);
  };

  const handleCloseAction = () => {
    resetForms();
    setActiveAction(null);
  };

  const handleCloseDialog = () => {
    handleCloseAction();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (activeAction === "withdraw") {
        const res = await fetch(`/api/customer/applications/${applicationId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "withdraw",
            reason: cancelReason,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Başvuru geri çekilemedi.");
        }

        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          handleCloseDialog();
        }, 1400);
        return;
      }

      if (activeAction === "cancel_application") {
        if (!cancelReason.trim()) {
          throw new Error("Lütfen iptal sebebini kısaca yazın.");
        }

        const res = await fetch(`/api/customer/applications/${applicationId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "cancel_request",
            reason: cancelReason,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "İptal talebi oluşturulamadı.");
        }

        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          handleCloseDialog();
        }, 1400);
        return;
      }

      const data: Record<string, string> = {};
      let type: "add_note" | "change_status" | "request_document" = "add_note";

      if (activeAction === "add_note") {
        if (!noteText.trim()) {
          throw new Error("Not boş olamaz.");
        }
        type = "add_note";
        data.note = noteText;
      } else if (activeAction === "change_status") {
        if (!proposedStatus) {
          throw new Error("Yeni durum seçin.");
        }
        type = "change_status";
        data.proposedStatus = proposedStatus;
        data.reason = "Durum değişikliği talebinde bulunuldu.";
      } else if (activeAction === "request_document") {
        if (!documentReason.trim()) {
          throw new Error("Sebep boş olamaz.");
        }
        type = "request_document";
        data.reason = documentReason;
      }

      const res = await fetch(`/api/customer/applications/${applicationId}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "İstek gönderilemedi.");
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleCloseDialog();
      }, 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[32rem] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white">
            {!activeAction ? "Hızlı Aksiyonlar" : "Talep Gönder"}
          </h2>
          <button
            onClick={handleCloseDialog}
            className="rounded-lg p-1 transition hover:bg-slate-700"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-6">
          {!activeAction ? (
            <div className="space-y-3">
              <button
                onClick={() => setActiveAction("add_note")}
                className="w-full rounded-lg border border-slate-600 p-4 text-left transition hover:border-blue-500 hover:bg-blue-500/10"
              >
                <div className="mb-1 font-semibold text-white">Not Ekle</div>
                <div className="text-sm text-slate-400">
                  Süreçle ilgili gözlemlerinizi veya ek bilginizi iletin.
                </div>
              </button>

              <button
                onClick={() => setActiveAction("change_status")}
                className="w-full rounded-lg border border-slate-600 p-4 text-left transition hover:border-orange-500 hover:bg-orange-500/10"
              >
                <div className="mb-1 font-semibold text-white">Durum Güncelleme Talebi</div>
                <div className="text-sm text-slate-400">
                  Süreç durumunda farklı bir aşama gerektiğini düşünüyorsanız iletin.
                </div>
              </button>

              <button
                onClick={() => setActiveAction("request_document")}
                className="w-full rounded-lg border border-slate-600 p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-500/10"
              >
                <div className="mb-1 font-semibold text-white">Doküman Talebi</div>
                <div className="text-sm text-slate-400">
                  Belge, dosya veya döküman ihtiyacınızı buradan bildirin.
                </div>
              </button>

              {!isClosed ? (
                <button
                  onClick={() =>
                    setActiveAction(canWithdrawDirectly ? "withdraw" : "cancel_application")
                  }
                  className="w-full rounded-lg border border-rose-500/40 p-4 text-left transition hover:border-rose-400 hover:bg-rose-500/10"
                >
                  <div className="mb-1 font-semibold text-white">
                    {canWithdrawDirectly ? "Başvuruyu Geri Çek" : "İptal Talebi Oluştur"}
                  </div>
                  <div className="text-sm text-slate-400">
                    {canWithdrawDirectly
                      ? "Henüz ilk aşamadaki başvurunuzu doğrudan geri çekebilirsiniz."
                      : "İlerleyen aşamadaki kayıtlar için iptal talebi oluşturabilirsiniz."}
                  </div>
                </button>
              ) : null}
            </div>
          ) : success ? (
            <div className="py-8 text-center">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-emerald-400" />
              <p className="mb-2 text-lg font-semibold text-white">İşlem alındı</p>
              <p className="text-slate-400">
                Talebiniz başarıyla kaydedildi. Panel verileri güncelleniyor.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-200">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {activeAction === "add_note" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Notunuz</label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Lütfen notunuzu yazın..."
                    className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                    rows={4}
                  />
                </div>
              )}

              {activeAction === "change_status" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Önerilen yeni durum</label>
                  <select
                    value={proposedStatus}
                    onChange={(e) => setProposedStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">-- Durum seçin --</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status} disabled={status === currentStatus}>
                        {status}
                        {status === currentStatus ? " (Mevcut)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeAction === "request_document" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Hangi doküman gerektiğini yazın
                  </label>
                  <textarea
                    value={documentReason}
                    onChange={(e) => setDocumentReason(e.target.value)}
                    placeholder="Örn: teklif PDF'i, sözleşme taslağı, teknik içerik..."
                    className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    rows={4}
                  />
                </div>
              )}

              {(activeAction === "cancel_application" || activeAction === "withdraw") && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    {activeAction === "withdraw" ? "Geri çekme notu" : "İptal talebi notu"}
                  </label>
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder={
                      activeAction === "withdraw"
                        ? "İsterseniz kısa bir not bırakabilirsiniz."
                        : "İptal talebinizin sebebini kısaca yazın."
                    }
                    className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                    rows={4}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAction}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-slate-600 px-4 py-2 text-white transition hover:bg-slate-700 disabled:opacity-50"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-700"
                >
                  {loading ? "Gönderiliyor..." : "Gönder"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
