"use client";

import { generateTimeline, getProgressPercentage, TimelineEvent } from "@/lib/timeline-utils";
import { Clock, CheckCircle2 } from "lucide-react";

interface ApplicationTimelineProps {
  status: string;
  createdAt: string;
  updatedAt: string;
}

function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

export function ApplicationTimeline({
  status,
  createdAt,
  updatedAt,
}: ApplicationTimelineProps) {
  const events = generateTimeline(status, createdAt, updatedAt);
  const progress = getProgressPercentage(status);

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0f1725]/88 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-2 mb-6">
        <Clock size={20} className="text-orange-300" />
        <h3 className="text-xl font-bold text-white">Teklif Zaman Çizelgesi</h3>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-white/65">İlerleme</span>
          <span className="text-xs font-bold text-orange-300">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-orange-400 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.status} className="relative">
            {/* Connecting Line */}
            {index < events.length - 1 && (
              <div
                className={`absolute left-6 top-16 w-0.5 h-12 ${
                  event.completed ? "bg-gradient-to-b from-emerald-400 to-blue-500" : "bg-white/20"
                }`}
              />
            )}

            {/* Event Card */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    event.current
                      ? "border-orange-400 bg-orange-500/20 shadow-lg shadow-orange-500/50"
                      : event.completed
                      ? "border-emerald-400 bg-emerald-500/20"
                      : "border-white/30 bg-white/5"
                  }`}
                >
                  {event.completed ? (
                    <CheckCircle2
                      size={24}
                      className={event.current ? "text-orange-300" : "text-emerald-300"}
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{event.status}</h4>
                  {event.current && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-500/30 text-orange-200 border border-orange-400/50">
                      Mevcut
                    </span>
                  )}
                  {event.completed && !event.current && (
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/30 text-emerald-200">
                      Tamamlandı
                    </span>
                  )}
                </div>

                <p className="text-sm text-white/65 mb-1">{event.description}</p>

                {event.date && (
                  <p className="text-xs text-white/45">
                    📅 {formatDateShort(event.date)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-xs text-white/55">
          {status === "Tamamlandı"
            ? "✨ Talebin tümü başarıyla tamamlandı!"
            : `🔄 Taleb ${status.toLowerCase()} aşamasındadır. Sonraki güncellemeler bu panelede gösterilecektir.`}
        </p>
      </div>
    </div>
  );
}
