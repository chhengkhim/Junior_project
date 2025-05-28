"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Megaphone,
  Info,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface NotificationItemProps {
  notification: {
    id: number;
    title: string;
    message: string;
    type: "announcement" | "event" | "alert" | "update";
    date: string;
    isRead: boolean;
    link?: string;
  };
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
  delay: number;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDismiss,
  delay,
}: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today - show time
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      // Yesterday
      return "Yesterday";
    } else if (diffDays < 7) {
      // Within a week
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      // More than a week ago
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const getTypeIcon = () => {
    switch (notification.type) {
      case "announcement":
        return <Megaphone className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5" />;
      case "update":
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case "announcement":
        return "bg-purple-100 text-purple-600";
      case "event":
        return "bg-blue-100 text-blue-600";
      case "alert":
        return "bg-amber-100 text-amber-600";
      case "update":
        return "bg-emerald-100 text-emerald-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        notification.isRead
          ? "border border-slate-100"
          : "border-l-4 border-[#1d2b7d] shadow-md"
      }`}
    >
      <div className="p-4 sm:p-5 flex">
        <div
          className={`${getTypeColor()} flex items-center justify-center p-2 rounded-full mr-4 flex-shrink-0`}
        >
          {getTypeIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 sm:mb-0">
            <h3
              className={`font-medium ${
                notification.isRead ? "text-slate-700" : "text-[#1d2b7d]"
              } mb-1 sm:mb-0`}
            >
              {notification.title}
            </h3>
            <span className="text-xs text-slate-500 sm:ml-4 flex-shrink-0">
              {formatDate(notification.date)}
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-3">{notification.message}</p>

          <div className="flex items-center justify-between">
            {notification.link ? (
              <Link
                href={notification.link}
                className="text-[#1d2b7d] text-sm font-medium flex items-center hover:underline"
              >
                View details
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            ) : (
              <span></span>
            )}

            <div
              className={`flex space-x-1 transition-opacity ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {!notification.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                  className="p-1 text-slate-400 hover:text-[#1d2b7d] hover:bg-slate-50 rounded-full transition-colors"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-full transition-colors"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
