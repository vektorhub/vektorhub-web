import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("sakarya-mobil-uygulama");

export default function SakaryaMobilUygulamaPage() {
  return <LocationLandingPage slug="sakarya-mobil-uygulama" />;
}
