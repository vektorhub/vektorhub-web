"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const initialProfile = {
  companyName: "",
  legalCompanyName: "",
  taxOffice: "",
  taxNumber: "",
  address: "",
  billingEmail: "",
  phone: "",
  contactTitle: "",
};

export default function MusteriKayitPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/customer/session/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          password,
          profile,
        }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data.message ?? "Kayıt oluşturulamadı.");
        return;
      }

      setSuccessMessage(
        data.message ??
          "Kayıt alındı. E-posta doğrulamasını tamamladıktan sonra hesabınız admin onayına düşecektir."
      );
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-24 pt-8">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
            Müşteri Kaydı
          </div>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white">
            Şirket kaydınızı oluşturun
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/68 sm:text-[15px]">
            Bu formda şirket için kritik tüm bilgiler alınır. Kayıt sonrası e-posta doğrulaması gerekir.
            Doğrulama tamamlandıktan sonra hesabınız admin onayına düşer.
          </p>
        </div>

        <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f1725]/92 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-7">
          {successMessage ? (
            <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Kayıt Alındı
              </div>
              <h2 className="mt-3 text-2xl font-black text-white">E-posta doğrulaması gerekiyor</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">{successMessage}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/musteri/giris"
                  className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
                >
                  Giriş ekranına dön
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Yetkili ad soyad"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
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
                  value={profile.contactTitle}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, contactTitle: event.target.value }))
                  }
                  placeholder="Yetkili ünvanı"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, phone: event.target.value }))
                  }
                  placeholder="Telefon"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  value={profile.companyName}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, companyName: event.target.value }))
                  }
                  placeholder="Firma adı"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  value={profile.legalCompanyName}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      legalCompanyName: event.target.value,
                    }))
                  }
                  placeholder="Resmi ünvan"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  value={profile.taxOffice}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, taxOffice: event.target.value }))
                  }
                  placeholder="Vergi dairesi"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  value={profile.taxNumber}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, taxNumber: event.target.value }))
                  }
                  placeholder="Vergi numarası"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
                />
                <input
                  required
                  type="email"
                  value={profile.billingEmail}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, billingEmail: event.target.value }))
                  }
                  placeholder="Fatura e-postası"
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
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Şifre tekrar"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 md:col-span-2"
                />
              </div>

              <textarea
                required
                rows={4}
                value={profile.address}
                onChange={(event) =>
                  setProfile((current) => ({ ...current, address: event.target.value }))
                }
                placeholder="Açık adres"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />

              {error ? <p className="text-sm text-rose-300">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-orange-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Kayıt oluşturuluyor..." : "Kayıt ol"}
              </button>

              <div className="text-sm text-white/62">
                Zaten hesabın var mı?{" "}
                <Link href="/musteri/giris" className="font-semibold text-orange-300 transition hover:text-orange-200">
                  Giriş yap
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
