import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollToTop } from "@/components/scroll-to-top";

const siteUrl = "https://www.vektorhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VektörHUB",
    url: siteUrl,
    email: "info@vektorhub.com",
    telephone: "+90 533 385 05 72",
    areaServed: "TR",
    description:
      "Küçük ve orta ölçekli işletmeler için web sitesi, mobil uygulama ve dijital görünürlük çözümleri sunan dijital hizmet merkezi.",
    sameAs: [siteUrl],
  };

  return (
    <html lang="tr">
      <body className="bg-[#0b1220] text-white antialiased">
        <script
          type="application/ld+json"
          // JSON-LD enables rich results and clearer business understanding for search engines.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ScrollToTop />
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.15),transparent_30%),linear-gradient(180deg,#0b1220_0%,#09101c_100%)]">
          <SiteHeader />
          <AnnouncementBar />
          <main className="layout-main relative flex justify-center lg:pl-0 lg:pr-0">
            <div className="layout-main-shell w-full max-w-[72rem] bg-[#181c22]/80 rounded-2xl shadow-2xl p-6 mt-2 mb-10 lg:mx-[9rem]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}