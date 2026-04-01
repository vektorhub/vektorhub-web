import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Dijital Reklam Yönetimi",
  description:
    "Doğru hedefleme, mesaj kurgusu ve takip disiplini ile bütçeyi kontrollü kullanan dijital reklam yönetimi hizmeti.",
  path: "/hizmetler/dijital-reklam-yonetimi",
  keywords: ["dijital reklam yönetimi", "google reklam", "meta reklam yönetimi"],
});

const items = [
  {
    title: "Hedefleme",
    description:
      "İşletmenin ihtiyacına uygun reklam mantığı ve hedef kitlesi daha kontrollü biçimde belirlenir.",
  },
  {
    title: "Mesaj Kurgusu",
    description:
      "Reklam metni ve görsel dili, müşteriye daha anlaşılır ve daha doğrudan ulaşacak şekilde sadeleştirilir.",
  },
  {
    title: "Takip",
    description:
      "Sadece yayına almak değil, süreci takip edip verimsiz alanları yeniden düzenlemek de sürecin parçasıdır.",
  },
];

export default function DijitalReklamYonetimiPage() {
  return (
    <ServiceDetailPage
      badge="Dijital Reklam Yönetimi"
      title="Reklamı yalnızca bütçe harcamak için değil, doğru temas kurmak için planlarız."
      intro="Dijital reklam yönetimi, işletmenin internette daha hızlı görünmesini sağlayabilir; ancak doğru mesaj, doğru hedefleme ve düzenli takip olmadan verimli sonuç üretmez."
      approachLabel="Reklam Yaklaşımı"
      approachText="VektörHUB reklam yönetiminde büyük kampanyalar yerine işletmenin ölçeğine uygun, kontrollü ve takip edilebilir bir çalışma modeli kurmayı hedefler."
      itemLabel="Süreç Alanı"
      items={items}
      result="Buradaki amaç daha fazla görünürlük sağlamak, doğru müşteriye ulaşmak ve reklamı kontrol edilebilir bir sistem haline getirmektir."
      seo={{
        path: "/hizmetler/dijital-reklam-yonetimi",
        name: "Dijital Reklam Yönetimi",
        description:
          "İşletmenin reklam bütçesini kontrollü kullanmasını sağlayan hedefleme, mesaj ve takip odaklı dijital reklam yönetimi.",
        serviceType: "Dijital reklam yönetimi",
      }}
    />
  );
}
