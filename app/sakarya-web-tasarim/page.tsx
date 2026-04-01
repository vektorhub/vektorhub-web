import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("sakarya-web-tasarim");

export default function SakaryaWebTasarimPage() {
  return <LocationLandingPage slug="sakarya-web-tasarim" />;
}
