import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Google ve SEO Çalışmaları",
  description:
    "Google'da vektör, vektörhub, web tasarım ve yerel aramalarda görünürlüğü güçlendiren teknik SEO ve içerik düzeni çalışmaları.",
  path: "/hizmetler/google-seo-calismalari",
  keywords: ["google seo", "yerel seo", "kocaeli seo", "körfez seo"],
});

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
      title="Google'da görünür olmayı rastlantıya değil, düzenli yapıya bırakan çalışmalar."
      intro="Bir işletmenin internette var olması yeterli değildir; doğru arandığında görünmesi gerekir. Google ve SEO çalışmaları, web sitesinin ve dijital içeriğin daha kolay keşfedilmesini destekler."
      approachLabel="Görünürlük Yaklaşımı"
      approachText="VektörHUB bu alanda büyük vaatler değil; işletmenin dijitalde daha düzenli görünmesini sağlayan uygulanabilir SEO ve görünürlük adımları üretir."
      itemLabel="Çalışma Başlığı"
      items={items}
      result="Buradaki hedef, işletmeyi dijitalde daha bulunabilir hale getirmek ve potansiyel müşterinin doğru temasa daha hızlı ulaşmasını sağlamaktır."
      seo={{
        path: "/hizmetler/google-seo-calismalari",
        name: "Google ve SEO Çalışmaları",
        description:
          "Yerel ve hedef odaklı aramalarda web sitesinin daha kolay bulunmasını sağlayan Google görünürlük ve SEO çalışmaları.",
        serviceType: "SEO ve Google görünürlük çalışmaları",
        keywords: ["seo çalışmaları", "google görünürlük", "kocaeli web tasarım", "körfez web tasarım"],
      }}
    />
  );
}
