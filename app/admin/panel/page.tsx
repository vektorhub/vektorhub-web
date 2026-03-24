"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, ChevronRight } from "lucide-react";

type Application = {
  id: string;
  referenceNumber: string;
  customerEmail: string;
  customerName: string;
  serviceArea: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminPanelPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/admin/applications");
        if (res.status === 401) {
          router.replace("/admin/giris");
          return;
        }

        if (!res.ok) throw new Error("Talepler alınamadı");
        
        const data = (await res.json()) as { applications?: Application[] } | Application[];
        setApplications(Array.isArray(data) ? data : data.applications || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/giris");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR");
  };

  const statusColors: Record<string, string> = {
    "Başvuru Alındı": "bg-blue-500/20 text-blue-200 border-blue-500/50",
    "İnceleniyor": "bg-yellow-500/20 text-yellow-200 border-yellow-500/50",
    "Teklif Hazırlanıyor": "bg-orange-500/20 text-orange-200 border-orange-500/50",
    "Tamamlandı": "bg-emerald-500/20 text-emerald-200 border-emerald-500/50",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-slate-400 mt-1">Müşteri talepler yönetimi</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Çıkış
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-[20px] p-12 text-center">
            <p className="text-slate-400">Henüz talep bulunmuyor</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Link key={app.id} href={`/admin/panel/${app.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 hover:border-blue-500 transition cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-sm font-bold text-orange-300">
                          #{app.referenceNumber}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                            statusColors[app.status] || "bg-slate-700 text-slate-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Müşteri</p>
                          <p className="font-medium">{app.customerName}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Email</p>
                          <p className="font-medium text-sm">{app.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Hizmet</p>
                          <p className="font-medium">{app.serviceArea}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Tarih</p>
                          <p className="font-medium">{formatDate(app.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-slate-600 group-hover:text-blue-400 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
