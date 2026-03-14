// AnnouncementBar is rendered globally in the layout
import { CalendarPreview } from "@/components/calendar-preview";
import { HeroSection } from "@/components/hero-section";
import { ServicePackages } from "@/components/service-packages";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicePackages />
      <CalendarPreview />
    </>
  );
}