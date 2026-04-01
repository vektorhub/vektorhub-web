import { ServiceDetailPage } from "@/components/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Profesyonel Web Sitesi Tasarımı",
  description:
    "Kocaeli ve Körfez işletmeleri için profesyonel web sitesi tasarımı, içerik akışı ve güven veren dijital vitrin kurulumu.",
  path: "/hizmetler/web-sitesi-tasarimi",
  keywords: ["profesyonel web sitesi", "kurumsal web tasarım", "kocaeli web tasarım"],
});

const items = [
  {
    title: "Kurulum",
    description:
      "İşletmeye uygun yapıda, sade ama güven veren profesyonel web sitesi kurgusu hazırlanır.",
  },
  {
    title: "İçerik Akışı",
    description:
      "Hizmetler, iletişim bilgileri ve marka dili daha anlaşılır bir akışla yerleştirilir.",
  },
  {
    title: "Dijital Vitrin",
    description:
      "Ziyaretçinin ilk bakışta güven duyacağı daha derli toplu ve daha net bir görünüm kurulur.",
  },
];

export default function WebSitesiTasarimiPage() {
  return (
    <ServiceDetailPage
      badge="Profesyonel Web Sitesi"
      title="İşletmenizi dijitalde doğru temsil eden profesyonel web sitesi kurulumu."
      intro="Web sitesi çoğu işletme için dijitaldeki ilk ofistir. Bu yüzden yalnızca güzel görünmesi değil, anlaşılır, güven veren ve müşteriyi doğru yönlendiren bir yapıda olması gerekir."
      approachLabel="Web Yaklaşımı"
      approachText="VektörHUB web sitesi kurulumunu yalnızca tasarım işi olarak görmez; işletmenin dijital görünürlüğünü ve güven algısını taşıyan temel yapı olarak ele alır."
      itemLabel="Hizmet Alanı"
      items={items}
      result="Amaç yalnızca bir site yayına almak değil; işletmenin dijitalde düzenli, bulunabilir ve profesyonel görünmesini sağlayan çalışan bir yapı kurmaktır."
      seo={{
        path: "/hizmetler/web-sitesi-tasarimi",
        name: "Web Sitesi Tasarımı",
        description:
          "İşletmenin dijitalde güven veren, anlaşılır ve profesyonel görünmesini sağlayan web sitesi kurulum hizmeti.",
        serviceType: "Web sitesi tasarımı",
        keywords: ["web tasarım", "kurumsal web sitesi", "körfez web tasarım"],
      }}
    />
  );
}
