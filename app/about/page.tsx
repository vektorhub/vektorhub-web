import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "VektörHUB'un iş geliştirme ve dijital çözümler yaklaşımını, çalışma modelini ve proje vizyonunu inceleyin.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="container-main page-content-template py-20">
      <h1 className="section-title">Hakkımızda</h1>
      <p className="section-text mt-6 max-w-3xl">
        VektörHUB | İş Geliştirme ve Dijital Çözümler, işletmelerin büyümesini hızlandırmak, rekabet gücünü artırmak ve dijital dünyada sürdürülebilir bir yapı kurmalarını sağlamak amacıyla kurulmuş bir teknoloji ve strateji platformudur.
      </p>
      <p className="section-text mt-4 max-w-3xl">
        Günümüz iş dünyasında başarılı olmak yalnızca iyi bir ürün üretmekle değil; doğru strateji, güçlü dijital altyapı ve veriye dayalı karar mekanizmaları kurmakla mümkündür. VektörHUB bu noktada işletmelere yalnızca hizmet sunan bir firma değil, uzun vadeli bir iş geliştirme ortağı olarak konumlanır.
      </p>

      <h2 className="section-subtitle mt-8">Ne Yapıyoruz</h2>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB, işletmelerin operasyonlarını daha verimli hale getiren, dijital varlıklarını güçlendiren ve yeni fırsatlar yaratmalarını sağlayan çözümler geliştirir.
      </p>

      <p className="section-text mt-4 max-w-3xl font-semibold">Çalışma alanlarımız temel olarak üç ana başlıkta şekillenir:</p>

      <h3 className="section-subtitle mt-6">İş Geliştirme ve Stratejik Danışmanlık</h3>
      <p className="section-text mt-2 max-w-3xl">
        İş modellerinin geliştirilmesi, yeni gelir kanallarının oluşturulması ve sürdürülebilir büyüme stratejileri.
      </p>

      <h3 className="section-subtitle mt-6">Dijital Ürün ve Yazılım Çözümleri</h3>
      <p className="section-text mt-2 max-w-3xl">
        Mobil uygulamalar, web platformları, dijital servisler ve teknoloji tabanlı ürün geliştirme.
      </p>

      <h3 className="section-subtitle mt-6">Dijital Altyapı ve Teknoloji Entegrasyonu</h3>
      <p className="section-text mt-2 max-w-3xl">
        İş süreçlerinin dijitalleştirilmesi, veri odaklı sistemlerin kurulması ve modern teknolojilerin işletmelere entegrasyonu.
      </p>

      <h2 className="section-subtitle mt-8">Yaklaşımımız</h2>
      <p className="section-text mt-4 max-w-3xl">
        Her işletmenin dinamikleri farklıdır. Bu nedenle VektörHUB hazır şablon çözümler yerine, işletmeye özel stratejik yaklaşımlar geliştirir. Teknoloji, yazılım ve iş geliştirme disiplinlerini bir araya getirerek işletmelerin yalnızca bugünü değil, geleceğini de planlayan sistemler kurar.
      </p>

      <h2 className="section-subtitle mt-8">Projelerimiz</h2>
      <p className="section-text mt-4 max-w-3xl">
        VektörHUB bünyesinde geliştirilen projeler, farklı sektörlerde dijital dönüşümü destekleyen uygulama ve platformlardan oluşur. Bu projeler; üretim teknolojilerinden haber platformlarına, mobil uygulamalardan dijital servis altyapılarına kadar geniş bir teknoloji ekosistemini kapsar. Her proje, VektörHUB’un yenilikçi teknoloji geliştirme ve iş modeli üretme yaklaşımının bir yansımasıdır.
      </p>
    </section>
  );
}

