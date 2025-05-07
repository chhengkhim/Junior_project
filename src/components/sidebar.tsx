"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  EyeOff,
  ScanSearch,
  Users,
  Bookmark,
  ChevronDown,
  PlusSquare,
  Settings,
  User,
  Scale,
  MessagesSquareIcon,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  onItemClick?: () => void
  logoSrc?: string
  isMobile?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

export function Sidebar({ onItemClick, logoSrc, isMobile = false, isOpen = true, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Anonymous Posts": false,
    Categories: false,
    Resourses: false,
    Setting: false,
  })

  // Track active menu item
  const [activeItem, setActiveItem] = useState<string>("New Feed")

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    if (onItemClick) {
      onItemClick()
    }
    // Close sidebar on mobile when an item is clicked
    if (isMobile && onToggle) {
      onToggle()
    }
  }

  // Animation variants for dropdown content
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 4,
      marginBottom: 8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  // Animation variants for individual dropdown items
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div
      className={cn(
        "w-70 h-full shadow-[#212121]/20 bg-white dark:bg-[#1d2b7d] shadow-md border-r rounded-tr-2xl dark:border-gray-800 overflow-y-auto transition-all duration-300",
        isMobile && "fixed top-0 left-0 z-50 h-screen",
        isMobile && !isOpen && "transform -translate-x-full",
      )}
    >
      {/* Logo Section with Close Button for Mobile */}
      <div className="flex justify-between items-center py-6 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex-1 flex justify-center">
          {logoSrc && (
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="Logo"
              width={120}
              height={100}
              className="h-25 w-25"
              priority
            />
          )}
        </div>

        {isMobile && (
          <button
            onClick={onToggle}
            className="absolute right-4 top-6 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex flex-col pt-4">
        {/* Anonymous management */}
        <div className="mt-4 px-6 py-2">
          <h2 className="text-sm font-bold text-indigo-800 dark:text-white">COMMUNITY BOARD</h2>
        </div>

        {/* Anonymous Posts  */}
        <div className="mb-1">
          <button
            onClick={() => toggleExpanded("Anonymous Posts")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
              expandedItems["Anonymous Posts"] && "bg-indigo-50 dark:bg-indigo-900/20 text-[#1d2b7d] dark:text-white",
            )}
          >
            <div className="flex items-center gap-3">
              <EyeOff
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200",
                  expandedItems["Anonymous Posts"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Anonymous Posts</span>
            </div>
            <motion.div
              animate={{ rotate: expandedItems["Anonymous Posts"] ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("h-4 w-4", expandedItems["Anonymous Posts"] && "text-indigo-600 dark:text-indigo-400")}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedItems["Anonymous Posts"] && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="/feed"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "/feed" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("/feed")}
                  >
                    <div className="flex items-center">
                      <span>New Feed</span>
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="/trending"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "/trending" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("/trending")}
                  >
                    <div className="flex items-center">
                      <span>Trending Post</span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div className="mb-1">
          <button
            onClick={() => toggleExpanded("Categories")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
              expandedItems["Categories"] && "bg-indigo-50 dark:bg-indigo-900/20 text-[#1d2b7d] dark:text-white",
            )}
          >
            <div className="flex items-center gap-3">
              <PlusSquare
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200",
                  expandedItems["Categories"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Categories</span>
            </div>
            <motion.div
              animate={{ rotate: expandedItems["Categories"] ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("h-4 w-4", expandedItems["Categories"] && "text-indigo-600 dark:text-indigo-400")}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedItems["Categories"] && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Sadness" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Sadness")}
                  >
                    <div className="flex items-center">
                      <span>Sadness</span>
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Anxiety" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Anxiety")}
                  >
                    <div className="flex items-center">
                      <span>Anxiety</span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bookmarks */}
        <div className="mb-1 mx-2">
          <Link
            href="/bookmarks"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
              activeItem === "/bookmarks"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-[#ffff]",
            )}
            onClick={() => handleItemClick("/bookmarks")}
          >
            <Bookmark
              className={cn(
                "h-5 w-5 transition-colors",
                activeItem === "/bookmarks"
                  ? "text-white dark:text-[#1d2b7d]"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d]",
              )}
            />
            <span className="font-medium">Bookmarks</span>
          </Link>
        </div>

        {/* Resources */}
        <div className="mb-1">
          <button
            onClick={() => toggleExpanded("Resourses")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
              expandedItems["Resourses"] && "bg-indigo-50 dark:bg-indigo-900/20 text-[#1d2b7d] dark:text-white",
            )}
          >
            <div className="flex items-center gap-3">
              <ScanSearch
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200",
                  expandedItems["Resourses"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Resources</span>
            </div>
            <motion.div
              animate={{ rotate: expandedItems["Resourses"] ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("h-4 w-4", expandedItems["Resourses"] && "text-indigo-600 dark:text-indigo-400")}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedItems["Resourses"] && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Emergency Help" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Emergency Help")}
                  >
                    <div className="flex items-center">
                      <span>Emergency Help</span>
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Campus Resources" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Campus Resources")}
                  >
                    <div className="flex items-center">
                      <span>Campus Resources</span>
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Education Material" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Education Material")}
                  >
                    <div className="flex items-center">
                      <span>Education Material</span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* About Us */}
        <div className="mb-1 mx-2">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
              activeItem === "About Us"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-[#ffff]",
            )}
            onClick={() => handleItemClick("About Us")}
          >
            <Users
              className={cn(
                "h-5 w-5 transition-colors",
                activeItem === "About Us"
                  ? "text-white dark:text-[#1d2b7d]"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d]",
              )}
            />
            <span className="font-medium">About Us</span>
          </Link>
        </div>

        {/* Management Section */}
        <div className="mt-6 px-6 py-2">
          <h2 className="text-sm font-bold text-indigo-800 dark:text-white">MANAGEMENT</h2>
        </div>

        {/* Setting */}
        <div className="mb-1">
          <button
            onClick={() => toggleExpanded("Setting")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
              expandedItems["Setting"] && "bg-indigo-50 dark:bg-indigo-900/20 text-[#1d2b7d] dark:text-white",
            )}
          >
            <div className="flex items-center gap-3">
              <Settings
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200",
                  expandedItems["Setting"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Settings</span>
            </div>
            <motion.div
              animate={{ rotate: expandedItems["Setting"] ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("h-4 w-4", expandedItems["Setting"] && "text-indigo-600 dark:text-indigo-400")}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedItems["Setting"] && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "FAQ" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("FAQ")}
                  >
                    <div className="flex items-center">
                      <span>FAQ</span>
                    </div>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link
                    href="#"
                    className={cn(
                      "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d] transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white",
                      activeItem === "Notifications" &&
                        "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                    )}
                    onClick={() => handleItemClick("Notifications")}
                  >
                    <div className="flex items-center">
                      <span>Notifications</span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rules */}
        <div className="mb-1 mx-2">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
              activeItem === "Rules"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-[#ffff]",
            )}
            onClick={() => handleItemClick("Rules")}
          >
            <Scale
              className={cn(
                "h-5 w-5 transition-colors",
                activeItem === "Rules"
                  ? "text-white dark:text-[#1d2b7d]"
                  : "text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-[#1d2b7d]",
              )}
            />
            <span className="font-medium">Rules</span>
          </Link>
        </div>

        {/* Contact Us */}
        <div className="mb-1 mx-2">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
              activeItem === "Contact Us"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-[#ffff]",
            )}
            onClick={() => handleItemClick("Contact Us")}
          >
            <MessagesSquareIcon
              className={cn(
                "h-5 w-5 transition-colors",
                activeItem === "Contact Us"
                  ? "text-white dark:text-[#1d2b7d]"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d]",
              )}
            />
            <span className="font-medium">Contact Us</span>
          </Link>
        </div>

        {/* Profile */}
        <div className="mb-1 mx-2">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
              activeItem === "Profile"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-[#ffff]",
            )}
            onClick={() => handleItemClick("Profile")}
          >
            <User
              className={cn(
                "h-5 w-5 transition-colors",
                activeItem === "Profile"
                  ? "text-white dark:text-[#1d2b7d]"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-[#1d2b7d]",
              )}
            />
            <span className="font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
