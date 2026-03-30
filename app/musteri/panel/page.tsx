"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { CUSTOMER_SERVICE_CATALOG } from "@/lib/customer-service-catalog";

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
  referenceNo: string;
  serviceArea: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

type ProfileResponse = {
  customer: Customer;
  applications: Application[];
};

const STATUS_ORDER = [
  "Başvuru Alındı",
  "İnceleniyor",
  "Teklif Hazırlanıyor",
  "Tamamlandı",
] as const;

const STATUS_STYLES: Record<string, string> = {
  "Başvuru Alındı": "border-sky-400/30 bg-sky-500/12 text-sky-200",
  "İnceleniyor": "border-amber-400/30 bg-amber-500/12 text-amber-200",
  "Teklif Hazırlanıyor": "border-orange-400/30 bg-orange-500/12 text-orange-200",
  "Tamamlandı": "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
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

function CustomerMiniProfile({ customer }: { customer: Customer | null }) {
  if (!customer) {
    return null;
  }

  const companyLabel = customer.companyName || customer.legalCompanyName || "Belirtilmedi";
  const taxLabel =
    customer.taxOffice || customer.taxNumber
      ? `${customer.taxOffice || "-"} / ${customer.taxNumber || "-"}`
      : "Belirtilmedi";

  const infoItems = [
    { label: "Ad Soyad", value: customer.fullName || "Belirtilmedi" },
    { label: "Firma", value: companyLabel },
    { label: "Telefon", value: customer.phone || "Belirtilmedi" },
    { label: "E-posta", value: customer.email || "Belirtilmedi" },
    { label: "Fatura E-postası", value: customer.billingEmail || customer.email || "Belirtilmedi" },
    { label: "Vergi", value: taxLabel },
    { label: "Açık Adres", value: customer.address || "Belirtilmedi" },
  ];

  return (
    <div className="w-full rounded-[26px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 backdrop-blur-sm sm:min-w-[21rem] sm:w-auto">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/85">
            Müşteri Profili
          </div>
          <div className="mt-2 text-lg font-black text-white">{customer.fullName}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-semibold text-white/52">
            Son giriş: <span className="text-white/78">{formatDate(customer.lastLoginAt)}</span>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Aktif Hesap
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="rounded-[16px] border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/38">
                {item.label}:
              </div>
              <div className="min-w-0 text-[11px] font-semibold leading-4 text-white/82 break-words">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function hoursSince(iso: string) {
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
}

function statusBadgeClass(status: string) {
  return STATUS_STYLES[status] ?? "border-white/20 bg-white/10 text-white/70";
}

function getGreeting(name?: string) {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const base =
    minutes >= 300 && minutes < 600
      ? "Günaydın"
      : minutes >= 600 && minutes < 1110
        ? "Merhaba"
        : minutes >= 1110 && minutes < 1440
          ? "İyi akşamlar"
          : "İyi geceler";
  return name ? `${base}, ${name}` : base;
}

export default function MusteriPanelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/customer/me");
      if (res.status === 401) {
        router.replace("/musteri/giris?from=/musteri/panel");
        return;
      }

      const data = (await res.json()) as ProfileResponse | { message?: string };
      if (!res.ok || !("customer" in data)) {
        setError("message" in data && data.message ? data.message : "Profil yüklenemedi.");
        return;
      }

      setCustomer(data.customer);
      setApplications(data.applications);
    } catch {
      setError("Bağlantı hatası. Veriler alınamadı.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#surec-kayitlari") {
      return;
    }

    const target = document.getElementById("surec-kayitlari");
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [applications.length, loading]);

  const handleLogout = async () => {
    await fetch("/api/customer/session", { method: "DELETE" });
    router.replace("/musteri/giris");
  };

  const summary = useMemo(
    () => ({
      total: applications.length,
      done: applications.filter((a) => a.status === "Tamamlandı").length,
    }),
    [applications]
  );

  const sortedApplications = useMemo(
    () =>
      [...applications].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [applications]
  );

  const latest = sortedApplications[0] ?? null;

  const completionRatio = useMemo(() => {
    if (!summary.total) return 0;
    return Math.round((summary.done / summary.total) * 100);
  }, [summary.done, summary.total]);

  const statusCounts = useMemo(
    () =>
      STATUS_ORDER.map((status) => ({
        status,
        count: applications.filter((app) => app.status === status).length,
      })),
    [applications]
  );

  const greeting = getGreeting(customer?.fullName);

  return (
    <section className="page-content-template min-h-[calc(100vh-10rem)] pb-24 pt-24 sm:pt-28 lg:pt-32">
      <div className="grid gap-5">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.16),transparent_28%),linear-gradient(135deg,rgba(5,10,20,0.98),rgba(13,20,33,0.98))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:p-7">
          <div
            className="absolute inset-0 opacity-18"
            style={{
              backgroundImage: "url('/header-flow.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                <Sparkles className="h-3.5 w-3.5" />
                Dijital Danışma Merkezi
              </div>
              <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl xl:text-[3rem]">
                {greeting}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-[15px]">
                Bu alan sadece taleplerinizi görmek için değil; hizmetlerinizi planlamak, süreçlerinizi
                takip etmek, teklif hazırlıklarını izlemek ve operasyonunuzun dijital tarafını tek yerden
                yönetmek için tasarlandı.
              </p>
            </div>

            <CustomerMiniProfile customer={customer} />
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] px-6 py-14 text-center text-white/50 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            Dijital danışman merkezi hazırlanıyor...
          </div>
        ) : (
          <>
            <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                      Operasyon Panosu
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">Süreç hattı ve iş durumu</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/58">
                    Tamamlanma oranı %{completionRatio}
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-300"
                    style={{ width: `${completionRatio}%` }}
                  />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {statusCounts.map(({ status, count }) => (
                    <div key={status} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/48">{status}</div>
                      <div className="mt-2 text-2xl font-black text-white">{count}</div>
                      <div
                        className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass(status)}`}
                      >
                        Durum
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                        En Son Hareket
                      </div>
                      <h3 className="mt-2 text-xl font-black text-white">
                        {latest ? latest.referenceNo : "Henüz kayıt yok"}
                      </h3>
                    </div>
                    {latest ? (
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadgeClass(latest.status)}`}
                      >
                        {latest.status}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm leading-7 text-white/66">
                    {latest
                      ? latest.note
                      : "İlk talep oluşturulduğunda burada en güncel süreç özeti ve yönlendirme görünür."}
                  </p>

                  {latest ? (
                    <Link
                      href={`/musteri/panel/${latest.id}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
                    >
                      Kaydı aç
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                      Hizmetler
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">Satın alabileceğiniz hizmetler</h2>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {CUSTOMER_SERVICE_CATALOG.map((item) => (
                    <Link
                      key={item.title}
                      href={`/musteri/panel/hizmetler/${item.slug}`}
                      className={`rounded-[20px] border border-white/10 bg-gradient-to-br ${item.tone} p-4 text-left transition hover:border-white/18 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)]`}
                    >
                      <div className="text-sm font-black text-white">{item.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div
                id="surec-kayitlari"
                className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]"
              >
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                      Süreç Kayıtları
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">Aktif işler ve detay kayıtları</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/58">
                    {sortedApplications.length} kayıt
                  </div>
                </div>

                {applications.length === 0 ? (
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                      Başlangıç Noktası
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-white">Bu hesapta henüz iş kaydı bulunmuyor</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/66">
                      İlk talebinizi oluşturduğunuzda burası teklif hazırlıkları, süreç notları, belge akışı
                      ve operasyon zaman çizelgesiyle dolmaya başlayacak.
                    </p>
                    <Link
                      href="/musteri/yeni-talep"
                      className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      İlk talebi oluştur
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedApplications.map((item) => (
                      <Link key={item.id} href={`/musteri/panel/${item.id}`} className="block">
                        <article className="rounded-[24px] border border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 transition hover:border-orange-300/22 hover:bg-white/[0.05]">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="font-mono text-[13px] font-semibold text-orange-300">{item.referenceNo}</div>
                            <span
                              className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadgeClass(item.status)}`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <div className="mt-3 grid gap-2 text-[12px] text-white/60 md:grid-cols-2 xl:grid-cols-4">
                            <div>
                              <span className="text-white/40">Hizmet:</span> {item.serviceArea}
                            </div>
                            <div>
                              <span className="text-white/40">Güncelleme:</span> {formatDate(item.updatedAt)}
                            </div>
                            <div>
                              <span className="text-white/40">Başlangıç:</span> {formatDate(item.createdAt)}
                            </div>
                            <div>
                              <span className="text-white/40">Süre:</span> {hoursSince(item.createdAt)} saat
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-7 text-white/74">{item.note}</p>

                          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/82">
                            Kayıt detayını aç
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </section>
  );
}
