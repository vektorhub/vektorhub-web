import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { VisitorCounter } from "@/components/visitor-counter";

const siteUrl = "https://www.vektorhub.com";

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
    "iş geliştirme",
    "dijital çözümler",
    "web sitesi",
    "mobil uygulama",
    "Google görünürlük desteği",
    "KOBİ dijital dönüşüm",
    "Ümraniye web hizmeti",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=20260324", sizes: "any" },
      { url: "/favicon.png?v=20260324", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.ico?v=20260324"],
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
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        image: `${siteUrl}/logo.png`,
        sameAs: [siteUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: "VektörHUB",
        url: siteUrl,
        email: "info@vektorhub.com",
        telephone: "+90 533 385 05 72",
        areaServed: "TR",
        image: `${siteUrl}/logo.png`,
        description:
          "Küçük ve orta ölçekli işletmeler için web sitesi, mobil uygulama ve dijital görünürlük çözümleri sunan dijital hizmet merkezi.",
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
      },
    ],
  };

  return (
    <html lang="tr">
      <head>
        <link rel="icon" type="image/png" href="/icon" />
        <link rel="icon" href="/favicon.ico?v=20260324" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png?v=20260324" />
        <link rel="apple-touch-icon" href="/apple-icon" />
      </head>
      <body className="bg-[#0b1220] text-white antialiased">
        <script
          type="application/ld+json"
          // JSON-LD enables rich results and clearer business understanding for search engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <VisitorCounter />
        <ScrollToTop />
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.15),transparent_30%),linear-gradient(180deg,#0b1220_0%,#09101c_100%)]">
          <SiteHeader />
          <AnnouncementBar />
          <main className="layout-main relative flex justify-center lg:pl-0 lg:pr-0">
            <div className="layout-main-shell w-full bg-[#181c22]/80 rounded-2xl shadow-2xl p-6 mt-0 mb-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
