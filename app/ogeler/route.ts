import { createObsoleteRouteResponse } from "@/lib/obsolete-route";

export function GET() {
  return createObsoleteRouteResponse();
}
