"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, FileUp, Send, Download, Trash2, Clock, MessageSquare, FileText, Zap } from "lucide-react";
import { ApplicationTimeline } from "@/components/application-timeline";
import { QuickActionsDialog } from "@/components/quick-actions-dialog";

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
  expiresAt: string | null;
};

type Application = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

function DetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "documents">("messages");
  const [uploading, setUploading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [appRes, msgRes, docRes] = await Promise.all([
        fetch(`/api/customer/me`),
        fetch(`/api/customer/applications/${applicationId}/messages`),
        fetch(`/api/customer/applications/${applicationId}/documents`),
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        const app = appData.applications.find((a: any) => a.id === applicationId);
        setApplication(app);
      }

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages);
      }

      if (docRes.ok) {
        const docData = await docRes.json();
        setDocuments(docData.documents);
      }
    } catch (error) {
      console.error("Veri alınamadı:", error);
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
      const res = await fetch(`/api/customer/applications/${applicationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageText }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...messages, data.message]);
        setMessageText("");
      }
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    }
  };

  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", "diger");

      const res = await fetch(`/api/customer/applications/${applicationId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setDocuments([...documents, data.document]);
      }
    } catch (error) {
      console.error("Dosya yüklenemedi:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm("Dokümanı silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/customer/applications/${applicationId}/documents`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: docId }),
      });

      if (res.ok) {
        setDocuments(documents.filter((d) => d.id !== docId));
      }
    } catch (error) {
      console.error("Doküman silinemedi:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-700 rounded-lg w-1/4 mb-8"></div>
            <div className="h-96 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Talep Bulunamadı</h1>
          <Link href="/musteri/panel" className="text-blue-400 hover:text-blue-300">
            Panele Dön
          </Link>
        </div>
      </div>
    );
  }

  const docTypeLabel = {
    teklif: "📋 Teklif",
    taraf: "📄 Taraf Dokümanı",
    diger: "📎 Diğer",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Talep #{application.referenceNumber}</h1>
              <p className="text-slate-400 mt-1">{application.serviceType}</p>
            </div>
          </div>
          <button
            onClick={() => setShowQuickActions(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            <Zap size={20} />
            Aksiyonlar
          </button>
        </div>

        {/* Application Info Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Durum</p>
              <p className="text-lg font-semibold mt-1">{application.status}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Oluşturulma Tarihi</p>
              <p className="text-lg font-semibold mt-1">{formatDate(application.createdAt)}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 text-sm">Açıklama</p>
              <p className="text-base mt-1">{application.description}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ApplicationTimeline
          status={application.status}
          createdAt={application.createdAt}
          updatedAt={application.updatedAt}
        />

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${
              activeTab === "messages"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare size={20} />
            Mesajlar ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition ${
              activeTab === "documents"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <FileText size={20} />
            Dokümanlar ({documents.length})
          </button>
        </div>

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-6 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
                  <p className="text-slate-400">Henüz mesaj yok</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-lg ${
                        msg.senderType === "customer"
                          ? "bg-blue-900 ml-8"
                          : "bg-slate-700 mr-8 border border-slate-600"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-sm">{msg.senderName}</p>
                        <p className="text-xs text-slate-400">{formatDate(msg.createdAt)}</p>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input */}
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
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-600 rounded-[20px] p-8 text-center hover:border-blue-500 transition bg-slate-800 bg-opacity-50">
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
                  <p className="font-semibold">{uploading ? "Yükleniyor..." : "Dosya Yükle"}</p>
                  <p className="text-sm text-slate-400">PDF, Word, Excel ve resim dosyaları</p>
                </div>
              </label>
            </div>

            {/* Documents List */}
            {documents.length === 0 ? (
              <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-12 text-center">
                <FileText size={48} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400">Henüz doküman yok</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <FileText size={20} className="text-blue-400" />
                        <p className="font-semibold">{doc.fileName}</p>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded">
                          {docTypeLabel[doc.docType]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 ml-8">
                        {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        className="p-2 hover:bg-slate-600 rounded-lg transition"
                        title="İndir"
                      >
                        <Download size={20} />
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 hover:bg-red-900 rounded-lg transition"
                        title="Sil"
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

        {/* Quick Actions Dialog */}
        <QuickActionsDialog
          applicationId={applicationId}
          currentStatus={application.status}
          isOpen={showQuickActions}
          onClose={() => setShowQuickActions(false)}
          onSuccess={() => {
            // Refresh data after action
            fetchData();
          }}
        />
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <DetailPageContent />
    </Suspense>
  );
}
