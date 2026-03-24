"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  email: string;
  fullName: string;
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
  "Başvuru Alındı": "border-blue-400/30 bg-blue-500/12 text-blue-200",
  "İnceleniyor": "border-yellow-400/30 bg-yellow-500/12 text-yellow-200",
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

function getHoursSince(iso: string) {
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
}

function statusBadgeClass(status: string) {
  return STATUS_STYLES[status] ?? "border-white/20 bg-white/10 text-white/70";
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

  const handleLogout = async () => {
    await fetch("/api/customer/session", { method: "DELETE" });
    router.replace("/musteri/giris");
  };

  const summary = useMemo(
    () => ({
      total: applications.length,
      open: applications.filter((a) => a.status !== "Tamamlandı").length,
      done: applications.filter((a) => a.status === "Tamamlandı").length,
      waiting: applications.filter((a) => getHoursSince(a.updatedAt) > 72 && a.status !== "Tamamlandı").length,
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

  const statusCounts = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      count: applications.filter((app) => app.status === status).length,
    }));
  }, [applications]);

  const serviceBreakdown = useMemo(() => {
    const bucket = new Map<string, number>();
    for (const app of applications) {
      bucket.set(app.serviceArea, (bucket.get(app.serviceArea) ?? 0) + 1);
    }
    return Array.from(bucket.entries())
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [applications]);

  return (
    <section className="container-main page-content-template pb-24 pt-6">
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.15),transparent_30%),linear-gradient(135deg,rgba(7,12,22,0.98),rgba(16,25,38,0.96))] p-6 shadow-[0_26px_64px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "url('/hizmet_banner.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Premium Müşteri Portalı</div>
              <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                Hoş geldiniz{customer ? `, ${customer.fullName}` : ""}
              </h1>
              {customer ? <p className="mt-2 text-sm text-white/65">{customer.email}</p> : null}
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                Tüm taleplerinizin durumunu, güncel notları ve operasyon ritmini tek merkezden izleyebilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/musteri-girisi/ilk-basvuru"
                className="rounded-2xl border border-emerald-300/25 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
              >
                Yeni Talep Oluştur
              </Link>
              <Link
                href="/musteri-girisi/durum-sorgula"
                className="rounded-2xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Durum Sorgula
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">Toplam Talep</div>
            <div className="mt-2 text-3xl font-black text-white">{summary.total}</div>
          </div>
          <div className="rounded-2xl border border-orange-300/25 bg-orange-500/10 p-4 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.18em] text-orange-100/75">Açık Süreç</div>
            <div className="mt-2 text-3xl font-black text-orange-200">{summary.open}</div>
          </div>
          <div className="rounded-2xl border border-emerald-300/25 bg-emerald-500/10 p-4 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/75">Tamamlanan</div>
            <div className="mt-2 text-3xl font-black text-emerald-200">{summary.done}</div>
          </div>
          <div className="rounded-2xl border border-rose-300/25 bg-rose-500/10 p-4 backdrop-blur-sm">
            <div className="text-[11px] uppercase tracking-[0.18em] text-rose-100/75">72s+ Bekleyen</div>
            <div className="mt-2 text-3xl font-black text-rose-200">{summary.waiting}</div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-white/50">
          Veriler yükleniyor...
        </div>
      ) : applications.length === 0 ? (
        <div className="mt-6 rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">Başlangıç Noktası</div>
          <h2 className="mt-3 text-2xl font-black text-white">Bu hesaba bağlı talep henüz bulunmuyor</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
            Yeni bir talep oluşturarak bu paneli canlı veriyle kullanmaya başlayabilirsiniz. Talep eklendiğinde zaman çizgisi,
            güncel notlar ve süreç metrikleri otomatik olarak dolacaktır.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/musteri-girisi/ilk-basvuru"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              İlk Talebi Oluştur
            </Link>
            <Link
              href="/musteri-girisi"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Müşteri Portal Ana Sayfa
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">Talep Akışı</div>
                <h2 className="mt-2 text-2xl font-black text-white">Güncel Talepler ve Notlar</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">
                {sortedApplications.length} kayıt
              </div>
            </div>

            <div className="space-y-3">
              {sortedApplications.map((item) => (
                <Link
                  key={item.id}
                  href={`/musteri/panel/${item.id}`}
                  className="block"
                >
                  <article
                    className="rounded-2xl border border-white/10 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 transition hover:border-orange-300/20 hover:bg-white/[0.05] cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-mono text-[13px] font-semibold text-orange-300">{item.referenceNo}</div>
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-[12px] text-white/62 sm:grid-cols-2">
                      <div>
                        <span className="text-white/42">Hizmet:</span> {item.serviceArea}
                      </div>
                      <div>
                        <span className="text-white/42">Güncelleme:</span> {formatDate(item.updatedAt)}
                      </div>
                      <div>
                        <span className="text-white/42">Başvuru:</span> {formatDate(item.createdAt)}
                      </div>
                      <div>
                        <span className="text-white/42">Lead yaşı:</span> {getHoursSince(item.createdAt)} saat
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-white/74">{item.note}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">Süreç Kalitesi</div>
              <div className="mt-3 text-4xl font-black text-white">%{completionRatio}</div>
              <p className="mt-2 text-sm text-white/62">Tamamlanan taleplerin toplam içindeki oranı.</p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-300"
                  style={{ width: `${completionRatio}%` }}
                />
              </div>

              <div className="mt-5 space-y-2">
                {statusCounts.map(({ status, count }) => (
                  <div key={status} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-xs text-white/65">{status}</span>
                    <span className="text-sm font-bold text-white">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">Son Aktivite</div>
              {latest ? (
                <Link href={`/musteri/panel/${latest.id}`}>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-300/20 hover:bg-white/[0.05] cursor-pointer">
                    <div className="font-mono text-[13px] font-semibold text-orange-300">{latest.referenceNo}</div>
                    <div className="mt-2 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold text-white/85">
                      {latest.status}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/70">{latest.note}</p>
                    <div className="mt-3 text-xs text-white/55">Güncellendi: {formatDate(latest.updatedAt)}</div>
                  </div>
                </Link>
              ) : (
                <p className="mt-3 text-sm text-white/55">Henüz aktivite bulunmuyor.</p>
              )}
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">Hizmet Dağılımı</div>
              <div className="mt-3 space-y-2">
                {serviceBreakdown.map((item) => (
                  <div key={item.service} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                    <span className="text-xs text-white/70">{item.service}</span>
                    <span className="text-sm font-bold text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
