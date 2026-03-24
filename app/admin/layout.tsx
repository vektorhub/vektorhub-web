import type { ReactNode } from "react";

// Admin rotaları site layout'undan (header/footer) bağımsız çalışır
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
