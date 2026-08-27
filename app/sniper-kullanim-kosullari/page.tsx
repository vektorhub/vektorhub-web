import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SNIPER Kullanım Koşulları | VektörHUB",
  description: "SNIPER mobil uygulaması kullanım ve üyelik koşulları.",
};

export default function SniperTermsPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div className="relative mb-8 overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#08131a] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_32%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            SNIPER Mobile App
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">Kullanım Koşulları</p>
          <p className="mt-3 text-sm text-white/80">Yürürlük tarihi: 27.08.2026</p>
        </div>
      </div>

      <h1 className="section-title">SNIPER Kullanım Koşulları</h1>
      <div className="page-body mt-6 max-w-4xl space-y-6 text-white/80">
        <p>
          SNIPER uygulamasında hesap oluşturarak veya uygulamayı kullanarak aşağıdaki koşulları kabul etmiş
          olursunuz. Hizmet VektörHUB tarafından sunulur.
        </p>

        <div>
          <h2 className="section-subtitle text-white">1. Hesap ve doğrulama</h2>
          <p className="mt-3">
            Kayıt sırasında doğru ve erişilebilir bir e-posta adresi kullanılmalıdır. Hesap bilgilerini korumak,
            güçlü parola belirlemek ve yetkisiz kullanımı bildirmek kullanıcının sorumluluğundadır. Sahte,
            yanıltıcı veya başkasına ait bilgilerle açılan hesaplar kilitlenebilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">2. Free ve Pro üyelik</h2>
          <p className="mt-3">
            Free hesaplar uygulamanın arayüzünü ve izin verilen tanıtım alanlarını görüntüleyebilir; işlem
            özellikleri kapalıdır. Pro yetkisi satın alınan süre için tanımlanır ve süre sona erdiğinde otomatik
            olarak kaldırılabilir. Üyelik süresi yönetim sistemindeki kayıt esas alınarak belirlenir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">3. Tek cihaz kuralı</h2>
          <p className="mt-3">
            Bir kullanıcı hesabı aynı anda yalnızca yetkilendirilen tek cihazda çalışabilir. Hesap paylaşımı,
            çoğaltılmış uygulama veya cihaz kimliği değiştirme girişimleri yasaktır. Telefon değişikliğinde cihaz
            bağı, hesap sahibi doğrulandıktan sonra yönetici tarafından sıfırlanabilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">4. Yasaklı kullanım</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Uygulamayı tersine mühendislik, kopyalama, yeniden dağıtma veya güvenlik kontrollerini aşma.</li>
            <li>Hesap satma, kiralama, paylaşma veya yetkisiz üçüncü kişilere kullandırma.</li>
            <li>Sunucuya otomatik, aşırı veya hizmeti bozacak nitelikte istek gönderme.</li>
            <li>Başka kullanıcıların verilerine ya da yönetim işlevlerine erişmeye çalışma.</li>
          </ul>
          <p className="mt-3">Bu durumlarda hesap bildirimli veya bildirimsiz olarak geçici ya da kalıcı biçimde kilitlenebilir.</p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">5. Finansal risk bildirimi</h2>
          <p className="mt-3">
            SNIPER bir yatırım danışmanlığı hizmeti değildir. Kripto varlık ve benzeri piyasalarda işlem yapmak
            yüksek risk içerir ve sermayenin tamamının kaybedilmesine yol açabilir. Sinyaller, analizler ve otomatik
            işlevler kesin sonuç veya kazanç garantisi vermez. Tüm işlem kararları ve sonuçları kullanıcının kendi
            sorumluluğundadır.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">6. Hizmet sürekliliği</h2>
          <p className="mt-3">
            Güvenli ve sürekli hizmet için makul çaba gösterilir. İnternet, borsa API&apos;leri, cihaz, bakım, üçüncü
            taraf veya mücbir sebep kaynaklı kesintiler oluşabilir. Planlı bakım ve zorunlu güvenlik müdahaleleri
            gerektiğinde uygulanabilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">7. Ücret, süre ve iptal</h2>
          <p className="mt-3">
            Satın alma öncesinde bildirilen ücret ve süre geçerlidir. Pro yetkisi ödemenin doğrulanmasının ardından
            hesaba tanımlanır. İade veya iptal talepleri, satın alma kanalı, hizmetin kullanılıp kullanılmadığı ve
            yürürlükteki tüketici mevzuatı dikkate alınarak değerlendirilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">8. Fikri mülkiyet</h2>
          <p className="mt-3">
            Uygulamanın yazılımı, tasarımı, markası, içerikleri ve ilgili sistemleri üzerindeki haklar VektörHUB&apos;a
            veya ilgili hak sahiplerine aittir. Kullanıcıya yalnızca üyelik süresi ve koşulları kapsamında kişisel,
            sınırlı ve devredilemez kullanım hakkı verilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">9. Değişiklikler ve iletişim</h2>
          <p className="mt-3">
            Koşullar yasal, teknik veya hizmete ilişkin ihtiyaçlarla güncellenebilir. Güncel sürüm bu sayfada
            yayımlanır. Sorularınız için info@vektorhub.com adresinden iletişime geçebilirsiniz.
          </p>
        </div>

        <p className="text-white/65">Son güncelleme: 27.08.2026</p>
      </div>
    </section>
  );
}
