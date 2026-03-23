import type { MetadataRoute } from "next";

const siteUrl = "https://www.vektorhub.com";

const routes = [
  "",
  "/about",
  "/misyon",
  "/vizyon",
  "/hizmetler",
  "/hizmetler/dijital-gorunum-ve-kurumsal-duzen",
  "/hizmetler/pratik-dijital-cozumler",
  "/hizmetler/dijital-tanitim-ve-icerik-destegi",
  "/hizmetler/ihtiyaca-uygun-ozel-calismalar",
  "/referanslar",
  "/iletisim",
  "/uygulamalar/vektorcnc",
  "/uygulamalar/vektornews",
  "/vektorcnc_privacy_policy",
  "/vektornews_privacy_policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}