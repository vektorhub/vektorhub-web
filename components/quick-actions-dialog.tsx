"use client";

import { useState } from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

type QuickActionType = "add_note" | "change_status" | "request_document" | null;

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

  // Form states
  const [noteText, setNoteText] = useState("");
  const [proposedStatus, setProposedStatus] = useState("");
  const [documentReason, setDocumentReason] = useState("");

  const statusOptions = [
    "Başvuru Alındı",
    "İnceleniyor",
    "Teklif Hazırlanıyor",
    "Tamamlandı",
  ];

  const resetForms = () => {
    setNoteText("");
    setProposedStatus("");
    setDocumentReason("");
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
          throw new Error("Yeni durum seçini.");
        }
        type = "change_status";
        data.proposedStatus = proposedStatus;
        data.reason = "Durum değişikliği talebinde bulunulmuştur.";
      } else if (activeAction === "request_document") {
        if (!documentReason.trim()) {
          throw new Error("Sebep boş olamaz.");
        }
        type = "request_document";
        data.reason = documentReason;
      }

      const res = await fetch(
        `/api/customer/applications/${applicationId}/requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, data }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "İstek gönderilemedi.");
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleCloseDialog();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-[20px] max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {!activeAction ? "Hızlı Aksiyonlar" : "Talep Gönder"}
          </h2>
          <button
            onClick={handleCloseDialog}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!activeAction ? (
            // Action Selection
            <div className="space-y-3">
              <button
                onClick={() => setActiveAction("add_note")}
                className="w-full p-4 rounded-lg border border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 transition text-left"
              >
                <div className="font-semibold text-white mb-1">📝 Not Ekle</div>
                <div className="text-sm text-slate-400">
                  İlerleme, sorun veya gözlemleriniz hakkında not bırakın
                </div>
              </button>

              <button
                onClick={() => setActiveAction("change_status")}
                className="w-full p-4 rounded-lg border border-slate-600 hover:border-orange-500 hover:bg-orange-500/10 transition text-left"
              >
                <div className="font-semibold text-white mb-1">
                  🔄 Durum Değiştir Talep Et
                </div>
                <div className="text-sm text-slate-400">
                  Talebin durumunun değiştirilmesini isteyin
                </div>
              </button>

              <button
                onClick={() => setActiveAction("request_document")}
                className="w-full p-4 rounded-lg border border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10 transition text-left"
              >
                <div className="font-semibold text-white mb-1">📄 Doküman Talep Et</div>
                <div className="text-sm text-slate-400">
                  Gerekli belgeler veya dokümanları isteme hakkında bilgi verin
                </div>
              </button>
            </div>
          ) : success ? (
            // Success State
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="mx-auto text-emerald-400 mb-4" />
              <p className="text-lg font-semibold text-white mb-2">Başarılı!</p>
              <p className="text-slate-400">İsteğiniz gönderildi. Ekibimiz en kısa zamanda yanıt verecektir.</p>
            </div>
          ) : (
            // Form Display
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-200">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {activeAction === "add_note" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Notunuz
                  </label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Lütfen notunuzu yazın..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              )}

              {activeAction === "change_status" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Önerilen Yeni Durum
                  </label>
                  <select
                    value={proposedStatus}
                    onChange={(e) => setProposedStatus(e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">-- Durum Seçin --</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status} disabled={status === currentStatus}>
                        {status}
                        {status === currentStatus && " (Mevcut)"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeAction === "request_document" && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Hangi dokümanları istediğinizi açıklayın
                  </label>
                  <textarea
                    value={documentReason}
                    onChange={(e) => setDocumentReason(e.target.value)}
                    placeholder="Örn: Projenizin teknik şartnamesi, özgeçmişler, vs..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    rows={4}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAction}
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-white hover:bg-slate-700 transition disabled:opacity-50"
                >
                  Geri
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold transition"
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
