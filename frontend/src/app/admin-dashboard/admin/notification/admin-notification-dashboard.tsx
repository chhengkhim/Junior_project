"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Calendar,
  Megaphone,
  Info,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
  Clock,
  ImageIcon,
  Hash,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import CreateNotificationModal from "./create-notification-modal";
import Image from "next/image";
import user from "@/assets/user.jpg"; // Placeholder image for user avatar
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function AdminNotificationDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState<
    Set<number>
  >(new Set());
  const [selectedNotifications, setSelectedNotifications] = useState<
    Set<number>
  >(new Set());
  const [receivedNotifications, setReceivedNotifications] = useState<
    AdminNotification[]
  >([]);
  const [sentNotifications, setSentNotifications] = useState<
    SentNotification[]
  >([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  type NotificationType =
    | "announcement"
    | "event"
    | "alert"
    | "update"
    | "user_post"
    | "user_feedback";

  interface AdminNotification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    date: string;
    isRead: boolean;
    link?: string;
    image?: string;
    hashtags?: string[];
    userInfo?: {
      name: string;
      email: string;
      avatar?: string;
    };
  }

  interface SentNotification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    date: string;
    sentTo: number;
    viewCount: number;
    clickCount: number;
    hashtags: string[];
    image?: string;
    link?: string;
  }

  useEffect(() => {
    setIsVisible(true);

    // Simulated received notifications (from users)
    const receivedData: AdminNotification[] = [
      {
        id: 1,
        title: "New User Feedback Submitted",
        message:
          "Sarah Johnson submitted comprehensive feedback about the counseling services. She mentioned excellent support from Dr. Smith and highlighted how the weekly sessions have significantly improved her mental health. She particularly appreciated the flexible scheduling and the safe, welcoming environment. Sarah also suggested adding more group therapy sessions and extending evening hours for students with busy schedules. She expressed gratitude for the confidential and professional service provided by the entire counseling team.",
        type: "user_feedback",
        date: "2025-01-26T10:30:00",
        isRead: false,

        userInfo: {
          name: "Sarah Johnson",
          email: "sarah.j@university.edu",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        link: "https://university.edu/feedback/123",
        hashtags: ["#CounselingServices", "#MentalHealth", "#StudentSupport"],
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: 2,
        title: "Student Support Request",
        message:
          "Michael Chen posted a detailed request for additional study groups during the upcoming exam period. He mentioned that many students are struggling with advanced mathematics courses and would benefit from peer-to-peer learning sessions. Michael suggested organizing study groups for Calculus II, Linear Algebra, and Statistics, with sessions running from 6 PM to 8 PM on weekdays. He also proposed having graduate students or teaching assistants facilitate these sessions to provide expert guidance.",
        type: "user_post",
        date: "2025-01-26T09:15:00",
        isRead: false,

        userInfo: {
          name: "Michael Chen",
          email: "m.chen@university.edu",
        },
        hashtags: [
          "#StudyGroups",
          "#Mathematics",
          "#ExamPrep",
          "#PeerLearning",
        ],
      },
      {
        id: 3,
        title: "Mental Health Resource Suggestion",
        message:
          "Emma Davis suggested adding meditation apps to the resource library. She specifically recommended Headspace, Calm, and Insight Timer as valuable tools for stress management. Emma noted that many students are dealing with anxiety and would benefit from guided meditation sessions. She also suggested creating a quiet meditation space on campus where students can practice mindfulness techniques between classes.",
        type: "user_feedback",
        date: "2025-01-25T16:45:00",
        isRead: true,
        userInfo: {
          name: "Emma Davis",
          email: "emma.d@university.edu",
        },
        link: "https://university.edu/resources/meditation",
        hashtags: ["#MentalHealth", "#Meditation", "#StressManagement"],
      },
      {
        id: 4,
        title: "Crisis Support Request",
        message:
          "Anonymous user submitted an urgent support request through the crisis hotline form. The individual expressed feelings of overwhelming stress and anxiety related to academic pressure and personal relationships. They mentioned having difficulty sleeping and concentrating on studies. The request indicates immediate need for counseling support and possibly referral to mental health professionals. Follow-up contact has been initiated through the secure messaging system.",
        type: "alert",
        date: "2025-01-25T14:20:00",
        isRead: false,

        userInfo: {
          name: "Anonymous User",
          email: "anonymous@system.edu",
        },
        link: "https://university.edu/crisis/789",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 5,
        title: "System Update Notification",
        message:
          "New features have been added to the platform for better user experience. The update includes improved notification system, enhanced search functionality, and better mobile responsiveness. Users can now customize their notification preferences and receive real-time updates about important announcements. The system also includes new accessibility features to support students with disabilities.",
        type: "update",
        date: "2025-01-24T11:00:00",
        isRead: false,

        userInfo: {
          name: "System Administrator",
          email: "admin@university.edu",
        },
        hashtags: ["#SystemUpdate", "#NewFeatures", "#Accessibility"],
        link: "https://university.edu/updates/latest",
      },
    ];

    // Simulated sent notifications
    const sentData: SentNotification[] = [
      {
        id: 1,
        title: "Mental Health Awareness Week",
        message:
          "Join us for a week of activities focused on mental health awareness and support.",
        type: "announcement",
        date: "2025-01-25T12:00:00",
        sentTo: 1250,
        viewCount: 980,
        clickCount: 245,
        hashtags: ["#MentalHealth", "#Awareness", "#Support"],
        image: "/placeholder.svg?height=200&width=400",
        link: "/events/mental-health-week",
      },
      {
        id: 2,
        title: "New Counseling Hours",
        message: "Extended counseling hours now available during exam period.",
        type: "update",
        date: "2025-01-24T15:30:00",
        sentTo: 1250,
        viewCount: 756,
        clickCount: 189,
        hashtags: ["#Counseling", "#ExamSupport"],
      },
    ];

    setReceivedNotifications(receivedData);
    setSentNotifications(sentData);
  }, []);

  const markAsRead = (id: number) => {
    setReceivedNotifications(
      receivedNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setReceivedNotifications(
      receivedNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const clearAll = () => {
    setReceivedNotifications([]);
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
      // Mark as read when expanding
      markAsRead(id);
    }
    setExpandedNotifications(newExpanded);
  };

  const toggleSelectNotification = (id: number) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedNotifications.size === filteredNotifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(new Set(filteredNotifications.map((n) => n.id)));
    }
  };

  const getFilteredNotifications = () => {
    return receivedNotifications.filter((notification) => {
      const typeMatch =
        activeFilter === "all" || notification.type === activeFilter;
      const searchMatch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        notification.userInfo?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        notification.userInfo?.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const unreadMatch = !showUnreadOnly || !notification.isRead;
      return typeMatch && searchMatch && unreadMatch;
    });
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = receivedNotifications.filter(
    (notification) => !notification.isRead
  ).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "update":
        return <Info className="h-4 w-4" />;
      case "user_post":
        return <MessageSquare className="h-4 w-4" />;
      case "user_feedback":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const truncateMessage = (message: string, maxLength = 80) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const filters = [
    { id: "all", label: "All", icon: Bell },
    { id: "announcement", label: "Announcements", icon: Megaphone },
    { id: "event", label: "Events", icon: Calendar },
    { id: "alert", label: "Alerts", icon: AlertTriangle },
    { id: "update", label: "Updates", icon: Info },
  ];

  return (
    <div className="min-h-screen rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-center mb-8">
            <p className="inline-block px-3 py-1 bg-[#1d2b7d]/10 text-black rounded-full text-sm font-medium mb-2">
              NOTIFICATIONS
            </p>

            <div className="mb-3">
              <TypingAnimation className="text-3xl md:text-4xl font-bold text-black">
                Admin Notifications
              </TypingAnimation>
            </div>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Stay informed about system activities, user updates, and important
              administrative alerts for managing Paragon University effectively.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-end mb-8"
        >
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Send a push notification
          </Button>
        </motion.div>

        {/* Notification Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">You have</p>
                <p className="text-lg font-semibold text-blue-900">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={markAllAsRead}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-green-500 bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
              <Button
                onClick={clearAll}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700 bg-red-600"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Filters
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      activeFilter === filter.id
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-500 bg-gray-300 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>

            {/* Show unread only toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="show-unread"
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-yellow-400 text-white"
              />
              <Label
                htmlFor="show-unread"
                className="text-sm font-medium text-gray-700"
              >
                Show unread only
              </Label>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for a notification"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-700 border-gray-200"
            />
          </div>
        </motion.div>

        {/* Notifications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white shadow-sm border-0 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 w-12">
                      <Checkbox
                        checked={
                          filteredNotifications.length > 0 &&
                          selectedNotifications.size ===
                            filteredNotifications.length
                        }
                        onCheckedChange={toggleSelectAll}
                        className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600"
                      />
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <tr
                        className={`hover:bg-gray-50 transition-colors ${
                          !notification.isRead ? "bg-blue-50/30" : ""
                        } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                      >
                        <td className="px-6 py-4">
                          <Checkbox
                            checked={selectedNotifications.has(notification.id)}
                            onCheckedChange={() =>
                              toggleSelectNotification(notification.id)
                            }
                            className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {notification.userInfo?.email ||
                            "system@university.edu"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 flex-shrink-0">
                              {getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-medium text-sm ${
                                  notification.isRead
                                    ? "text-gray-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {notification.title}
                              </div>
                              <div className="text-xs text-gray-500 truncate max-w-xs mt-1">
                                {truncateMessage(notification.message)}
                              </div>
                              {/* Content Indicators */}
                              <div className="flex items-center gap-1 mt-2">
                                {notification.image && (
                                  <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                    <ImageIcon className="h-3 w-3" />
                                    <span>Image</span>
                                  </div>
                                )}
                                {notification.link && (
                                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    <LinkIcon className="h-3 w-3" />
                                    <span>Link</span>
                                  </div>
                                )}
                                {notification.hashtags &&
                                  notification.hashtags.length > 0 && (
                                    <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                      <Hash className="h-3 w-3" />
                                      <span>
                                        {notification.hashtags.length}
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {notification.userInfo?.name || "System"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(notification.date)}
                        </td>
                        <td className="px-6 py-4">
                          {notification.isRead ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 rounded-full px-3 py-1">
                              Read
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 rounded-full px-3 py-1">
                              Unread
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => toggleExpanded(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 text-sm font-medium flex items-center gap-1 rounded-lg px-3 py-2"
                          >
                            View details
                            {expandedNotifications.has(notification.id) ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </Button>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      <AnimatePresence>
                        {expandedNotifications.has(notification.id) && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td
                              colSpan={7}
                              className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200"
                            >
                              <div className="space-y-4">
                                {/* User Info */}
                                {notification.userInfo && (
                                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                                    <Avatar className="h-12 w-12 ring-2 ring-blue-200">
                                      <AvatarImage
                                        src={
                                          notification.userInfo.avatar ||
                                          "/placeholder.svg"
                                        }
                                      />
                                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                        {notification.userInfo.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="font-semibold text-gray-900">
                                          {notification.userInfo.name}
                                        </span>
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {notification.userInfo.email}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Image */}
                                {notification.image && (
                                  <div className="flex flex-col md:flex-row gap-4 items-start">
                                    {/* Image */}
                                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm w-full md:w-1/2">
                                      <div className="flex items-center gap-2 mb-3">
                                        <ImageIcon className="h-4 w-4 text-gray-500" />
                                        <span className="font-semibold text-gray-900">
                                          Attached Image
                                        </span>
                                      </div>
                                      <Image
                                        src={user}
                                        alt="Notification attachment"
                                        className="w-full h-50 object-cover rounded-lg border border-gray-200"
                                      />
                                    </div>

                                    {/* Full Message */}
                                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm w-full md:w-1/2">
                                      <div className="flex items-center gap-2 mb-3">
                                        <MessageSquare className="h-4 w-4 text-gray-500" />
                                        <span className="font-semibold text-gray-900">
                                          Full Message
                                        </span>
                                      </div>
                                      <p className="text-gray-700 leading-relaxed">
                                        {notification.message}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Hashtags */}
                                {notification.hashtags &&
                                  notification.hashtags.length > 0 && (
                                    <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                                      <div className="flex items-center gap-2 mb-3">
                                        <Hash className="h-4 w-4 text-gray-500" />
                                        <span className="font-semibold text-gray-900">
                                          Hashtags
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {notification.hashtags.map(
                                          (tag, index) => (
                                            <Badge
                                              key={index}
                                              variant="secondary"
                                              className="text-xs rounded-full px-3 py-1"
                                            >
                                              {tag}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}

                                {/* Metadata */}
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>
                                        {formatFullDate(notification.date)}
                                      </span>
                                    </div>
                                  </div>
                                  {notification.link && (
                                    <a
                                      href={notification.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg transition-colors"
                                    >
                                      Open Link
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Create Notification Modal */}
      <CreateNotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onNotificationSent={(notification) => {
          setSentNotifications([
            {
              ...notification,
              type: notification.type as NotificationType,
              image: notification.image || undefined,
            },
            ...sentNotifications,
          ]);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
