"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function MusteriDavetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const disabled = useMemo(() => !token || loading, [loading, token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      setError("Davet bağlantısı eksik görünüyor.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/customer/session/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, fullName, password }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Hesap aktive edilemedi.");
        return;
      }

      router.replace("/musteri/panel");
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-20 pt-10">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/10 bg-[#0f1725]/90 p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Müşteri Daveti
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Hesabınızı Aktive Edin</h1>
        <p className="mt-3 text-sm leading-7 text-white/62">
          Şifrenizi belirleyin, hesabınız aktive olsun ve müşteri paneline giriş yapın.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Ad Soyad (isteğe bağlı)"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
          />
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

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-2xl bg-orange-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Aktive ediliyor..." : "Hesabı Aktive Et"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function MusteriDavetPage() {
  return (
    <Suspense>
      <MusteriDavetContent />
    </Suspense>
  );
}
