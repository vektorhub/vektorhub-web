import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("kocaeli-seo");

export default function KocaeliSeoPage() {
  return <LocationLandingPage slug="kocaeli-seo" />;
}
