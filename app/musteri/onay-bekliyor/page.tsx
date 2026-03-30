import Link from "next/link";

export default function MusteriOnayBekliyorPage() {
  return (
    <section className="container-main page-content-template pb-24 pt-10">
      <div className="mx-auto max-w-xl rounded-[30px] border border-white/10 bg-[#0f1725]/92 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.26)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
          Profil Onayı Bekleniyor
        </div>
        <h1 className="mt-3 text-3xl font-black text-white">Profiliniz incelemede</h1>
        <p className="mt-4 text-sm leading-7 text-white/70">
          Giriş bilgileriniz doğrulandı ancak hesabınız henüz admin onayını tamamlamadı. Onay
          verildiğinde aynı kullanıcı adı ve şifreyle doğrudan müşteri panelinize giriş
          yapabilirsiniz.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/64">
          Süreç: kayıt alındı, e-posta doğrulandı, şimdi admin onayı bekleniyor.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/musteri/giris"
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Giriş ekranına dön
          </Link>
          <Link
            href="/iletisim"
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/72 transition hover:text-white"
          >
            İletişime geç
          </Link>
        </div>
      </div>
    </section>
  );
}
