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
        src: "/favicon.png?v=20260401",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png?v=20260401",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico?v=20260401",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}
