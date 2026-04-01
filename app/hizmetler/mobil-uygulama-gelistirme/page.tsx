import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mobil Uygulama Geliştirme",
  description:
    "İhtiyaca özel mobil uygulama geliştirme ile işletmenin dijital akışını, operasyonunu ve müşteri deneyimini cebe taşıyan çözümler.",
  path: "/hizmetler/mobil-uygulama-gelistirme",
  keywords: ["mobil uygulama geliştirme", "işletme uygulaması", "özel mobil uygulama"],
});

const items = [
  {
    title: "İhtiyaca Özel Yapı",
    description:
      "Hazır kalıp değil, işletmenin gerçek kullanım senaryosuna göre şekillenen mobil uygulama yapısı planlanır.",
  },
  {
    title: "Kullanım Kolaylığı",
    description:
      "Uygulama, karmaşık olmadan iş gören ve günlük kullanımı kolaylaştıran bir mantıkla tasarlanır.",
  },
  {
    title: "Ürünleşme",
    description:
      "Fikir aşamasındaki çözüm, kullanılabilir ve geliştirilebilir bir mobil ürüne dönüşecek zemine oturtulur.",
  },
];

export default function MobilUygulamaGelistirmePage() {
  return (
    <ServiceDetailPage
      badge="Mobil Uygulama Geliştirme"
      title="İhtiyaca özel mobil uygulamalarla işletmenin dijital akışını cebe taşırız."
      intro="Bazı ihtiyaçlar yalnızca web sitesi ile çözülmez. Mobil uygulama, takip, içerik, operasyon veya müşteri deneyimi tarafında daha pratik bir kullanım sağlayabilir."
      approachLabel="Mobil Yaklaşım"
      approachText="VektörHUB mobil uygulama geliştirmeyi gösterişli bir teknoloji işi olarak değil, gerçek kullanım değeri üreten, hafif ama etkili bir dijital araç olarak ele alır."
      itemLabel="Geliştirme Alanı"
      items={items}
      result="Hedef, yalnızca uygulama çıkarmak değil; işletmenin işine gerçekten dokunan, kullanılabilir ve geliştirilebilir bir mobil yapı kurmaktır."
      seo={{
        path: "/hizmetler/mobil-uygulama-gelistirme",
        name: "Mobil Uygulama Geliştirme",
        description:
          "İşletmeye özel senaryolara göre kurgulanan, kullanılabilir ve geliştirilebilir mobil uygulama hizmeti.",
        serviceType: "Mobil uygulama geliştirme",
      }}
    />
  );
}
