import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ScrollToTop } from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "VektörHUB | Endüstriyel Tasarım • Üretim • Danışmanlık",
  description:
    "VektörHUB kurumsal web sitesi ve profesyonel müşteri portalı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-[#0b1220] text-white antialiased">
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