"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

type ServiceArea =
  | "Web sitesi ve dijital görünüm"
  | "Mobil uygulama"
  | "Dijital tanıtım ve içerik"
  | "Özel çözüm talebi";

type SubmitResult = {
  verificationRequired: true;
  verificationId: string;
  maskedEmail: string;
  expiresAt: string;
  deliveryMode: "smtp" | "preview";
  previewUrl?: string;
  message: string;
};

type VerifiedResult = {
  id?: string;
  referenceNo: string;
  submittedAt: string;
  status: string;
  note: string;
};

type SessionCustomer = {
  id: string;
  email: string;
  fullName: string;
};

type SessionProfileResponse = {
  customer: SessionCustomer;
};

const SERVICE_OPTIONS: ServiceArea[] = [
  "Web sitesi ve dijital görünüm",
  "Mobil uygulama",
  "Dijital tanıtım ve içerik",
  "Özel çözüm talebi",
];

export default function IlkBasvuruPage() {
  const router = useRouter();
  const [authenticatedCustomer, setAuthenticatedCustomer] = useState<SessionCustomer | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyErrorMessage, setVerifyErrorMessage] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [verifiedResult, setVerifiedResult] = useState<VerifiedResult | null>(null);
  const [verificationCode, setVerificationCode] = useState("");

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceArea, setServiceArea] = useState<ServiceArea | "">("");
  const [details, setDetails] = useState("");

  const completionRatio = useMemo(() => {
    const fields = [fullName, companyName, phone, email, serviceArea, details];
    const completed = fields.filter((field) => String(field).trim().length > 0).length;
    return Math.round((completed / fields.length) * 100);
  }, [companyName, details, email, fullName, phone, serviceArea]);

  const detailLength = details.trim().length;

  const submittedAtText = useMemo(() => {
    if (!result?.expiresAt) {
      return "";
    }

    return new Date(result.expiresAt).toLocaleString("tr-TR");
  }, [result?.expiresAt]);

  const confirmedAtText = useMemo(() => {
    if (!verifiedResult?.submittedAt) {
      return "";
    }

    return new Date(verifiedResult.submittedAt).toLocaleString("tr-TR");
  }, [verifiedResult?.submittedAt]);

  useEffect(() => {
    let isMounted = true;

    const loadCustomerSession = async () => {
      try {
        const response = await fetch("/api/customer/me", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as SessionProfileResponse;
        if (!isMounted || !data.customer) {
          return;
        }

        setAuthenticatedCustomer(data.customer);
        setFullName((current) => current || data.customer.fullName);
        setEmail((current) => current || data.customer.email);
      } catch {
        // Public first-application flow continues without session.
      } finally {
        if (isMounted) {
          setAuthResolved(true);
        }
      }
    };

    void loadCustomerSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!serviceArea) {
      setErrorMessage("Lütfen bir hizmet alanı seçin.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const endpoint = authenticatedCustomer
        ? "/api/customer/applications"
        : "/api/customer-applications";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          companyName,
          phone,
          email,
          serviceArea,
          details,
          website: "",
        }),
      });

      const data = (await response.json()) as
        | SubmitResult
        | VerifiedResult
        | { message?: string };

      if (authenticatedCustomer) {
        if (!response.ok || !("referenceNo" in data)) {
          const message = "message" in data && data.message ? data.message : "Talep gönderilemedi.";
          setErrorMessage(message);
          return;
        }

        router.replace(data.id ? `/musteri/panel/${data.id}` : "/musteri/panel");
        setResult(null);
        setVerifyErrorMessage("");
        return;
      }

      if (!response.ok || !("verificationRequired" in data)) {
        const message = "message" in data && data.message ? data.message : "Başvuru gönderilemedi.";
        setErrorMessage(message);
        return;
      }

      setResult(data);
      setSubmitted(true);
      setVerifyErrorMessage("");
    } catch {
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!result?.verificationId) {
      setVerifyErrorMessage("Doğrulama bilgisi bulunamadı. Formu yeniden gönderin.");
      return;
    }

    if (!/^\d{6}$/.test(verificationCode.trim())) {
      setVerifyErrorMessage("Lütfen maildeki 6 haneli kodu girin.");
      return;
    }

    setIsVerifying(true);
    setVerifyErrorMessage("");

    try {
      const response = await fetch("/api/customer-applications/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationId: result.verificationId,
          code: verificationCode.trim(),
        }),
      });

      const data = (await response.json()) as VerifiedResult | { message?: string };

      if (!response.ok || !("referenceNo" in data)) {
        const message = "message" in data && data.message ? data.message : "Kod doğrulanamadı.";
        setVerifyErrorMessage(message);
        return;
      }

      setVerifiedResult(data);
    } catch {
      setVerifyErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <h1 className="section-title">İlk Kez Başvuru</h1>
      <p className="section-text mt-5 max-w-3xl">
        {authenticatedCustomer
          ? "Oturumunuz açık. Bu formdan yeni talebinizi doğrudan oluşturabilirsiniz; yeniden mail doğrulaması istenmez."
          : "İlk görüşme için kısa bilgilerinizi paylaşın. Talebiniz sisteme alındığında size bir takip numarası oluşturulur."}
      </p>

      {!submitted ? (
        <div className="mt-8 grid max-w-6xl gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_30%),linear-gradient(180deg,rgba(15,23,37,0.96),rgba(10,16,28,0.96))] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
          >
          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            name="website"
            value=""
            readOnly
            aria-hidden="true"
          />

            <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
                  Premium Başvuru Akışı
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">Talebinizi net, hızlı ve takip edilebilir biçimde iletin</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">
                  {authenticatedCustomer
                    ? "Hesabınız doğrulanmış durumda. Talep doğrudan hesabınıza bağlanır ve yönetici panelinde anında görünür."
                    : "Form tamamlandığında sistem önce e-posta adresinizi doğrular. Mail onaylandıktan sonra takip numarası üretilir ve süreç görünür hale gelir."}
                </p>
              </div>
              <div className="min-w-48 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">Tamamlanma</div>
                <div className="mt-2 text-3xl font-black text-white">%{completionRatio}</div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-200" style={{ width: `${completionRatio}%` }} />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={Boolean(authenticatedCustomer)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
              placeholder="Ad Soyad"
            />
            <input
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
              placeholder="Firma Adı"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
              placeholder="Telefon"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={Boolean(authenticatedCustomer)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
              placeholder="E-posta"
            />
            </div>

            {authenticatedCustomer ? (
              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                Giriş yapılan hesap: {authenticatedCustomer.email}. Bu talep doğrudan müşteri hesabınıza bağlanacak.
              </div>
            ) : authResolved ? null : (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/55">
                Oturum kontrol ediliyor...
              </div>
            )}

            <select
              required
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              value={serviceArea}
              onChange={(event) => setServiceArea(event.target.value as ServiceArea | "")}
            >
              <option value="" disabled style={{ color: "#64748b", backgroundColor: "#ffffff" }}>
                İlgilendiğiniz hizmet alanı
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option} style={{ color: "#0f172a", backgroundColor: "#ffffff" }}>
                  {option}
                </option>
              ))}
            </select>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">İş ihtiyacınız</h3>
                  <p className="text-xs text-white/45">Ne istediğinizi, hedefinizi ve önceliğinizi yazın.</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${detailLength >= 30 ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200" : "border-white/10 bg-white/5 text-white/50"}`}>
                  {detailLength} karakter
                </span>
              </div>
              <textarea
                required
                rows={6}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
                placeholder="Örn: Mobil uygulama ile satış sonrası destek, müşteri girişi, teklif süreci ve yönetim panelini tek akışta toplamak istiyoruz."
              />
            </div>

            <p className="mt-4 text-[12px] leading-6 text-white/56">
              Başvuru formunu gönderdiğinizde iletişim bilgileriniz yalnızca talep sürecinin yürütülmesi amacıyla işlenir.
            </p>

            {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Gönderiliyor..."
                : authenticatedCustomer
                ? "Talebi Doğrudan Oluştur"
                : "Başvuru Oluştur"}
            </button>
          </form>

          <aside className="rounded-[32px] border border-white/10 bg-[#0d1421]/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Süreç Akışı</p>
            <div className="mt-5 space-y-4">
              {[
                ["01", "Başvuru alınıyor", "Bilgileriniz sisteme kaydolur ve takip no oluşur."],
                ["02", "Ön değerlendirme", "Talep kapsamı, öncelik ve uygun çözüm tipi netleşir."],
                ["03", "Teklif ve plan", "Net aksiyon önerisi ve iş akışı hazırlanır."],
              ].map(([index, title, text]) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-sm font-black text-orange-200">
                      {index}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-orange-400/15 bg-orange-500/8 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">Premium Not</div>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Ne kadar net brief verirseniz ilk dönüş kalitesi o kadar yükselir. Amaç hızlı değil, doğru başlangıçtır.
              </p>
            </div>
          </aside>
        </div>
      ) : verifiedResult ? (
        <div className="mt-8 max-w-4xl rounded-[32px] border border-emerald-400/20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.24),transparent_30%),linear-gradient(135deg,rgba(16,185,129,0.12),rgba(6,95,70,0.12))] p-6 shadow-[0_20px_40px_rgba(16,185,129,0.14)]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Doğrulama Tamamlandı
          </div>
          <h2 className="mt-3 text-[26px] font-black leading-tight text-white">
            Takip Numaranız: {verifiedResult.referenceNo}
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-white/82">{verifiedResult.note}</p>
          <p className="mt-2 text-[12px] text-white/64">Onay zamanı: {confirmedAtText}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Takip No</div>
              <div className="mt-2 text-lg font-black text-white">{verifiedResult.referenceNo}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Başlangıç Durumu</div>
              <div className="mt-2 text-lg font-black text-white">{verifiedResult.status}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Sonraki Adım</div>
              <div className="mt-2 text-lg font-black text-white">Portalden takip et</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/musteri-girisi/durum-sorgula"
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Durum Sorgulama Ekranına Git
            </Link>
            <Link
              href="/musteri-girisi"
              className="rounded-2xl border border-emerald-300/30 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/28"
            >
              Müşteri Portalına Dön
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 max-w-4xl rounded-[32px] border border-orange-400/20 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_30%),linear-gradient(135deg,rgba(255,106,0,0.18),rgba(255,138,51,0.12))] p-6 shadow-[0_20px_40px_rgba(255,106,0,0.14)]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-orange-200">
            Doğrulama Bekleniyor
          </div>
          <h2 className="mt-3 text-[26px] font-black leading-tight text-white">
            E-posta onayı gönderildi
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-white/82">{result?.message}</p>
          <p className="mt-2 text-[12px] text-white/64">Bağlantı son geçerlilik zamanı: {submittedAtText}</p>
          <p className="mt-2 text-[12px] leading-6 text-white/58">
            Maildeki 6 haneli kodu aşağıya yazarak bu sayfadan devam edebilirsiniz.
          </p>

          <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4">
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/52">
              Doğrulama Kodu
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                placeholder="6 haneli kod"
                className="flex-1 min-w-40 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={isVerifying}
                className="rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isVerifying ? "Doğrulanıyor..." : "Kodu Onayla"}
              </button>
            </div>
            {verifyErrorMessage ? <p className="mt-2 text-sm text-rose-300">{verifyErrorMessage}</p> : null}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Doğrulama Maili</div>
              <div className="mt-2 text-lg font-black text-white">{result?.maskedEmail}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Durum</div>
              <div className="mt-2 text-lg font-black text-white">Mail Onayı Bekleniyor</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Sonraki Adım</div>
              <div className="mt-2 text-lg font-black text-white">Maildeki bağlantıyı aç</div>
            </div>
          </div>

          {result?.deliveryMode === "preview" && result.previewUrl ? (
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4 text-sm text-yellow-100">
              Geliştirme önizleme bağlantısı:
              <a href={result.previewUrl} className="mt-2 block break-all text-yellow-200 underline">
                {result.previewUrl}
              </a>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/musteri-girisi/durum-sorgula"
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Durum Sorgulama Ekranına Git
            </Link>
            <Link
              href="/musteri-girisi"
              className="rounded-2xl border border-orange-300/30 bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/28"
            >
              Müşteri Portalına Dön
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
