"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function MusteriDavetContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [legalCompanyName, setLegalCompanyName] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [address, setAddress] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

    try {
      const res = await fetch("/api/customer/session/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          fullName,
          password,
          profile: {
            companyName,
            legalCompanyName,
            taxOffice,
            taxNumber,
            address,
            billingEmail,
            phone,
            contactTitle,
          },
        }),
      });

      const data = (await res.json()) as { message?: string; status?: string };
      if (!res.ok) {
        setError(data.message ?? "Hesap aktive edilemedi.");
        return;
      }

      setSuccessMessage(
        data.status === "pending_review"
          ? data.message ??
              "Resmi kayıt bilgileri alındı. Yönetici onayı tamamlandıktan sonra portal erişiminiz açılacaktır."
          : "Hesabınız aktive edildi."
      );
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
          Resmi Müşteri Onboarding
        </div>
        <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
          Davet bağlantınızla
          <span className="brand-gradient block pt-2">kurumsal müşteri kaydınızı tamamlayın.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
          Bu ekran açık üyelik değildir. Davet aldıysanız firma, vergi ve yetkili bilgilerinizi buradan
          girersiniz. Form tamamlandıktan sonra hesabınız yöneticinin son onayını bekler.
        </p>
      </div>

      {successMessage ? (
        <div className="mt-8 max-w-4xl rounded-[32px] border border-emerald-400/20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.24),transparent_30%),linear-gradient(135deg,rgba(16,185,129,0.12),rgba(6,95,70,0.12))] p-6 shadow-[0_20px_40px_rgba(16,185,129,0.14)]">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Kayıt Alındı
          </div>
          <h2 className="mt-3 text-[26px] font-black leading-tight text-white">
            Resmi müşteri onboarding formunuz başarıyla gönderildi
          </h2>
          <p className="mt-3 text-[13px] leading-7 text-white/82">{successMessage}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/musteri-girisi"
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Müşteri Süreç Merkezine Dön
            </Link>
            <Link
              href="/iletisim"
              className="rounded-2xl border border-emerald-300/30 bg-emerald-500/18 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/24"
            >
              Gerekirse Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_30%),linear-gradient(180deg,rgba(15,23,37,0.96),rgba(10,16,28,0.96))] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
          >
            <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
                Onboarding Formu
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Firma ve yetkili bilgilerini eksiksiz girin
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/62">
                Bu bilgiler yönetici onayı ve ileride teklif, fatura ve ödeme altyapısı için temel
                müşteri kaydı olarak kullanılacaktır.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Yetkili Ad Soyad"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                value={contactTitle}
                onChange={(event) => setContactTitle(event.target.value)}
                placeholder="Yetkili Ünvanı"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Firma Görünen Adı"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                value={legalCompanyName}
                onChange={(event) => setLegalCompanyName(event.target.value)}
                placeholder="Resmi Ünvan"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                value={taxOffice}
                onChange={(event) => setTaxOffice(event.target.value)}
                placeholder="Vergi Dairesi"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                value={taxNumber}
                onChange={(event) => setTaxNumber(event.target.value)}
                placeholder="Vergi Numarası"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                type="email"
                value={billingEmail}
                onChange={(event) => setBillingEmail(event.target.value)}
                placeholder="Fatura E-postası"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Yetkili Telefon"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
            </div>

            <textarea
              required
              rows={4}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Resmi adres"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
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
                placeholder="Şifre (tekrar)"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35"
              />
            </div>

            {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

            <button
              type="submit"
              disabled={disabled}
              className="mt-5 w-full rounded-2xl bg-orange-500 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Gönderiliyor..." : "Resmi Kaydı Tamamla"}
            </button>
          </form>

          <aside className="rounded-[32px] border border-white/10 bg-[#0d1421]/90 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">Bu Form Ne İşe Yarar?</p>
            <div className="mt-5 space-y-4">
              {[
                ["01", "Resmi kayıt", "Portal artık doğrulanmış kurumsal müşteri hesabı olarak açılır."],
                ["02", "İkinci onay", "Bilgileriniz yönetici tarafından kontrol edilir ve sonra hesap aktifleşir."],
                ["03", "Hazır altyapı", "Teklif, fatura, ödeme ve sanal pos için müşteri kaydı sağlamlaşır."],
              ].map(([index, title, text]) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-sm font-black text-orange-200">
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
      )}
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
