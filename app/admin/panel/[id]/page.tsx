"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, Send, FileUp, Download, Trash2, ShieldCheck, Wallet } from "lucide-react";

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

type Quote = {
  id: string;
  applicationId: string;
  title: string;
  description: string;
  items: Array<{ label: string; amount: number }>;
  currency: "TRY";
  totalAmount: number;
  status: "draft" | "published" | "accepted" | "rejected";
  publishedAt: string | null;
  customerRespondedAt: string | null;
  customerNote: string;
  createdAt: string;
  updatedAt: string;
};

type Payment = {
  id: string;
  applicationId: string;
  quoteId: string | null;
  title: string;
  description: string;
  amount: number;
  currency: "TRY";
  status: "pending" | "notice_sent" | "confirmed" | "rejected";
  dueDate: string | null;
  iban: {
    accountName: string;
    iban: string;
    bankName: string;
    branchName: string;
    paymentNote: string;
  };
  customerReference: string;
  customerNote: string;
  proofDocumentId: string | null;
  proofFileName: string;
  adminNote: string;
  noticeSubmittedAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const [application, setApplication] = useState<AdminApplication | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "documents" | "quotes" | "payments">(
    "messages"
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [quoteForm, setQuoteForm] = useState({
    title: "",
    description: "",
    items: [{ label: "", amount: "" }],
  });
  const [paymentForm, setPaymentForm] = useState({
    title: "",
    description: "",
    amount: "",
    dueDate: "",
    quoteId: "",
  });
  const [paymentReview, setPaymentReview] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    try {
      const [appRes, msgRes, docRes, quoteRes, paymentRes] = await Promise.all([
        fetch(`/api/admin/applications/${applicationId}`),
        fetch(`/api/admin/applications/${applicationId}/messages`),
        fetch(`/api/admin/applications/${applicationId}/documents`),
        fetch(`/api/admin/applications/${applicationId}/quotes`),
        fetch(`/api/admin/applications/${applicationId}/payments`),
      ]);

      if (!appRes.ok) throw new Error("Talep alınamadı");

      const data = await appRes.json();
      setApplication(data.application);

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages ?? []);
      }

      if (docRes.ok) {
        const docData = await docRes.json();
        setDocuments(docData.documents ?? []);
      }

      if (quoteRes.ok) {
        const quoteData = await quoteRes.json();
        setQuotes(quoteData.quotes ?? []);
      }

      if (paymentRes.ok) {
        const paymentData = await paymentRes.json();
        setPayments(paymentData.payments ?? []);
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

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quoteForm.title,
          description: quoteForm.description,
          items: quoteForm.items.map((item) => ({
            label: item.label,
            amount: Number(item.amount || 0),
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Teklif oluşturulamadı");
        return;
      }

      const data = await res.json();
      setQuotes((prev) => [data.quote, ...prev]);
      setQuoteForm({ title: "", description: "", items: [{ label: "", amount: "" }] });
    } catch {
      setError("Teklif oluşturulamadı");
    }
  };

  const handlePublishQuote = async (quoteId: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/quotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId, status: "published" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Teklif yayınlanamadı");
        return;
      }

      const data = await res.json();
      setQuotes((prev) => prev.map((item) => (item.id === quoteId ? data.quote : item)));
    } catch {
      setError("Teklif yayınlanamadı");
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: paymentForm.title,
          description: paymentForm.description,
          amount: Number(paymentForm.amount || 0),
          dueDate: paymentForm.dueDate || null,
          quoteId: paymentForm.quoteId || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Ödeme kaydı oluşturulamadı");
        return;
      }

      const data = await res.json();
      setPayments((prev) => [data.payment, ...prev]);
      setPaymentForm({ title: "", description: "", amount: "", dueDate: "", quoteId: "" });
    } catch {
      setError("Ödeme kaydı oluşturulamadı");
    }
  };

  const handleReviewPayment = async (paymentId: string, status: "confirmed" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/payments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          status,
          adminNote: paymentReview[paymentId] ?? "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Ödeme güncellenemedi");
        return;
      }

      const data = await res.json();
      setPayments((prev) => prev.map((item) => (item.id === paymentId ? data.payment : item)));
    } catch {
      setError("Ödeme güncellenemedi");
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

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 2,
    }).format(amount);

  const publishedQuotes = useMemo(
    () => quotes.filter((item) => item.status === "published" || item.status === "accepted"),
    [quotes]
  );

  const proofUrlByPaymentId = useMemo(() => {
    const pairs = new Map<string, string>();
    for (const payment of payments) {
      if (!payment.proofDocumentId) continue;
      const match = documents.find((doc) => doc.id === payment.proofDocumentId);
      if (match) {
        pairs.set(payment.id, match.url);
      }
    }
    return pairs;
  }, [documents, payments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      <div className="page-content-template">
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
          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "quotes"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400"
            }`}
          >
            Teklifler ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "payments"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400"
            }`}
          >
            Ödeme ({payments.length})
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

        {activeTab === "quotes" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={handleCreateQuote} className="space-y-4 rounded-[20px] border border-slate-700 bg-slate-800 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Yeni Teklif</div>
              <input
                type="text"
                value={quoteForm.title}
                onChange={(e) => setQuoteForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Teklif başlığı"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <textarea
                rows={4}
                value={quoteForm.description}
                onChange={(e) => setQuoteForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Teklif kapsamı"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <div className="space-y-3">
                {quoteForm.items.map((item, index) => (
                  <div key={index} className="grid gap-3 md:grid-cols-[1fr_180px]">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          items: prev.items.map((row, rowIndex) =>
                            rowIndex === index ? { ...row, label: e.target.value } : row
                          ),
                        }))
                      }
                      placeholder="Kalem açıklaması"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.amount}
                      onChange={(e) =>
                        setQuoteForm((prev) => ({
                          ...prev,
                          items: prev.items.map((row, rowIndex) =>
                            rowIndex === index ? { ...row, amount: e.target.value } : row
                          ),
                        }))
                      }
                      placeholder="Tutar"
                      className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setQuoteForm((prev) => ({
                    ...prev,
                    items: [...prev.items, { label: "", amount: "" }],
                  }))
                }
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white/80"
              >
                Kalem ekle
              </button>
              <button type="submit" className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white">
                Teklif oluştur
              </button>
            </form>

            <div className="grid gap-4">
              {quotes.length === 0 ? (
                <div className="rounded-[20px] border border-slate-700 bg-slate-800 p-6 text-slate-400">
                  Henüz teklif yok.
                </div>
              ) : (
                quotes.map((quote) => (
                  <div key={quote.id} className="rounded-[20px] border border-slate-700 bg-slate-800 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-xl font-bold text-white">{quote.title}</div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{quote.description}</p>
                      </div>
                      <div className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300">
                        {quote.status}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {quote.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
                          <span>{item.label}</span>
                          <span className="font-semibold">{formatAmount(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-lg font-bold text-white">{formatAmount(quote.totalAmount)}</div>
                      {quote.status === "draft" ? (
                        <button
                          onClick={() => handlePublishQuote(quote.id)}
                          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Müşteriye yayınla
                        </button>
                      ) : null}
                    </div>
                    {quote.customerNote ? (
                      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                        Müşteri notu: {quote.customerNote}
                      </div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={handleCreatePayment} className="space-y-4 rounded-[20px] border border-slate-700 bg-slate-800 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Yeni Ödeme Kaydı</div>
              <input
                type="text"
                value={paymentForm.title}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ödeme başlığı"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <textarea
                rows={3}
                value={paymentForm.description}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Ödeme açıklaması"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="Tutar"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <input
                type="date"
                value={paymentForm.dueDate}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              />
              <select
                value={paymentForm.quoteId}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, quoteId: e.target.value }))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
              >
                <option value="">Teklife bağlama</option>
                {publishedQuotes.map((quote) => (
                  <option key={quote.id} value={quote.id}>
                    {quote.title}
                  </option>
                ))}
              </select>
              <button type="submit" className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white">
                Ödeme kaydı oluştur
              </button>
            </form>

            <div className="grid gap-4">
              {payments.length === 0 ? (
                <div className="rounded-[20px] border border-slate-700 bg-slate-800 p-6 text-slate-400">
                  Henüz ödeme kaydı yok.
                </div>
              ) : (
                payments.map((payment) => (
                  <div key={payment.id} className="rounded-[20px] border border-slate-700 bg-slate-800 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-xl font-bold text-white">{payment.title}</div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{payment.description}</p>
                      </div>
                      <div className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300">
                        {payment.status}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
                        <div className="text-lg font-bold text-white">{formatAmount(payment.amount)}</div>
                        {payment.dueDate ? (
                          <div className="mt-2 text-sm text-slate-400">Son tarih: {formatDate(payment.dueDate)}</div>
                        ) : null}
                        <div className="mt-3 text-xs leading-6 text-slate-400">
                          {payment.iban.accountName} • {payment.iban.bankName}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
                        <div className="text-sm text-slate-300">Müşteri bildirimi</div>
                        <div className="mt-2 text-sm text-slate-400">
                          {payment.customerReference || "Henüz bildirim yok"}
                        </div>
                        {payment.customerNote ? (
                          <div className="mt-2 text-xs leading-6 text-slate-400">{payment.customerNote}</div>
                        ) : null}
                        {payment.proofFileName ? (
                          <div className="mt-2 text-xs leading-6 text-slate-400">Dekont: {payment.proofFileName}</div>
                        ) : null}
                        {proofUrlByPaymentId.get(payment.id) ? (
                          <a
                            href={proofUrlByPaymentId.get(payment.id)!}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-white/80"
                          >
                            Dekontu aç
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={paymentReview[payment.id] ?? payment.adminNote}
                      onChange={(e) =>
                        setPaymentReview((prev) => ({
                          ...prev,
                          [payment.id]: e.target.value,
                        }))
                      }
                      placeholder="Yönetici notu"
                      className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                    />

                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleReviewPayment(payment.id, "confirmed")}
                        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Ödemeyi onayla
                      </button>
                      <button
                        onClick={() => handleReviewPayment(payment.id, "rejected")}
                        className="rounded-lg border border-rose-400/25 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200"
                      >
                        Revizyona gönder
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminApplicationDetailPage;
