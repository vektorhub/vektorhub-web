import type { Metadata } from "next";

export const siteUrl = "https://www.vektorhub.com";
export const defaultOgImage = "/brand-flow.png";

const defaultKeywords = [
  "VektörHUB",
  "vektorhub",
  "web tasarım",
  "kocaeli web tasarım",
  "körfez web tasarım",
  "google görünürlük",
  "seo çalışmaları",
  "mobil uygulama",
  "dijital çözümler",
];

export type PublicRouteConfig = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const publicSiteRoutes: PublicRouteConfig[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/kocaeli-web-tasarim", changeFrequency: "weekly", priority: 0.88 },
  { path: "/kocaeli-seo", changeFrequency: "weekly", priority: 0.84 },
  { path: "/kocaeli-kurumsal-web-sitesi", changeFrequency: "weekly", priority: 0.84 },
  { path: "/kocaeli-mobil-uygulama", changeFrequency: "weekly", priority: 0.78 },
  { path: "/sakarya-web-tasarim", changeFrequency: "weekly", priority: 0.88 },
  { path: "/sakarya-seo", changeFrequency: "weekly", priority: 0.84 },
  { path: "/sakarya-kurumsal-web-sitesi", changeFrequency: "weekly", priority: 0.84 },
  { path: "/sakarya-mobil-uygulama", changeFrequency: "weekly", priority: 0.78 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/misyon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/vizyon", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faaliyetler", changeFrequency: "monthly", priority: 0.65 },
  { path: "/hizmetler", changeFrequency: "weekly", priority: 0.9 },
  { path: "/hizmetler/web-sitesi-tasarimi", changeFrequency: "weekly", priority: 0.9 },
  { path: "/hizmetler/google-seo-calismalari", changeFrequency: "weekly", priority: 0.9 },
  { path: "/hizmetler/sosyal-medya-yonetimi", changeFrequency: "weekly", priority: 0.75 },
  { path: "/hizmetler/dijital-reklam-yonetimi", changeFrequency: "weekly", priority: 0.75 },
  { path: "/hizmetler/mobil-uygulama-gelistirme", changeFrequency: "weekly", priority: 0.75 },
  { path: "/hizmetler/is-gelistirme-danismanligi", changeFrequency: "weekly", priority: 0.75 },
  { path: "/hizmetler/logo-tasarimi", changeFrequency: "weekly", priority: 0.72 },
  { path: "/hizmetler/dijital-gorunum-ve-kurumsal-duzen", changeFrequency: "weekly", priority: 0.7 },
  { path: "/hizmetler/pratik-dijital-cozumler", changeFrequency: "weekly", priority: 0.7 },
  { path: "/hizmetler/dijital-tanitim-ve-icerik-destegi", changeFrequency: "weekly", priority: 0.7 },
  { path: "/hizmetler/ihtiyaca-uygun-ozel-calismalar", changeFrequency: "weekly", priority: 0.7 },
  { path: "/demo-siteler", changeFrequency: "weekly", priority: 0.82 },
  { path: "/demo-siteler/dogusel", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/emlak", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/klinik", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/avukat", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/oto-servis", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/guzellik-merkezi", changeFrequency: "weekly", priority: 0.76 },
  { path: "/demo-siteler/restoran", changeFrequency: "weekly", priority: 0.76 },
  { path: "/referanslar", changeFrequency: "weekly", priority: 0.75 },
  { path: "/iletisim", changeFrequency: "weekly", priority: 0.8 },
  { path: "/uygulamalar/vektorcnc", changeFrequency: "monthly", priority: 0.6 },
  { path: "/uygulamalar/vektornews", changeFrequency: "monthly", priority: 0.6 },
  { path: "/vektorcnc_privacy_policy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/vektornews_privacy_policy", changeFrequency: "monthly", priority: 0.3 },
];

export type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  if (!path || path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = defaultOgImage,
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const mergedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: "tr_TR",
      url: absoluteUrl(path),
      siteName: "VektörHUB",
      title: `${title} | VektörHUB`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | VektörHUB`,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  serviceType,
  keywords = [],
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType,
    areaServed: [
      { "@type": "City", name: "Kocaeli" },
      { "@type": "City", name: "Körfez" },
      { "@type": "Country", name: "Türkiye" },
    ],
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: "VektörHUB",
      url: siteUrl,
      telephone: "+90 533 385 05 72",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Küçük ve orta ölçekli işletmeler",
    },
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])).join(", "),
  };
}
