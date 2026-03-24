"use client";

import React, { createContext, useState, useCallback, useContext } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  notify: (message: string, type: NotificationType, duration?: number) => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback(
    (message: string, type: NotificationType = "info", duration = 4000) => {
      const id = Date.now().toString();
      setNotifications((prev) => [...prev, { id, type, message, duration }]);

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

function NotificationContainer() {
  const { notifications, dismiss } = useContext(NotificationContext)!;

  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 max-w-sm">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={() => dismiss(notification.id)}
        />
      ))}
    </div>
  );
}

function Notification({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: () => void;
}) {
  const bgColors = {
    success: "bg-emerald-900/90 border-emerald-700",
    error: "bg-red-900/90 border-red-700",
    info: "bg-blue-900/90 border-blue-700",
    warning: "bg-yellow-900/90 border-yellow-700",
  };

  const textColors = {
    success: "text-emerald-200",
    error: "text-red-200",
    info: "text-blue-200",
    warning: "text-yellow-200",
  };

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertCircle size={20} />,
  };

  return (
    <div
      className={`${bgColors[notification.type]} border rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-right duration-300`}
    >
      <div className={textColors[notification.type]}>{icons[notification.type]}</div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${textColors[notification.type]}`}>
          {notification.message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className={`${textColors[notification.type]} hover:opacity-75 transition`}
      >
        <X size={18} />
      </button>
    </div>
  );
}
