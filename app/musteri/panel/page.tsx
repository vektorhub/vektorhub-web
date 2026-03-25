"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  FileText,
  LayoutPanelLeft,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
  "Başvuru Alındı": "border-sky-400/30 bg-sky-500/12 text-sky-200",
  "İnceleniyor": "border-amber-400/30 bg-amber-500/12 text-amber-200",
  "Teklif Hazırlanıyor": "border-orange-400/30 bg-orange-500/12 text-orange-200",
  "Tamamlandı": "border-emerald-400/30 bg-emerald-500/12 text-emerald-200",
};

const SERVICE_SHOWCASE = [
  {
    title: "Kurumsal Web Yapısı",
    text: "Markanızı net anlatan, teklif ve iletişim akışını düzenleyen yapı.",
    tone: "from-sky-500/18 to-cyan-400/8",
  },
  {
    title: "SEO ve Görünürlük",
    text: "Google tarafında daha görünür, daha güven veren dijital yüz.",
    tone: "from-orange-500/18 to-amber-400/8",
  },
  {
    title: "Mobil Uygulama",
    text: "Saha, müşteri ve ekip akışlarını daha kontrollü hale getiren mobil çözümler.",
    tone: "from-indigo-500/18 to-blue-400/8",
  },
  {
    title: "Dijital Operasyon",
    text: "Teklif, belge, ödeme ve süreç iletişimini tek düzende toplama altyapısı.",
    tone: "from-emerald-500/18 to-teal-400/8",
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
  const hour = new Date().getHours();
  const base =
    hour < 12 ? "Günaydın" : hour < 18 ? "İyi günler" : "İyi akşamlar";
  return name ? `${base}, ${name}` : base;
}

function getAdvisorMessage(applications: Application[]) {
  if (!applications.length) {
    return {
      title: "Paneliniz hazır",
      text: "İlk talebinizi oluşturduğunuz anda bu ekran teklif, süreç ve operasyon merkezi olarak dolmaya başlayacak.",
      action: "İlk talebi başlatın",
    };
  }

  const openItems = applications.filter((item) => item.status !== "Tamamlandı");
  const waitingItems = openItems.filter((item) => hoursSince(item.updatedAt) > 72);
  const quoteItems = applications.filter((item) => item.status === "Teklif Hazırlanıyor");

  if (waitingItems.length) {
    return {
      title: "Bekleyen süreçleriniz var",
      text: "Uzun süredir güncellenmeyen işleri öne aldık. İsterseniz ilgili kayda girip not bırakabilir veya doğrudan yeni talep açabilirsiniz.",
      action: "Bekleyen süreçleri inceleyin",
    };
  }

  if (quoteItems.length) {
    return {
      title: "Teklif aşamasındaki işler öne çıkıyor",
      text: "Bu aşamadaki kayıtlar karar, revizyon ve onay için en kritik bölüm. İlgili kayıt detaylarını gözden geçirmeniz faydalı olur.",
      action: "Teklif durumlarını açın",
    };
  }

  return {
    title: "Operasyon ritmi sağlıklı görünüyor",
    text: "Açık kayıtlarınız düzenli ilerliyor. Yeni ihtiyaç oluşursa panelden doğrudan yeni süreç başlatabilirsiniz.",
    action: "Paneli kullanmaya devam edin",
  };
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
      waiting: applications.filter((a) => hoursSince(a.updatedAt) > 72 && a.status !== "Tamamlandı")
        .length,
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

  const serviceBreakdown = useMemo(() => {
    const bucket = new Map<string, number>();
    for (const app of applications) {
      bucket.set(app.serviceArea, (bucket.get(app.serviceArea) ?? 0) + 1);
    }
    return Array.from(bucket.entries())
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [applications]);

  const advisor = useMemo(() => getAdvisorMessage(applications), [applications]);
  const greeting = getGreeting(customer?.fullName);

  return (
    <section className="page-content-template min-h-[calc(100vh-10rem)] pb-24 pt-5">
      <div className="grid gap-5">
        <div className="grid gap-5 xl:grid-cols-[1.5fr_0.75fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.16),transparent_28%),linear-gradient(135deg,rgba(5,10,20,0.98),rgba(13,20,33,0.98))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:p-7">
            <div
              className="absolute inset-0 opacity-18"
              style={{
                backgroundImage: "url('/header-flow.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    Dijital Danışman Merkezi
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

                <div className="w-full rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm sm:min-w-[18rem] sm:w-auto">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Hesap Özeti
                  </div>
                  <div className="mt-3 text-lg font-black text-white">{customer?.fullName ?? "Aktif Müşteri"}</div>
                  <div className="mt-1 text-sm text-white/62">{customer?.email}</div>
                  <div className="mt-4 grid gap-2 text-[12px] text-white/58">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                      <span>Portal erişimi</span>
                      <span className="font-semibold text-emerald-200">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                      <span>Son giriş</span>
                      <span className="font-semibold text-white/86">
                        {customer?.lastLoginAt ? formatDate(customer.lastLoginAt) : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/48">Toplam Süreç</span>
                    <LayoutPanelLeft className="h-4 w-4 text-white/38" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">{summary.total}</div>
                </div>
                <div className="rounded-[26px] border border-orange-300/20 bg-orange-500/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-orange-100/70">Açık İşler</span>
                    <BriefcaseBusiness className="h-4 w-4 text-orange-200/70" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-orange-100">{summary.open}</div>
                </div>
                <div className="rounded-[26px] border border-emerald-300/20 bg-emerald-500/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Tamamlanan</span>
                    <ShieldCheck className="h-4 w-4 text-emerald-200/70" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-emerald-100">{summary.done}</div>
                </div>
                <div className="rounded-[26px] border border-rose-300/20 bg-rose-500/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-rose-100/70">Bekleyen Konular</span>
                    <Clock3 className="h-4 w-4 text-rose-200/70" />
                  </div>
                  <div className="mt-3 text-3xl font-black text-rose-100">{summary.waiting}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                <Sparkles className="h-3.5 w-3.5" />
                Dijital Danışman
              </div>
              <h2 className="mt-4 text-2xl font-black text-white">{advisor.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/66">{advisor.text}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/72">
                Öneri: {advisor.action}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Hızlı İşlemler
              </div>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/musteri/yeni-talep"
                  className="flex items-center justify-between rounded-2xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/18"
                >
                  <span>Yeni iş talebi başlat</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/musteri-girisi/durum-sorgula"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/84 transition hover:bg-white/[0.06]"
                >
                  <span>Süreç durumlarını görüntüle</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/72 transition hover:bg-white/[0.06]"
                >
                  <span>Oturumu güvenli kapat</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
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
                      <div className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass(status)}`}>
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
                      <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadgeClass(latest.status)}`}>
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
                      Hizmet Alanı
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white">Portal içi çalışma modülleri</h2>
                  </div>
                  <div className="text-xs text-white/52">Şimdilik keşif ve yönlendirme merkezi</div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {SERVICE_SHOWCASE.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${item.tone} p-4`}
                    >
                      <div className="text-sm font-black text-white">{item.title}</div>
                      <p className="mt-2 text-[13px] leading-6 text-white/68">{item.text}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                        Keşfe açık
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                    <CircleDollarSign className="h-4 w-4" />
                    Sonraki Genişleme
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    Bu alan ilerleyen aşamada teklif, ödeme, onay, belge ve sanal POS akışlarını tek merkezde
                    toplayacak şekilde büyütülebilir. Şimdilik süreç takibi ve yönlendirme omurgası hazır.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
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
                      İlk talebinizi oluşturduğunuzda burası teklif hazırlıkları, süreç notları, belge akışı ve
                      operasyon zaman çizelgesiyle dolmaya başlayacak.
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
                            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadgeClass(item.status)}`}>
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

              <div className="grid gap-5">
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    <Bell className="h-4 w-4" />
                    Öncelik Alanları
                  </div>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-sm font-black text-white">Hızlı dönüş bekleyen işler</div>
                      <div className="mt-2 text-3xl font-black text-rose-200">{summary.waiting}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-sm font-black text-white">Teklif hazırlık aşaması</div>
                      <div className="mt-2 text-3xl font-black text-orange-200">
                        {applications.filter((item) => item.status === "Teklif Hazırlanıyor").length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    <FileText className="h-4 w-4" />
                    Hizmet Dağılımı
                  </div>
                  <div className="mt-4 space-y-2">
                    {serviceBreakdown.length ? (
                      serviceBreakdown.map((item) => (
                        <div
                          key={item.service}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3"
                        >
                          <span className="pr-3 text-sm text-white/72">{item.service}</span>
                          <span className="text-lg font-black text-white">{item.count}</span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-sm text-white/56">
                        Hizmet dağılımı ilk kayıtla birlikte görünür olacak.
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                    <MessageSquareText className="h-4 w-4" />
                    Portal Notu
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    Bu ekran artık yalnızca giriş sonrası bir durak değil; müşteri ilişkisi, teklif akışı,
                    belge takibi ve operasyon iletişimi için büyütülebilecek ana komuta alanı olarak kurgulandı.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
