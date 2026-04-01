import { createPageMetadata } from "@/lib/seo";

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type LocationLandingConfig = {
  slug: string;
  city: string;
  serviceTitle: string;
  pageTitle: string;
  description: string;
  intro: string;
  serviceType: string;
  keywords: string[];
  highlights: string[];
  scope: string[];
  process: string[];
  faq: Array<{ question: string; answer: string }>;
  districts: string[];
  primaryHref: string;
  primaryLabel: string;
  relatedLinks: RelatedLink[];
};

export const locationLandingConfigs: LocationLandingConfig[] = [
  {
    slug: "kocaeli-web-tasarim",
    city: "Kocaeli",
    serviceTitle: "Kocaeli Web Tasarım",
    pageTitle: "Kocaeli Web Tasarım",
    description:
      "Kocaeli'deki küçük ve orta ölçekli işletmeler için profesyonel web tasarım, kurumsal site kurgusu, Google görünürlüğü ve dijital yapı desteği.",
    intro:
      "Kocaeli web tasarım hizmetinde amaç yalnızca bir site yayına almak değil; işletmenin dijitalde daha güven veren, daha anlaşılır ve daha profesyonel görünmesini sağlamaktır.",
    serviceType: "Kocaeli web tasarım hizmeti",
    keywords: ["kocaeli web tasarım", "kocaeli kurumsal web sitesi", "kocaeli web sitesi yaptırma"],
    highlights: [
      "Kurumsal görünüm",
      "Yerel görünürlük",
      "İletişim odaklı akış",
    ],
    scope: [
      "Kurumsal web sitesi kurgusu",
      "Hizmet ve içerik akışının düzenlenmesi",
      "İletişim ve teklif alma alanlarının netleştirilmesi",
      "Temel teknik SEO yapısının güçlendirilmesi",
      "Google görünürlüğünü destekleyen sayfa düzeni",
    ],
    process: [
      "İşletmeyi anlama",
      "Sayfa yapısını kurma",
      "Görünürlük temelini güçlendirme",
    ],
    faq: [
      {
        question: "Kocaeli web tasarım hizmeti kimler için uygundur?",
        answer:
          "Kurumsal görünümünü güçlendirmek, müşterisine daha profesyonel dijital temas sunmak ve Google'da daha net görünmek isteyen işletmeler için uygundur.",
      },
      {
        question: "Web sitesi sadece tasarım işi midir?",
        answer:
          "Hayır. Doğru web sitesi; tasarım, içerik akışı, güven sinyalleri, iletişim netliği ve temel SEO yapısının birlikte kurulmasıyla değer üretir.",
      },
      {
        question: "Detaylı hizmet sayfasına geçiş yapılabilir mi?",
        answer:
          "Evet. Bu sayfa Kocaeli odaklı bir giriş sayfasıdır. Ziyaretçi isterse ana web sitesi tasarımı hizmet sayfasına doğrudan geçebilir.",
      },
    ],
    districts: ["İzmit", "Körfez", "Başiskele", "Derince", "Gebze", "Gölcük"],
    primaryHref: "/hizmetler/web-sitesi-tasarimi",
    primaryLabel: "Web Sitesi Tasarımı Hizmetini İncele",
    relatedLinks: [
      {
        href: "/hizmetler/google-seo-calismalari",
        label: "Google ve SEO Çalışmaları",
        description: "Kocaeli odaklı görünürlüğü güçlendiren teknik ve içerik düzenini inceleyin.",
      },
      {
        href: "/referanslar",
        label: "Referanslar",
        description: "Çalışma yaklaşımını ve sağlanan katkıları referans sayfasında görün.",
      },
      {
        href: "/iletisim",
        label: "Proje Görüşmesi Başlat",
        description: "Doğrudan iletişim sayfasına geçip web sitesi ihtiyacınızı net şekilde iletin.",
      },
    ],
  },
  {
    slug: "kocaeli-seo",
    city: "Kocaeli",
    serviceTitle: "Kocaeli SEO",
    pageTitle: "Kocaeli SEO",
    description:
      "Kocaeli'deki işletmeler için Google görünürlüğünü, sayfa düzenini ve yerel arama performansını güçlendiren SEO çalışmaları.",
    intro:
      "Kocaeli SEO çalışmalarında hedef yalnızca anahtar kelime geçirmek değil; işletmenin Google tarafında daha anlaşılır, daha güçlü ve daha bulunabilir görünmesini sağlamaktır.",
    serviceType: "Kocaeli SEO hizmeti",
    keywords: ["kocaeli seo", "kocaeli google seo", "yerel seo kocaeli"],
    highlights: ["Yerel arama uyumu", "Teknik SEO düzeni", "Hedef odaklı içerik yapısı"],
    scope: [
      "Title, description ve canonical düzeni",
      "Yerel arama niyetine uygun içerik yapısı",
      "Google görünürlüğünü destekleyen sayfa sinyalleri",
      "Sitemap, robots ve schema güçlendirmesi",
      "İç link yapısının desteklenmesi",
    ],
    process: [
      "Mevcut yapıyı analiz etme",
      "Teknik sinyalleri düzeltme",
      "Yerel görünürlüğü destekleme",
    ],
    faq: [
      {
        question: "Kocaeli SEO çalışması ne işe yarar?",
        answer:
          "Doğru aramalarda sitenin daha net anlaşılmasına, daha düzenli indekslenmesine ve yerel niyetli sorgularda daha güçlü görünmesine katkı sağlar.",
      },
      {
        question: "SEO çalışması sadece blog yazısı mıdır?",
        answer:
          "Hayır. Teknik yapı, sayfa hiyerarşisi, iç linkleme, schema ve içerik birlikte ele alındığında SEO gerçek fayda üretir.",
      },
      {
        question: "Bu sayfadan ana SEO hizmetine geçiş yapılabilir mi?",
        answer:
          "Evet. Bu sayfa Kocaeli odaklı giriş sayfasıdır ve detaylı hizmet kurgusuna geçiş verir.",
      },
    ],
    districts: ["İzmit", "Körfez", "Başiskele", "Derince", "Gebze", "Kartepe"],
    primaryHref: "/hizmetler/google-seo-calismalari",
    primaryLabel: "Google ve SEO Hizmetini İncele",
    relatedLinks: [
      {
        href: "/hizmetler/web-sitesi-tasarimi",
        label: "Web Sitesi Tasarımı",
        description: "SEO ile birlikte çalışan profesyonel site yapısını inceleyin.",
      },
      {
        href: "/about",
        label: "Hakkımızda",
        description: "VektörHUB'un iş geliştirme ve dijital görünürlük yaklaşımını görün.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "SEO ve Google görünürlüğü için doğrudan proje görüşmesi başlatın.",
      },
    ],
  },
  {
    slug: "kocaeli-kurumsal-web-sitesi",
    city: "Kocaeli",
    serviceTitle: "Kocaeli Kurumsal Web Sitesi",
    pageTitle: "Kocaeli Kurumsal Web Sitesi",
    description:
      "Kocaeli'deki firmalar için daha güven veren, daha düzenli ve daha profesyonel kurumsal web sitesi kurulumu.",
    intro:
      "Kocaeli kurumsal web sitesi ihtiyacında en kritik konu, işletmenin sunduğu hizmeti sade ama güçlü bir düzenle anlatan ve güven üreten bir yapı kurmaktır.",
    serviceType: "Kocaeli kurumsal web sitesi hizmeti",
    keywords: ["kocaeli kurumsal web sitesi", "kocaeli firma sitesi", "kurumsal site kocaeli"],
    highlights: ["Kurumsal sunum", "Güven sinyalleri", "Profesyonel hizmet akışı"],
    scope: [
      "Kurumsal site kurgusu",
      "Hizmet başlıklarının netleştirilmesi",
      "Referans ve güven alanlarının yerleşimi",
      "İletişim ve teklif sayfalarının desteklenmesi",
      "Kurumsal görünümü taşıyan sayfa dili",
    ],
    process: [
      "Kurumsal ihtiyaçları netleştirme",
      "Sayfa düzenini ve anlatımı kurma",
      "Profesyonel görünümü yayınlama",
    ],
    faq: [
      {
        question: "Kurumsal web sitesi ile standart site arasında fark var mı?",
        answer:
          "Evet. Kurumsal web sitesi daha net bir hizmet anlatımı, daha güçlü güven sinyalleri ve daha düzenli iletişim akışı taşır.",
      },
      {
        question: "Kocaeli'deki firmalar için neden önemli?",
        answer:
          "Çünkü ilk dijital temas çoğu zaman web sitesidir ve kurumsal görünüm doğrudan güven algısını etkiler.",
      },
      {
        question: "Ana hizmet sayfasına geçiş mümkün mü?",
        answer:
          "Evet. Bu giriş sayfası kurumsal web sitesi niyetini karşılar ve detaylı hizmet sayfasına yönlendirir.",
      },
    ],
    districts: ["İzmit", "Körfez", "Gebze", "Kartepe", "Başiskele", "Gölcük"],
    primaryHref: "/hizmetler/web-sitesi-tasarimi",
    primaryLabel: "Kurumsal Web Sitesi Hizmetini İncele",
    relatedLinks: [
      {
        href: "/referanslar",
        label: "Referanslar",
        description: "Firmanız için nasıl bir güven ve görünüm yapısı kurulabileceğini referanslardan görün.",
      },
      {
        href: "/hizmetler/google-seo-calismalari",
        label: "Google ve SEO Çalışmaları",
        description: "Kurumsal siteyi destekleyen görünürlük yapısını inceleyin.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "Kurumsal web sitesi ihtiyacınız için doğrudan görüşme başlatın.",
      },
    ],
  },
  {
    slug: "kocaeli-mobil-uygulama",
    city: "Kocaeli",
    serviceTitle: "Kocaeli Mobil Uygulama",
    pageTitle: "Kocaeli Mobil Uygulama",
    description:
      "Kocaeli'deki işletmeler için operasyonu, takibi ve müşteri deneyimini güçlendiren ihtiyaca özel mobil uygulama çözümleri.",
    intro:
      "Kocaeli mobil uygulama ihtiyacında önemli olan gösterişli teknoloji değil; işletmenin gerçek kullanım senaryosuna oturan, sade ve çalışır bir ürün geliştirmektir.",
    serviceType: "Kocaeli mobil uygulama geliştirme hizmeti",
    keywords: ["kocaeli mobil uygulama", "mobil uygulama geliştirme kocaeli", "özel uygulama kocaeli"],
    highlights: ["İhtiyaca özel yapı", "Operasyon desteği", "Geliştirilebilir ürün mantığı"],
    scope: [
      "Mobil uygulama ihtiyaç analizi",
      "Kullanım senaryosuna uygun ürün kurgusu",
      "Takip ve operasyon alanlarının mobilleştirilmesi",
      "Kullanıcı deneyimi mantığının sadeleştirilmesi",
      "Geliştirilebilir ürün temelinin kurulması",
    ],
    process: [
      "İhtiyacı netleştirme",
      "Ürün akışını kurma",
      "Kullanılabilir mobil yapıyı oluşturma",
    ],
    faq: [
      {
        question: "Kocaeli'de mobil uygulama her işletme için gerekli mi?",
        answer:
          "Hayır. Gerçek ihtiyaç olduğunda, takip, operasyon veya müşteri deneyimi tarafında net fayda sağladığında anlamlıdır.",
      },
      {
        question: "Mobil uygulama ile web sitesi aynı şey midir?",
        answer:
          "Hayır. Web sitesi ve mobil uygulama farklı kullanım amaçlarına hizmet eder. Doğru çözüm, işletmenin ihtiyacına göre belirlenir.",
      },
      {
        question: "Detaylı mobil uygulama hizmetine geçiş yapılabilir mi?",
        answer:
          "Evet. Bu sayfa Kocaeli odaklı giriş sayfasıdır ve ana mobil uygulama hizmetine geçiş sunar.",
      },
    ],
    districts: ["İzmit", "Gebze", "Körfez", "Derince", "Kartepe", "Başiskele"],
    primaryHref: "/hizmetler/mobil-uygulama-gelistirme",
    primaryLabel: "Mobil Uygulama Hizmetini İncele",
    relatedLinks: [
      {
        href: "/uygulamalar/vektorcnc",
        label: "VektörCNC",
        description: "Mobil uygulama yaklaşımımızın proje örneklerinden birini görün.",
      },
      {
        href: "/uygulamalar/vektornews",
        label: "VektörNEWS",
        description: "İçerik ve haber akışı odaklı mobil ürün örneğini inceleyin.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "Mobil uygulama ihtiyacınız için doğrudan görüşme başlatın.",
      },
    ],
  },
  {
    slug: "sakarya-web-tasarim",
    city: "Sakarya",
    serviceTitle: "Sakarya Web Tasarım",
    pageTitle: "Sakarya Web Tasarım",
    description:
      "Sakarya'daki küçük ve orta ölçekli işletmeler için profesyonel web tasarım, kurumsal site kurgusu ve dijital görünürlük desteği.",
    intro:
      "Sakarya web tasarım hizmetinde hedef, işletmenin dijitalde daha güçlü görünmesini sağlayan sade, güven veren ve net bir site yapısı kurmaktır.",
    serviceType: "Sakarya web tasarım hizmeti",
    keywords: ["sakarya web tasarım", "sakarya kurumsal web sitesi", "sakarya web sitesi yaptırma"],
    highlights: ["Kurumsal görünüm", "Yerel görünürlük", "Anlaşılır hizmet akışı"],
    scope: [
      "Kurumsal web sitesi kurgusu",
      "Hizmet ve içerik akışının düzenlenmesi",
      "İletişim ve teklif alanlarının netleştirilmesi",
      "Temel SEO ve görünürlük yapısının desteklenmesi",
      "Google'da daha net anlaşılır sayfa düzeni",
    ],
    process: [
      "İşletmeyi ve hedefi anlama",
      "Sayfa düzenini kurma",
      "Görünürlüğü destekleyen yapıyı tamamlama",
    ],
    faq: [
      {
        question: "Sakarya web tasarım hizmeti kimler için uygundur?",
        answer:
          "Müşterisine daha güven veren bir dijital yüz oluşturmak, hizmetini daha net anlatmak ve düzenli görünmek isteyen işletmeler için uygundur.",
      },
      {
        question: "Web sitesi ile Google görünürlüğü birlikte düşünülür mü?",
        answer:
          "Evet. Doğru web sitesi yapısı, Google tarafındaki görünürlüğü destekleyen en önemli temellerden biridir.",
      },
      {
        question: "Ana hizmet sayfasına geçiş yapılabilir mi?",
        answer:
          "Evet. Bu sayfa Sakarya odaklı bir giriş sayfasıdır ve detaylı hizmet kurgusuna geçiş verir.",
      },
    ],
    districts: ["Adapazarı", "Serdivan", "Erenler", "Akyazı", "Arifiye", "Hendek"],
    primaryHref: "/hizmetler/web-sitesi-tasarimi",
    primaryLabel: "Web Sitesi Tasarımı Hizmetini İncele",
    relatedLinks: [
      {
        href: "/hizmetler/google-seo-calismalari",
        label: "Google ve SEO Çalışmaları",
        description: "Sakarya odaklı görünürlüğü destekleyen teknik ve içerik yapısını görün.",
      },
      {
        href: "/referanslar",
        label: "Referanslar",
        description: "Çalışma yaklaşımını ve örnek katkıları referans sayfasında inceleyin.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "Web sitesi ihtiyacınız için doğrudan görüşme başlatın.",
      },
    ],
  },
  {
    slug: "sakarya-seo",
    city: "Sakarya",
    serviceTitle: "Sakarya SEO",
    pageTitle: "Sakarya SEO",
    description:
      "Sakarya'daki işletmeler için Google görünürlüğünü, yerel arama performansını ve teknik SEO yapısını güçlendiren çalışmalar.",
    intro:
      "Sakarya SEO çalışmalarında önemli olan yalnızca içerik eklemek değil; web sitesini Google'ın daha doğru anlayacağı ve hedef aramalarda daha güçlü değerlendireceği yapıya getirmektir.",
    serviceType: "Sakarya SEO hizmeti",
    keywords: ["sakarya seo", "sakarya google seo", "yerel seo sakarya"],
    highlights: ["Yerel arama uyumu", "Teknik sinyal gücü", "Hedef odaklı içerik yapısı"],
    scope: [
      "Title, description ve canonical düzeni",
      "Yerel aramaya uygun içerik ve başlık yapısı",
      "Google görünürlüğünü destekleyen teknik katman",
      "Sitemap, robots ve schema desteği",
      "İç link akışının desteklenmesi",
    ],
    process: [
      "Mevcut yapıyı analiz etme",
      "Teknik ve içerik sinyallerini güçlendirme",
      "Yerel arama niyetini destekleme",
    ],
    faq: [
      {
        question: "Sakarya SEO çalışması ne sağlar?",
        answer:
          "Web sitesinin doğru aramalarda daha net görünmesine, daha düzenli indekslenmesine ve yerel niyetli sorgularda daha güçlü değerlendirilmesine yardımcı olur.",
      },
      {
        question: "SEO sadece blog yazısı eklemek midir?",
        answer:
          "Hayır. Teknik yapı, schema, iç linkleme, sayfa düzeni ve içerik birlikte ele alındığında SEO gerçek etki üretir.",
      },
      {
        question: "Ana SEO hizmetine geçiş var mı?",
        answer:
          "Evet. Bu giriş sayfası Sakarya odaklıdır ve detaylı SEO hizmet sayfasına geçiş verir.",
      },
    ],
    districts: ["Adapazarı", "Serdivan", "Akyazı", "Arifiye", "Hendek", "Sapanca"],
    primaryHref: "/hizmetler/google-seo-calismalari",
    primaryLabel: "Google ve SEO Hizmetini İncele",
    relatedLinks: [
      {
        href: "/hizmetler/web-sitesi-tasarimi",
        label: "Web Sitesi Tasarımı",
        description: "SEO ile birlikte çalışan profesyonel site yapısını inceleyin.",
      },
      {
        href: "/about",
        label: "Hakkımızda",
        description: "VektörHUB'un görünürlük ve iş geliştirme yaklaşımını görün.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "SEO ve Google görünürlüğü için doğrudan iletişime geçin.",
      },
    ],
  },
  {
    slug: "sakarya-kurumsal-web-sitesi",
    city: "Sakarya",
    serviceTitle: "Sakarya Kurumsal Web Sitesi",
    pageTitle: "Sakarya Kurumsal Web Sitesi",
    description:
      "Sakarya'daki firmalar için daha güven veren, daha anlaşılır ve daha profesyonel kurumsal web sitesi kurulumu.",
    intro:
      "Sakarya kurumsal web sitesi ihtiyacında önemli olan işletmenin sunduğu hizmeti dağınık değil, net ve güven üreten bir düzenle anlatmaktır.",
    serviceType: "Sakarya kurumsal web sitesi hizmeti",
    keywords: ["sakarya kurumsal web sitesi", "sakarya firma sitesi", "kurumsal site sakarya"],
    highlights: ["Kurumsal sunum", "Güven sinyalleri", "Profesyonel hizmet akışı"],
    scope: [
      "Kurumsal site kurgusu",
      "Hizmet başlıklarının netleştirilmesi",
      "Referans ve güven alanlarının yerleşimi",
      "İletişim ve teklif alanlarının desteklenmesi",
      "Kurumsal görünümü taşıyan içerik dili",
    ],
    process: [
      "Kurumsal ihtiyaçları netleştirme",
      "Sayfa anlatımını düzenleme",
      "Profesyonel görünümü yayınlama",
    ],
    faq: [
      {
        question: "Kurumsal web sitesi neden önemlidir?",
        answer:
          "Çünkü ilk dijital temas çoğu zaman web sitesidir ve kurumsal görünüm güven algısını doğrudan etkiler.",
      },
      {
        question: "Standart site ile farkı nedir?",
        answer:
          "Kurumsal web sitesi daha net hizmet anlatımı, daha güçlü güven sinyalleri ve daha düzenli iletişim akışı taşır.",
      },
      {
        question: "Detaylı hizmet sayfasına geçiş yapılabilir mi?",
        answer:
          "Evet. Bu sayfa Sakarya odaklı kurumsal giriş sayfasıdır ve ana hizmet sayfasına geçiş verir.",
      },
    ],
    districts: ["Adapazarı", "Serdivan", "Erenler", "Arifiye", "Sapanca", "Hendek"],
    primaryHref: "/hizmetler/web-sitesi-tasarimi",
    primaryLabel: "Kurumsal Web Sitesi Hizmetini İncele",
    relatedLinks: [
      {
        href: "/referanslar",
        label: "Referanslar",
        description: "Çalışma yaklaşımımızı ve sağlanan katkıları referans sayfasında görün.",
      },
      {
        href: "/hizmetler/google-seo-calismalari",
        label: "Google ve SEO Çalışmaları",
        description: "Kurumsal siteyi destekleyen görünürlük yapısını inceleyin.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "Kurumsal web sitesi ihtiyacınız için doğrudan görüşme başlatın.",
      },
    ],
  },
  {
    slug: "sakarya-mobil-uygulama",
    city: "Sakarya",
    serviceTitle: "Sakarya Mobil Uygulama",
    pageTitle: "Sakarya Mobil Uygulama",
    description:
      "Sakarya'daki işletmeler için operasyonu, takibi ve müşteri deneyimini güçlendiren ihtiyaca özel mobil uygulama çözümleri.",
    intro:
      "Sakarya mobil uygulama ihtiyacında önemli olan işletmenin kullanım senaryosuna oturan, sade ama etkili bir ürün geliştirmektir.",
    serviceType: "Sakarya mobil uygulama geliştirme hizmeti",
    keywords: ["sakarya mobil uygulama", "mobil uygulama geliştirme sakarya", "özel uygulama sakarya"],
    highlights: ["İhtiyaca özel yapı", "Operasyon desteği", "Geliştirilebilir ürün mantığı"],
    scope: [
      "Mobil uygulama ihtiyaç analizi",
      "Kullanım senaryosuna uygun ürün kurgusu",
      "Takip ve operasyon alanlarının mobilleştirilmesi",
      "Kullanıcı deneyiminin sadeleştirilmesi",
      "Geliştirilebilir ürün temelinin kurulması",
    ],
    process: [
      "İhtiyacı netleştirme",
      "Ürün akışını kurma",
      "Kullanılabilir mobil yapıyı yayınlama",
    ],
    faq: [
      {
        question: "Sakarya'da mobil uygulama her işletme için gerekli mi?",
        answer:
          "Hayır. Net bir kullanım ihtiyacı olduğunda, operasyon veya müşteri deneyiminde gerçek fayda sağladığında anlamlıdır.",
      },
      {
        question: "Mobil uygulama ile web sitesi aynı çözüm müdür?",
        answer:
          "Hayır. Web sitesi ve mobil uygulama farklı ihtiyaçlara cevap verir. Doğru çözüm, işletmenin hedefiyle belirlenir.",
      },
      {
        question: "Ana mobil uygulama hizmetine geçiş var mı?",
        answer:
          "Evet. Bu sayfa Sakarya odaklı giriş sayfasıdır ve detaylı mobil uygulama hizmetine geçiş sunar.",
      },
    ],
    districts: ["Adapazarı", "Serdivan", "Erenler", "Arifiye", "Akyazı", "Sapanca"],
    primaryHref: "/hizmetler/mobil-uygulama-gelistirme",
    primaryLabel: "Mobil Uygulama Hizmetini İncele",
    relatedLinks: [
      {
        href: "/uygulamalar/vektorcnc",
        label: "VektörCNC",
        description: "Mobil ürün yaklaşımımızın proje örneklerinden birini inceleyin.",
      },
      {
        href: "/uygulamalar/vektornews",
        label: "VektörNEWS",
        description: "İçerik ve haber akışı odaklı mobil ürün örneğini görün.",
      },
      {
        href: "/iletisim",
        label: "İletişim",
        description: "Mobil uygulama ihtiyacınız için doğrudan iletişime geçin.",
      },
    ],
  },
];

export function getLocationLandingConfig(slug: string) {
  return locationLandingConfigs.find((config) => config.slug === slug);
}

export function getLocationLandingMetadata(slug: string) {
  const config = getLocationLandingConfig(slug);

  if (!config) {
    throw new Error(`Missing location landing config for slug: ${slug}`);
  }

  return createPageMetadata({
    title: config.pageTitle,
    description: config.description,
    path: `/${config.slug}`,
    keywords: config.keywords,
  });
}
