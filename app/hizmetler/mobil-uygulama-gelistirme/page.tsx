import { ServiceDetailPage } from "@/components/service-detail-page";

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
    />
  );
}
