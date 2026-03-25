"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ServiceArea =
  | "Web Sitesi Tasarımı"
  | "Google & SEO Çalışmaları"
  | "Sosyal Medya Yönetimi"
  | "Dijital Reklam Yönetimi"
  | "Mobil Uygulama Geliştirme"
  | "İş Geliştirme Danışmanlığı"
  | "Logo Tasarımı";

type SessionCustomer = {
  id: string;
  email: string;
  fullName: string;
};

const SERVICE_OPTIONS: ServiceArea[] = [
  "Web Sitesi Tasarımı",
  "Google & SEO Çalışmaları",
  "Sosyal Medya Yönetimi",
  "Dijital Reklam Yönetimi",
  "Mobil Uygulama Geliştirme",
  "İş Geliştirme Danışmanlığı",
  "Logo Tasarımı",
];

export default function MusteriYeniTalepPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<SessionCustomer | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceArea, setServiceArea] = useState<ServiceArea | "">("");
  const [details, setDetails] = useState("");

  const completionRatio = useMemo(() => {
    const fields = [companyName, phone, serviceArea, details];
    const completed = fields.filter((field) => String(field).trim().length > 0).length;
    return Math.round((completed / fields.length) * 100);
  }, [companyName, phone, serviceArea, details]);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      try {
        const res = await fetch("/api/customer/me", { cache: "no-store" });
        if (res.status === 401) {
          router.replace("/musteri/giris?from=/musteri/yeni-talep");
          return;
        }

        const data = (await res.json()) as { customer?: SessionCustomer; message?: string };
        if (!res.ok || !data.customer) {
          router.replace("/musteri/giris?from=/musteri/yeni-talep");
          return;
        }

        if (mounted) {
          setCustomer(data.customer);
        }
      } finally {
        if (mounted) {
          setLoadingSession(false);
        }
      }
    };

    void loadSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!serviceArea) {
      setErrorMessage("Lütfen bir hizmet alanı seçin.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/customer/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          phone,
          serviceArea,
          details,
        }),
      });

      const data = (await response.json()) as { id?: string; referenceNo?: string; message?: string };

      if (!response.ok) {
        setErrorMessage(data.message ?? "Talep oluşturulamadı.");
        return;
      }

      setSuccessMessage(
        data.referenceNo
          ? `Yeni talebiniz oluşturuldu. Takip numaranız: ${data.referenceNo}`
          : "Yeni talebiniz oluşturuldu."
      );

      setCompanyName("");
      setPhone("");
      setServiceArea("");
      setDetails("");
    } catch {
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
          Aktif Müşteri Alanı
        </div>
        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
          Yeni talebinizi
          <span className="brand-gradient block pt-2">doğrudan müşteri hesabınızdan oluşturun.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
          Bu ekran sadece aktif ve onaylanmış müşteri hesapları içindir. Yeni ihtiyaç, teklif ya da ek hizmet
          taleplerinizi portal geçmişinize bağlı şekilde buradan açabilirsiniz.
        </p>
      </div>

      <div className="mt-8 grid max-w-6xl gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),linear-gradient(180deg,rgba(15,23,37,0.96),rgba(10,16,28,0.96))] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
        >
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Portal Talep Akışı
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Hesabınıza bağlı, doğrulanmış yeni talep oluşturun
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/62">
                {loadingSession
                  ? "Oturum doğrulanıyor..."
                  : `Talep aktif müşteri hesabınıza bağlı açılacak: ${customer?.email ?? "-"}`}
              </p>
            </div>
            <div className="min-w-48 rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">Tamamlanma</div>
              <div className="mt-2 text-3xl font-black text-white">%{completionRatio}</div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200"
                  style={{ width: `${completionRatio}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              value={customer?.fullName ?? ""}
              readOnly
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 outline-none"
              placeholder="Ad Soyad"
            />
            <input
              required
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="Talep için firma / proje adı"
            />
            <input
              required
              type="email"
              value={customer?.email ?? ""}
              readOnly
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 outline-none"
              placeholder="E-posta"
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              placeholder="Telefon"
            />
          </div>

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

          <textarea
            required
            rows={7}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
            placeholder="İhtiyacınızı, kapsamı, varsa hedef tarihi ve beklediğiniz sonucu detaylandırın."
          />

          {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}
          {successMessage ? <p className="mt-3 text-sm text-emerald-200">{successMessage}</p> : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting || loadingSession}
              className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Talep oluşturuluyor..." : "Talebi Oluştur"}
            </button>
            <Link
              href="/musteri/panel"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Portala Geri Dön
            </Link>
          </div>
        </form>

        <aside className="rounded-[32px] border border-white/10 bg-[#0d1421]/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-300">Neden Ayrı?</p>
          <div className="mt-5 space-y-4">
            {[
              ["01", "Aday başvuru değil", "Bu form yeni müşteri başvurusu değil, aktif müşteri talebidir."],
              ["02", "Hesaba bağlı kayıt", "Açılan talep doğrudan portal geçmişinize ve müşteri hesabınıza işlenir."],
              ["03", "Teklif ve operasyon", "Buradan açılan talepler teklif, ödeme ve operasyon akışına bağlanır."],
            ].map(([index, title, text]) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-sm font-black text-emerald-200">
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
        </aside>
      </div>
    </section>
  );
}
