"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function MusteriSifreSifirlaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const disabled = useMemo(() => !token || loading, [loading, token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setError("Şifre yenileme bağlantısı eksik görünüyor.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/customer/session/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Şifre güncellenemedi.");
        return;
      }

      setSuccessMessage(data.message ?? "Şifreniz güncellendi.");
      setTimeout(() => router.replace("/musteri/giris"), 1200);
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
          Şifre Yenileme
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Yeni Şifre Belirle</h1>
        <p className="mt-3 text-sm leading-7 text-white/62">
          Müşteri portalı hesabınız için yeni bir şifre belirleyin. Şifre en az 8 karakter olmalıdır.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Yeni şifre"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Yeni şifre (tekrar)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Kaydediliyor..." : "Şifreyi Güncelle"}
          </button>

          <Link
            href="/musteri/giris"
            className="block text-center text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Giriş ekranına dön
          </Link>
        </form>
      </div>
    </section>
  );
}

export default function MusteriSifreSifirlaPage() {
  return (
    <Suspense>
      <MusteriSifreSifirlaContent />
    </Suspense>
  );
}
