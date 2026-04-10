export type FreeApp = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  platform: string;
  version: string;
  downloadUrl: string;
  category: string;
  status: string;
  bullets: string[];
};

export const freeApps: FreeApp[] = [
  {
    slug: "dock-app",
    name: "Dock App",
    tagline: "Windows için masaüstü kısayol dock barı",
    description:
      "Kısayollarınızı tek bir şeffaf dock bar içinde toplar. Windows açılışında otomatik başlar, kısayolları tek tıkla açar ve masaüstü üstünde temiz bir hızlı erişim alanı sunar.",
    platform: "Windows",
    version: "1.0.0",
    downloadUrl: "/downloads/DockApp-Installer.zip",
    category: "Ücretsiz Araç",
    status: "İndirilebilir",
    bullets: [
      "C:\\DockShortcuts klasöründeki kısayolları otomatik listeler.",
      "Windows açılışında otomatik çalışacak şekilde kurulur.",
      "Kurulum paketiyle masaüstü ve başlat menü kısayollarını oluşturur.",
    ],
  },
];
