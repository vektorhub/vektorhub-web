import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SNIPER Gizlilik Politikası | VektörHUB",
  description: "SNIPER mobil uygulaması için gizlilik ve kişisel veri işleme politikası.",
};

const items = {
  data: [
    "Ad, soyad, e-posta adresi ve hesap kimliği.",
    "E-posta doğrulama, üyelik seviyesi, abonelik süresi ve hesap durumu kayıtları.",
    "Tek cihaz kullanımını sağlamak için üretilen cihaz kimliği ve cihaz bağlama kayıtları.",
    "Oturum, güvenlik, başarısız giriş, IP adresi, işlem ve hata kayıtları.",
    "Kullanıcının destek veya satın alma sürecinde kendi isteğiyle ilettiği bilgiler.",
  ],
  purposes: [
    "Hesap oluşturmak, e-posta adresini doğrulamak ve güvenli oturum açmayı sağlamak.",
    "Free ve Pro yetkilerini, abonelik süresini ve tek cihaz kuralını uygulamak.",
    "Hesap kilitleme, uzaktan oturum sonlandırma ve kötüye kullanım önleme işlemlerini yürütmek.",
    "Uygulama ve VPS hizmetinin güvenliğini, sürekliliğini ve performansını izlemek.",
    "Destek taleplerini yanıtlamak ve yasal yükümlülükleri yerine getirmek.",
  ],
};

export default function SniperPrivacyPolicyPage() {
  return (
    <section className="container-main page-content-template pb-20 pt-6">
      <div className="relative mb-8 overflow-hidden rounded-[28px] border border-emerald-400/20 bg-[#08131a] px-6 py-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,116,144,0.18),transparent_32%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
            SNIPER Mobile App
          </span>
          <p className="mt-4 text-xl font-black leading-tight text-white sm:text-2xl">Gizlilik Politikası</p>
          <p className="mt-3 text-sm text-white/80">Yürürlük tarihi: 27.08.2026</p>
        </div>
      </div>

      <h1 className="section-title">SNIPER Gizlilik Politikası</h1>
      <div className="page-body mt-6 max-w-4xl space-y-6 text-white/80">
        <p>
          Bu politika, VektörHUB tarafından sunulan SNIPER Android uygulamasının hesap, üyelik ve güvenlik
          hizmetlerinde kişisel verilerin nasıl işlendiğini açıklar. SNIPER hesap altyapısı Firebase kullanmaz;
          kullanıcı ve üyelik kayıtları VektörHUB tarafından yönetilen VPS altyapısında tutulur.
        </p>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
          <h2 className="section-subtitle text-white">Veri sorumlusu</h2>
          <p className="mt-3">
            VektörHUB<br />
            Web: www.vektorhub.com<br />
            E-posta: info@vektorhub.com<br />
            Telefon: +90 533 385 05 72
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">1. İşlenen veriler</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            {items.data.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-3">
            Parolalar düz metin olarak saklanmaz; tek yönlü güçlü parola özetleme yöntemiyle korunur.
            Google ile giriş kullanıldığında Google kimlik belirteci yalnızca hesabın doğrulanması için kullanılır.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">2. İşleme amaçları</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            {items.purposes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="section-subtitle text-white">3. Google ile giriş</h2>
          <p className="mt-3">
            Kullanıcı Google ile giriş seçeneğini kullanırsa ad, e-posta adresi ve Google hesap kimliği
            Google Identity hizmetinden alınabilir. Google parolası SNIPER tarafından görülmez veya saklanmaz.
            Google hizmetlerinin kendi veri işleme koşulları ayrıca geçerlidir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">4. Cihaz bağlama ve güvenlik</h2>
          <p className="mt-3">
            Hesap paylaşımını ve eş zamanlı yetkisiz kullanımı önlemek amacıyla hesap ilk yetkili cihaza
            bağlanabilir. Telefon değişikliğinde cihaz bağı yalnızca yetkili yönetici tarafından sıfırlanır.
            Kilitlenen veya süresi dolan hesapların aktif oturumları uzaktan sonlandırılabilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">5. Veri paylaşımı ve altyapı</h2>
          <p className="mt-3">
            Kişisel veriler satılmaz. Veriler yalnızca hizmetin sunulması için gerekli sunucu, e-posta teslimi,
            kötüye kullanım önleme ve Google ile giriş sağlayıcılarıyla amaçla sınırlı olarak veya yasal zorunluluk
            halinde yetkili mercilerle paylaşılabilir. Ana hesap ve üyelik veritabanı VektörHUB VPS altyapısındadır.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">6. Saklama süresi</h2>
          <p className="mt-3">
            Hesap verileri hizmet ilişkisi sürdüğü müddetçe; güvenlik, işlem ve destek kayıtları ise işleme amacı
            ve yasal saklama yükümlülükleri için gerekli süre boyunca tutulur. Süre sonunda veriler silinir,
            yok edilir veya anonimleştirilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">7. Veri güvenliği</h2>
          <p className="mt-3">
            HTTPS, erişim sınırlandırması, parola özetleme, oturum kontrolü, tek cihaz kuralı, güvenlik logları,
            yedekleme ve sunucu sertleştirme önlemleri uygulanır. İnternet üzerinden çalışan hiçbir sistem için
            mutlak güvenlik garantisi verilemez; tespit edilen risklere karşı makul teknik ve idari tedbirler alınır.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">8. Kullanıcı hakları ve hesap silme</h2>
          <p className="mt-3">
            KVKK kapsamındaki bilgi alma, düzeltme, silme, işlemeyi sınırlandırma ve itiraz talepleri
            info@vektorhub.com adresine iletilebilir. Talebin güvenli biçimde sonuçlandırılması için hesap
            sahipliğinin doğrulanması istenebilir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">9. Çocukların gizliliği</h2>
          <p className="mt-3">
            SNIPER, 18 yaş altındaki kişilere yönelik değildir. Reşit olmayan bir kişiye ait verinin işlendiği
            tespit edilirse gerekli inceleme yapılarak veri silinir veya erişim engellenir.
          </p>
        </div>

        <div>
          <h2 className="section-subtitle text-white">10. Güncellemeler ve iletişim</h2>
          <p className="mt-3">
            Politika mevzuat veya hizmet değişikliklerine göre güncellenebilir. Güncel metin bu sayfada yayımlanır.
            Sorular ve başvurular için info@vektorhub.com adresi kullanılabilir.
          </p>
        </div>

        <p className="text-white/65">Son güncelleme: 27.08.2026</p>
      </div>
    </section>
  );
}
