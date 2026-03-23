import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VektörHUB",
    short_name: "VektörHUB",
    description:
      "VektörHUB; web sitesi, mobil uygulama ve dijital görünürlük çözümleri sunan iş geliştirme odaklı dijital hizmet yapısıdır.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#ff6a00",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "256x256",
        type: "image/x-icon",
      },
    ],
  };
}