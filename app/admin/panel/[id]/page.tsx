"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, Send, FileUp, Download, Trash2, CheckCircle2, Clock } from "lucide-react";

type AdminApplication = {
  id: string;
  referenceNumber: string;
  customerEmail: string;
  customerName: string;
  serviceArea: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  id: string;
  applicationId: string;
  senderType: "admin" | "customer";
  senderName: string;
  text: string;
  createdAt: string;
  readAt: string | null;
};

type Document = {
  id: string;
  applicationId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  docType: "teklif" | "taraf" | "diger";
  url: string;
  uploadedBy: "admin" | "customer";
  uploadedAt: string;
};

function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const [application, setApplication] = useState<AdminApplication | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "documents">("messages");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}`);
      if (!res.ok) throw new Error("Talep alınamadı");
      
      const data = await res.json();
      setApplication(data.application);

      // Fetch messages
      const msgRes = await fetch(
        `/api/admin/applications/${applicationId}/messages`
      );
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages);
      }

      // Fetch documents
      const docRes = await fetch(
        `/api/admin/applications/${applicationId}/documents`
      );
      if (docRes.ok) {
        const docData = await docRes.json();
        setDocuments(docData.documents);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veri alınamadı");
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    try {
      const res = await fetch(
        `/api/admin/applications/${applicationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: messageText }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessages([...messages, data.message]);
        setMessageText("");
      }
    } catch (err) {
      setError("Mesaj gönderilemedi");
    }
  };

  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", "teklif");

      const res = await fetch(
        `/api/admin/applications/${applicationId}/documents`,
        { method: "POST", body: formData }
      );

      if (res.ok) {
        const data = await res.json();
        setDocuments([...documents, data.document]);
      }
    } catch (err) {
      setError("Dosya yüklenemedi");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm("Dokümanı silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(
        `/api/admin/applications/${applicationId}/documents`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: docId }),
        }
      );

      if (res.ok) {
        setDocuments(documents.filter((d) => d.id !== docId));
      }
    } catch (err) {
      setError("Doküman silinemedi");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-12 bg-slate-700 rounded-lg w-1/4 mb-8"></div>
          <div className="h-96 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Talep Bulunamadı</h1>
          <button onClick={() => router.back()} className="text-blue-400">
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">#{application.referenceNumber}</h1>
            <p className="text-slate-400">{application.customerName} ({application.customerEmail})</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-200">
            {error}
          </div>
        )}

        {/* Application Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Durum</p>
              <p className="text-lg font-semibold mt-1">{application.status}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Hizmet</p>
              <p className="text-lg font-semibold mt-1">{application.serviceArea}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Başvuru Tarihi</p>
              <p className="text-sm font-semibold mt-1">{formatDate(application.createdAt)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Son Güncelleme</p>
              <p className="text-sm font-semibold mt-1">{formatDate(application.updatedAt)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Açıklama</p>
            <p className="text-base">{application.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "messages"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400"
            }`}
          >
            Mesajlar ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "documents"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400"
            }`}
          >
            Dokümanlar ({documents.length})
          </button>
        </div>

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-6 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-slate-400">Henüz mesaj yok</div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg ${
                        msg.senderType === "admin"
                          ? "bg-blue-900 ml-8 border border-blue-700"
                          : "bg-slate-700 mr-8"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-sm">{msg.senderName}</p>
                        <p className="text-xs text-slate-400">{formatDate(msg.createdAt)}</p>
                      </div>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <Send size={20} />
                Gönder
              </button>
            </form>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-600 rounded-[20px] p-8 text-center hover:border-blue-500 transition">
              <input
                type="file"
                id="file-upload"
                onChange={handleUploadDocument}
                disabled={uploading}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <FileUp size={32} className="text-slate-400" />
                <div>
                  <p className="font-semibold">{uploading ? "Yükleniyor..." : "Teklif Yükle"}</p>
                  <p className="text-sm text-slate-400">PDF, Word, resim dosyaları</p>
                </div>
              </label>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-12 text-slate-400">Henüz doküman yok</div>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{doc.fileName}</p>
                      <p className="text-sm text-slate-400">
                        {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        className="p-2 hover:bg-slate-600 rounded-lg"
                      >
                        <Download size={20} />
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 size={20} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApplicationDetailPage;
