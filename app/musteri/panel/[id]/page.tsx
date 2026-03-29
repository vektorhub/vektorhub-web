"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  CreditCard,
  Download,
  FileText,
  FileUp,
  MessageSquare,
  Send,
  ShieldCheck,
  Trash2,
} from "lucide-react";
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

type Customer = {
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
  lastLoginAt: string;
};

type Application = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  description: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(amount);
}

function CustomerProfilePanel({ customer }: { customer: Customer | null }) {
  if (!customer) {
    return null;
  }

  const companyLabel = customer.companyName || customer.legalCompanyName || "Belirtilmedi";
  const legalLabel = customer.legalCompanyName || "Belirtilmedi";
  const taxLabel =
    customer.taxOffice || customer.taxNumber
      ? `${customer.taxOffice || "-"} / ${customer.taxNumber || "-"}`
      : "Belirtilmedi";

  const infoItems = [
    { label: "Ad Soyad", value: customer.fullName || "Belirtilmedi" },
    { label: "Firma", value: companyLabel },
    { label: "Resmi Unvan", value: legalLabel },
    { label: "Yetkili", value: customer.contactTitle || "Belirtilmedi" },
    { label: "Telefon", value: customer.phone || "Belirtilmedi" },
    { label: "E-posta", value: customer.email || "Belirtilmedi" },
    { label: "Fatura E-postasi", value: customer.billingEmail || customer.email || "Belirtilmedi" },
    { label: "Vergi", value: taxLabel },
    { label: "Acik Adres", value: customer.address || "Belirtilmedi", wide: true },
    { label: "Son Giris", value: formatDate(customer.lastLoginAt) },
  ];

  return (
    <div className="sticky top-4 z-20 rounded-[32px] border border-emerald-400/15 bg-[linear-gradient(160deg,rgba(8,15,28,0.98),rgba(13,27,35,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200/85">
            Musteri Bilgileri
          </div>
          <h2 className="mt-2 text-2xl font-black text-white">{customer.fullName}</h2>
          <p className="mt-2 text-sm text-white/62">
            Portal aktif musteri hesabi. Parola guvenlik nedeniyle gosterilmez.
          </p>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          Aktif Hesap
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className={`rounded-[24px] border border-white/10 bg-white/[0.03] p-4 ${
              item.wide ? "md:col-span-2 xl:col-span-3" : ""
            }`}
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{item.label}</div>
            <div className="mt-2 text-sm font-semibold leading-7 text-white/86">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteStatusBadge({ status }: { status: Quote["status"] }) {
  const map: Record<Quote["status"], string> = {
    draft: "border-white/10 bg-white/5 text-white/70",
    published: "border-sky-400/30 bg-sky-500/10 text-sky-200",
    accepted: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  };

  const label: Record<Quote["status"], string> = {
    draft: "Taslak",
    published: "Yayınlandı",
    accepted: "Onaylandı",
    rejected: "Reddedildi",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: Payment["status"] }) {
  const map: Record<Payment["status"], string> = {
    pending: "border-amber-400/30 bg-amber-500/10 text-amber-200",
    notice_sent: "border-sky-400/30 bg-sky-500/10 text-sky-200",
    confirmed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    rejected: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  };

  const label: Record<Payment["status"], string> = {
    pending: "Ödeme bekleniyor",
    notice_sent: "Bildirim gönderildi",
    confirmed: "Ödeme onaylandı",
    rejected: "Tekrar kontrol gerekli",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  );
}

function DetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = params.id as string;
  const requestedTab = searchParams.get("tab");
  const initialTab =
    requestedTab === "documents" ||
    requestedTab === "quotes" ||
    requestedTab === "payments" ||
    requestedTab === "messages"
      ? requestedTab
      : "messages";

  const [application, setApplication] = useState<Application | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "documents" | "quotes" | "payments">(
    initialTab
  );
  const [uploading, setUploading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [paymentForms, setPaymentForms] = useState<
    Record<string, { reference: string; note: string; proofDocumentId: string; proofFileName: string }>
  >({});

  const fetchData = useCallback(async () => {
    try {
      const [profileRes, msgRes, docRes, quoteRes, paymentRes] = await Promise.all([
        fetch("/api/customer/me"),
        fetch(`/api/customer/applications/${applicationId}/messages`),
        fetch(`/api/customer/applications/${applicationId}/documents`),
        fetch(`/api/customer/applications/${applicationId}/quotes`),
        fetch(`/api/customer/applications/${applicationId}/payments`),
      ]);

      if (profileRes.status === 401) {
        router.replace(`/musteri/giris?from=/musteri/panel/${applicationId}`);
        return;
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setCustomer(profileData.customer ?? null);
        const nextApplication = profileData.applications.find((item: Application) => item.id === applicationId);
        setApplication(nextApplication ?? null);
      }

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
    } catch {
      setError("Veriler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [applicationId, router]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      requestedTab === "messages" ||
      requestedTab === "documents" ||
      requestedTab === "quotes" ||
      requestedTab === "payments"
    ) {
      setActiveTab(requestedTab);
    }
  }, [requestedTab]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setError("");

    try {
      const res = await fetch(`/api/customer/applications/${applicationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: messageText }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Mesaj gönderilemedi.");
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setMessageText("");
    } catch {
      setError("Mesaj gönderilemedi.");
    }
  };

  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", "diger");

      const res = await fetch(`/api/customer/applications/${applicationId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Dosya yüklenemedi.");
        return;
      }

      const data = await res.json();
      setDocuments((prev) => [...prev, data.document]);
    } catch {
      setError("Dosya yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Dokümanı silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/customer/applications/${applicationId}/documents`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Doküman silinemedi.");
        return;
      }

      setDocuments((prev) => prev.filter((item) => item.id !== documentId));
    } catch {
      setError("Doküman silinemedi.");
    }
  };

  const handleUploadPaymentProof = async (paymentId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", "diger");

    const res = await fetch(`/api/customer/applications/${applicationId}/documents`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message ?? "Dekont yüklenemedi.");
    }

    const data = await res.json();
    setDocuments((prev) => [...prev, data.document]);
    setPaymentForms((prev) => ({
      ...prev,
      [paymentId]: {
        reference: prev[paymentId]?.reference ?? "",
        note: prev[paymentId]?.note ?? "",
        proofDocumentId: data.document.id,
        proofFileName: data.document.fileName,
      },
    }));
  };

  const handleQuoteDecision = async (quoteId: string, status: "accepted" | "rejected") => {
    const note = prompt(
      status === "accepted"
        ? "İsterseniz kısa bir not ekleyebilirsiniz."
        : "Reddetme nedeninizi kısa not olarak yazabilirsiniz."
    );

    try {
      const res = await fetch(`/api/customer/applications/${applicationId}/quotes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId,
          status,
          customerNote: note ?? "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Teklif yanıtı kaydedilemedi.");
        return;
      }

      const data = await res.json();
      setQuotes((prev) => prev.map((item) => (item.id === quoteId ? data.quote : item)));
    } catch {
      setError("Teklif yanıtı kaydedilemedi.");
    }
  };

  const handlePaymentNotice = async (paymentId: string) => {
    const current = paymentForms[paymentId] ?? {
      reference: "",
      note: "",
      proofDocumentId: "",
      proofFileName: "",
    };

    try {
      const res = await fetch(`/api/customer/applications/${applicationId}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          customerReference: current.reference,
          customerNote: current.note,
          proofDocumentId: current.proofDocumentId || null,
          proofFileName: current.proofFileName,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Ödeme bildirimi kaydedilemedi.");
        return;
      }

      const data = await res.json();
      setPayments((prev) => prev.map((item) => (item.id === paymentId ? data.payment : item)));
    } catch {
      setError("Ödeme bildirimi kaydedilemedi.");
    }
  };

  const latestQuote = useMemo(
    () => quotes.find((item) => item.status === "published") ?? quotes[0] ?? null,
    [quotes]
  );
  const latestPayment = payments[0] ?? null;
  const quoteWaitingMessage = latestPayment
    ? "Bu kayıt için ödeme planı açılmış durumda. Teklif detayları alt sekmelerde görüntülenebilir."
    : application?.status === "Teklif Hazırlanıyor"
      ? "Bu kayıt şu anda teklif hazırlık aşamasında. Teklif paylaşılır paylaşılmaz burada toplam tutar ve onay alanı görünecek."
      : "Bu kayıt için henüz müşteriye açılmış bir teklif bulunmuyor. Önce teklif paylaşımı yapıldığında bu alan dolacak.";
  const paymentWaitingMessage = latestQuote
    ? "Bu kayıt için henüz ödeme adımı açılmadı. Yönetici ödeme planını tanımladığında IBAN, tutar ve dekont yükleme alanı burada görünecek."
    : "Şu anda sizden ödeme beklenmiyor. Önce teklif ve ardından ödeme planı oluşturulduğunda IBAN bilgileri ve ödeme adımları burada açılacak.";

  if (loading) {
    return <div className="p-8 text-white/70">Müşteri portalı hazırlanıyor...</div>;
  }

  if (!application) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-black">Talep bulunamadı</h1>
        <Link href="/musteri/panel" className="mt-4 inline-block text-orange-300">
          Portala dön
        </Link>
      </div>
    );
  }

  return (
    <div className="page-content-template min-h-[calc(100vh-7rem)] pb-16 pt-5 text-white">
      <div className="grid gap-5">
        <CustomerProfilePanel customer={customer} />
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <button
                onClick={() => router.back()}
                className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80"
              >
                <ChevronLeft className="h-4 w-4" />
                Geri dön
              </button>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Talep Detayı
              </div>
              <h1 className="mt-2 text-3xl font-black">{application.referenceNumber}</h1>
              <p className="mt-2 text-sm text-white/64">{application.serviceType}</p>
            </div>

            <button
              onClick={() => setShowQuickActions(true)}
              className="rounded-2xl border border-orange-300/25 bg-orange-500/12 px-4 py-2.5 text-sm font-semibold text-orange-100"
            >
              Aksiyonlar
            </button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Durum</div>
                  <div className="mt-2 text-sm font-semibold text-white">{application.status}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Başlangıç</div>
                  <div className="mt-2 text-sm font-semibold text-white">{formatDate(application.createdAt)}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Son güncelleme</div>
                  <div className="mt-2 text-sm font-semibold text-white">{formatDate(application.updatedAt)}</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/70">{application.description}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/68">
                {application.note}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                  <ShieldCheck className="h-4 w-4" />
                  Teklif Özeti
                </div>
                {latestQuote ? (
                  <>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-lg font-black text-white">{latestQuote.title}</div>
                      <QuoteStatusBadge status={latestQuote.status} />
                    </div>
                    <div className="mt-3 text-sm text-white/68">{formatAmount(latestQuote.totalAmount)}</div>
                  </>
                ) : (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm leading-6 text-white/62">{quoteWaitingMessage}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-6 text-white/50">
                      Durum: Teklif görünmeden ödeme ve onay adımı başlamaz.
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                  <CreditCard className="h-4 w-4" />
                  Ödeme Özeti
                </div>
                {latestPayment ? (
                  <>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-lg font-black text-white">{latestPayment.title}</div>
                      <PaymentStatusBadge status={latestPayment.status} />
                    </div>
                    <div className="mt-3 text-sm text-white/68">{formatAmount(latestPayment.amount)}</div>
                  </>
                ) : (
                  <div className="mt-3 space-y-3">
                    <p className="text-sm leading-6 text-white/62">{paymentWaitingMessage}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-6 text-white/50">
                      Durum: Ödeme açıldığında IBAN, açıklama ve dekont yükleme alanı otomatik olarak burada görünecek.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <ApplicationTimeline
          status={application.status}
          createdAt={application.createdAt}
          updatedAt={application.updatedAt}
        />

        {error ? (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 border-b border-white/10 pb-2">
          {([
            ["messages", `Mesajlar (${messages.length})`, MessageSquare],
            ["documents", `Dokümanlar (${documents.length})`, FileText],
            ["quotes", `Teklifler (${quotes.length})`, ShieldCheck],
            ["payments", `Ödeme (${payments.length})`, CreditCard],
          ] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === key
                  ? "bg-orange-500 text-white"
                  : "bg-white/[0.04] text-white/65 hover:bg-white/[0.08]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "messages" ? (
          <div className="space-y-5">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/56">
                    Henüz mesaj yok.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-2xl border px-4 py-3 ${
                        msg.senderType === "customer"
                          ? "ml-8 border-sky-400/20 bg-sky-500/10"
                          : "mr-8 border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[11px] text-white/50">
                        <span className="font-semibold text-white/84">{msg.senderName}</span>
                        <span>{formatDate(msg.createdAt)}</span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/80">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                Gönder
              </button>
            </form>
          </div>
        ) : null}

        {activeTab === "documents" ? (
          <div className="space-y-5">
            <div className="rounded-[30px] border-2 border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
              <input
                id="customer-upload"
                type="file"
                className="hidden"
                onChange={handleUploadDocument}
                disabled={uploading}
              />
              <label htmlFor="customer-upload" className="cursor-pointer">
                <FileUp className="mx-auto h-8 w-8 text-white/50" />
                <div className="mt-3 text-sm font-semibold text-white">
                  {uploading ? "Yükleniyor..." : "Dosya yükle"}
                </div>
                <div className="mt-1 text-xs text-white/45">PDF, Word, Excel ve görsel dosyaları</div>
              </label>
            </div>

            <div className="grid gap-3">
              {documents.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/56">
                  Henüz doküman yok.
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{doc.fileName}</div>
                      <div className="mt-1 text-xs text-white/45">
                        {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {formatDate(doc.uploadedAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={doc.url} download={doc.fileName} className="rounded-xl border border-white/10 p-2">
                        <Download className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="rounded-xl border border-rose-400/20 p-2 text-rose-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {activeTab === "quotes" ? (
          <div className="grid gap-4">
            {quotes.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/56">
                Henüz hazırlanmış teklif bulunmuyor.
              </div>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-black text-white">{quote.title}</div>
                      <p className="mt-2 text-sm leading-7 text-white/66">{quote.description}</p>
                    </div>
                    <QuoteStatusBadge status={quote.status} />
                  </div>

                  <div className="mt-4 grid gap-2">
                    {quote.items.map((item, index) => (
                      <div key={`${quote.id}-${index}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <span className="text-sm text-white/74">{item.label}</span>
                        <span className="text-sm font-semibold text-white">{formatAmount(item.amount)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-300/15 bg-orange-500/8 px-4 py-3">
                    <div className="text-sm text-white/60">Toplam teklif tutarı</div>
                    <div className="text-xl font-black text-white">{formatAmount(quote.totalAmount)}</div>
                  </div>

                  {quote.customerNote ? (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/68">
                      Sizin notunuz: {quote.customerNote}
                    </div>
                  ) : null}

                  {quote.status === "published" ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleQuoteDecision(quote.id, "accepted")}
                        className="rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        Teklifi onayla
                      </button>
                      <button
                        onClick={() => handleQuoteDecision(quote.id, "rejected")}
                        className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200"
                      >
                        Geri bildirimle reddet
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        ) : null}

        {activeTab === "payments" ? (
          <div className="grid gap-4">
            {payments.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/56">
                Henüz oluşturulmuş ödeme kaydı bulunmuyor.
              </div>
            ) : (
              payments.map((payment) => {
                const form = paymentForms[payment.id] ?? {
                  reference: "",
                  note: "",
                  proofDocumentId: payment.proofDocumentId ?? "",
                  proofFileName: payment.proofFileName ?? "",
                };
                return (
                  <div key={payment.id} className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-xl font-black text-white">{payment.title}</div>
                        <p className="mt-2 text-sm leading-7 text-white/66">{payment.description}</p>
                      </div>
                      <PaymentStatusBadge status={payment.status} />
                    </div>

                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-orange-300">IBAN ile ödeme</div>
                        <div className="mt-3 text-sm text-white/70">Hesap sahibi: {payment.iban.accountName}</div>
                        <div className="mt-2 text-sm text-white/70">Banka: {payment.iban.bankName}</div>
                        <div className="mt-2 text-sm text-white/70">Şube: {payment.iban.branchName}</div>
                        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b1322] px-4 py-3 font-mono text-sm text-white">
                          {payment.iban.iban}
                        </div>
                        <p className="mt-3 text-xs leading-6 text-white/50">{payment.iban.paymentNote}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-orange-300">Ödeme bildirimi</div>
                        <div className="mt-3 text-2xl font-black text-white">{formatAmount(payment.amount)}</div>
                        {payment.dueDate ? (
                          <div className="mt-2 text-sm text-white/58">Son tarih: {formatDate(payment.dueDate)}</div>
                        ) : null}

                        <input
                          type="text"
                          value={form.reference}
                          onChange={(e) =>
                            setPaymentForms((prev) => ({
                              ...prev,
                              [payment.id]: { ...form, reference: e.target.value },
                            }))
                          }
                          placeholder="Dekont no / açıklama / referans"
                          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                        />
                        <textarea
                          rows={3}
                          value={form.note}
                          onChange={(e) =>
                            setPaymentForms((prev) => ({
                              ...prev,
                              [payment.id]: { ...form, note: e.target.value },
                            }))
                          }
                          placeholder="Ödeme notu"
                          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                        />
                        <label className="mt-3 flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
                          <span>{form.proofFileName || "Dekont / dijital slip yükle"}</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              try {
                                await handleUploadPaymentProof(payment.id, file);
                              } catch (uploadError) {
                                setError(
                                  uploadError instanceof Error
                                    ? uploadError.message
                                    : "Dekont yüklenemedi."
                                );
                              } finally {
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </label>

                        <button
                          onClick={() => handlePaymentNotice(payment.id)}
                          className="mt-3 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
                        >
                          Ödeme bildirimini gönder
                        </button>
                        {payment.customerReference ? (
                          <div className="mt-3 text-xs leading-6 text-white/55">
                            Son bildirim: {payment.customerReference}
                          </div>
                        ) : null}
                        {payment.adminNote ? (
                          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-white/60">
                            Yönetici notu: {payment.adminNote}
                          </div>
                        ) : null}
                        {payment.proofFileName ? (
                          <div className="mt-3 text-xs leading-6 text-white/55">
                            Son yüklenen dekont: {payment.proofFileName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>

      <QuickActionsDialog
        applicationId={applicationId}
        currentStatus={application.status}
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        onSuccess={() => {
          void fetchData();
        }}
      />
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white/70">Yükleniyor...</div>}>
      <DetailPageContent />
    </Suspense>
  );
}
