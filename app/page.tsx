// AnnouncementBar is rendered globally in the layout
import type { Metadata } from "next";
import { CalendarPreview } from "@/components/calendar-preview";
import { HeroSection } from "@/components/hero-section";
import { ServicePackages } from "@/components/service-packages";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "VektörHUB ana sayfasında iş geliştirme, web sitesi, mobil uygulama ve dijital görünürlük odaklı hizmetleri keşfedin.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicePackages />
      <CalendarPreview />
    </>
  );
}