"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Filter, Check, Calendar, Megaphone, Info, AlertTriangle, X } from "lucide-react"
import NotificationItem from "./notification-item"
import NotificationFilter from "./notification-filter"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function NotificationsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  type NotificationType = "announcement" | "event" | "alert" | "update"

  interface Notification {
    id: number
    title: string
    message: string
    type: NotificationType
    date: string
    isRead: boolean
    link?: string
  }

  useEffect(() => {
    setIsVisible(true)

    // Simulated notifications data
    const notificationsData: Notification[] = [
      {
        id: 1,
        title: "New Stress Management Workshop",
        message: "Join us for a new workshop on stress management techniques this Friday at 3:00 PM in Room 305.",
        type: "event",
        date: "2025-05-10T15:00:00",
        isRead: false,
        link: "/events/stress-workshop",
      },
      {
        id: 2,
        title: "Mental Health Awareness Week",
        message: "Mental Health Awareness Week starts next Monday. Check out the schedule of activities and workshops.",
        type: "announcement",
        date: "2025-05-15T09:00:00",
        isRead: false,
        link: "/events/mental-health-week",
      },
      {
        id: 3,
        title: "Counseling Services Schedule Change",
        message: "Counseling services will be available extended hours (until 7:00 PM) during exam week.",
        type: "update",
        date: "2025-05-08T12:30:00",
        isRead: true,
      },
      {
        id: 4,
        title: "New Resource: Sleep Improvement Guide",
        message: "A new guide on improving sleep quality is now available in our resources section.",
        type: "update",
        date: "2025-05-07T10:15:00",
        isRead: false,
        link: "/resources/sleep-guide",
      },
      {
        id: 5,
        title: "Campus Closure Notice",
        message:
          "The campus will be closed this Saturday for scheduled maintenance. All support groups will be held online.",
        type: "alert",
        date: "2025-05-12T00:00:00",
        isRead: true,
      },
      {
        id: 6,
        title: "Mindfulness Session Canceled",
        message:
          "Today's mindfulness session has been canceled due to instructor illness. We apologize for the inconvenience.",
        type: "alert",
        date: "2025-05-07T08:45:00",
        isRead: false,
      },
      {
        id: 7,
        title: "New Peer Support Group",
        message:
          "A new peer support group for first-year students is starting next week. Meetings will be held on Tuesdays at 4:00 PM.",
        type: "announcement",
        date: "2025-05-14T16:00:00",
        isRead: true,
        link: "/support-groups/first-year",
      },
      {
        id: 8,
        title: "Feedback Survey",
        message:
          "Please take a moment to complete our feedback survey on mental health services. Your input helps us improve!",
        type: "update",
        date: "2025-05-06T14:20:00",
        isRead: false,
        link: "/survey/mental-health-feedback",
      },
    ]

    setNotifications(notificationsData)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const getFilteredNotifications = () => {
    return notifications.filter((notification) => {
      const typeMatch = activeFilter === "all" || notification.type === activeFilter
      const readStatusMatch = !showUnreadOnly || !notification.isRead
      return typeMatch && readStatusMatch
    })
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const filters = [
    { id: "all", label: "All", icon: Bell },
    { id: "announcement", label: "Announcements", icon: Megaphone },
    { id: "event", label: "Events", icon: Calendar },
    { id: "alert", label: "Alerts", icon: AlertTriangle },
    { id: "update", label: "Updates", icon: Info },
  ]

  return (
    <div className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 bg-[#1d2b7d]/10 text-[#1d2b7d] rounded-full text-sm font-medium mb-4">
            NOTIFICATIONS
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d2b7d] mb-4">Your Notifications</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay updated with important announcements, events, and alerts from Paragon University.
          </p>
        </motion.div>

        {/* Notification Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-[#1d2b7d]/10 p-2 rounded-full mr-3">
              <Bell className="h-5 w-5 text-[#1d2b7d]" />
            </div>
            <div>
              <p className="text-slate-600 text-sm">You have</p>
              <p className="font-bold text-[#1d2b7d]">
                {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="px-3 py-1.5 text-sm font-medium text-[#1d2b7d] bg-[#1d2b7d]/10 rounded-lg hover:bg-[#1d2b7d]/20 transition-colors flex items-center"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </button>
            <button
              onClick={clearAllNotifications}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="md:hidden px-2 py-1 text-sm text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-2 mb-4">
            {filters.map((filter, index) => (
              <NotificationFilter
                key={filter.id}
                filter={filter}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                delay={index * 0.05}
              />
            ))}
          </div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {isFilterMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-4"
              >
                <div className="p-2 grid grid-cols-2 gap-2">
                  {filters.map((filter) => (
                    <NotificationFilter
                      key={filter.id}
                      filter={filter}
                      isActive={activeFilter === filter.id}
                      onClick={() => {
                        setActiveFilter(filter.id)
                        setIsFilterMenuOpen(false)
                      }}
                      delay={0}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center">
            <Switch id="unread-only" checked={showUnreadOnly} onCheckedChange={setShowUnreadOnly} className="mr-2" />
            <Label htmlFor="unread-only" className="text-sm text-slate-600">
              Show unread only
            </Label>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDismiss={dismissNotification}
                delay={index * 0.05}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-8 text-center"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">No notifications</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {notifications.length > 0
                  ? "No notifications match your current filters. Try adjusting your filter settings."
                  : "You don't have any notifications at the moment. Check back later for updates."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
