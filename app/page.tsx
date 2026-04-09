import { CalendarPreview } from "@/components/calendar-preview";
import { HeroSection } from "@/components/hero-section";
import { PricingShowcase } from "@/components/pricing-showcase";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { ServicePackages } from "@/components/service-packages";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Kocaeli Web Tasarım ve Dijital Çözümler",
  description:
    "VektörHUB; Kocaeli ve Körfez merkezli işletmeler için web tasarım, Google görünürlük, SEO, mobil uygulama ve dijital yapı desteği sunar.",
  path: "/",
  keywords: ["kurumsal web sitesi", "kocaeli seo", "körfez seo", "dijital ofis"],
});

export default async function HomePage() {
  return (
    <>
      <SeoJsonLd
        data={[
          createBreadcrumbSchema([{ name: "Ana Sayfa", path: "/" }]),
          createServiceSchema({
            name: "Web Tasarım ve Dijital Çözümler",
            description:
              "Kocaeli ve Körfez bölgesindeki işletmeler için web tasarım, SEO, Google görünürlük ve mobil uygulama hizmetleri.",
            path: "/",
            serviceType: "Web tasarım ve dijital çözümler",
            keywords: ["kocaeli web tasarım", "körfez web tasarım", "seo çalışmaları"],
          }),
        ]}
      />
      <HeroSection />
      <PricingShowcase />
      <ServicePackages />
      <CalendarPreview />
    </>
  );
}
