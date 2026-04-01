import type { Metadata } from "next";
import Script from "next/script";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteHeader } from "@/components/site-header";
import { VisitorCounter } from "@/components/visitor-counter";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "VektörHUB",
  title: {
    default: "VektörHUB | İş Geliştirme ve Dijital Çözümler",
    template: "%s | VektörHUB",
  },
  description:
    "VektörHUB; küçük ve orta ölçekli işletmeler için web sitesi, mobil uygulama, dijital görünürlük ve iş geliştirme odaklı ölçülü çözümler sunar.",
  keywords: [
    "VektörHUB",
    "vektorhub",
    "iş geliştirme",
    "dijital çözümler",
    "web sitesi",
    "web tasarım",
    "kocaeli web tasarım",
    "körfez web tasarım",
    "google seo",
    "mobil uygulama",
    "Google görünürlük desteği",
    "KOBİ dijital dönüşüm",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260401", sizes: "any" },
      { url: "/favicon.png?v=20260401", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=20260401", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico?v=20260401"],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "VektörHUB",
    title: "VektörHUB | İş Geliştirme ve Dijital Çözümler",
    description:
      "KOBİ'ler için web sitesi, mobil uygulama ve dijital görünürlük çözümlerini tek çatı altında sunan dijital ofis yaklaşımı.",
    images: [
      {
        url: "/brand-flow.png",
        width: 1200,
        height: 630,
        alt: "VektörHUB dijital hizmetler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VektörHUB | İş Geliştirme ve Dijital Çözümler",
    description:
      "Web sitesi, mobil uygulama ve dijital görünürlük desteği ile işletmelere ölçülü ve güçlü dijital yapı kurar.",
    images: ["/brand-flow.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "VektörHUB",
        url: siteUrl,
        sameAs: [
          "https://www.instagram.com/vektorhubdijital",
          "https://www.facebook.com/vektorhubdijital",
          "https://t.me/vektorhubdijital",
        ],
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/search-logo.png?v=20260401`,
        },
        image: `${siteUrl}/search-logo.png?v=20260401`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+90 533 385 05 72",
            contactType: "customer support",
            availableLanguage: ["tr-TR"],
            areaServed: "TR",
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: "VektörHUB",
        url: siteUrl,
        email: "info@vektorhub.com",
        telephone: "+90 533 385 05 72",
        areaServed: "TR",
        image: `${siteUrl}/search-logo.png?v=20260401`,
        description:
          "Küçük ve orta ölçekli işletmeler için web sitesi, mobil uygulama ve dijital görünürlük çözümleri sunan dijital hizmet merkezi.",
        serviceType: [
          "Web tasarım",
          "SEO çalışmaları",
          "Google görünürlük desteği",
          "Mobil uygulama geliştirme",
          "Dijital reklam yönetimi",
        ],
        knowsAbout: [
          "Kocaeli web tasarım",
          "Körfez web tasarım",
          "Kurumsal web sitesi",
          "Google SEO",
          "Dijital çözümler",
        ],
        brand: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "VektörHUB",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "tr-TR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/ogeler?slug={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#core-services`,
        name: "VektörHUB Hizmetleri",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: absoluteUrl("/hizmetler/web-sitesi-tasarimi"),
            name: "Web Sitesi Tasarımı",
          },
          {
            "@type": "ListItem",
            position: 2,
            url: absoluteUrl("/hizmetler/google-seo-calismalari"),
            name: "Google ve SEO Çalışmaları",
          },
          {
            "@type": "ListItem",
            position: 3,
            url: absoluteUrl("/hizmetler/mobil-uygulama-gelistirme"),
            name: "Mobil Uygulama Geliştirme",
          },
        ],
      },
    ],
  };

  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico?v=20260401" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png?v=20260401" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=20260401" sizes="180x180" />
      </head>
      <body className="bg-[#0b1220] text-white antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17981307453"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17981307453');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <VisitorCounter />
        <ScrollToTop />
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.15),transparent_30%),linear-gradient(180deg,#0b1220_0%,#09101c_100%)]">
          <SiteHeader />
          <AnnouncementBar />
          <main className="layout-main relative flex justify-center lg:pl-0 lg:pr-0">
            <div className="layout-main-shell mt-0 mb-10 w-full rounded-2xl bg-[#181c22]/80 p-6 shadow-2xl">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
