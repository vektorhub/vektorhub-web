export default function VektorNewsPrivacyPolicyPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div
        className="relative mb-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#101926] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.22)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(8,14,24,0.88), rgba(16,20,34,0.76)), url('/guncelleme_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-200">
            VektorNEWS Mobile App
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">
            Gizlilik Politikası
          </p>
          <p className="mt-3 text-sm text-white/80">
            Yürürlük Tarihi: 23.03.2026
          </p>
        </div>
      </div>

      <h1 className="section-title">VektorNEWS Gizlilik Politikası</h1>
      <div className="page-body mt-6 max-w-4xl space-y-6 text-white/80">
        <p>
          Bu Gizlilik Politikası, Google Play üzerinden yayınlanan VektorNEWS mobil uygulamasını kullanan
          tüm kullanıcılar için hazırlanmıştır. VektorNEWS, haber, gündem, içerik ve duyuru akışlarını daha
          düzenli sunmak amacıyla VektorHUB tarafından geliştirilen bir mobil uygulamadır.
        </p>
        <p>
          Uygulamayı indirmeniz, kurmanız veya kullanmanız halinde bu politikada açıklanan veri işleme
          süreçleri hakkında bilgilendirilmiş sayılırsınız.
        </p>

        <div className="rounded-2xl border border-orange-400/20 bg-[linear-gradient(135deg,rgba(255,106,0,0.12),rgba(255,138,51,0.08))] p-5">
          <h2 className="section-subtitle text-white">Veri Sorumlusu</h2>
          <p className="mt-3">
            Unvan: VektorHUB
            <br />
            Web: www.vektorhub.com
            <br />
            E-posta: info@vektorhub.com
            <br />
            Telefon: +90 533 385 05 72
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">1. Hangi Verileri İşliyoruz?</h2>
          <p className="mt-3">
            Uygulamanın güvenli, stabil ve işlevsel şekilde sunulabilmesi amacıyla aşağıdaki veri kategorileri
            işlenebilir:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Kimlik ve iletişim bilgileri (kullanıcının paylaşması halinde ad, soyad, e-posta ve benzeri bilgiler).</li>
            <li>Hesap ve oturum verileri (kullanıcı kimliği, oturum doğrulama bilgileri, yetki kayıtları).</li>
            <li>Teknik cihaz verileri (cihaz modeli, işletim sistemi sürümü, uygulama sürümü, dil ve bölge ayarları).</li>
            <li>Kullanım verileri (okunan içerikler, ekran geçişleri, etkileşim kayıtları, hata ve performans logları).</li>
            <li>Bildirim ve tercih verileri (push bildirim tercihi, içerik kategorisi tercihleri, uygulama içi ayarlar).</li>
            <li>Destek ve geri bildirim kayıtları (iletilen talep, mesaj, öneri ve teknik destek kayıtları).</li>
          </ul>
        </div>

        <div>
          <h2 className="section-subtitle text-white">2. Verileri Hangi Amaçlarla İşliyoruz?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Haber, gündem ve içerik akışını kullanıcıya düzenli biçimde sunmak.</li>
            <li>İçeriklerin kategorize edilmesi, listelenmesi ve kullanıcı deneyiminin iyileştirilmesi.</li>
            <li>Bildirim tercihlerini yönetmek ve kullanıcıya ilgili güncellemeleri iletmek.</li>
            <li>Uygulama performansını, hata kayıtlarını ve teknik kalite süreçlerini izlemek.</li>
            <li>Kullanıcı destek taleplerine dönüş sağlamak ve hizmet kalitesini geliştirmek.</li>
            <li>Mevzuattan doğan yükümlülükleri yerine getirmek ve güvenlik denetimlerini yürütmek.</li>
          </ul>
        </div>

        <div>
          <h2 className="section-subtitle text-white">3. İşleme Hukuki Dayanakları</h2>
          <p className="mt-3">
            Verileriniz, 6698 sayılı KVKK ve ilgili mevzuat kapsamında; sözleşmenin kurulması ve ifası,
            meşru menfaat, açık rıza (gerektiğinde) ve hukuki yükümlülüklerin yerine getirilmesi hukuki
            sebeplerine dayanarak işlenir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">4. İzinler ve Cihaz Erişimleri</h2>
          <p className="mt-3">
            VektorNEWS, yalnızca ilgili özelliğin çalışması için gerekli olduğu durumlarda cihaz izinleri
            talep edebilir. Örneğin bildirim özelliğinin kullanılması halinde bildirim izni istenebilir.
            Tüm izinler cihaz ayarları üzerinden kullanıcı tarafından yönetilebilir ve gerektiğinde kapatılabilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">5. Veri Paylaşımı</h2>
          <p className="mt-3">Kişisel verileriniz, aşağıdaki durumlar dışında üçüncü kişilere satılmaz veya devredilmez:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Hizmetin teknik olarak sunulabilmesi için kullanılan altyapı, barındırma, analitik veya bildirim hizmet sağlayıcıları.</li>
            <li>Mevzuat gereği yetkili kamu kurum ve kuruluşları.</li>
            <li>Hukuki süreçler, güvenlik gereklilikleri veya resmi talepler kapsamında yetkili merciler.</li>
          </ul>
          <p className="mt-3">
            Tüm paylaşımlar, işleme amacıyla sınırlı ve gerekli olduğu ölçüde yapılır; teknik ve idari koruma
            tedbirleri uygulanır.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">6. Veri Saklama Süreleri</h2>
          <p className="mt-3">
            Veriler, işleme amacının gerektirdiği süre boyunca ve yürürlükteki mevzuatta öngörülen saklama
            süreleri çerçevesinde muhafaza edilir. Süre sonunda veriler silinir, yok edilir veya anonim hale getirilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">7. Veri Güvenliği</h2>
          <p className="mt-3">VektorHUB, kişisel verilerin güvenliğini sağlamak amacıyla makul teknik ve idari tedbirler uygular:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Erişim yetkilerinin sınırlandırılması ve rol bazlı yetkilendirme.</li>
            <li>Hata, erişim ve işlem loglarının izlenmesi.</li>
            <li>Güncel altyapı ve yazılım güvenlik önlemleri.</li>
            <li>Veri işleyen personel ve hizmet sağlayıcılar için gizlilik yükümlülükleri.</li>
          </ul>
        </div>

        <div>
          <h2 className="section-subtitle text-white">8. Çocukların Gizliliği</h2>
          <p className="mt-3">
            Uygulama, 13 yaş altı çocukları hedef alacak şekilde tasarlanmamıştır. Bu yaş grubuna ait verilerin
            yanlışlıkla işlendiğinin tespiti halinde ilgili veriler makul süre içinde silinir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">9. Kullanıcı Hakları</h2>
          <p className="mt-3">KVKK kapsamında, kişisel verilerinizle ilgili olarak:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>İşlenip işlenmediğini öğrenme,</li>
            <li>İşlenmiş ise bilgi talep etme,</li>
            <li>İşleme amacını ve amaca uygun kullanımını öğrenme,</li>
            <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme,</li>
            <li>Mevzuat şartları dahilinde silinmesini veya yok edilmesini talep etme,</li>
            <li>Kanuna aykırı işleme nedeniyle zarara uğrama halinde tazminat talep etme,</li>
          </ul>
          <p className="mt-3">haklarına sahipsiniz.</p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">10. Başvuru ve İletişim</h2>
          <p className="mt-3">
            Gizlilik politikası kapsamındaki tüm soru, talep ve başvurularınızı info@vektorhub.com adresine
            iletebilirsiniz. Başvurular, ilgili mevzuatta belirtilen süreler içinde değerlendirilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">11. Politika Güncellemeleri</h2>
          <p className="mt-3">
            Bu politika, yasal gereklilikler veya hizmet kapsamındaki değişiklikler doğrultusunda güncellenebilir.
            Güncel metin her zaman bu sayfada yayınlanır. Önemli değişikliklerde uygulama içi bilgilendirme
            yapılabilir.
          </p>
        </div>

        <p className="mt-2 text-white/65">Son güncelleme: 23.03.2026</p>
      </div>
    </section>
  );
}