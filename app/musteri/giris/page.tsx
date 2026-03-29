"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function MusteriGirisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/musteri/panel";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleReset = async () => {
    if (!resetEmail.trim()) {
      setError("Şifre yenileme için e-posta adresinizi girin.");
      return;
    }

    setResetLoading(true);
    setError("");
    setResetMessage("");

    try {
      const res = await fetch("/api/customer/session/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Şifre yenileme bağlantısı gönderilemedi.");
        return;
      }

      setResetMessage(
        data.message ?? "E-posta adresi sistemde varsa şifre yenileme bağlantısı gönderildi."
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

    try {
      const res = await fetch("/api/customer/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Giriş başarısız.");
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
    <section className="container-main page-content-template pb-20 pt-10">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-[#0f1725]/90 p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Aktif Müşteri Girişi
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Panele Giriş</h1>
        <p className="mt-3 text-sm leading-7 text-white/62">
          Bu ekran yalnızca davet, resmi kayıt ve yönetici onayı tamamlanmış müşteriler içindir.
          Hesabınız henüz onay bekliyorsa giriş yerine süreç ekranından durumunuzu takip edin.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setResetEmail(event.target.value);
            }}
            placeholder="E-posta"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Aktif Hesapla Giriş Yap"}
          </button>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-sm font-semibold text-white">Şifremi unuttum</div>
            <p className="mt-1 text-sm leading-6 text-white/58">
              Davet sonrası belirlediğiniz şifreyi hatırlamıyorsanız bağlantıyı yeniden alın.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={resetLoading}
                className="rounded-2xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resetLoading ? "Gönderiliyor..." : "Şifre Yenileme Bağlantısı Gönder"}
              </button>
              <Link
                href="/musteri-girisi"
                className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Süreç ekranına dön
              </Link>
            </div>
            {resetMessage ? <p className="mt-3 text-sm text-emerald-300">{resetMessage}</p> : null}
          </div>
        </form>
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
