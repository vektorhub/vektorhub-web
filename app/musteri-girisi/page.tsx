import Link from "next/link";

const portalSteps = [
  {
    eyebrow: "01",
    title: "İlk başvuru alınır",
    text: "İhtiyaç, kapsam ve iletişim bilgileri tek akışta sisteme işlenir.",
  },
  {
    eyebrow: "02",
    title: "Takip numarası oluşur",
    text: "Portal üzerinden süreç görünürlüğü başlar ve müşteri notları düzenli işlenir.",
  },
  {
    eyebrow: "03",
    title: "Aktif müşteri erişimi açılır",
    text: "Uzun soluklu işlerde proje, doküman ve teslim akışı özel erişime taşınır.",
  },
];

const promises = [
  "Net süreç görünürlüğü",
  "Durum ve teklif takibi",
  "Kayıtlı müşteri için kontrollü erişim",
  "Tek noktadan iş akışı yönetimi",
];

export default function MusteriGirisiPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_24%),linear-gradient(135deg,rgba(7,12,22,0.96),rgba(16,25,38,0.94))] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:px-8 sm:py-9">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/hizmet_banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)] xl:block" />

        <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
              Müşteri Portalı
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
              Başvuru, takip ve aktif müşteri erişimini
              <span className="brand-gradient block pt-2">tek merkezde toplayan daha seçkin bir akış</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-[15px]">
              Bu alan yalnızca form toplamak için değil, müşteri deneyimini kontrollü ve güven
              veren hale getirmek için tasarlandı. İlk temastan aktif iş takibine kadar düzenli ve
              ölçülü bir geçiş sunar.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/musteri-girisi/ilk-basvuru"
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(249,115,22,0.25)] transition hover:bg-orange-400"
              >
                İlk Başvuruyu Oluştur
              </Link>
              <Link
                href="/musteri-girisi/durum-sorgula"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Durumu Sorgula
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Çalışma Mantığı
              </div>
              <div className="mt-3 text-2xl font-black text-white">
                Dağınık iletişim yerine
                <span className="block text-white/86">tek akış</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Talep, takip numarası, müşteri notları ve proje durumu aynı çatıda tutulur.
                E-posta trafiğine gömülmeden süreç izlenir.
              </p>
            </div>

            <div className="rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5 backdrop-blur-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
                Operasyon Vaadi
              </div>
              <div className="mt-3 text-2xl font-black text-white">
                Net başlangıç,
                <span className="block">net takip, net karar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] border border-white/10 bg-[#0f1725]/88 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="section-title !mb-0">Portal Kullanım Alanları</h2>
              <p className="section-text mt-3 max-w-2xl">
                İlk kez başvuru yapmak isteyen ziyaretçiler ve aktif iş süreci olan müşteriler için
                ayrı ama bağlı deneyim kurgulanır.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              2 ana giriş yolu
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/musteri-girisi/ilk-basvuru"
              className="rounded-3xl border border-orange-400/20 bg-[linear-gradient(135deg,rgba(255,106,0,0.18),rgba(255,138,51,0.12))] p-5 shadow-[0_18px_36px_rgba(255,106,0,0.14)] transition hover:-translate-y-0.5"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
                Yeni Müşteri
              </div>
              <div className="mt-2 text-[20px] font-extrabold text-white">İlk Kez Başvuru</div>
              <p className="mt-3 text-[13px] leading-6 text-white/82">
                Kısa bir form doldurarak talebinizi iletin, sistem takip numarası oluştursun ve
                süreç görünür başlasın.
              </p>
            </Link>

            <Link
              href="/musteri-girisi/durum-sorgula"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-orange-400/30 hover:bg-white/[0.06]"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/62">
                Kayıtsız Takip
              </div>
              <div className="mt-2 text-[20px] font-extrabold text-white">
                Başvuru Durumu Sorgula
              </div>
              <p className="mt-3 text-[13px] leading-6 text-white/74">
                Takip numarası ve telefon bilginizle hangi aşamada olduğunuzu, son notları ve
                güncel karar durumunu görün.
              </p>
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#0d1421]/92 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Kayıtlı Müşteri Erişimi
          </div>
          <h2 className="mt-3 text-2xl font-black text-white">Portal girişi davetle aktive edilir</h2>
          <p className="mt-3 text-sm leading-7 text-white/62">
            Bu bölüm herkese açık bir üyelik ekranı gibi çalışmaz. Admin tarafıdan davet edilen
            müşteriler hesaplarını aktive eder ve panelden giriş yapar.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {promises.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/78"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
              Şu anki yaklaşım
            </div>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Açık kayıt yerine süreç doğrulandıktan sonra davet bağlantısı gönderilir. Bu yapı
              gereksiz kullanıcı açılışlarını değil, gerçek müşteri operasyonunu hedefler.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/musteri/giris"
                className="rounded-2xl border border-emerald-300/30 bg-emerald-500/18 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/26"
              >
                Müşteri Hesabına Giriş
              </Link>
              <Link
                href="/iletisim"
                className="rounded-2xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                Davet İçin İletişime Geç
              </Link>
              <Link
                href="/musteri-girisi/ilk-basvuru"
                className="rounded-2xl border border-orange-300/30 bg-orange-500/18 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/26"
              >
                Önce Başvuru Oluştur
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f1725]/88 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Portal Akışı
            </div>
            <h2 className="mt-2 text-2xl font-black text-white">
              İlk temastan aktif müşteri erişimine giden çizgi
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/58">
            Buradaki amaç sadece form toplamak değil, operasyonu erken safhada düzenli hale
            getirmek. Bu yüzden akış kontrollü ve aşamalı ilerler.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {portalSteps.map((step) => (
            <div key={step.eyebrow} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/14 text-sm font-black text-orange-200">
                {step.eyebrow}
              </div>
              <h3 className="mt-4 text-lg font-black text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
