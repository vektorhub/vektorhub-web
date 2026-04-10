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
    tagline: "Windows icin masaustu kisayol dock bari",
    description:
      "Kisayollarinizi tek bir seffaf dock bar icinde toplar. Windows acilisinda otomatik baslar, kisayollari tek tikla acar ve masaustu ustunde temiz bir hizli erisim alani sunar.",
    platform: "Windows",
    version: "1.0.0",
    downloadUrl: "/downloads/DockApp-Installer.zip",
    category: "Ucretsiz Arac",
    status: "Indirilebilir",
    bullets: [
      "C:\\DockShortcuts klasorundeki kisayollari otomatik listeler.",
      "Windows acilisinda otomatik calisacak sekilde kurulur.",
      "Kurulum paketiyle masaustu ve baslat menu kisayollarini olusturur.",
    ],
  },
];
