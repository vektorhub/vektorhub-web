export type CustomerServiceItem = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tone: string;
};

export const CUSTOMER_SERVICE_CATALOG: CustomerServiceItem[] = [
  {
    slug: "web-sitesi-tasarimi",
    title: "Web Sitesi Tasarımı",
    summary:
      "Markanızı güçlü gösteren, güven veren ve müşteriyi doğru aksiyona taşıyan kurumsal bir dijital vitrin kurgulanır.",
    description:
      "Web sitesi çoğu işletme için ilk dijital temas noktasıdır. Bu yüzden yalnızca modern görünmesi yetmez; hizmetleri net anlatan, iletişimi kolaylaştıran ve markayı daha profesyonel gösteren bir yapı kurmak gerekir. Bu hizmette amaç, işletmenizin dijitalde daha düzenli, daha güven veren ve satışa daha hazır görünmesini sağlamaktır.",
    image: "/hizmet_banner.png",
    tone: "from-sky-500/18 to-cyan-400/8",
  },
  {
    slug: "google-seo-calismalari",
    title: "Google & SEO Çalışmaları",
    summary:
      "Arama görünürlüğünüzü güçlendiren, doğru müşterinin sizi daha kolay bulmasını sağlayan kalıcı büyüme altyapısı hazırlanır.",
    description:
      "Google tarafında görünür olmak, yalnızca teknik birkaç ayarla çözülen bir konu değildir. İçerik düzeni, sayfa yapısı, hizmet anlatımı ve güven algısı birlikte ele alınmalıdır. Bu hizmet, işletmenizin dijitalde daha bulunabilir hale gelmesini ve arama tarafında daha güçlü bir başlangıç yapmasını hedefler.",
    image: "/brand-flow.png",
    tone: "from-orange-500/18 to-amber-400/8",
  },
  {
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    summary:
      "Marka dilinizi düzenli, profesyonel ve satışa destek veren bir içerik düzenine taşıyan sosyal medya planı oluşturulur.",
    description:
      "Sosyal medya yalnızca paylaşım yapmak değil, işletmenin dijitaldeki karakterini istikrarlı biçimde yansıtmaktır. Bu çalışmada içerik düzeni, görsel ton, mesaj dili ve hedef kitleyle temas mantığı birlikte ele alınır. Sonuçta daha düzenli görünen, daha güvenli bir sosyal medya yüzeyi ortaya çıkar.",
    image: "/guncelleme_banner.png",
    tone: "from-fuchsia-500/18 to-rose-400/8",
  },
  {
    slug: "dijital-reklam-yonetimi",
    title: "Dijital Reklam Yönetimi",
    summary:
      "Bütçeyi daha verimli kullanan, ölçülebilir sonuç üreten ve müşteri kazanımını hızlandıran reklam akışları kurulur.",
    description:
      "Reklam yönetiminde esas mesele daha çok harcamak değil, daha doğru akış kurmaktır. Bu hizmette reklam dili, hedef kitle, sayfa uyumu ve dönüşüm mantığı birlikte düşünülür. Böylece bütçeyi daha kontrollü kullanırken daha net sonuç alınabilecek bir yapı kurulmuş olur.",
    image: "/header-flow.png",
    tone: "from-amber-500/18 to-orange-400/8",
  },
  {
    slug: "mobil-uygulama-gelistirme",
    title: "Mobil Uygulama Geliştirme",
    summary:
      "Saha ekipleri, müşteriler veya operasyon için daha hızlı ve kontrollü kullanım sunan özel mobil uygulama çözümleri geliştirilir.",
    description:
      "Bazı ihtiyaçlar web tarafında çözülse de, bazı süreçler mobil kullanım gerektirir. Mobil uygulama burada yalnızca teknoloji değil, günlük işi kolaylaştıran pratik bir araç olarak ele alınır. Hedef; müşteriye, saha ekibine veya iç operasyona daha hızlı, daha kontrollü ve daha akıcı bir kullanım deneyimi sunmaktır.",
    image: "/vizyon_banner.png",
    tone: "from-indigo-500/18 to-blue-400/8",
  },
  {
    slug: "is-gelistirme-danismanligi",
    title: "İş Geliştirme Danışmanlığı",
    summary:
      "Teklif, müşteri iletişimi, dijital görünüm ve satış akışını aynı stratejik çerçevede iyileştiren danışmanlık modeli sunulur.",
    description:
      "İş geliştirme çoğu zaman sadece satış artırmak gibi görülür; oysa teklif yapısı, marka güveni, müşteri akışı ve dijital görünüm aynı düzen içinde ele alınmalıdır. Bu hizmette amaç, işletmenin daha net hareket eden, daha sistemli ve daha ölçeklenebilir bir düzene geçmesini sağlayacak uygulanabilir adımlar oluşturmaktır.",
    image: "/brand-flow.png",
    tone: "from-emerald-500/18 to-teal-400/8",
  },
  {
    slug: "logo-tasarimi",
    title: "Logo Tasarımı",
    summary:
      "Kurumsal kimliğinize daha net bir ilk izlenim kazandıran, profesyonel ve uzun ömürlü marka işareti tasarlanır.",
    description:
      "Logo yalnızca bir işaret değil, markanın ilk bakışta bıraktığı izlenimin temel parçasıdır. Bu hizmette amaç gösterişli ama kullanışsız bir sembol üretmek değil; dijitalde, baskıda ve farklı yüzeylerde rahat çalışan, daha temiz ve daha profesyonel bir kimlik oluşturacak güçlü bir logo yapısı hazırlamaktır.",
    image: "/hizmet_banner.png",
    tone: "from-slate-500/18 to-zinc-400/8",
  },
];

export function getCustomerServiceBySlug(slug: string) {
  return CUSTOMER_SERVICE_CATALOG.find((item) => item.slug === slug) ?? null;
}
