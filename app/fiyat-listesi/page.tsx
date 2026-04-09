import { PricingShowcase } from "@/components/pricing-showcase";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Guncel Fiyat Listesi",
  description:
    "VektorHUB hizmet paketleri ve guncel fiyat listesi. Merkez ofiste guncellenen fiyatlar web sitesine ayni akista yansir.",
  path: "/fiyat-listesi",
  keywords: ["fiyat listesi", "vektorhub fiyat", "web tasarim fiyatlari", "seo fiyatlari"],
});

export default function FiyatListesiPage() {
  return (
    <section className="container-main page-content-template py-20">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Fiyat Listesi", path: "/fiyat-listesi" },
        ])}
      />

      <div className="mb-8 max-w-4xl">
        <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
          Canli Fiyat Akisi
        </div>
        <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
          Merkez fiyat listesi burada tek ekranda guncel gorunur.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
          Bu sayfa dogrudan VektörHUB HQ tarafindaki fiyat listesinden beslenir. Ofiste yapilan guncelleme
          web sitesine ayni duzende yansir.
        </p>
      </div>

      <PricingShowcase className="py-0" />
    </section>
  );
}
