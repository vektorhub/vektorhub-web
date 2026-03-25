import { ServiceDetailPage } from "@/components/service-detail-page";

const items = [
  {
    title: "Google Görünürlüğü",
    description:
      "İşletmenin Google tarafında daha net görünmesi ve daha kolay bulunması için temel yapı kurulumu yapılır.",
  },
  {
    title: "SEO Düzeni",
    description:
      "Sayfa başlıkları, içerik yapısı ve temel teknik sinyaller daha düzenli bir SEO mantığıyla kurgulanır.",
  },
  {
    title: "Yerel Keşif",
    description:
      "Bölgesel aramalarda işletmenin daha anlaşılır görünmesi için yerel görünürlük odaklı düzenlemeler yapılır.",
  },
];

export default function GoogleSeoCalismalariPage() {
  return (
    <ServiceDetailPage
      badge="Google ve SEO"
      title="Google’da görünür olmayı rastlantıya değil, düzenli yapıya bırakan çalışmalar."
      intro="Bir işletmenin internette var olması yeterli değildir; doğru arandığında görünmesi gerekir. Google ve SEO çalışmaları, web sitesinin ve dijital içeriğin daha kolay keşfedilmesini destekler."
      approachLabel="Görünürlük Yaklaşımı"
      approachText="VektörHUB bu alanda büyük vaatler değil; işletmenin dijitalde daha düzenli görünmesini sağlayan uygulanabilir SEO ve görünürlük adımları üretir."
      itemLabel="Çalışma Başlığı"
      items={items}
      result="Buradaki hedef, işletmeyi dijitalde daha bulunabilir hale getirmek ve potansiyel müşterinin doğru temasa daha hızlı ulaşmasını sağlamaktır."
    />
  );
}
