import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Logo Tasarımı",
  description:
    "İşletmenin dijitalde daha net tanınmasını sağlayan sade, güçlü ve farklı alanlarda rahat kullanılan logo tasarımı hizmeti.",
  path: "/hizmetler/logo-tasarimi",
  keywords: ["logo tasarımı", "kurumsal kimlik", "marka görünümü"],
});

const items = [
  {
    title: "Marka İşareti",
    description:
      "İşletmenin dijitalde daha ayırt edilebilir görünmesini sağlayacak temel logo yapısı hazırlanır.",
  },
  {
    title: "Görsel Uyum",
    description:
      "Logo, web sitesi ve sosyal medya görünümüyle uyumlu daha düzenli bir marka yüzü oluşturur.",
  },
  {
    title: "Kullanım Netliği",
    description:
      "Farklı dijital alanlarda daha rahat kullanılabilecek, daha temiz ve daha okunur bir yapı hedeflenir.",
  },
];

export default function LogoTasarimiPage() {
  return (
    <ServiceDetailPage
      badge="Logo Tasarımı"
      title="İşletmenin dijitalde daha net tanınmasını sağlayan sade ve güçlü logo tasarımları."
      intro="Logo çoğu zaman küçük görünür ama markanın dijitalde bıraktığı ilk izlerden biridir. Dağınık veya zayıf bir görsel kimlik, güven algısını doğrudan etkileyebilir."
      approachLabel="Tasarım Yaklaşımı"
      approachText="VektörHUB logo tasarımında gösterişli ama kullanışsız çözümler yerine, dijitalde rahat kullanılan ve markayı daha net temsil eden yapılar üretmeyi hedefler."
      itemLabel="Tasarım Alanı"
      items={items}
      result="Buradaki hedef yalnızca yeni bir logo çizmek değil; işletmenin dijital görünümünü daha bütünlüklü ve daha güven veren hale getirmektir."
      seo={{
        path: "/hizmetler/logo-tasarimi",
        name: "Logo Tasarımı",
        description:
          "Markanın dijitalde daha net tanınmasını sağlayan sade, güçlü ve farklı alanlarda rahat kullanılan logo tasarımı hizmeti.",
        serviceType: "Logo tasarımı",
      }}
    />
  );
}
