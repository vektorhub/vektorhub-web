"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Send } from "lucide-react";

const whatsappUrl =
  "https://wa.me/905333850572?text=Merhaba%20Vekt%C3%B6rHUB%2C%20web%20sitesi%20ve%20dijital%20%C3%A7%C3%B6z%C3%BCmler%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";
const telegramUrl = "https://t.me/vektorhubdijital";

export function FloatingContactButtons() {
  const pathname = usePathname();
  const isWorkspaceMode =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/musteri/panel") ||
    pathname.startsWith("/musteri/yeni-talep");

  if (isWorkspaceMode) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp ile VektörHUB'a ulaş"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#20c568] text-white shadow-[0_18px_34px_rgba(32,197,104,0.35)] transition hover:-translate-y-1 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#20c568]/45 motion-safe:animate-ping" />
        <span className="absolute -inset-1 rounded-full border border-[#20c568]/30" />
        <MessageCircle className="relative z-10 h-6 w-6" />
        <span className="pointer-events-none absolute right-[4.25rem] hidden whitespace-nowrap rounded-full bg-[#242424] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
          WhatsApp
        </span>
      </a>

      <a
        href={telegramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram ile VektörHUB'a ulaş"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#15a6e8] text-white shadow-[0_18px_34px_rgba(21,166,232,0.32)] transition hover:-translate-y-1 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#15a6e8]/38 motion-safe:animate-ping" />
        <span className="absolute -inset-1 rounded-full border border-[#15a6e8]/30" />
        <Send className="relative z-10 h-6 w-6" />
        <span className="pointer-events-none absolute right-[4.25rem] hidden whitespace-nowrap rounded-full bg-[#242424] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
          Telegram
        </span>
      </a>
    </div>
  );
}
