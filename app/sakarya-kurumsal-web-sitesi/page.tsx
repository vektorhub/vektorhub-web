import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("sakarya-kurumsal-web-sitesi");

export default function SakaryaKurumsalWebSitesiPage() {
  return <LocationLandingPage slug="sakarya-kurumsal-web-sitesi" />;
}
