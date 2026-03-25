import Link from "next/link";

const flowSteps = [
  {
    eyebrow: "01",
    title: "İlk başvurunuzu bırakırsınız",
    text: "İhtiyacınızı ve iletişim bilgilerinizi paylaşır, ilk değerlendirme için süreci başlatırsınız.",
  },
  {
    eyebrow: "02",
    title: "Başvurunuz değerlendirilir",
    text: "Uygun görülmesi halinde size müşteri hesabınızı oluşturmanız için özel davet gönderilir.",
  },
  {
    eyebrow: "03",
    title: "Hesabınız aktive edilir",
    text: "Firma ve yetkili bilgileriniz onaylandıktan sonra müşteri portalınıza giriş yapabilirsiniz.",
  },
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

        <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
              Müşteri Girişi
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
              Size uygun adımı seçin,
              <span className="brand-gradient block pt-2">biz sizi doğru ekrana yönlendirelim.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-[15px]">
              İlk kez bizimle çalışmak istiyorsanız başvurunuzu bırakabilirsiniz. Mevcut bir başvurunuz
              varsa durumunu takip edebilirsiniz. Hesabınız zaten açıldıysa doğrudan müşteri portalına
              giriş yapabilirsiniz.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Net Akış
            </div>
            <div className="mt-3 text-2xl font-black text-white">
              Her ziyaretçiye aynı ekran değil,
              <span className="block text-white/86">ihtiyaca göre doğru giriş</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/62">
              Böylece ne yapmanız gerektiği ilk bakışta anlaşılır. Başvuru, takip ve portal girişi
              birbirine karışmaz.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        <Link
          href="/musteri-girisi/ilk-basvuru"
          className="rounded-[30px] border border-orange-400/20 bg-[linear-gradient(135deg,rgba(255,106,0,0.18),rgba(255,138,51,0.12))] p-6 shadow-[0_18px_36px_rgba(255,106,0,0.14)] transition hover:-translate-y-0.5"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
            İlk Adım
          </div>
          <div className="mt-3 text-[22px] font-extrabold text-white">İlk Başvurumu Yapmak İstiyorum</div>
          <p className="mt-3 text-[13px] leading-6 text-white/82">
            Bizimle ilk kez çalışacaksanız buradan başlayın. Bilgileriniz doğrulanır, başvurunuz alınır
            ve size takip numarası verilir.
          </p>
        </Link>

        <Link
          href="/musteri-girisi/durum-sorgula"
          className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-400/30 hover:bg-white/[0.06]"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/62">
            Durum Takibi
          </div>
          <div className="mt-3 text-[22px] font-extrabold text-white">Başvuru Durumumu Görmek İstiyorum</div>
          <p className="mt-3 text-[13px] leading-6 text-white/74">
            Takip numaranız ve telefon bilginizle başvurunuzun hangi aşamada olduğunu kolayca görün.
          </p>
        </Link>

        <Link
          href="/musteri/giris"
          className="rounded-[30px] border border-emerald-300/25 bg-emerald-500/10 p-6 transition hover:bg-emerald-500/16"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Portal Erişimi
          </div>
          <div className="mt-3 text-[22px] font-extrabold text-white">Aktif Müşteri Girişi</div>
          <p className="mt-3 text-[13px] leading-6 text-white/78">
            Hesabınız açıldıysa portalınıza buradan giriş yapın. Tekliflerinizi, dosyalarınızı ve
            sürecinizi tek yerden takip edin.
          </p>
        </Link>
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f1725]/88 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Nasıl İlerler?
            </div>
            <h2 className="mt-2 text-2xl font-black text-white">
              İlk başvurudan portal erişimine giden yol
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/58">
            Süreç baştan itibaren düzenli ilerler; böylece ne zaman beklemede olduğunuzu, ne zaman
            davet alacağınızı ve ne zaman portal erişiminizin açılacağını net görürsünüz.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {flowSteps.map((step) => (
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
