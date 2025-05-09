"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { EyeOff, ScanSearch, Users, Bookmark, ChevronDown, Settings, Scale, MessagesSquareIcon, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  onItemClick?: () => void
  logoSrc?: string
  isMobile?: boolean
  isOpen?: boolean
  onToggle?: () => void
  currentPath?: string // Add currentPath prop to track active route
}

export function Sidebar({ 
  onItemClick, 
  logoSrc, 
  isMobile = false, 
  isOpen = true, 
  onToggle,
  currentPath = "/feed" // Default path
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Anonymous Posts": false,
    Resources: false,
    Setting: false,
  })

  // Track active menu item - initialize with current path
  const [activeItem, setActiveItem] = useState<string>(currentPath)

  // Effect to update active item when currentPath changes
  useEffect(() => {
    if (currentPath) {
      setActiveItem(currentPath)
    }
  }, [currentPath])

  // Auto-expand sections based on active route
  useEffect(() => {
    // Determine which sections should be expanded based on active route
    if (activeItem.includes("/feed") || activeItem.includes("/trending")) {
      setExpandedItems(prev => ({ ...prev, "Anonymous Posts": true }))
    }
    
    if (activeItem.includes("/resources") || activeItem.includes("/campus") || activeItem.includes("/education")) {
      setExpandedItems(prev => ({ ...prev, "Resources": true }))
    }
    
    if (activeItem.includes("/faq") || activeItem.includes("/notifications")) {
      setExpandedItems(prev => ({ ...prev, "Setting": true }))
    }
  }, [activeItem])

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

  // Animation variants for the entire sidebar on mobile
  const sidebarVariants = {
    hidden: { 
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        when: "beforeChildren",
        staggerChildren: 0.07
      }
    },
    exit: { 
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
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
        ease: [0.04, 0.62, 0.23, 0.98],
        staggerChildren: 0.07,
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
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  }

  // Animation variants for individual dropdown items
  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
      }
    }
  }

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  // Backdrop for mobile
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <AnimatePresence>
      {(!isMobile || isOpen) && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && isOpen && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onToggle} // Close when backdrop is clicked
            />
          )}
          
          <motion.div
            variants={isMobile ? sidebarVariants : {}}
            initial={isMobile ? "hidden" : false}
            animate={isMobile ? "visible" : false}
            exit={isMobile ? "exit" : undefined}
            className={cn(
              "w-70 h-full shadow-[#212121]/20 bg-white dark:bg-[#1d2b7d] shadow-md border-r rounded-tr-2xl dark:border-gray-800 overflow-y-auto transition-all duration-300",
              isMobile && "fixed top-0 left-0 z-50 h-screen w-4/5 max-w-[280px]", // Limit mobile width
            )}
          >
            {/* Logo Section with Close Button for Mobile */}
            <motion.div 
              initial={isMobile ? { opacity: 0 } : false}
              animate={isMobile ? { opacity: 1 } : false}
              transition={{ delay: 0.1 }}
              className="flex justify-between items-center py-6 px-4 border-b border-gray-200 dark:border-gray-800"
            >
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
                <motion.button
                  onClick={onToggle}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute right-4 top-6 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/70 transition-colors shadow-md"
                  aria-label="Close sidebar"
                >
                  <X size={18} strokeWidth={2.5} />
                </motion.button>
              )}
            </motion.div>

            <nav className="flex flex-col pt-4">
              {/* Anonymous management */}
              <motion.div 
                variants={menuItemVariants}
                className="mt-4 px-6 py-2"
              >
                <h2 className="text-sm font-bold text-indigo-800 dark:text-white">COMMUNITY BOARD</h2>
              </motion.div>

              {/* Anonymous Posts  */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1"
              >
                <button
                  onClick={() => toggleExpanded("Anonymous Posts")}
                  className={cn(
                    "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
                    expandedItems["Anonymous Posts"] && "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
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
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
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
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
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
              </motion.div>

              {/* Bookmarks */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1 mx-2"
              >
                <Link
                  href="/bookmarks"
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
                    activeItem === "/bookmarks"
                      ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-white",
                  )}
                  onClick={() => handleItemClick("/bookmarks")}
                >
                  <Bookmark
                    className={cn(
                      "h-5 w-5 transition-colors",
                      activeItem === "/bookmarks"
                        ? "text-white dark:text-[#1d2b7d]"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-[#1d2b7d] dark:group-hover:text-white",
                    )}
                  />
                  <span className="font-medium">Bookmarks</span>
                </Link>
              </motion.div>

              {/* Resources */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1"
              >
                <button
                  onClick={() => toggleExpanded("Resources")}
                  className={cn(
                    "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
                    expandedItems["Resources"] && "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <ScanSearch
                      className={cn(
                        "h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200",
                        expandedItems["Resources"] && "text-[#1d2b7d] dark:text-white",
                      )}
                    />
                    <span className="font-medium">Resources</span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedItems["Resources"] ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn("h-4 w-4", expandedItems["Resources"] && "text-indigo-600 dark:text-indigo-400")}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedItems["Resources"] && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-14 space-y-1 pr-4 border-l-2 border-[#1d2b7d] dark:border-white pl-2"
                    >
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/resources"
                          className={cn(
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
                            activeItem === "/resources" &&
                              "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                          )}
                          onClick={() => handleItemClick("/resources")}
                        >
                          <div className="flex items-center">
                            <span>Emergency Help</span>
                          </div>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/campus"
                          className={cn(
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
                            activeItem === "/campus" &&
                              "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                          )}
                          onClick={() => handleItemClick("/campus")}
                        >
                          <div className="flex items-center">
                            <span>Campus Resources</span>
                          </div>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/education"
                          className={cn(
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
                            activeItem === "/education" &&
                              "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                          )}
                          onClick={() => handleItemClick("/education")}
                        >
                          <div className="flex items-center">
                            <span>Education Material</span>
                          </div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* About Us */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1 mx-2"
              >
                <Link
                  href="/about"
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
                    activeItem === "/about"
                      ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-white",
                  )}
                  onClick={() => handleItemClick("/about")}
                >
                  <Users
                    className={cn(
                      "h-5 w-5 transition-colors",
                      activeItem === "/about"
                        ? "text-white dark:text-[#1d2b7d]"
                        : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-white",
                    )}
                  />
                  <span className="font-medium">About Us</span>
                </Link>
              </motion.div>

              {/* Management Section */}
              <motion.div 
                variants={menuItemVariants}
                className="mt-6 px-6 py-2"
              >
                <h2 className="text-sm font-bold text-indigo-800 dark:text-white">MANAGEMENT</h2>
              </motion.div>

              {/* Setting */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1"
              >
                <button
                  onClick={() => toggleExpanded("Setting")}
                  className={cn(
                    "flex w-full items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-md mx-2",
                    expandedItems["Setting"] && "bg-indigo-50 dark:bg-indigo-900/30 text-[#1d2b7d] dark:text-white font-medium",
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
                          href="/faq"
                          className={cn(
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
                            activeItem === "/faq" && "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                          )}
                          onClick={() => handleItemClick("/faq")}
                        >
                          <div className="flex items-center">
                            <span>FAQ</span>
                          </div>
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/notifications"
                          className={cn(
                            "block py-2 pl-2 text-gray-700 dark:text-gray-300 hover:text-[#1d2b7d] dark:hover:text-white transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-white/10",
                            activeItem === "/notifications" &&
                              "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d] font-medium",
                          )}
                          onClick={() => handleItemClick("/notifications")}
                        >
                          <div className="flex items-center">
                            <span>Notifications</span>
                          </div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Rules */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1 mx-2"
              >
                <Link
                  href="/rule"
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
                    activeItem === "/rule"
                      ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-white",
                  )}
                  onClick={() => handleItemClick("/rule")}
                >
                  <Scale
                    className={cn(
                      "h-5 w-5 transition-colors",
                      activeItem === "/rule"
                        ? "text-white dark:text-[#1d2b7d]"
                        : "text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-[#1d2b7d]",
                    )}
                  />
                  <span className="font-medium">Rules</span>
                </Link>
              </motion.div>

              {/* Contact Us */}
              <motion.div 
                variants={menuItemVariants}
                className="mb-1 mx-2"
              >
                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-md transition-colors",
                    activeItem === "/contact"
                      ? "bg-[#1d2b7d] dark:bg-white text-white dark:text-[#1d2b7d]"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1d2b7d] dark:hover:text-white",
                  )}
                  onClick={() => handleItemClick("/contact")}
                >
                  <MessagesSquareIcon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      activeItem === "/contact"
                        ? "text-white dark:text-[#1d2b7d]"
                        : "text-gray-500 dark:text-gray-400 hover:text-[#1d2b7d] dark:hover:text-white",
                    )}
                  />
                  <span className="font-medium">Contact Us</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}