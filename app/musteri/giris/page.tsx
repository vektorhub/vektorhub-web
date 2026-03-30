"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function MusteriGirisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/musteri/panel";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleReset = async () => {
    if (!email.trim()) {
      setError("Şifremi unuttum işlemi için önce e-posta adresinizi yazın.");
      return;
    }

    setResetLoading(true);
    setError("");
    setResetMessage("");

    try {
      const res = await fetch("/api/customer/session/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Şifre sıfırlama bağlantısı gönderilemedi.");
        return;
      }

      setResetMessage(
        data.message ?? "E-posta adresi sistemde varsa şifre sıfırlama bağlantısı gönderildi."
      );
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResetMessage("");

    try {
      const res = await fetch("/api/customer/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as {
        message?: string;
        code?: string;
        redirectTo?: string;
      };

      if (!res.ok) {
        setError(data.message ?? "Giriş başarısız.");
        return;
      }

      if (data.code === "pending_review") {
        router.replace(data.redirectTo ?? "/musteri/onay-bekliyor");
        return;
      }

      router.replace(from);
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-24 pt-10">
      <div className="mx-auto max-w-md rounded-[30px] border border-white/10 bg-[#0f1725]/92 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.26)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
          Müşteri Portalı
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Müşteri girişi yapın</h1>
        <p className="mt-3 text-sm leading-7 text-white/62">
          Hesabınız varsa giriş yapın ve doğrudan müşteri panelinize ulaşın.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-posta adresi"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Şifre"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {resetMessage ? <p className="text-sm text-emerald-300">{resetMessage}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleReset}
          disabled={resetLoading}
          className="mt-4 text-sm font-semibold text-white/72 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {resetLoading ? "Gönderiliyor..." : "Şifremi unuttum"}
        </button>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/70">
          Üye değil misin?{" "}
          <Link href="/musteri/kayit" className="font-semibold text-orange-300 transition hover:text-orange-200">
            Kayıt ol
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MusteriGirisPage() {
  return (
    <Suspense>
      <MusteriGirisContent />
    </Suspense>
  );
}
