export default function MusteriGirisiPage() {
  return (
    <section className="container-main page-content-template py-20">
      <div className="mx-auto max-w-xl glass-card p-8">
        <h1 className="section-title">Müşteri Girişi</h1>
        <p className="section-text mt-4 text-white/65">
          Doğrulanmış müşteriler portal üzerinden hizmet paketlerini, takvimi, teklifleri, evrakları ve notlarını yönetecek.
        </p>

        <form className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
            placeholder="E-posta"
          />
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
            placeholder="Şifre"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </section>
  );
}
