import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "İş Geliştirme Danışmanlığı",
  description:
    "Dijital görünürlük, iletişim ve büyüme tarafını birlikte ele alan iş geliştirme danışmanlığı ve uygulanabilir yol haritası hizmeti.",
  path: "/hizmetler/is-gelistirme-danismanligi",
  keywords: ["iş geliştirme danışmanlığı", "dijital büyüme", "iş stratejisi"],
});

const items = [
  {
    title: "Analiz",
    description:
      "İşletmenin mevcut durumu, görünürlüğü ve büyümesini zorlaştıran temel tıkanıklıklar netleştirilir.",
  },
  {
    title: "Strateji",
    description:
      "Ölçeğe uygun, sade ama etkili bir büyüme ve dijital ilerleme stratejisi oluşturulur.",
  },
  {
    title: "Takip",
    description:
      "Sadece öneri verip bırakmak yerine, kurulan sistemin gelişimini izleyen bir çalışma mantığı kurulur.",
  },
];

export default function IsGelistirmeDanismanligiPage() {
  return (
    <ServiceDetailPage
      badge="İş Geliştirme Danışmanlığı"
      title="Dijitali yalnızca görünmek için değil, işi büyütecek sistem kurmak için kullanırız."
      intro="Bazı işletmeler için asıl ihtiyaç yeni bir araç değil; doğru yön, doğru sıralama ve iş geliştirme tarafında daha net bir plan kurulmasıdır."
      approachLabel="Danışmanlık Yaklaşımı"
      approachText="VektörHUB iş geliştirme danışmanlığını teorik rapor üretmekten çok, dijital görünüm, iletişim ve sistem tarafını bir arada ele alan uygulanabilir yol haritası olarak kurgular."
      itemLabel="Danışmanlık Başlığı"
      items={items}
      result="Amaç daha fazla müşteri, daha net görünürlük ve sürdürülebilir büyümeyi destekleyen dijital düzen kurmaktır."
      seo={{
        path: "/hizmetler/is-gelistirme-danismanligi",
        name: "İş Geliştirme Danışmanlığı",
        description:
          "İşletmenin büyüme, görünürlük ve dijital düzen tarafını birlikte ele alan uygulanabilir iş geliştirme danışmanlığı.",
        serviceType: "İş geliştirme danışmanlığı",
      }}
    />
  );
}
