import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("kocaeli-kurumsal-web-sitesi");

export default function KocaeliKurumsalWebSitesiPage() {
  return <LocationLandingPage slug="kocaeli-kurumsal-web-sitesi" />;
}
