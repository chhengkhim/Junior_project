"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { EyeOff, ScanSearch, Users, Bookmark, ChevronDown, Settings, Scale, MessagesSquareIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface SidebarProps {
  onItemClick?: () => void
  logoSrc?: string
  isMobile?: boolean
  isOpen?: boolean
  onToggle?: () => void
  currentPath?: string
}

export function Sidebar({
  onItemClick,
  logoSrc,
  isMobile = false,
  isOpen = true,
  onToggle,
  currentPath = "/feed",
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Anonymous Posts": false,
    Resources: false,
    Setting: false,
  })

  const [activeItem, setActiveItem] = useState<string>(currentPath)

  useEffect(() => {
    if (currentPath) {
      setActiveItem(currentPath)
    }
  }, [currentPath])

  useEffect(() => {
    if (activeItem.includes("/feed") || activeItem.includes("/trending")) {
      setExpandedItems((prev) => ({ ...prev, "Anonymous Posts": true }))
    }

    if (activeItem.includes("/resources") || activeItem.includes("/campus") || activeItem.includes("/education")) {
      setExpandedItems((prev) => ({ ...prev, Resources: true }))
    }

    if (activeItem.includes("/faq") || activeItem.includes("/notifications")) {
      setExpandedItems((prev) => ({ ...prev, Setting: true }))
    }
  }, [activeItem])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => {
      // Create a new object with all items set to false
      const newState: Record<string, boolean> = Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === title ? !prev[key] : false, // Toggle current menu, close others
        }),
        {} as Record<string, boolean>,
      )

      return newState
    })
  }

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)

    // Close all dropdowns when clicking non-dropdown menu items
    if (itemName === "/bookmarks" || itemName === "/about" || itemName === "/rule" || itemName === "/contact") {
      setExpandedItems({
        "Anonymous Posts": false,
        Resources: false,
        Setting: false,
      })
    } else {
      // Keep the current dropdown open based on the clicked item
      if (itemName.includes("/feed") || itemName.includes("/trending")) {
        setExpandedItems((prev) => ({ ...prev, "Anonymous Posts": true }))
      } else if (itemName.includes("/resources") || itemName.includes("/campus") || itemName.includes("/education")) {
        setExpandedItems((prev) => ({ ...prev, Resources: true }))
      } else if (itemName.includes("/faq") || itemName.includes("/notifications")) {
        setExpandedItems((prev) => ({ ...prev, Setting: true }))
      }
    }

    // Only call onItemClick if it exists, but don't close the sidebar
    if (onItemClick && !isMobile) {
      onItemClick()
    }
  }

  if (isMobile && !isOpen) {
    return null
  }

  return (
    <div
      className={cn(
        "h-full shadow-[#212121]/20 bg-white dark:bg-[#1d2b7d] shadow-md border-r rounded-tr-2xl dark:border-gray-800 overflow-y-auto transition-all duration-300 ease-in-out",
        isMobile && "fixed top-0 left-2 z-50 h-screen w-[100%] max-w-[340px]",
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
            className="absolute right-4 top-6 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 hover:bg-[#1d2b7d] hover:text-white dark:hover:bg-indigo-800/70 transition-all duration-300 ease-in-out shadow-md"
            aria-label="Close sidebar"
          >
            <X size={18} strokeWidth={2.5} className="transition-transform duration-300 ease-in-out hover:rotate-90" />
          </button>
        )}
      </div>

      <nav className="flex flex-col pt-4">
        {/* Community Board Section */}
        <div className="mt-4 px-6 py-2">
          <h2 className="text-sm font-bold text-indigo-800 dark:text-white">COMMUNITY BOARD</h2>
        </div>

        {/* Anonymous Posts Dropdown */}
        <div className="mb-1">
          <Button
            type="button"
            onClick={() => toggleExpanded("Anonymous Posts")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out rounded-md mx-2",
              expandedItems["Anonymous Posts"] &&
                "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
            )}
            aria-expanded={expandedItems["Anonymous Posts"] ? "true" : "false"}
          >
            <span className="flex items-center gap-3">
              <EyeOff
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-300 ease-in-out",
                  expandedItems["Anonymous Posts"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Anonymous Posts</span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300 ease-in-out",
                expandedItems["Anonymous Posts"] && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>

          <div
            id="sidebar-anonymous-posts-menu"
            className={cn(
              "ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2 mt-1 mb-2 overflow-hidden transition-all duration-300 ease-in-out",
              expandedItems["Anonymous Posts"] ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <Link
              href="/feed"
              className={cn(
                "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                activeItem === "/feed" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
              )}
              onClick={() => handleItemClick("/feed")}
            >
              <span className="flex items-center">New Feed</span>
            </Link>
            <Link
              href="/trending"
              className={cn(
                "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                activeItem === "/trending" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
              )}
              onClick={() => handleItemClick("/trending")}
            >
              <span className="flex items-center">Trending Post</span>
            </Link>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="mb-1 mx-2">
          <Link
            href="/bookmarks"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-300 ease-in-out",
              activeItem === "/bookmarks"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200",
            )}
            onClick={() => handleItemClick("/bookmarks")}
          >
            <Bookmark
              className={cn(
                "h-5 w-5 transition-colors duration-300 ease-in-out",
                activeItem === "/bookmarks" ? "text-white dark:text-[#1d2b7d]" : "text-gray-500 dark:text-gray-400",
              )}
            />
            <span className="font-medium">Bookmarks</span>
          </Link>
        </div>

        {/* Resources */}
        <div className="mb-1">
          <Button
            type="button"
            onClick={() => toggleExpanded("Resources")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out rounded-md mx-2",
              expandedItems["Resources"] &&
                "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
            )}
            aria-expanded={expandedItems["Resources"] ? "true" : "false"}
          >
            <span className="flex items-center gap-3">
              <ScanSearch
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-300 ease-in-out",
                  expandedItems["Resources"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Resources</span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300 ease-in-out",
                expandedItems["Resources"] && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>

          <div
            className={cn(
              "ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2 mt-1 mb-2 overflow-hidden transition-all duration-300 ease-in-out",
              expandedItems["Resources"] ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div>
              <Link
                href="/resources"
                className={cn(
                  "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                  activeItem === "/resources" &&
                    "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                )}
                onClick={() => handleItemClick("/resources")}
              >
                <div className="flex items-center">
                  <span>Emergency Help</span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                href="/campus"
                className={cn(
                  "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                  activeItem === "/campus" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                )}
                onClick={() => handleItemClick("/campus")}
              >
                <div className="flex items-center">
                  <span>Campus Resources</span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                href="/education"
                className={cn(
                  "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                  activeItem === "/education" &&
                    "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                )}
                onClick={() => handleItemClick("/education")}
              >
                <div className="flex items-center">
                  <span>Education Material</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* About Us */}
        <div className="mb-1 mx-2">
          <Link
            href="/about"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-300 ease-in-out",
              activeItem === "/about"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200",
            )}
            onClick={() => handleItemClick("/about")}
          >
            <Users
              className={cn(
                "h-5 w-5 transition-colors duration-300 ease-in-out",
                activeItem === "/about" ? "text-white dark:text-[#1d2b7d]" : "text-gray-500 dark:text-gray-400",
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
          <Button
            type="button"
            onClick={() => toggleExpanded("Setting")}
            className={cn(
              "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out rounded-md mx-2",
              expandedItems["Setting"] &&
                "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
            )}
            aria-expanded={expandedItems["Setting"] ? "true" : "false"}
          >
            <span className="flex items-center gap-3">
              <Settings
                className={cn(
                  "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-300 ease-in-out",
                  expandedItems["Setting"] && "text-[#1d2b7d] dark:text-white",
                )}
              />
              <span className="font-medium">Settings</span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300 ease-in-out",
                expandedItems["Setting"] && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>

          <div
            className={cn(
              "ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2 mt-1 mb-2 overflow-hidden transition-all duration-300 ease-in-out",
              expandedItems["Setting"] ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div>
              <Link
                href="/faq"
                className={cn(
                  "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                  activeItem === "/faq" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                )}
                onClick={() => handleItemClick("/faq")}
              >
                <div className="flex items-center">
                  <span>FAQ</span>
                </div>
              </Link>
            </div>
            <div>
              <Link
                href="/notifications"
                className={cn(
                  "block py-2 pl-2 text-gray-700 dark:text-gray-300 transition-colors rounded-md",
                  activeItem === "/notifications" &&
                    "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                )}
                onClick={() => handleItemClick("/notifications")}
              >
                <div className="flex items-center">
                  <span>Notifications</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="mb-1 mx-2">
          <Link
            href="/rule"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-300 ease-in-out",
              activeItem === "/rule"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200",
            )}
            onClick={() => handleItemClick("/rule")}
          >
            <Scale
              className={cn(
                "h-5 w-5 transition-colors duration-300 ease-in-out",
                activeItem === "/rule" ? "text-white dark:text-[#1d2b7d]" : "text-gray-500 dark:text-gray-400",
              )}
            />
            <span className="font-medium">Rules</span>
          </Link>
        </div>

        {/* Contact Us */}
        <div className="mb-1 mx-2">
          <Link
            href="/contact"
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-md transition-all duration-300 ease-in-out",
              activeItem === "/contact"
                ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                : "text-gray-700 dark:text-gray-200",
            )}
            onClick={() => handleItemClick("/contact")}
          >
            <MessagesSquareIcon
              className={cn(
                "h-5 w-5 transition-colors duration-300 ease-in-out",
                activeItem === "/contact" ? "text-white dark:text-[#1d2b7d]" : "text-gray-500 dark:text-gray-400",
              )}
            />
            <span className="font-medium">Contact Us</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
