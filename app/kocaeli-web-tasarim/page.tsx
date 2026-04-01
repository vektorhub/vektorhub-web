import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("kocaeli-web-tasarim");

export default function KocaeliWebTasarimPage() {
  return <LocationLandingPage slug="kocaeli-web-tasarim" />;
}
