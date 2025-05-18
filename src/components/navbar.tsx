"use client"

import { BellRing, ChevronDown, BookOpen, User, Globe, LogOut, Moon, Sun, Check, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import logolight from "@/assets/logo8.png"
import logodark from "@/assets/logo9.png"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { TypingAnimation } from "./magicui/typing-animation"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "New message",
    description: "You received a new message from John Doe",
    time: "2 min ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    title: "Assignment reminder",
    description: "Your assignment is due tomorrow",
    time: "1 hour ago",
    read: false,
    avatar: null,
  },
  {
    id: 3,
    title: "System update",
    description: "The system has been updated successfully",
    time: "3 hours ago",
    read: true,
    avatar: null,
  },
  {
    id: 4,
    title: "New feature available",
    description: "Check out the new features in your dashboard",
    time: "Yesterday",
    read: true,
    avatar: null,
  },
]

export function Navbar() {
  const { theme, systemTheme, setTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [language, setLanguage] = useState("english")
  const [notificationList, setNotificationList] = useState(notifications)

  useEffect(() => {
    // Count unread notifications
    const count = notificationList.filter((notification) => !notification.read).length
    setUnreadCount(count)
  }, [notificationList])

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  // Remove scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isSidebarOpen, isMobile])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme

  if (!mounted) return null // Prevents mismatch during SSR

  const logoSrc = currentTheme === "dark" ? logodark : logolight

  // Only close sidebar when X button is clicked
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const markAllAsRead = () => {
    const updatedNotifications = notificationList.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotificationList(updatedNotifications)
  }

  return (
    <>
      <header className="fixed top-0 right-0 z-50 h-16 md:left-64 left-0 bg-white dark:bg-gray-900 px-4 shadow-md shadow-[#212121]/10 dark:shadow-black/20 rounded-2xl mx-4 mt-4 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative z-10 transition-transform duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? "rotate-45 top-3" : "rotate-0 top-1"}`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? "opacity-0" : "opacity-100"} top-3`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isSidebarOpen ? "-rotate-45 top-3" : "rotate-0 top-5"}`}
                ></span>
              </div>
            </Button>

            <div className="flex items-center gap-2">
              {isMobile && (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-15 w-auto"
                  priority
                />
              )}
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#1d2b7d] dark:text-blue-400 hidden md:block" />
                <TypingAnimation className="text-lg font-bold text-[#1d2b7d] dark:text-blue-400 hidden md:inline-block uppercase">
                  MindSpeak Uniconfess
                </TypingAnimation>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 rounded-full relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <BellRing className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-medium bg-red-500 text-white rounded-full px-1 border-2 border-white dark:border-gray-800">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden"
                sideOffset={8}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <DropdownMenuLabel className="text-base font-semibold m-0 text-gray-900 dark:text-gray-100">
                    Notifications
                  </DropdownMenuLabel>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="h-8 text-xs text-[#1d2b7d] dark:text-blue-400 hover:text-[#1d2b7d]/80 dark:hover:text-blue-300 hover:bg-[#1d2b7d]/10 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notificationList.length > 0 ? (
                    notificationList.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800/50 last:border-0",
                          !notification.read && "bg-blue-50/50 dark:bg-blue-900/10",
                        )}
                      >
                        {notification.avatar ? (
                          <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700 flex-shrink-0">
                            <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div
                            className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                              notification.read
                                ? "bg-gray-100 dark:bg-gray-800"
                                : "bg-[#1d2b7d]/10 dark:bg-blue-900/20",
                            )}
                          >
                            <BellRing
                              className={cn(
                                "h-4 w-4",
                                notification.read
                                  ? "text-gray-500 dark:text-gray-400"
                                  : "text-[#1d2b7d] dark:text-blue-400",
                              )}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p
                              className={cn(
                                "font-medium text-sm",
                                notification.read
                                  ? "text-gray-700 dark:text-gray-300"
                                  : "text-gray-900 dark:text-white",
                              )}
                            >
                              {notification.title}
                            </p>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <BellRing className="h-8 w-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <Button
                    variant="ghost"
                    className="w-full text-[#1d2b7d] dark:text-blue-400 hover:text-[#1d2b7d]/80 dark:hover:text-blue-300 hover:bg-[#1d2b7d]/10 dark:hover:bg-blue-900/20 text-sm font-medium transition-colors"
                  >
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full h-10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden sm:inline-block text-gray-700 dark:text-gray-200">
                      Pisethsambo Phok
                    </span>
                    <Avatar className="h-8 w-8 border-2 border-indigo-100 dark:border-indigo-900 ring-2 ring-white dark:ring-gray-900">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-[#1d2b7d] text-white dark:bg-blue-900">PS</AvatarFallback>
                    </Avatar>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg overflow-hidden"
                sideOffset={8}
              >
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-indigo-100 dark:border-indigo-900 ring-2 ring-white dark:ring-gray-900">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                      <AvatarFallback className="bg-[#1d2b7d] text-white dark:bg-blue-900">PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Pisethsambo Phok</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">pisethsambo@example.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <DropdownMenuItem
                    asChild
                    className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                      <Globe className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>Language</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-[10rem] p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                      <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                        <DropdownMenuRadioItem
                          value="english"
                          className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <span>English</span>
                          {language === "english" && (
                            <Check className="h-4 w-4 ml-auto text-[#1d2b7d] dark:text-blue-400" />
                          )}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="french"
                          className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <span>French</span>
                          {language === "french" && (
                            <Check className="h-4 w-4 ml-auto text-[#1d2b7d] dark:text-blue-400" />
                          )}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="spanish"
                          className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                          <span>Spanish</span>
                          {language === "spanish" && (
                            <Check className="h-4 w-4 ml-auto text-[#1d2b7d] dark:text-blue-400" />
                          )}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem
                    className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

                <div className="p-2">
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 dark:hover:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 hidden md:block z-40">
        <Sidebar logoSrc={logoSrc.src} />
      </div>

      {/* Mobile Sidebar Overlay with animation */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseSidebar}
      />

      {/* Mobile Sidebar with animation */}
      <div
        className={`fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar logoSrc={logoSrc.src} isMobile={true} isOpen={true} onToggle={handleCloseSidebar} />
      </div>
    </>
  )
}
