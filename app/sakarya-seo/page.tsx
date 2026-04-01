import { LocationLandingPage } from "@/components/location-landing-page";
import { getLocationLandingMetadata } from "@/lib/location-landings";

export const metadata = getLocationLandingMetadata("sakarya-seo");

export default function SakaryaSeoPage() {
  return <LocationLandingPage slug="sakarya-seo" />;
}
