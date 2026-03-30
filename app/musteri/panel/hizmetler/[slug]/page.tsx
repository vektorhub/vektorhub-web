import { notFound } from "next/navigation";
import {
  CUSTOMER_SERVICE_CATALOG,
  getCustomerServiceBySlug,
} from "@/lib/customer-service-catalog";
import { CustomerServiceRequestCta } from "@/components/customer-service-request-cta";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CUSTOMER_SERVICE_CATALOG.map((item) => ({ slug: item.slug }));
}

export default async function MusteriHizmetDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getCustomerServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="page-content-template min-h-[calc(100vh-10rem)] pb-24 pt-24 sm:pt-28 lg:pt-32">
      <div className="grid gap-6">
        <div
          className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(7,14,26,0.92),rgba(12,22,38,0.9))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:p-7"
          style={{
            backgroundImage: `linear-gradient(135deg,rgba(7,14,26,0.86),rgba(12,22,38,0.78)), url('${service.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
              Hizmet Detayı
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-sm leading-8 text-white/78 sm:text-[15px]">
              {service.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Neler Kazandırır?
            </div>
            <p className="mt-4 text-sm leading-8 text-white/72">
              {service.summary} Bu sayfa içinde gördüğünüz açıklama, hizmetin portaldaki sade özeti.
              Uygulamada her hizmet işletmenin mevcut yapısına göre şekillenir; yani tek tip paket
              yerine, ihtiyaçla uyumlu bir çalışma planı çıkarılır.
            </p>
            <p className="mt-4 text-sm leading-8 text-white/66">
              Amaç yalnızca teknik teslim yapmak değil; işletmenin dijital görünümünü, müşteri
              iletişimini ve satış potansiyelini daha güçlü bir düzene taşımaktır.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,19,32,0.98),rgba(11,18,30,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
              Sonraki Adım
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">Bu hizmet için hızlı yönlendirme</h2>
            <p className="mt-3 text-sm leading-7 text-white/68">
              Hizmete ilgi duyuyorsanız portala dönüp süreç kayıtları alanına geçebilir, mevcut
              kaydınızı açabilir veya yeni bir talep başlatabilirsiniz.
            </p>
            <CustomerServiceRequestCta
              serviceTitle={service.title}
              serviceDescription={service.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
