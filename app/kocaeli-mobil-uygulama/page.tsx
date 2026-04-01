import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("kocaeli-mobil-uygulama");

export default function KocaeliMobilUygulamaPage() {
  return <LocationLandingPage slug="kocaeli-mobil-uygulama" />;
}
