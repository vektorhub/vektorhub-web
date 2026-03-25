import { ServiceDetailPage } from "@/components/service-detail-page";

const items = [
  {
    title: "Hesap Düzeni",
    description:
      "Sosyal medya profilleri daha düzenli, daha kurumsal ve daha güven veren bir görünüme taşınır.",
  },
  {
    title: "İçerik Akışı",
    description:
      "Paylaşım dili, içerik sırası ve görünür iletişim noktaları daha tutarlı şekilde planlanır.",
  },
  {
    title: "Aktif Görünüm",
    description:
      "İşletmenin sosyal medyada boş ya da dağınık görünmesi yerine canlı ve güven veren bir duruş kazanması hedeflenir.",
  },
];

export default function SosyalMedyaYonetimiPage() {
  return (
    <ServiceDetailPage
      badge="Sosyal Medya Yönetimi"
      title="Sosyal medya hesaplarını dağınık vitrin olmaktan çıkarıp çalışan iletişim alanına dönüştürürüz."
      intro="Sosyal medya bugün birçok işletme için ilk temas noktalarından biri. Ancak aktif görünmeyen ya da düzensiz yönetilen hesaplar güveni azaltabilir."
      approachLabel="Sosyal Medya Yaklaşımı"
      approachText="VektörHUB sosyal medya yönetimini yalnızca paylaşım yapmak olarak değil, markanın dijitaldeki görünümünü ve müşteriye verdiği ilk hissi düzenleyen bir alan olarak ele alır."
      itemLabel="Yönetim Alanı"
      items={items}
      result="Amaç, işletmenin sosyal medyada daha net görünmesi, daha düzenli iletişim kurması ve marka algısını güçlendirmesidir."
    />
  );
}
